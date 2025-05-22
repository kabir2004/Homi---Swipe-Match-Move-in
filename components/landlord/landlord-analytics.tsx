"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

// Sample data for analytics
const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 12500, expenses: 3200, profit: 9300 },
  { month: "Feb", revenue: 12500, expenses: 3400, profit: 9100 },
  { month: "Mar", revenue: 12500, expenses: 2900, profit: 9600 },
  { month: "Apr", revenue: 12800, expenses: 3100, profit: 9700 },
  { month: "May", revenue: 13200, expenses: 3500, profit: 9700 },
  { month: "Jun", revenue: 13500, expenses: 3800, profit: 9700 },
  { month: "Jul", revenue: 13500, expenses: 3300, profit: 10200 },
  { month: "Aug", revenue: 13800, expenses: 3600, profit: 10200 },
  { month: "Sep", revenue: 14000, expenses: 3400, profit: 10600 },
  { month: "Oct", revenue: 14000, expenses: 3700, profit: 10300 },
  { month: "Nov", revenue: 14000, expenses: 3500, profit: 10500 },
  { month: "Dec", revenue: 14000, expenses: 3900, profit: 10100 },
]

const OCCUPANCY_DATA = [
  { month: "Jan", occupancy: 92 },
  { month: "Feb", occupancy: 94 },
  { month: "Mar", occupancy: 96 },
  { month: "Apr", occupancy: 98 },
  { month: "May", occupancy: 100 },
  { month: "Jun", occupancy: 100 },
  { month: "Jul", occupancy: 100 },
  { month: "Aug", occupancy: 100 },
  { month: "Sep", occupancy: 98 },
  { month: "Oct", occupancy: 96 },
  { month: "Nov", occupancy: 94 },
  { month: "Dec", occupancy: 92 },
]

const PROPERTY_PERFORMANCE = [
  { name: "123 College St", revenue: 5200, occupancy: 100, maintenance: 800, rating: 4.8 },
  { name: "456 University Ave", revenue: 4800, occupancy: 95, maintenance: 1200, rating: 4.5 },
  { name: "789 Campus Dr", revenue: 3500, occupancy: 90, maintenance: 900, rating: 4.2 },
  { name: "101 Dorm Lane", revenue: 2500, occupancy: 85, maintenance: 600, rating: 4.0 },
]

const TENANT_DEMOGRAPHICS = [
  { name: "Undergraduate", value: 65 },
  { name: "Graduate", value: 20 },
  { name: "Faculty", value: 10 },
  { name: "Other", value: 5 },
]

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#6b7280"]

const MAINTENANCE_REQUESTS = [
  { month: "Jan", requests: 8, resolved: 7 },
  { month: "Feb", requests: 6, resolved: 6 },
  { month: "Mar", requests: 10, resolved: 9 },
  { month: "Apr", requests: 7, resolved: 7 },
  { month: "May", requests: 9, resolved: 8 },
  { month: "Jun", requests: 12, resolved: 10 },
  { month: "Jul", requests: 8, resolved: 8 },
  { month: "Aug", requests: 11, resolved: 9 },
  { month: "Sep", requests: 9, resolved: 9 },
  { month: "Oct", requests: 7, resolved: 6 },
  { month: "Nov", requests: 8, resolved: 7 },
  { month: "Dec", requests: 10, resolved: 8 },
]

export function LandlordAnalytics() {
  const [timeframe, setTimeframe] = useState("yearly")
  const [activeTab, setActiveTab] = useState("financial")

  // Calculate summary metrics
  const totalRevenue = MONTHLY_REVENUE.reduce((sum, month) => sum + month.revenue, 0)
  const totalProfit = MONTHLY_REVENUE.reduce((sum, month) => sum + month.profit, 0)
  const averageOccupancy = OCCUPANCY_DATA.reduce((sum, month) => sum + month.occupancy, 0) / OCCUPANCY_DATA.length
  const totalMaintenanceRequests = MAINTENANCE_REQUESTS.reduce((sum, month) => sum + month.requests, 0)
  const resolvedMaintenanceRequests = MAINTENANCE_REQUESTS.reduce((sum, month) => sum + month.resolved, 0)
  const maintenanceResolutionRate = Math.round((resolvedMaintenanceRequests / totalMaintenanceRequests) * 100)

  const handleDownload = () => {
    // Implement download functionality here
    console.log("Download analytics data")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Property Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleDownload}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+8% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
            <p className="text-xs text-green-600">+5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageOccupancy.toFixed(1)}%</div>
            <p className="text-xs text-green-600">+2% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Maintenance Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceResolutionRate}%</div>
            <p className="text-xs text-amber-600">-2% from last year</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Expenses</CardTitle>
              <CardDescription>Monthly breakdown of revenue, expenses, and profit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_REVENUE} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                    <Bar dataKey="profit" name="Profit" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
                <CardDescription>Monthly occupancy percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={OCCUPANCY_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="occupancy"
                        name="Occupancy Rate"
                        stroke="#4f46e5"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tenant Demographics</CardTitle>
                <CardDescription>Breakdown of tenant types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={TENANT_DEMOGRAPHICS}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {TENANT_DEMOGRAPHICS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
              <CardDescription>Comparison of key metrics across properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={PROPERTY_PERFORMANCE}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Monthly Revenue ($100s)" fill="#4f46e5" />
                    <Bar dataKey="occupancy" name="Occupancy (%)" fill="#10b981" />
                    <Bar dataKey="maintenance" name="Maintenance Cost ($100s)" fill="#f59e0b" />
                    <Bar dataKey="rating" name="Tenant Rating (out of 5)" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>Monthly maintenance requests and resolution rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MAINTENANCE_REQUESTS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="requests" name="Total Requests" fill="#f59e0b" />
                    <Bar dataKey="resolved" name="Resolved Requests" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
