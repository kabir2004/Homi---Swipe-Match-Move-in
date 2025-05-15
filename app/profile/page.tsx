"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { UserProfile } from "@/components/profile/user-profile"
import { RoommateChat } from "@/components/chat/roommate-chat"
import { SocialCircle } from "@/components/social/social-circle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [profileData, setProfileData] = useState<any>(null)
  const [matches, setMatches] = useState<any[]>([])
  const [circles, setCircles] = useState<any[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return

      try {
        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError) throw profileError

        // Fetch user matches (people they've matched with through swipes)
        const { data: matchesData, error: matchesError } = await supabase
          .from("matches")
          .select("*, matched_user:profiles(*)")
          .eq("user_id", user.id)

        if (matchesError) throw matchesError

        // Fetch user circles (groups they're part of)
        const { data: circlesData, error: circlesError } = await supabase
          .from("circles")
          .select("*, members:circle_members(*)")
          .eq("creator_id", user.id)
          .or(`members.user_id.eq.${user.id}`)

        if (circlesError) throw circlesError

        setProfileData(profileData || { id: user.id, email: user.email })
        setMatches(matchesData || [])
        setCircles(circlesData || [])
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setIsLoadingData(false)
      }
    }

    if (user) {
      fetchProfileData()
    }
  }, [user, supabase])

  if (isLoading || isLoadingData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null // Router will redirect
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <UserProfile user={user} profile={profileData} />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="matches" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="matches">Roommate Matches</TabsTrigger>
                <TabsTrigger value="circles">Social Circles</TabsTrigger>
              </TabsList>

              <TabsContent value="matches" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <RoommateChat matches={matches} userId={user.id} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="circles" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <SocialCircle circles={circles} userId={user.id} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
