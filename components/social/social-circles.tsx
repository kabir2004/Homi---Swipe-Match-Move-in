"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus, MessageSquare, Settings, UserPlus } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { motion } from "framer-motion"

interface Circle {
  id: string
  name: string
  description: string
  creator_id: string
  university_id: string | null
  is_private: boolean
  created_at: string
  updated_at: string
  members: CircleMember[]
}

interface CircleMember {
  id: string
  circle_id: string
  user_id: string
  role: string
  joined_at: string
  profile: {
    id: string
    first_name: string
    last_name: string
    avatar_url: string | null
  }
}

export function SocialCircles() {
  const { user } = useAuth()
  const [circles, setCircles] = useState<Circle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCircle, setNewCircle] = useState({
    name: "",
    description: "",
    is_private: false,
  })
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchCircles() {
      if (!user) return

      try {
        setLoading(true)

        // First get circles where user is a member
        const { data: memberCircles, error: memberError } = await supabase
          .from("circle_members")
          .select("circle_id")
          .eq("user_id", user.id)

        if (memberError) throw memberError

        if (!memberCircles || memberCircles.length === 0) {
          setCircles([])
          setLoading(false)
          return
        }

        const circleIds = memberCircles.map((c) => c.circle_id)

        // Then get full circle data with members
        const { data, error } = await supabase
          .from("circles")
          .select(`
            id, 
            name, 
            description, 
            creator_id, 
            university_id, 
            is_private, 
            created_at, 
            updated_at,
            members:circle_members(
              id, 
              circle_id, 
              user_id, 
              role, 
              joined_at,
              profile:profiles(
                id, 
                first_name, 
                last_name, 
                avatar_url
              )
            )
          `)
          .in("id", circleIds)
          .order("created_at", { ascending: false })

        if (error) throw error
        setCircles(data || [])
      } catch (err: any) {
        console.error("Error fetching circles:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCircles()
  }, [user, supabase])

  const handleCreateCircle = async () => {
    if (!user) return

    try {
      // Create the circle
      const { data: circleData, error: circleError } = await supabase
        .from("circles")
        .insert({
          name: newCircle.name,
          description: newCircle.description,
          creator_id: user.id,
          is_private: newCircle.is_private,
        })
        .select()
        .single()

      if (circleError) throw circleError

      // Add creator as a member with 'creator' role
      const { error: memberError } = await supabase.from("circle_members").insert({
        circle_id: circleData.id,
        user_id: user.id,
        role: "creator",
      })

      if (memberError) throw memberError

      // Refresh circles
      window.location.reload()

      // Close dialog and reset form
      setIsCreateDialogOpen(false)
      setNewCircle({
        name: "",
        description: "",
        is_private: false,
      })
    } catch (err: any) {
      console.error("Error creating circle:", err)
      alert(`Failed to create circle: ${err.message}`)
    }
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
        <p>Error loading social circles: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Social Circles</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Circle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Social Circle</DialogTitle>
              <DialogDescription>
                Create a group for potential roommates or friends with similar housing preferences.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Circle Name</Label>
                <Input
                  id="name"
                  value={newCircle.name}
                  onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                  placeholder="e.g., Campus North Roommates"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCircle.description}
                  onChange={(e) => setNewCircle({ ...newCircle, description: e.target.value })}
                  placeholder="What is this circle for? What are you looking for?"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_private"
                  checked={newCircle.is_private}
                  onChange={(e) => setNewCircle({ ...newCircle, is_private: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="is_private">Private Circle (invitation only)</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCircle} disabled={!newCircle.name}>
                Create Circle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {circles.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Social Circles Yet</h3>
            <p className="text-gray-500 mb-6">
              Create your first circle to connect with potential roommates or join existing ones.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Circle
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {circles.map((circle) => (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{circle.name}</CardTitle>
                      <CardDescription className="mt-1">{circle.description}</CardDescription>
                    </div>
                    <Badge variant={circle.is_private ? "outline" : "secondary"}>
                      {circle.is_private ? "Private" : "Public"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Members ({circle.members.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {circle.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="border-2 border-white">
                            <AvatarImage
                              src={member.profile.avatar_url || "/diverse-students-studying.png"}
                              alt={`${member.profile.first_name} ${member.profile.last_name}`}
                            />
                            <AvatarFallback>
                              {member.profile.first_name?.[0]}
                              {member.profile.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {circle.members.length > 5 && (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                            +{circle.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite
                    </Button>
                    {circle.members.some(
                      (member) => member.user_id === user?.id && ["creator", "admin"].includes(member.role),
                    ) && (
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
