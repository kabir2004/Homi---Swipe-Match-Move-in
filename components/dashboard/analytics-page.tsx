"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ArrowUpRight, Building, DollarSign, Users } from "lucide-react"

// Sample data for analytics
const housingData = {
  viewedListings: 42,
  savedListings: 15,
  appliedListings: 5,
  viewsOverTime: [
    { name: "Mon", views: 10 },
    { name: "Tue", views: 15 },
    { name: "Wed", views: 8 },
    { name: "Thu", views: 12 },
    { name: "Fri", views: 18 },
    { name: "Sat", views: 22 },
    { name: "Sun", views: 20 },
  ],
  priceRanges: [
    { name: "$500-$700", value: 12 },
    { name: "$701-$900", value: 25 },
    { name: "$901-$1100", value: 18 },
    { name: "$1101-$1300", value: 8 },
    { name: "$1301+", value: 5 },
  ],
  popularAmenities: [
    { name: "WiFi", value: 38 },
    { name: "Laundry", value: 32 },
    { name: "Parking", value: 28 },
    { name: "Gym", value: 22 },
    { name: "Furnished", value: 18 },
  ],
}

const roommateData = {
  viewedProfiles: 28,
  contactedUsers: 10,
  matchedUsers: 3,
  interactionsOverTime: [
    { name: "Mon", interactions: 5 },
    { name: "Tue", interactions: 8 },
    { name: "Wed", interactions: 12 },
    { name: "Thu", interactions: 15 },
    { name: "Fri", interactions: 10 },
    { name: "Sat", interactions: 8 },
    { name: "Sun", interactions: 12 },
  ],
  compatibilityScores: [
    { name: "90-100%", value: 5 },
    { name: "80-89%", value: 12 },
    { name: "70-79%", value: 18 },
    { name: "60-69%", value: 10 },
    { name: "Below 60%", value: 8 },
  ],
  popularInterests: [
    { name: "Technology", value: 25 },
    { name: "Sports", value: 22 },
    { name: "Music", value: 20 },
    { name: "Reading", value: 15 },
    { name: "Cooking", value: 12 },
  ],
}

const budgetData = {
  monthlyBudget: 1200,
  currentSpending: 950,
  savingsGoal: 200,
  actualSavings: 250,
  spendingCategories: [
    { name: "Rent", value: 650 },
    { name: "Utilities", value: 80 },
    { name: "Groceries", value: 120 },
    { name: "Transportation", value: 50 },
    { name: "Entertainment", value: 50 },
  ],
  spendingOverTime: [
    { name: "Jan", amount: 980 },
    { name: "Feb", amount: 1050 },
    { name: "Mar", amount: 920 },
    { name: "Apr", amount: 1100 },
    { name: "May", amount: 950 },
    { name: "Jun", amount: 900 },
    { name: "Jul", amount: 950 },
  ],
}

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Housing Activity</p>
                <h3 className="text-3xl font-bold mt-1">{housingData.viewedListings}</h3>
                <p className="text-sm text-gray-500 mt-1">Listings viewed</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="ml-1">from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Roommate Matches</p>
                <h3 className="text-3xl font-bold mt-1">{roommateData.matchedUsers}</h3>
                <p className="text-sm text-gray-500 mt-1">Successful matches</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+5%</span>
              <span className="ml-1">from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Budget Status</p>
                <h3 className="text-3xl font-bold mt-1">${budgetData.actualSavings}</h3>
                <p className="text-sm text-gray-500 mt-1">Saved this month</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Spending</span>
                <span>
                  ${budgetData.currentSpending} of ${budgetData.monthlyBudget}
                </span>
              </div>
              <Progress value={(budgetData.currentSpending / budgetData.monthlyBudget) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="housing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="housing">Housing</TabsTrigger>
          <TabsTrigger value="roommates">Roommates</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="housing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Listing Views Over Time</CardTitle>
                <CardDescription>Number of property listings viewed each day</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={housingData.viewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#0088FE" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Range Distribution</CardTitle>
                <CardDescription>Properties viewed by price range</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={housingData.priceRanges}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Popular Amenities</CardTitle>
                <CardDescription>Most requested amenities in viewed properties</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={housingData.popularAmenities}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {housingData.popularAmenities.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col justify-center space-y-2">
                    {housingData.popularAmenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm">
                          {amenity.name}: {amenity.value} listings
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roommates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Roommate Interactions</CardTitle>
                <CardDescription>Daily interactions with potential roommates</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={roommateData.interactionsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="interactions" stroke="#00C49F" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatibility Distribution</CardTitle>
                <CardDescription>Roommate matches by compatibility score</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roommateData.compatibilityScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Popular Interests</CardTitle>
                <CardDescription>Common interests among potential roommates</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roommateData.popularInterests}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {roommateData.popularInterests.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col justify-center space-y-2">
                    {roommateData.popularInterests.map((interest, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm">
                          {interest.name}: {interest.value} matches
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending</CardTitle>
                <CardDescription>Spending trends over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={budgetData.spendingOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#FFBB28" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Current month's expenses by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData.spendingCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {budgetData.spendingCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col justify-center space-y-2">
                    {budgetData.spendingCategories.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm">
                          {category.name}: ${category.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Budget Summary</CardTitle>
                <CardDescription>Current month's budget overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monthly Budget</span>
                      <span>${budgetData.monthlyBudget}</span>
                    </div>
                    <Progress value={100} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Spending</span>
                      <span>
                        ${budgetData.currentSpending} (
                        {((budgetData.currentSpending / budgetData.monthlyBudget) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={(budgetData.currentSpending / budgetData.monthlyBudget) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Savings Goal</span>
                      <span>
                        ${budgetData.savingsGoal} (
                        {((budgetData.savingsGoal / budgetData.monthlyBudget) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress
                      value={(budgetData.savingsGoal / budgetData.monthlyBudget) * 100}
                      className="h-2 bg-gray-200"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Actual Savings</span>
                      <span>
                        ${budgetData.actualSavings} (
                        {((budgetData.actualSavings / budgetData.monthlyBudget) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress
                      value={(budgetData.actualSavings / budgetData.monthlyBudget) * 100}
                      className="h-2 bg-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
