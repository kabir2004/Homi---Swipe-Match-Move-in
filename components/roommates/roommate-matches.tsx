"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, X, Check } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

interface RoommateMatch {
  id: string
  user_id: string
  matched_user_id: string
  status: string
  match_score: number
  created_at: string
  matched_user: {
    id: string
    first_name: string
    last_name: string
    avatar_url: string | null
    university_name: string | null
    bio: string | null
  }
}

export function RoommateMatches() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<RoommateMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchMatches() {
      if (!user) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("matches")
          .select(`
            id, 
            user_id, 
            matched_user_id, 
            status, 
            match_score, 
            created_at,
            matched_user:profiles!matched_user_id(
              id, 
              first_name, 
              last_name, 
              avatar_url, 
              university_name,
              bio
            )
          `)
          .eq("user_id", user.id)
          .order("match_score", { ascending: false })

        if (error) throw error
        setMatches(data || [])
      } catch (err: any) {
        console.error("Error fetching matches:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [user, supabase])

  const handleMatchAction = async (matchId: string, action: "accept" | "reject") => {
    try {
      const { error } = await supabase
        .from("matches")
        .update({ status: action === "accept" ? "accepted" : "rejected" })
        .eq("id", matchId)

      if (error) throw error

      // Update local state
      setMatches(
        matches.map((match) =>
          match.id === matchId ? { ...match, status: action === "accept" ? "accepted" : "rejected" } : match,
        ),
      )

      // If accepted, create a notification for the matched user
      if (action === "accept") {
        const match = matches.find((m) => m.id === matchId)
        if (match) {
          await supabase.from("notifications").insert({
            profile_id: match.matched_user_id,
            type: "match_accepted",
            content: `${user?.user_metadata?.full_name || "Someone"} has accepted your roommate match!`,
            related_id: matchId,
          })
        }
      }
    } catch (err: any) {
      console.error(`Error ${action}ing match:`, err)
    }
  }

  const handleStartChat = async (matchedUserId: string) => {
    // Navigate to chat with this user
    // This would typically redirect to a chat page or open a chat modal
    console.log("Start chat with user:", matchedUserId)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">
        <p>Error loading matches: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">No roommate matches found yet.</p>
        <p className="text-gray-500 mt-2">Complete your profile and preferences to get matched!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gradient-to-br from-primary-50 to-blue-50 p-6 flex flex-col items-center justify-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={match.matched_user.avatar_url || "/diverse-students-studying.png"}
                      alt={`${match.matched_user.first_name} ${match.matched_user.last_name}`}
                    />
                    <AvatarFallback>
                      {match.matched_user.first_name?.[0]}
                      {match.matched_user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-center">
                    {match.matched_user.first_name} {match.matched_user.last_name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {match.matched_user.university_name || "University Student"}
                  </p>
                  <div className="mt-4">
                    <Badge className="bg-primary text-white">{match.match_score}% Match</Badge>
                  </div>
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">About</h4>
                    <p className="mt-1">
                      {match.matched_user.bio ||
                        "This student is looking for roommates with similar interests and lifestyle preferences."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {match.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => handleMatchAction(match.id, "accept")}
                          className="flex-1 bg-green-500 hover:bg-green-600"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Accept Match
                        </Button>
                        <Button
                          onClick={() => handleMatchAction(match.id, "reject")}
                          variant="outline"
                          className="flex-1"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Decline
                        </Button>
                      </>
                    ) : match.status === "accepted" ? (
                      <>
                        <Button onClick={() => handleStartChat(match.matched_user.id)} className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Users className="mr-2 h-4 w-4" />
                          Add to Circle
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" className="flex-1 text-gray-500" disabled>
                        Match Declined
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
