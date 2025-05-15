"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { DashboardShell, DashboardHeader, DashboardCard } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building,
  Home,
  MessageSquare,
  Calendar,
  Bell,
  Settings,
  Search,
  Heart,
  Users,
  Clock,
  CheckCircle,
  ArrowUpRight,
  MapPin,
  DollarSign,
  Filter,
  Eye,
  CalendarClock,
  Wallet,
  UserPlus,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HomiBuoyImproved } from "@/components/homi-buoy-improved"
import { cn } from "@/lib/utils"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem("homi_user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        if (parsedUser.role === "student") {
          setUser(parsedUser)
        } else {
          // Redirect to landlord dashboard if not a student
          router.push("/landlord/dashboard")
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
        // Create a demo user if parsing fails
        const demoUser = {
          id: "demo-student",
          first_name: "Demo",
          last_name: "Student",
          email: "demo@student.com",
          role: "student",
          university_name: "University of Toronto",
          created_at: new Date().toISOString(),
        }
        localStorage.setItem("homi_user", JSON.stringify(demoUser))
        setUser(demoUser)
      }
    } else {
      // No user data found, create a demo user
      const demoUser = {
        id: "demo-student",
        first_name: "Demo",
        last_name: "Student",
        email: "demo@student.com",
        role: "student",
        university_name: "University of Toronto",
        created_at: new Date().toISOString(),
      }
      localStorage.setItem("homi_user", JSON.stringify(demoUser))
      setUser(demoUser)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("homi_user")
    router.push("/login")
  }

  // Add these handler functions after the existing state declarations
  const handleViewAllHousing = () => {
    setActiveTab("housing")
  }

  const handleViewAllRoommates = () => {
    setActiveTab("roommates")
  }

  const handleViewAllApplications = () => {
    setActiveTab("applications")
  }

  const handleSaveProperty = (propertyId: string) => {
    // Toggle saved status for the property
    const updatedRecommendations = recommendations.map((property) => {
      if (property.id === propertyId) {
        return { ...property, saved: !property.saved }
      }
      return property
    })
    // In a real app, you would update state here
    console.log(`Property ${propertyId} save status toggled`)
  }

  const handleApplyForProperty = (propertyId: string) => {
    // In a real app, this would navigate to an application form
    console.log(`Applying for property ${propertyId}`)
    // Show a toast or feedback to the user
    alert(`Application started for property. In a real app, this would open an application form.`)
  }

  const handleConnectWithRoommate = (roommateId: string) => {
    // In a real app, this would initiate a connection
    console.log(`Connecting with roommate ${roommateId}`)
    // Show a toast or feedback to the user
    alert(`Connection request sent to roommate. In a real app, this would send a notification.`)
  }

  const handleViewRoommateProfile = (roommateId: string) => {
    // In a real app, this would navigate to the roommate's profile
    console.log(`Viewing profile for roommate ${roommateId}`)
    // Show a toast or feedback to the user
    alert(`In a real app, this would open the roommate's profile.`)
  }

  const handleUpdatePreferences = () => {
    // In a real app, this would save the updated preferences
    console.log("Updating roommate preferences")
    // Show a toast or feedback to the user
    alert(`Preferences updated successfully. In a real app, this would save your preferences.`)
  }

  const handleAddToCalendar = (eventId: string) => {
    // In a real app, this would add the event to the user's calendar
    console.log(`Adding event ${eventId} to calendar`)
    // Show a toast or feedback to the user
    alert(`Event added to calendar. In a real app, this would integrate with your calendar.`)
  }

  const handleScheduleViewing = () => {
    // In a real app, this would open a scheduling interface
    console.log("Opening scheduling interface")
    // Show a toast or feedback to the user
    alert(`In a real app, this would open a calendar to schedule property viewings.`)
  }

  const handleRecalculateBudget = () => {
    // In a real app, this would recalculate the budget based on inputs
    console.log("Recalculating budget")
    // Show a toast or feedback to the user
    alert(`Budget recalculated. In a real app, this would update your budget calculations.`)
  }

  const handleExportBudget = () => {
    // In a real app, this would generate and download a budget report
    console.log("Exporting budget report")
    // Show a toast or feedback to the user
    alert(`In a real app, this would download a PDF budget report.`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // This will prevent rendering while redirecting
  }

  // Mock data for the dashboard
  const recommendations = [
    {
      id: "rec1",
      name: "Campus View Apartments",
      address: "123 University Ave",
      price: 1200,
      image: "/urban-glass-facade.png",
      distance: "5 min walk to campus",
      beds: 2,
      baths: 1,
      availableDate: "Aug 1",
      matchScore: 95,
      saved: true,
    },
    {
      id: "rec2",
      name: "University Heights",
      address: "456 College St",
      price: 950,
      image: "/cozy-student-studio.png",
      distance: "10 min walk to campus",
      beds: 1,
      baths: 1,
      availableDate: "Sept 1",
      matchScore: 92,
      saved: false,
    },
    {
      id: "rec3",
      name: "Maple Street Apartments",
      address: "789 Maple St",
      price: 1100,
      image: "/campus-commons.png",
      distance: "15 min walk to campus",
      beds: 2,
      baths: 1,
      availableDate: "Aug 15",
      matchScore: 88,
      saved: true,
    },
  ]

  const applications = [
    {
      id: "app1",
      property: "Campus View Apartments",
      unit: "3B",
      appliedDate: "2023-06-10",
      status: "pending",
      landlord: "ABC Property Management",
    },
    {
      id: "app2",
      property: "University Heights",
      unit: "Studio 5",
      appliedDate: "2023-06-05",
      status: "approved",
      landlord: "University Housing Inc.",
    },
  ]

  const roommates = [
    {
      id: "rm1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?key=rm1",
      university: "University of Toronto",
      program: "Computer Science",
      year: 3,
      matchScore: 95,
      interests: ["Gaming", "Hiking", "Cooking"],
    },
    {
      id: "rm2",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?key=rm2",
      university: "University of Toronto",
      program: "Business Administration",
      year: 2,
      matchScore: 92,
      interests: ["Music", "Sports", "Reading"],
    },
    {
      id: "rm3",
      name: "Taylor Wilson",
      avatar: "/placeholder.svg?key=rm3",
      university: "University of Toronto",
      program: "Psychology",
      year: 3,
      matchScore: 88,
      interests: ["Art", "Travel", "Fitness"],
    },
  ]

  const messages = [
    {
      id: "msg1",
      from: {
        name: "ABC Property Management",
        avatar: "/placeholder.svg?key=msg1",
      },
      preview: "Thank you for your application to Campus View Apartments. We're reviewing it now.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "msg2",
      from: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?key=rm2",
      },
      preview: "Hey! I'm also looking for housing near campus. Would you be interested in being roommates?",
      time: "Yesterday",
      unread: true,
    },
    {
      id: "msg3",
      from: {
        name: "University Housing Inc.",
        avatar: "/placeholder.svg?key=msg3",
      },
      preview: "Your application for University Heights has been approved! Please schedule a time to sign the lease.",
      time: "3 days ago",
      unread: false,
    },
  ]

  const events = [
    {
      id: "evt1",
      title: "Housing Fair",
      location: "University Student Center",
      date: "June 15, 2023",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: "evt2",
      title: "Campus View Apartments Viewing",
      location: "123 University Ave",
      date: "June 18, 2023",
      time: "2:00 PM",
    },
  ]

  const savedProperties = recommendations.filter((rec) => rec.saved)
  const budget = {
    total: 1500,
    spent: {
      rent: 1100,
      utilities: 150,
      food: 200,
    },
    remaining: 50,
  }

  return (
    <>
      <Header />
      <DashboardShell>
        <DashboardHeader
          title={`Welcome, ${user.first_name}`}
          description="Find your perfect student housing and roommates"
        >
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4 mr-2" />
              <span className="relative">
                Notifications
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  3
                </span>
              </span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </DashboardHeader>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <DashboardCard className="p-4 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary mb-3">
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={`${user.first_name}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                      {user.first_name?.[0]}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-center">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-xs text-gray-500 text-center">{user.university_name || "University of Toronto"}</p>
              </div>

              <div className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("overview")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "housing" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("housing")}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Housing
                </Button>
                <Button
                  variant={activeTab === "roommates" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("roommates")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Roommates
                </Button>
                <Button
                  variant={activeTab === "applications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("applications")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Applications
                  <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {applications.filter((a) => a.status === "pending").length}
                  </span>
                </Button>
                <Button
                  variant={activeTab === "messages" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("messages")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                  <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {messages.filter((m) => m.unread).length}
                  </span>
                </Button>
                <Button
                  variant={activeTab === "calendar" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("calendar")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
                <Button
                  variant={activeTab === "budget" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("budget")}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Budget
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-sm text-blue-700 mb-2">Need Help?</h4>
                  <p className="text-xs text-blue-600 mb-3">
                    Our HomiBuoy assistant can help with your housing search.
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setActiveTab("assistant")}
                  >
                    Ask HomiBuoy
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <DashboardCard className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Saved Properties</p>
                          <h3 className="text-3xl font-bold mt-1">{savedProperties.length}</h3>
                        </div>
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Heart className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">+2</span>
                        <span className="ml-1">since last week</span>
                      </div>
                    </DashboardCard>

                    <DashboardCard className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Applications</p>
                          <h3 className="text-3xl font-bold mt-1">{applications.length}</h3>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {applications.filter((a) => a.status === "pending").length} pending
                        </span>
                        <span className="text-xs text-gray-500">
                          {applications.filter((a) => a.status === "approved").length} approved
                        </span>
                      </div>
                    </DashboardCard>

                    <DashboardCard className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Roommate Matches</p>
                          <h3 className="text-3xl font-bold mt-1">{roommates.length}</h3>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <span>Based on your preferences</span>
                      </div>
                    </DashboardCard>

                    <DashboardCard className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Budget Remaining</p>
                          <h3 className="text-3xl font-bold mt-1">${budget.remaining}</h3>
                        </div>
                        <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <Wallet className="h-6 w-6 text-amber-600" />
                        </div>
                      </div>
                      <Progress value={((budget.total - budget.remaining) / budget.total) * 100} className="mt-4 h-2" />
                    </DashboardCard>
                  </div>

                  {/* Top Recommendations */}
                  <DashboardCard>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Top Recommendations</CardTitle>
                          <CardDescription>Properties that match your preferences</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleViewAllHousing}>
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendations.slice(0, 3).map((property) => (
                          <div key={property.id} className="group cursor-pointer">
                            <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                              <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-primary/90 hover:bg-primary">{property.matchScore}% Match</Badge>
                              </div>
                              <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="font-medium text-white">{property.name}</h3>
                                <p className="text-sm text-white/90">${property.price}/month</p>
                              </div>
                              <button
                                className={`absolute top-2 left-2 h-8 w-8 rounded-full flex items-center justify-center ${
                                  property.saved ? "bg-primary text-white" : "bg-white/80 text-gray-600"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSaveProperty(property.id)
                                }}
                                aria-label={property.saved ? "Remove from saved" : "Save property"}
                              >
                                <Heart className="h-4 w-4" fill={property.saved ? "currentColor" : "none"} />
                              </button>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1 text-primary" />
                              <span>{property.distance}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {property.beds} bed, {property.baths} bath • Available {property.availableDate}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </DashboardCard>

                  {/* Roommate Matches and Applications */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DashboardCard>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Roommate Matches</CardTitle>
                            <CardDescription>Find compatible roommates</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleViewAllRoommates}>
                            View All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {roommates.slice(0, 2).map((roommate) => (
                            <div
                              key={roommate.id}
                              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src={roommate.avatar || "/placeholder.svg"} alt={roommate.name} />
                                <AvatarFallback>{roommate.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{roommate.name}</h3>
                                  <Badge className="bg-primary/90 hover:bg-primary">{roommate.matchScore}% Match</Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {roommate.program}, Year {roommate.year}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {roommate.interests.map((interest, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                                    >
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => setActiveTab("roommates")}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Find More Roommates
                        </Button>
                      </CardFooter>
                    </DashboardCard>

                    <DashboardCard>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Your Applications</CardTitle>
                            <CardDescription>Track your housing applications</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleViewAllApplications}>
                            View All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {applications.map((application) => (
                            <div
                              key={application.id}
                              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{application.property}</h3>
                                <Badge
                                  variant="outline"
                                  className={
                                    application.status === "pending"
                                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                      : "bg-green-100 text-green-800 hover:bg-green-200"
                                  }
                                >
                                  {application.status === "pending" ? "Pending" : "Approved"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                Unit {application.unit} • Applied on{" "}
                                {new Date(application.appliedDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Landlord: {application.landlord}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={handleViewAllHousing}>
                          <Building className="h-4 w-4 mr-2" />
                          Browse More Properties
                        </Button>
                      </CardFooter>
                    </DashboardCard>
                  </div>

                  {/* Upcoming Events */}
                  <DashboardCard>
                    <CardHeader className="pb-2">
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Housing fairs and property viewings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <div className="bg-blue-100 text-blue-700 rounded-lg p-3 text-center min-w-[60px]">
                              <p className="text-sm font-medium">
                                {event.date.split(", ")[0].split(" ")[0].substring(0, 3).toUpperCase()}
                              </p>
                              <p className="text-xl font-bold">{event.date.split(", ")[0].split(" ")[1]}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-gray-600">{event.location}</p>
                              <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-auto"
                              onClick={() => handleAddToCalendar(event.id)}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Add to Calendar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={handleScheduleViewing}>
                        <CalendarClock className="h-4 w-4 mr-2" />
                        Schedule More Viewings
                      </Button>
                    </CardFooter>
                  </DashboardCard>
                </motion.div>
              )}

              {activeTab === "housing" && (
                <motion.div
                  key="housing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <DashboardCard>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle>Find Your Perfect Housing</CardTitle>
                          <CardDescription>Browse properties that match your preferences</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search properties..."
                              className="pl-10 w-full md:w-[200px] lg:w-[300px]"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...recommendations, ...recommendations].slice(0, 6).map((property, index) => (
                          <div key={`${property.id}-${index}`} className="group cursor-pointer">
                            <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                              <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-primary/90 hover:bg-primary">{property.matchScore}% Match</Badge>
                              </div>
                              <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="font-medium text-white">{property.name}</h3>
                                <p className="text-sm text-white/90">${property.price}/month</p>
                              </div>
                              <button
                                className={`absolute top-2 left-2 h-8 w-8 rounded-full flex items-center justify-center ${
                                  property.saved ? "bg-primary text-white" : "bg-white/80 text-gray-600"
                                }`}
                                aria-label={property.saved ? "Remove from saved" : "Save property"}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSaveProperty(property.id)
                                }}
                              >
                                <Heart className="h-4 w-4" fill={property.saved ? "currentColor" : "none"} />
                              </button>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1 text-primary" />
                              <span>{property.distance}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {property.beds} bed, {property.baths} bath • Available {property.availableDate}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-medium">${property.price}/month</span>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">Load More Properties</Button>
                    </CardFooter>
                  </DashboardCard>

                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Saved Properties</CardTitle>
                      <CardDescription>Properties you've bookmarked for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedProperties.map((property) => (
                          <div
                            key={property.id}
                            className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="relative h-auto w-1/3">
                              <Image
                                src={property.image || "/placeholder.svg"}
                                alt={property.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{property.name}</h3>
                                <Badge className="bg-primary/90 hover:bg-primary">{property.matchScore}% Match</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{property.address}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {property.beds} bed, {property.baths} bath • ${property.price}/month
                              </p>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <MapPin className="h-3 w-3 mr-1 text-primary" />
                                <span>{property.distance}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <Button size="sm" onClick={() => handleApplyForProperty(property.id)}>
                                  Apply Now
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </DashboardCard>
                </motion.div>
              )}

              {activeTab === "roommates" && (
                <motion.div
                  key="roommates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <DashboardCard>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle>Find Compatible Roommates</CardTitle>
                          <CardDescription>Connect with students who share your living preferences</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search roommates..."
                              className="pl-10 w-full md:w-[200px] lg:w-[300px]"
                            />
                          </div>
                          <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...roommates, ...roommates].slice(0, 6).map((roommate, index) => (
                          <DashboardCard key={`${roommate.id}-${index}`} className="p-0 overflow-hidden">
                            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-12 w-12 mr-3 border-2 border-white">
                                  <AvatarImage src={roommate.avatar || "/placeholder.svg"} alt={roommate.name} />
                                  <AvatarFallback>{roommate.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{roommate.name}</h3>
                                  <p className="text-sm text-gray-600">{roommate.university}</p>
                                </div>
                              </div>
                              <Badge className="bg-primary/90 hover:bg-primary">{roommate.matchScore}% Match</Badge>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div>
                                  <p className="text-xs text-gray-500">Program</p>
                                  <p className="text-sm">{roommate.program}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Year</p>
                                  <p className="text-sm">{roommate.year}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Interests</p>
                                <div className="flex flex-wrap gap-1">
                                  {roommate.interests.map((interest, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
                                    >
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-4">
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleConnectWithRoommate(roommate.id)}
                                >
                                  Connect
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleViewRoommateProfile(roommate.id)}
                                >
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          </DashboardCard>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">Find More Roommates</Button>
                    </CardFooter>
                  </DashboardCard>

                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Your Roommate Preferences</CardTitle>
                      <CardDescription>Update your preferences to find better matches</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cleanliness">Cleanliness Level</Label>
                            <Select defaultValue="moderate">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select cleanliness level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="very-clean">Very Clean</SelectItem>
                                <SelectItem value="moderate">Moderately Clean</SelectItem>
                                <SelectItem value="relaxed">Relaxed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="noise">Noise Preference</Label>
                            <Select defaultValue="moderate">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select noise preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="quiet">Very Quiet</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="lively">Lively</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="schedule">Daily Schedule</Label>
                            <Select defaultValue="night-owl">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your schedule" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="early-bird">Early Bird</SelectItem>
                                <SelectItem value="regular">Regular Hours</SelectItem>
                                <SelectItem value="night-owl">Night Owl</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="social">Social Preference</Label>
                            <Select defaultValue="balanced">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select social preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="very-social">Very Social</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="guests">Guest Policy</Label>
                            <Select defaultValue="occasional">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select guest policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="frequent">Frequent Guests Welcome</SelectItem>
                                <SelectItem value="occasional">Occasional Guests</SelectItem>
                                <SelectItem value="rare">Rarely Have Guests</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="interests">Your Interests</Label>
                            <Input id="interests" placeholder="e.g. Music, Sports, Reading" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline">Reset</Button>
                      <Button onClick={handleUpdatePreferences}>Update Preferences</Button>
                    </CardFooter>
                  </DashboardCard>
                </motion.div>
              )}

              {activeTab === "applications" && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Your Applications</CardTitle>
                      <CardDescription>Track the status of your housing applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {applications.map((application) => (
                          <div key={application.id} className="border rounded-lg overflow-hidden">
                            <div
                              className={`p-4 ${
                                application.status === "pending"
                                  ? "bg-amber-50 border-b border-amber-100"
                                  : "bg-green-50 border-b border-green-100"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{application.property}</h3>
                                <Badge
                                  variant="outline"
                                  className={
                                    application.status === "pending"
                                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                      : "bg-green-100 text-green-800 hover:bg-green-200"
                                  }
                                >
                                  {application.status === "pending" ? "Pending" : "Approved"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                Unit {application.unit} • Applied on{" "}
                                {new Date(application.appliedDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500">Landlord</p>
                                  <p className="text-sm font-medium">{application.landlord}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Application ID</p>
                                  <p className="text-sm font-medium">{application.id}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Last Updated</p>
                                  <p className="text-sm font-medium">
                                    {new Date(application.appliedDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  Contact Landlord
                                </Button>
                                {application.status === "approved" && (
                                  <Button size="sm" className="ml-auto">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Accept Offer
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </DashboardCard>

                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Application Tips</CardTitle>
                      <CardDescription>Improve your chances of getting approved</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="bg-blue-100 rounded-full p-2">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Complete Your Profile</h4>
                            <p className="text-sm text-gray-600">
                              Landlords are more likely to approve applications from students with complete profiles.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="bg-green-100 rounded-full p-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Provide References</h4>
                            <p className="text-sm text-gray-600">
                              Adding references from previous landlords or professors can strengthen your application.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                          <div className="bg-amber-100 rounded-full p-2">
                            <Clock className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Apply Early</h4>
                            <p className="text-sm text-gray-600">
                              The best properties fill up quickly. Apply as early as possible to increase your chances.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </DashboardCard>
                </motion.div>
              )}

              {activeTab === "messages" && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Messages</CardTitle>
                      <CardDescription>Communicate with landlords and potential roommates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[600px] border rounded-lg overflow-hidden">
                        <div className="w-1/3 border-r">
                          <div className="p-3 border-b">
                            <Input placeholder="Search messages..." />
                          </div>
                          <div className="overflow-y-auto h-[calc(600px-57px)]">
                            {messages.map((message, index) => (
                              <div
                                key={message.id}
                                className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${
                                  index === 0 ? "bg-gray-50" : ""
                                }`}
                              >
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage
                                    src={message.from.avatar || "/placeholder.svg"}
                                    alt={message.from.name}
                                  />
                                  <AvatarFallback>{message.from.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium truncate">{message.from.name}</h3>
                                    <span className="text-xs text-gray-500">{message.time}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                                </div>
                                {message.unread && <div className="h-2 w-2 bg-primary rounded-full ml-2"></div>}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-2/3 flex flex-col">
                          <div className="p-4 border-b">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src={messages[0].from.avatar || "/placeholder.svg"}
                                  alt={messages[0].from.name}
                                />
                                <AvatarFallback>{messages[0].from.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{messages[0].from.name}</h3>
                                <p className="text-xs text-gray-500">Online</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-4">
                              <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                                  <p>{messages[0].preview}</p>
                                  <p className="text-xs text-gray-500 mt-1">{messages[0].time}</p>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                                  <p>Thank you for the update! When will I hear back about the final decision?</p>
                                  <p className="text-xs text-white/80 mt-1">1 hour ago</p>
                                </div>
                              </div>
                              <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                                  <p>
                                    We should have a decision within 2-3 business days. We'll notify you as soon as
                                    possible.
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">45 minutes ago</p>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                                  <p>Great, thank you! I'm really excited about the possibility of living there.</p>
                                  <p className="text-xs text-white/80 mt-1">30 minutes ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border-t">
                            <div className="flex items-center">
                              <Input placeholder="Type a message..." className="flex-1 mr-2" />
                              <Button>Send</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </DashboardCard>
                </motion.div>
              )}

              {activeTab === "budget" && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Housing Budget</CardTitle>
                      <CardDescription>Track and manage your housing expenses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-2">Monthly Budget Breakdown</h3>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Rent</span>
                                    <span className="text-sm">
                                      ${budget.spent.rent} / ${budget.total * 0.7}
                                    </span>
                                  </div>
                                  <Progress value={(budget.spent.rent / (budget.total * 0.7)) * 100} className="h-2" />
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Utilities</span>
                                    <span className="text-sm">
                                      ${budget.spent.utilities} / ${budget.total * 0.15}
                                    </span>
                                  </div>
                                  <Progress
                                    value={(budget.spent.utilities / (budget.total * 0.15)) * 100}
                                    className="h-2"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">Food</span>
                                    <span className="text-sm">
                                      ${budget.spent.food} / ${budget.total * 0.15}
                                    </span>
                                  </div>
                                  <Progress value={(budget.spent.food / (budget.total * 0.15)) * 100} className="h-2" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-medium mb-2">Affordability Calculator</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="monthly-income">Monthly Income</Label>
                                  <Input id="monthly-income" type="number" defaultValue="2000" />
                                </div>
                                <div>
                                  <Label htmlFor="max-rent">Recommended Max Rent (30%)</Label>
                                  <Input id="max-rent" type="number" value="600" disabled />
                                </div>
                                <div>
                                  <Label htmlFor="other-expenses">Other Monthly Expenses</Label>
                                  <Input id="other-expenses" type="number" defaultValue="500" />
                                </div>
                                <div>
                                  <Label htmlFor="savings-goal">Monthly Savings Goal</Label>
                                  <Input id="savings-goal" type="number" defaultValue="200" />
                                </div>
                              </div>
                              <Button className="mt-4" onClick={handleRecalculateBudget}>
                                Recalculate
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="bg-gray-50 rounded-lg p-4 h-full">
                            <h3 className="text-lg font-medium mb-4">Budget Summary</h3>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-gray-500">Total Monthly Budget</p>
                                <p className="text-2xl font-bold">${budget.total}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Total Spent</p>
                                <p className="text-2xl font-bold">
                                  ${Object.values(budget.spent).reduce((a, b) => a + b, 0)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Remaining</p>
                                <p className="text-2xl font-bold text-green-600">${budget.remaining}</p>
                              </div>
                              <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium">Spending Breakdown</p>
                                <div className="flex items-center mt-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "73%" }}></div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs">
                                  <span>Rent: 73%</span>
                                  <span>Utilities: 10%</span>
                                  <span>Food: 13%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </DashboardCard>

                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>Housing Cost Comparison</CardTitle>
                      <CardDescription>Compare costs of different housing options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Property</th>
                              <th className="text-left p-2">Rent</th>
                              <th className="text-left p-2">Utilities</th>
                              <th className="text-left p-2">Distance</th>
                              <th className="text-left p-2">Total Cost</th>
                              <th className="text-left p-2">Affordability</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="p-2">Campus View Apartments</td>
                              <td className="p-2">$1,200</td>
                              <td className="p-2">$100</td>
                              <td className="p-2">5 min walk</td>
                              <td className="p-2 font-medium">$1,300</td>
                              <td className="p-2">
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  Over Budget
                                </Badge>
                              </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="p-2">University Heights</td>
                              <td className="p-2">$950</td>
                              <td className="p-2">$80</td>
                              <td className="p-2">10 min walk</td>
                              <td className="p-2 font-medium">$1,030</td>
                              <td className="p-2">
                                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                                  Near Budget
                                </Badge>
                              </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="p-2">Maple Street Apartments</td>
                              <td className="p-2">$1,100</td>
                              <td className="p-2">$90</td>
                              <td className="p-2">15 min walk</td>
                              <td className="p-2 font-medium">$1,190</td>
                              <td className="p-2">
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  Over Budget
                                </Badge>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="p-2">Shared House (3 roommates)</td>
                              <td className="p-2">$600</td>
                              <td className="p-2">$70</td>
                              <td className="p-2">20 min walk</td>
                              <td className="p-2 font-medium">$670</td>
                              <td className="p-2">
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Within Budget
                                </Badge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="ml-auto" onClick={handleExportBudget}>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Export Budget Report
                      </Button>
                    </CardFooter>
                  </DashboardCard>
                </motion.div>
              )}

              {activeTab === "assistant" && (
                <motion.div
                  key="assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <DashboardCard>
                    <CardHeader>
                      <CardTitle>HomiBuoy Assistant</CardTitle>
                      <CardDescription>Get personalized help with your housing search</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[600px]">
                      <HomiBuoyImproved />
                    </CardContent>
                  </DashboardCard>
                </motion.div>
              )}

              {/* Add other tab contents here */}
            </AnimatePresence>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}

// Add missing components
function Textarea({ id, placeholder, className }: { id: string; placeholder: string; className?: string }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
    >
      {children}
    </label>
  )
}

function Select({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

function SelectTrigger({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <button
      className={cn(
        "flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  )
}

function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-sm">{placeholder}</span>
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 mt-1">
      <div className="p-1">{children}</div>
    </div>
  )
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      {children}
    </div>
  )
}
