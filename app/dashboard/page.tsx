"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building,
  Home,
  MessageSquare,
  Calendar,
  Bell,
  Heart,
  Users,
  Clock,
  CheckCircle,
  ArrowUpRight,
  MapPin,
  CalendarClock,
  Wallet,
  UserPlus,
  Star,
  Zap,
  Settings,
  BarChart,
} from "lucide-react"

// Import our custom components
import { HomiBuoyChat } from "@/components/homi-buoy-chat"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { BudgetCalculator } from "@/components/dashboard/budget-calculator"
import { HousingPage } from "@/components/dashboard/housing-page"
import { RoommatesPage } from "@/components/dashboard/roommates-page"
import { AnalyticsPage } from "@/components/dashboard/analytics-page"
import { SettingsPage } from "@/components/dashboard/settings-page"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
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

  // Handler functions
  const handleSaveProperty = (propertyId: string) => {
    // Toggle saved status for the property
    console.log(`Property ${propertyId} save status toggled`)
  }

  const handleAddToCalendar = (eventId: string) => {
    // In a real app, this would add the event to the user's calendar
    console.log(`Adding event ${eventId} to calendar`)
    // Show a toast or feedback to the user
    alert(`Event added to calendar. In a real app, this would integrate with your calendar.`)
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
      amenities: ["Gym", "Laundry", "Parking", "WiFi"],
      rating: 4.5,
      reviews: 28,
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
      amenities: ["Laundry", "WiFi", "Study Room"],
      rating: 4.2,
      reviews: 15,
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
      amenities: ["Gym", "Parking", "WiFi", "Pool"],
      rating: 4.0,
      reviews: 22,
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
      nextSteps: "Background check in progress",
      documents: ["Application Form", "Proof of Income", "Student ID"],
    },
    {
      id: "app2",
      property: "University Heights",
      unit: "Studio 5",
      appliedDate: "2023-06-05",
      status: "approved",
      landlord: "University Housing Inc.",
      nextSteps: "Lease signing scheduled for June 20",
      documents: ["Application Form", "Proof of Income", "Student ID", "Lease Agreement"],
    },
  ]

  const roommates = [
    {
      id: "rm1",
      name: "Alex Johnson",
      avatar: "/diverse-student-portraits.png",
      university: "University of Toronto",
      program: "Computer Science",
      year: 3,
      matchScore: 95,
      interests: ["Gaming", "Hiking", "Cooking"],
      bio: "Hey! I'm a CS student looking for a roommate who's clean and respectful. I'm pretty quiet during the week but like to socialize on weekends.",
      cleanliness: "Very Clean",
      schedule: "Night Owl",
      smoking: "Non-smoker",
      pets: "No pets",
    },
    {
      id: "rm2",
      name: "Jamie Smith",
      avatar: "/diverse-students-studying.png",
      university: "University of Toronto",
      program: "Business Administration",
      year: 2,
      matchScore: 92,
      interests: ["Music", "Sports", "Reading"],
      bio: "Business student looking for a roommate who's sociable but respects privacy. I play guitar but promise to keep it down!",
      cleanliness: "Moderately Clean",
      schedule: "Early Bird",
      smoking: "Non-smoker",
      pets: "Cat friendly",
    },
  ]

  const events = [
    {
      id: "evt1",
      title: "Housing Fair",
      location: "University Student Center",
      date: "June 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Meet local landlords and property managers offering student housing options.",
    },
    {
      id: "evt2",
      title: "Campus View Apartments Viewing",
      location: "123 University Ave",
      date: "June 18, 2023",
      time: "2:00 PM",
      description: "Scheduled viewing of Unit 3B at Campus View Apartments.",
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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-16 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl font-bold tracking-tight"
              >
                Welcome, {user.first_name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gray-500 mt-1"
              >
                Find your perfect student housing and roommates
              </motion.p>
            </div>
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
          </div>

          <Tabs defaultValue="overview" className="space-y-8" onValueChange={(value) => setActiveTab(value as any)}>
            <div className="bg-white rounded-lg shadow-sm p-1 sticky top-20 z-10">
              <TabsList className="grid grid-cols-5 md:grid-cols-10 w-full">
                <TabsTrigger value="overview" className="text-xs md:text-sm">
                  <Home className="h-4 w-4 mr-2 hidden md:inline" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="housing" className="text-xs md:text-sm">
                  <Building className="h-4 w-4 mr-2 hidden md:inline" />
                  Housing
                </TabsTrigger>
                <TabsTrigger value="roommates" className="text-xs md:text-sm">
                  <Users className="h-4 w-4 mr-2 hidden md:inline" />
                  Roommates
                </TabsTrigger>
                <TabsTrigger value="applications" className="text-xs md:text-sm">
                  <CheckCircle className="h-4 w-4 mr-2 hidden md:inline" />
                  Applications
                </TabsTrigger>
                <TabsTrigger value="messages" className="text-xs md:text-sm">
                  <MessageSquare className="h-4 w-4 mr-2 hidden md:inline" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="calendar" className="text-xs md:text-sm">
                  <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="budget" className="text-xs md:text-sm">
                  <Wallet className="h-4 w-4 mr-2 hidden md:inline" />
                  Budget
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs md:text-sm">
                  <BarChart className="h-4 w-4 mr-2 hidden md:inline" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="assistant" className="text-xs md:text-sm">
                  <Zap className="h-4 w-4 mr-2 hidden md:inline" />
                  Assistant
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs md:text-sm">
                  <Settings className="h-4 w-4 mr-2 hidden md:inline" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8 mt-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>
              </div>

              {/* Top Recommendations */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Top Recommendations</CardTitle>
                      <CardDescription>Properties that match your preferences</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("housing")}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendations.slice(0, 3).map((property) => (
                      <div key={property.id} className="group cursor-pointer">
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
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <span className="text-sm ml-1">{property.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({property.reviews} reviews)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Roommate Matches and Applications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Roommate Matches</CardTitle>
                        <CardDescription>Find compatible roommates</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("roommates")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roommates.slice(0, 2).map((roommate) => (
                        <div
                          key={roommate.id}
                          className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => setActiveTab("roommates")}
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
                              {roommate.interests.slice(0, 3).map((interest, i) => (
                                <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                  {interest}
                                </span>
                              ))}
                              {roommate.interests.length > 3 && (
                                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                  +{roommate.interests.length - 3} more
                                </span>
                              )}
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
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Your Applications</CardTitle>
                        <CardDescription>Track your housing applications</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("applications")}>
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.slice(0, 2).map((application) => (
                        <div
                          key={application.id}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => setActiveTab("applications")}
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
                          <p className="text-sm text-gray-600 mt-1">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {application.nextSteps}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setActiveTab("housing")}>
                      <Building className="h-4 w-4 mr-2" />
                      Browse More Properties
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Upcoming Events */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Housing fairs and property viewings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setActiveTab("calendar")}
                      >
                        <div className="bg-blue-100 text-blue-700 rounded-lg p-3 text-center min-w-[60px]">
                          <p className="text-sm font-medium">
                            {event.date.split(", ")[0].split(" ")[0].substring(0, 3).toUpperCase()}
                          </p>
                          <p className="text-xl font-bold">{event.date.split(", ")[0].split(" ")[1]}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCalendar(event.id)
                          }}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("calendar")}>
                    <CalendarClock className="h-4 w-4 mr-2" />
                    View All Events
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="housing" className="space-y-8 mt-6">
              <HousingPage />
            </TabsContent>

            <TabsContent value="roommates" className="space-y-8 mt-6">
              <RoommatesPage />
            </TabsContent>

            <TabsContent value="applications" className="space-y-8 mt-6">
              {/* Applications tab content */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Applications</CardTitle>
                  <CardDescription>Track the status of your housing applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {applications.map((application) => (
                      <div key={application.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-lg">{application.property}</h3>
                            <Badge
                              variant="outline"
                              className={
                                application.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                              }
                            >
                              {application.status === "pending" ? "Pending" : "Approved"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Unit {application.unit}</p>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Applied On</p>
                              <p>{new Date(application.appliedDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Landlord</p>
                              <p>{application.landlord}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Next Steps</p>
                              <p>{application.nextSteps}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">Documents Submitted</p>
                            <div className="flex flex-wrap gap-2">
                              {application.documents.map((doc, index) => (
                                <Badge key={index} variant="outline">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 border-t flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Contact Landlord
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-8 mt-6">
              {/* Messages tab content */}
              <Card className="shadow-sm">
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
                        {[
                          {
                            id: "msg1",
                            name: "ABC Property Management",
                            avatar: "/property-management-office.png",
                            preview:
                              "Thank you for your application to Campus View Apartments. We're reviewing it now.",
                            time: "2 hours ago",
                            unread: true,
                          },
                          {
                            id: "msg2",
                            name: "Jamie Smith",
                            avatar: "/diverse-students-studying.png",
                            preview:
                              "Hey! I'm also looking for housing near campus. Would you be interested in being roommates?",
                            time: "Yesterday",
                            unread: true,
                          },
                          {
                            id: "msg3",
                            name: "University Housing Inc.",
                            avatar: "/placeholder-ncs18.png",
                            preview:
                              "Your application for University Heights has been approved! Please schedule a time to sign the lease.",
                            time: "3 days ago",
                            unread: false,
                          },
                        ].map((message, index) => (
                          <div
                            key={message.id}
                            className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${
                              index === 0 ? "bg-gray-50" : ""
                            }`}
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.name} />
                              <AvatarFallback>{message.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium truncate">{message.name}</h3>
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
                            <AvatarImage src="/property-management-office.png" alt="ABC Property Management" />
                            <AvatarFallback>AP</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">ABC Property Management</h3>
                            <p className="text-xs text-gray-500">Online</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                          <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p>Thank you for your application to Campus View Apartments. We're reviewing it now.</p>
                              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
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
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-8 mt-6">
              <CalendarView />
            </TabsContent>

            <TabsContent value="budget" className="space-y-8 mt-6">
              <BudgetCalculator />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8 mt-6">
              <AnalyticsPage />
            </TabsContent>

            <TabsContent value="assistant" className="space-y-8 mt-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>HomiBuoy Assistant</CardTitle>
                  <CardDescription>Get personalized help with your housing search</CardDescription>
                </CardHeader>
                <CardContent>
                  <HomiBuoyChat />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-8 mt-6">
              <SettingsPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
