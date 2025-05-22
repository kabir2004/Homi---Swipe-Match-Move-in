"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Calendar,
  Home,
  Settings,
  Users,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  PlusCircle,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Building,
  FileText,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LandlordDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Mock data for the dashboard
  const properties = [
    {
      id: "prop1",
      name: "Campus View Apartments",
      address: "123 University Ave",
      units: 24,
      available: 2,
      occupancyRate: 92,
      image: "/modern-apartment-building.png",
      revenue: 12800,
    },
    {
      id: "prop2",
      name: "University Heights",
      address: "456 University Ave",
      units: 18,
      available: 2,
      occupancyRate: 88,
      image: "/modern-student-housing.png",
      revenue: 9200,
    },
    {
      id: "prop3",
      name: "Campus Edge Townhomes",
      address: "789 Campus Dr",
      units: 12,
      available: 0,
      occupancyRate: 100,
      image: "/modern-townhouse.png",
      revenue: 8400,
    },
  ]

  const activities = [
    {
      id: "act1",
      type: "lease",
      title: "New lease signed",
      location: "123 College St, Unit 4B",
      time: "2 hours ago",
      icon: <Home className="h-4 w-4 text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      id: "act2",
      type: "maintenance",
      title: "Maintenance request",
      location: "456 University Ave, Unit 2A",
      time: "5 hours ago",
      icon: <AlertCircle className="h-4 w-4 text-amber-600" />,
      bgColor: "bg-amber-100",
    },
    {
      id: "act3",
      type: "payment",
      title: "Rent payment received",
      location: "789 Campus Dr, Unit 3C",
      time: "1 day ago",
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {(!isMobile || sidebarOpen) && (
        <div
          className={`${
            isMobile ? "fixed inset-0 z-50 bg-white/95 backdrop-blur-sm" : "relative"
          } w-64 border-r border-gray-200 bg-white`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Building className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold">PropManager</span>
            </div>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <nav className="space-y-1 px-2 py-4">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Home className="mr-2 h-5 w-5" />
              Overview
            </Button>
            <Button
              variant={activeTab === "properties" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("properties")}
            >
              <Building className="mr-2 h-5 w-5" />
              Properties
            </Button>
            <Button
              variant={activeTab === "applications" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("applications")}
            >
              <FileText className="mr-2 h-5 w-5" />
              Applications
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                2
              </span>
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                3
              </span>
            </Button>
            <Button
              variant={activeTab === "tenants" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("tenants")}
            >
              <Users className="mr-2 h-5 w-5" />
              Tenants
            </Button>
            <Button
              variant={activeTab === "calendar" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("calendar")}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Calendar
            </Button>
            <Button
              variant={activeTab === "analytics" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Analytics
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </nav>
          <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-group.png" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Property Manager</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-gray-300 pl-8 pr-4 py-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/diverse-group.png" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1">
                        This Month <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>This Week</DropdownMenuItem>
                      <DropdownMenuItem>This Month</DropdownMenuItem>
                      <DropdownMenuItem>This Quarter</DropdownMenuItem>
                      <DropdownMenuItem>This Year</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Property
                  </Button>
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                    <Building className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{properties.length}</div>
                    <p className="text-xs text-gray-500">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                    <Users className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">28</div>
                    <p className="text-xs text-gray-500">+4 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-gray-500">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${properties.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-green-500">+12% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and tables */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] w-full">
                      {/* Placeholder for chart */}
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-4">
                        <BarChart3 className="h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Revenue chart visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest updates from your properties</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div className={`rounded-full ${activity.bgColor} p-2`}>{activity.icon}</div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.location}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="mr-1 h-3 w-3" /> {activity.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activities
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Properties table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Properties Overview</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b text-left text-sm font-medium text-gray-500">
                          <th className="pb-3 pl-4">Property</th>
                          <th className="pb-3">Units</th>
                          <th className="pb-3">Occupancy</th>
                          <th className="pb-3">Revenue</th>
                          <th className="pb-3 pr-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((property) => (
                          <tr key={property.id} className="border-b">
                            <td className="py-3 pl-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md bg-gray-100">
                                  <img
                                    src={property.image || "/placeholder.svg"}
                                    alt={property.name}
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{property.name}</p>
                                  <p className="text-xs text-gray-500">{property.address}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">{property.units} units</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={property.occupancyRate} className="h-2 w-16" />
                                <span>{property.occupancyRate}%</span>
                              </div>
                            </td>
                            <td className="py-3">${property.revenue.toLocaleString()}/mo</td>
                            <td className="py-3 pr-4">
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="properties" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Properties Management</h2>
              <p className="text-gray-500">Manage all your properties and units from one place.</p>

              {/* Properties content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <Building className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Properties Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  This section would contain a complete property management interface.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
              <p className="text-gray-500">Review and manage student housing applications.</p>

              {/* Applications content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <FileText className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Applications Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  This section would contain a complete applications management interface.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
              <p className="text-gray-500">Communicate with tenants and applicants.</p>

              {/* Messages content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <MessageSquare className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Messaging Center</h3>
                <p className="mt-2 text-sm text-gray-500">This section would contain a complete messaging interface.</p>
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Tenant Management</h2>
              <p className="text-gray-500">Manage all your tenants, leases, and communications.</p>

              {/* Tenants content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <Users className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Tenant Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  This section would contain a complete tenant management interface.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Calendar & Scheduling</h2>
              <p className="text-gray-500">Manage appointments, lease renewals, and maintenance schedules.</p>

              {/* Calendar content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <Calendar className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Calendar & Scheduling</h3>
                <p className="mt-2 text-sm text-gray-500">
                  This section would contain a complete calendar and scheduling interface.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Analytics & Reporting</h2>
              <p className="text-gray-500">View insights and reports about your properties.</p>

              {/* Analytics content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <BarChart3 className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Analytics & Reporting</h3>
                <p className="mt-2 text-sm text-gray-500">
                  This section would contain a complete analytics and reporting interface.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
              <p className="text-gray-500">Manage your account settings and preferences.</p>

              {/* Settings content would go here */}
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <Settings className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Account Settings</h3>
                <p className="mt-2 text-sm text-gray-500">This section would contain a complete settings interface.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default LandlordDashboard
