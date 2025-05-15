"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  MessageSquare,
  Users,
  Home,
  School,
  Calendar,
  MapPin,
  Clock,
  Coffee,
  Music,
  Book,
  Utensils,
  Volume2,
} from "lucide-react"

interface UserProfileProps {
  userId?: string // If provided, shows another user's profile; otherwise shows the current user's profile
  isPublic?: boolean
}

export function UserProfile({ userId, isPublic = false }: UserProfileProps) {
  const { user, profile, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState("about")

  // In a real app, you would fetch the profile data for the specified userId
  // For now, we'll use the current user's profile for demonstration
  const profileData = profile

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="relative">
        <div className="h-40 bg-gradient-to-r from-primary-100 to-blue-100 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>
        <div className="absolute -bottom-16 left-6 flex items-end">
          <div className="relative h-32 w-32 rounded-xl overflow-hidden border-4 border-white shadow-md">
            <Image
              src={profileData.avatar_url || "/diverse-students-studying.png"}
              alt={`${profileData.first_name}'s profile`}
              fill
              className="object-cover"
            />
          </div>
          <div className="mb-2 ml-4">
            <Badge className="bg-green-500 text-white border-none">Verified Student</Badge>
          </div>
        </div>
      </motion.div>

      {/* Profile Info */}
      <motion.div variants={itemVariants} className="pt-16 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {profileData.first_name} {profileData.last_name}
            </h1>
            <p className="text-gray-600 flex items-center mt-1">
              <School className="h-4 w-4 mr-1" />
              {profileData.university_name || "University of Toronto"}
              {profileData.program && `, ${profileData.program}`}
              {profileData.year && `, Year ${profileData.year}`}
            </p>
          </div>

          {!isPublic && (
            <Button variant="outline" className="mt-4 md:mt-0">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}

          {isPublic && (
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Connect
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Profile Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="bg-white border border-gray-100 shadow-sm">
              <TabsTrigger value="about" className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary">
                <User className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary"
              >
                <Home className="h-4 w-4 mr-2" />
                Housing Preferences
              </TabsTrigger>
              <TabsTrigger
                value="circles"
                className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary"
              >
                <Users className="h-4 w-4 mr-2" />
                Social Circles
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className="px-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>Personal information and lifestyle preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Bio</h3>
                  <p className="text-gray-700">
                    {profileData.bio ||
                      "Third-year Computer Science student who loves coding, hiking, and playing guitar. Looking for a quiet place to study and relax. Clean and organized roommate who respects personal space."}
                  </p>
                </div>

                <Separator />

                {/* Lifestyle Preferences */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-4">Lifestyle</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sleep Schedule</p>
                        <p className="text-xs text-gray-500">Night owl (11pm - 7am)</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Coffee className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cleanliness</p>
                        <p className="text-xs text-gray-500">Very clean (4.5/5)</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Volume2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Noise Level</p>
                        <p className="text-xs text-gray-500">Moderate (3/5)</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Guests</p>
                        <p className="text-xs text-gray-500">Occasionally (2/5)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Interests */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary-50 text-primary border-primary-200">
                      <Code className="h-3 w-3 mr-1" />
                      Programming
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Mountain className="h-3 w-3 mr-1" />
                      Hiking
                    </Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      <Music className="h-3 w-3 mr-1" />
                      Guitar
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Book className="h-3 w-3 mr-1" />
                      Reading
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <Utensils className="h-3 w-3 mr-1" />
                      Cooking
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="px-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Housing Preferences</CardTitle>
                <CardDescription>Your ideal housing situation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Budget</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">$800 - $1,200 / month</span>
                      <Badge>Flexible</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Includes utilities and internet</p>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Location</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span>Within 15 minutes of campus</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span>Access to public transportation</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span>Grocery store nearby</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Room Preferences */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-4">Room Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Home className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Room Type</p>
                        <p className="text-xs text-gray-500">Private room in shared apartment</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Move-in Date</p>
                        <p className="text-xs text-gray-500">September 1, 2023</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lease Length</p>
                        <p className="text-xs text-gray-500">12 months</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Roommates</p>
                        <p className="text-xs text-gray-500">1-3 roommates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="circles" className="px-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Circles</CardTitle>
                <CardDescription>Connect with potential roommates and housing groups</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Matched Roommates */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-gray-500 mb-4">Matched Roommates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Avatar className="h-12 w-12 mr-3">
                          <AvatarImage
                            src={`/placeholder.svg?key=hapql&key=ow7k9&height=48&width=48&query=student+portrait+${i}`}
                          />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Alex Johnson</p>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{85 + i}% Match</Badge>
                          </div>
                          <p className="text-xs text-gray-500">Computer Science, Year 3</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View All Matches
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Housing Groups */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-4">Housing Groups</h3>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Campus North Roommates</h4>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {i === 1 ? "3 members" : "4 members"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Looking for a 4-bedroom apartment near campus for Fall 2023
                          </p>
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((j) => (
                              <Avatar key={j} className="border-2 border-white">
                                <AvatarImage
                                  src={`/diverse-students-studying.png?key=2adth&height=32&width=32&query=student+${j}`}
                                />
                                <AvatarFallback>U{j}</AvatarFallback>
                              </Avatar>
                            ))}
                            {i === 2 && (
                              <Avatar className="border-2 border-white">
                                <AvatarImage src="/placeholder.svg?key=1bvyx" />
                                <AvatarFallback>U4</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 flex justify-between items-center">
                          <p className="text-xs text-gray-500">Created on June 10, 2023</p>
                          <Button size="sm">Join Group</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button className="w-full sm:w-auto">Create Housing Group</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

// Missing icons from the code above
function Code(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  )
}

function Mountain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
    </svg>
  )
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}
