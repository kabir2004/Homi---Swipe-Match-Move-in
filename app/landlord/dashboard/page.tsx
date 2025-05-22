"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Building,
  Home,
  MessageSquare,
  Plus,
  Users,
  Calendar,
  DollarSign,
  ChevronRight,
  Bell,
  Settings,
  Search,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Eye,
  Trash2,
  Edit,
  Upload,
  MapPin,
} from "lucide-react"

export default function LandlordDashboard() {
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
        if (parsedUser.role === "landlord") {
          setUser(parsedUser)
        } else {
          // Redirect to student dashboard if not a landlord
          router.push("/dashboard")
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
        // Create a demo landlord if parsing fails
        const demoUser = {
          id: "demo-landlord",
          first_name: "Demo",
          last_name: "Landlord",
          email: "demo@landlord.com",
          role: "landlord",
          company_name: "Demo Properties",
          created_at: new Date().toISOString(),
        }
        localStorage.setItem("homi_user", JSON.stringify(demoUser))
        setUser(demoUser)
      }
    } else {
      // No user data found, create a demo landlord
      const demoUser = {
        id: "demo-landlord",
        first_name: "Demo",
        last_name: "Landlord",
        email: "demo@landlord.com",
        role: "landlord",
        company_name: "Demo Properties",
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
  const handleViewAllProperties = () => {
    setActiveTab("properties")
  }

  const handleViewAllApplications = () => {
    setActiveTab("applications")
  }

  const handleViewAllActivity = () => {
    console.log("Viewing all activity")
  }

  const handleAddTask = () => {
    console.log("Adding new task")
  }

  const handleViewAllTasks = () => {
    console.log("Viewing all tasks")
  }

  const handleAddProperty = () => {
    setActiveTab("properties")
  }

  const handlePropertyAction = (propertyId: string, action: "view" | "edit" | "upload" | "delete") => {
    console.log(`${action} property ${propertyId}`)
  }

  const handleCreateProperty = () => {
    console.log("Creating new property")
  }

  const handleApplicationAction = (applicationId: string, action: "view" | "approve" | "reject") => {
    console.log(`${action} application ${applicationId}`)
  }

  const handleContactSupport = () => {
    console.log("Contacting support")
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
  const properties = [
    {
      id: "prop1",
      name: "Campus View Apartments",
      address: "123 University Ave",
      units: 5,
      available: 3,
      occupancyRate: 40,
      image: "/urban-glass-facade.png",
      revenue: 4500,
      applications: 8,
    },
    {
      id: "prop2",
      name: "University Heights",
      address: "456 College St",
      units: 12,
      available: 2,
      occupancyRate: 83,
      image: "/cozy-student-studio.png",
      revenue: 9800,
      applications: 5,
    },
    {
      id: "prop3",
      name: "Maple Street Apartments",
      address: "789 Maple St",
      units: 8,
      available: 1,
      occupancyRate: 88,
      image: "/campus-commons.png",
      revenue: 6200,
      applications: 3,
    },
  ]

  const applications = [
    {
      id: "app1",
      student: {
        name: "Sarah Johnson",
        avatar: "/diverse-students-studying.png",
        university: "University of Toronto",
      },
      property: "Campus View Apartments",
      unit: "3B",
      date: "2023-06-10",
      status: "pending",
    },
    {
      id: "app2",
      student: {
        name: "Michael Chen",
        avatar: "/diverse-students-studying.png",
        university: "University of Waterloo",
      },
      property: "University Heights",
      unit: "Studio 5",
      date: "2023-06-09",
      status: "pending",
    },
    {
      id: "app3",
      student: {
        name: "Emma Wilson",
        avatar: "/diverse-students-studying.png",
        university: "Western University",
      },
      property: "Maple Street Apartments",
      unit: "2A",
      date: "2023-06-08",
      status: "approved",
    },
  ]

  const messages = [
    {
      id: "msg1",
      from: {
        name: "Alex Thompson",
        avatar: "/diverse-students-studying.png",
      },
      preview: "Hi, I'm interested in the Campus View Apartments. Is unit 2B still available?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "msg2",
      from: {
        name: "Jamie Rodriguez",
        avatar: "/diverse-students-studying.png",
      },
      preview: "Thank you for approving my application! When can I schedule a move-in time?",
      time: "Yesterday",
      unread: true,
    },
    {
      id: "msg3",
      from: {
        name: "Taylor Kim",
        avatar: "/diverse-students-studying.png",
      },
      preview: "I submitted my application for University Heights last week. Could you check on the status?",
      time: "3 days ago",
      unread: false,
    },
  ]

  const events = [
    {
      id: "evt1",
      title: "Property Viewing",
      property: "Campus View Apartments",
      date: "June 15, 2023",
      time: "2:00 PM",
      attendees: 3,
    },
    {
      id: "evt2",
      title: "Lease Signing",
      property: "University Heights",
      date: "June 18, 2023",
      time: "10:00 AM",
      attendees: 1,
    },
    {
      id: "evt3",
      title: "Maintenance Check",
      property: "Maple Street Apartments",
      date: "June 20, 2023",
      time: "9:00 AM",
      attendees: 0,
    },
  ]

  const tasks = [
    {
      id: "task1",
      title: "Review new applications",
      priority: "high",
      dueDate: "Today",
      completed: false,
    },
    {
      id: "task2",
      title: "Schedule maintenance for Unit 4A",
      priority: "medium",
      dueDate: "Tomorrow",
      completed: false,
    },
    {
      id: "task3",
      title: "Update listing photos",
      priority: "low",
      dueDate: "June 20",
      completed: true,
    },
  ]

  const totalRevenue = properties.reduce((sum, property) => sum + property.revenue, 0)
  const totalUnits = properties.reduce((sum, property) => sum + property.units, 0)
  const occupiedUnits = properties.reduce((sum, property) => sum + (property.units - property.available), 0)
  const overallOccupancyRate = Math.round((occupiedUnits / totalUnits) * 100)

  return (
    <>
      <Header />
      <DashboardShell>
        <DashboardHeader title={`Welcome, ${user.first_name}`} description="Manage your properties and student tenants">
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
            <Card className="p-4 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary mb-3">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url || "/placeholder.svg?height=64&width=64&query=landlord"}
                      alt={`${user.first_name}'s avatar`}
                      className="h-full w-full object-cover"
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
                <p className="text-xs text-gray-500 text-center">{user.company_name || "Property Manager"}</p>
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
                  variant={activeTab === "properties" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("properties")}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Properties
                </Button>
                <Button
                  variant={activeTab === "applications" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("applications")}
                >
                  <FileText className="h-4 w-4 mr-2" />
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
                  variant={activeTab === "analytics" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
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
                    Our support team is ready to assist you with any questions.
                  </p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleContactSupport}>
                    Contact Support
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="hidden">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Properties</p>
                          <h3 className="text-3xl font-bold mt-1">{properties.length}</h3>
                        </div>
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">+1</span>
                        <span className="ml-1">since last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                          <h3 className="text-3xl font-bold mt-1">{overallOccupancyRate}%</h3>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <Progress value={overallOccupancyRate} className="mt-4 h-2" />
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                          <h3 className="text-3xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
                        </div>
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">+12%</span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">New Applications</p>
                          <h3 className="text-3xl font-bold mt-1">
                            {applications.filter((a) => a.status === "pending").length}
                          </h3>
                        </div>
                        <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-amber-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1 text-amber-500" />
                        <span>Requires your attention</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity and Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest updates from your properties</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {applications.slice(0, 2).map((application) => (
                          <div
                            key={application.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src={application.student.avatar || "/placeholder.svg"}
                                  alt={application.student.name}
                                />
                                <AvatarFallback>{application.student.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{application.student.name}</h3>
                                <p className="text-sm text-gray-600">
                                  Applied for {application.property}, Unit {application.unit}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
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
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {messages.slice(0, 1).map((message) => (
                          <div
                            key={message.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={message.from.avatar || "/placeholder.svg"} alt={message.from.name} />
                                <AvatarFallback>{message.from.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{message.from.name}</h3>
                                <p className="text-sm text-gray-600 truncate max-w-[300px]">{message.preview}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {message.unread && (
                                <div className="h-2 w-2 bg-primary rounded-full" aria-label="Unread message"></div>
                              )}
                              <span className="text-xs text-gray-500">{message.time}</span>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Payment Received</h3>
                              <p className="text-sm text-gray-600">$1,200 for Campus View Apartments, Unit 1A</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Yesterday</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-primary hover:text-primary-600"
                        onClick={handleViewAllActivity}
                      >
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Tasks</CardTitle>
                      <CardDescription>Things that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3 rounded-lg border-l-4 ${
                              task.completed
                                ? "border-gray-200 bg-gray-50"
                                : task.priority === "high"
                                  ? "border-red-500 bg-red-50"
                                  : task.priority === "medium"
                                    ? "border-amber-500 bg-amber-50"
                                    : "border-blue-500 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                                    task.completed ? "border-gray-400 bg-gray-400 text-white" : "border-gray-300"
                                  }`}
                                >
                                  {task.completed && <CheckCircle className="h-4 w-4" />}
                                </div>
                                <span className={`font-medium ${task.completed ? "text-gray-400 line-through" : ""}`}>
                                  {task.title}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  task.completed
                                    ? "bg-gray-100 text-gray-600"
                                    : task.priority === "high"
                                      ? "bg-red-100 text-red-800"
                                      : task.priority === "medium"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-blue-100 text-blue-800"
                                }
                              >
                                {task.dueDate}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={handleAddTask}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Task
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleViewAllTasks}>
                        View All
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Properties Overview */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Your Properties</CardTitle>
                        <CardDescription>Overview of all your rental properties</CardDescription>
                      </div>
                      <Button onClick={handleAddProperty}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Property
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className="group cursor-pointer"
                          onClick={() => setActiveTab("properties")}
                        >
                          <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                            <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4">
                              <h3 className="font-medium text-white">{property.name}</h3>
                              <p className="text-sm text-white/90">{property.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-600">
                              <Building className="h-4 w-4 mr-1 text-primary" />
                              <span>
                                {property.units} units • {property.available} available
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                property.occupancyRate > 80
                                  ? "bg-green-100 text-green-800"
                                  : property.occupancyRate > 50
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {property.occupancyRate}% occupied
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:text-primary-600"
                      onClick={handleViewAllProperties}
                    >
                      View All Properties
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Property Management</CardTitle>
                        <CardDescription>Manage all your rental properties</CardDescription>
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
                        <Button onClick={handleAddProperty}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Property
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-48 md:h-auto md:w-1/4">
                            <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-bold">{property.name}</h3>
                                <p className="text-gray-600">{property.address}</p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  property.occupancyRate > 80
                                    ? "bg-green-100 text-green-800"
                                    : property.occupancyRate > 50
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {property.occupancyRate}% occupied
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                              <div>
                                <p className="text-sm text-gray-500">Units</p>
                                <p className="font-medium">
                                  {property.units} total • {property.available} available
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Monthly Revenue</p>
                                <p className="font-medium">${property.revenue.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Applications</p>
                                <p className="font-medium">{property.applications} pending</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePropertyAction(property.id, "view")}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePropertyAction(property.id, "edit")}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePropertyAction(property.id, "upload")}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Photos
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handlePropertyAction(property.id, "delete")}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>Student Applications</CardTitle>
                        <CardDescription>Review and manage housing applications</CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search applications..."
                            className="pl-10 w-full md:w-[200px] lg:w-[300px]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div
                          key={application.id}
                          className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center mb-4 md:mb-0">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage
                                src={application.student.avatar || "/placeholder.svg"}
                                alt={application.student.name}
                              />
                              <AvatarFallback>{application.student.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{application.student.name}</h3>
                              <p className="text-sm text-gray-600">{application.student.university}</p>
                            </div>
                          </div>
                          <div className="flex items-center mb-4 md:mb-0">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span>
                              {application.property}, Unit {application.unit}
                            </span>
                          </div>
                          <div className="flex items-center mb-4 md:mb-0">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{new Date(application.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                application.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : application.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApplicationAction(application.id, "view")}
                            >
                              View
                            </Button>
                            {application.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApplicationAction(application.id, "approve")}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleApplicationAction(application.id, "reject")}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communicate with students and tenants</CardDescription>
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
                                <AvatarImage src={message.from.avatar || "/placeholder.svg"} alt={message.from.name} />
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
                                <p>Hi, I'm interested in the Campus View Apartments. Is unit 2B still available?</p>
                                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                                <p>
                                  Hello! Yes, unit 2B is still available. It's a 2-bedroom apartment with a great view
                                  of the campus.
                                </p>
                                <p className="text-xs text-white/80 mt-1">1 hour ago</p>
                              </div>
                            </div>
                            <div className="flex justify-start">
                              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                                <p>That sounds perfect! What's the monthly rent and when is it available?</p>
                                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                                <p>
                                  The rent is $1,200 per month, utilities included. It's available from September 1st.
                                  Would you like to schedule a viewing?
                                </p>
                                <p className="text-xs text-white/80 mt-1">45 minutes ago</p>
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

              <TabsContent value="calendar" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                    <CardDescription>Manage your events and appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Calendar component will go here */}
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                      <Calendar className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">Calendar & Scheduling</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        This section would contain a complete calendar and scheduling interface.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Track your property performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Analytics components will go here */}
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                      <BarChart3 className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">Analytics & Reporting</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        This section would contain a complete analytics and reporting interface.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your account settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Settings components will go here */}
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                      <Settings className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">Account Settings</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        This section would contain a complete settings interface.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
