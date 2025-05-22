"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CreditCard, Mail, Upload, Phone } from "lucide-react"

export function LandlordSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    leaseRenewals: true,
    maintenanceRequests: true,
    paymentReceipts: true,
    marketingUpdates: false,
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/landlord-meeting.png" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <CardTitle className="text-lg">Company Information</CardTitle>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Campus Property Management" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Your Position</Label>
                    <Input id="position" defaultValue="Property Manager" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Input id="companyAddress" defaultValue="123 Business Ave, Suite 100" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="University City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" defaultValue="90210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://campuspropertymanagement.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via text message</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Lease Renewals</p>
                    <Switch
                      checked={notifications.leaseRenewals}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, leaseRenewals: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Maintenance Requests</p>
                    <Switch
                      checked={notifications.maintenanceRequests}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, maintenanceRequests: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Payment Receipts</p>
                    <Switch
                      checked={notifications.paymentReceipts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, paymentReceipts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Marketing Updates</p>
                    <Switch
                      checked={notifications.marketingUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingUpdates: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Login Sessions</h3>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-500">Chrome on Windows • IP 192.168.1.1</p>
                        <p className="text-xs text-gray-500">Started 2 hours ago</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-500">Active</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing information and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Professional Plan</p>
                      <p className="text-sm text-gray-500">$49.99/month • Renews on June 15, 2023</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Professional Plan - May 2023</p>
                      <p className="text-sm text-gray-500">May 15, 2023</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">$49.99</span>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Professional Plan - April 2023</p>
                      <p className="text-sm text-gray-500">April 15, 2023</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">$49.99</span>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Professional Plan - March 2023</p>
                      <p className="text-sm text-gray-500">March 15, 2023</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">$49.99</span>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
