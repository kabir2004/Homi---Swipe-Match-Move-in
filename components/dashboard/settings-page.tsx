"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Bell, Check, Lock, Save, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileSaved, setProfileSaved] = useState(false)
  const [preferenceSaved, setPreferenceSaved] = useState(false)
  const [notificationSaved, setNotificationSaved] = useState(false)
  const [securitySaved, setSecuritySaved] = useState(false)

  // User profile state
  const [profile, setProfile] = useState({
    firstName: "Demo",
    lastName: "Student",
    email: "demo@student.com",
    phone: "555-123-4567",
    university: "University of Toronto",
    program: "Computer Science",
    year: "3rd Year",
    bio: "I'm a computer science student looking for housing near campus. I enjoy coding, gaming, and hiking on weekends.",
  })

  // Housing preferences state
  const [housingPreferences, setHousingPreferences] = useState({
    budget: "1000",
    roommates: "1-2",
    distance: "Under 1 mile",
    moveInDate: "2023-09-01",
    leaseLength: "12 months",
    furnished: true,
    pets: false,
    parking: true,
    amenities: ["WiFi", "Laundry", "Gym"],
  })

  // Roommate preferences state
  const [roommatePreferences, setRoommatePreferences] = useState({
    cleanliness: "Very clean",
    schedule: "Night owl",
    smoking: "Non-smoker",
    guests: "Occasionally",
    noise: "Quiet",
    sharing: ["Kitchen", "Bathroom"],
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newListings: true,
    messages: true,
    applications: true,
    roommates: true,
    reminders: true,
    marketing: false,
  })

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    dataSharing: false,
  })

  // Handle profile save
  const handleProfileSave = () => {
    // In a real app, this would send the data to the server
    console.log("Saving profile:", profile)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  // Handle preferences save
  const handlePreferencesSave = () => {
    // In a real app, this would send the data to the server
    console.log("Saving preferences:", { housing: housingPreferences, roommate: roommatePreferences })
    setPreferenceSaved(true)
    setTimeout(() => setPreferenceSaved(false), 3000)
  }

  // Handle notification settings save
  const handleNotificationsSave = () => {
    // In a real app, this would send the data to the server
    console.log("Saving notification settings:", notifications)
    setNotificationSaved(true)
    setTimeout(() => setNotificationSaved(false), 3000)
  }

  // Handle security settings save
  const handleSecuritySave = () => {
    // In a real app, this would send the data to the server
    console.log("Saving security settings:", security)
    setSecuritySaved(true)
    setTimeout(() => setSecuritySaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <Badge variant="outline">Student Account</Badge>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          {profileSaved && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your profile has been updated successfully.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt={`${profile.firstName} ${profile.lastName}`}
                    />
                    <AvatarFallback>
                      {profile.firstName.charAt(0)}
                      {profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Update your university details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Select
                    value={profile.university}
                    onValueChange={(value) => setProfile({ ...profile, university: value })}
                  >
                    <SelectTrigger id="university">
                      <SelectValue placeholder="Select university" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="University of Toronto">University of Toronto</SelectItem>
                      <SelectItem value="York University">York University</SelectItem>
                      <SelectItem value="Ryerson University">Ryerson University</SelectItem>
                      <SelectItem value="McMaster University">McMaster University</SelectItem>
                      <SelectItem value="Western University">Western University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    value={profile.program}
                    onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={profile.year} onValueChange={(value) => setProfile({ ...profile, year: value })}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-500">This will be visible to potential roommates and landlords.</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleProfileSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          {preferenceSaved && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your preferences have been updated successfully.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Housing Preferences</CardTitle>
              <CardDescription>Set your housing search criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget</Label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <Input
                      id="budget"
                      type="number"
                      value={housingPreferences.budget}
                      onChange={(e) => setHousingPreferences({ ...housingPreferences, budget: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roommates">Preferred Roommates</Label>
                  <Select
                    value={housingPreferences.roommates}
                    onValueChange={(value) => setHousingPreferences({ ...housingPreferences, roommates: value })}
                  >
                    <SelectTrigger id="roommates">
                      <SelectValue placeholder="Select number of roommates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No roommates</SelectItem>
                      <SelectItem value="1">1 roommate</SelectItem>
                      <SelectItem value="1-2">1-2 roommates</SelectItem>
                      <SelectItem value="2+">2+ roommates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance from Campus</Label>
                  <Select
                    value={housingPreferences.distance}
                    onValueChange={(value) => setHousingPreferences({ ...housingPreferences, distance: value })}
                  >
                    <SelectTrigger id="distance">
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On campus">On campus</SelectItem>
                      <SelectItem value="Under 1 mile">Under 1 mile</SelectItem>
                      <SelectItem value="1-3 miles">1-3 miles</SelectItem>
                      <SelectItem value="3-5 miles">3-5 miles</SelectItem>
                      <SelectItem value="5+ miles">5+ miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveInDate">Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={housingPreferences.moveInDate}
                    onChange={(e) => setHousingPreferences({ ...housingPreferences, moveInDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaseLength">Lease Length</Label>
                  <Select
                    value={housingPreferences.leaseLength}
                    onValueChange={(value) => setHousingPreferences({ ...housingPreferences, leaseLength: value })}
                  >
                    <SelectTrigger id="leaseLength">
                      <SelectValue placeholder="Select lease length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Month-to-month">Month-to-month</SelectItem>
                      <SelectItem value="4 months">4 months</SelectItem>
                      <SelectItem value="8 months">8 months</SelectItem>
                      <SelectItem value="12 months">12 months</SelectItem>
                      <SelectItem value="16 months">16 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities & Features</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="furnished"
                      checked={housingPreferences.furnished}
                      onCheckedChange={(checked) =>
                        setHousingPreferences({ ...housingPreferences, furnished: checked })
                      }
                    />
                    <Label htmlFor="furnished">Furnished</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pets"
                      checked={housingPreferences.pets}
                      onCheckedChange={(checked) => setHousingPreferences({ ...housingPreferences, pets: checked })}
                    />
                    <Label htmlFor="pets">Pet Friendly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="parking"
                      checked={housingPreferences.parking}
                      onCheckedChange={(checked) => setHousingPreferences({ ...housingPreferences, parking: checked })}
                    />
                    <Label htmlFor="parking">Parking</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Roommate Preferences</CardTitle>
              <CardDescription>Set your ideal roommate criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cleanliness">Cleanliness Level</Label>
                  <Select
                    value={roommatePreferences.cleanliness}
                    onValueChange={(value) => setRoommatePreferences({ ...roommatePreferences, cleanliness: value })}
                  >
                    <SelectTrigger id="cleanliness">
                      <SelectValue placeholder="Select cleanliness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Very clean">Very clean</SelectItem>
                      <SelectItem value="Clean">Clean</SelectItem>
                      <SelectItem value="Average">Average</SelectItem>
                      <SelectItem value="Relaxed">Relaxed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Select
                    value={roommatePreferences.schedule}
                    onValueChange={(value) => setRoommatePreferences({ ...roommatePreferences, schedule: value })}
                  >
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Select schedule preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Early bird">Early bird</SelectItem>
                      <SelectItem value="Night owl">Night owl</SelectItem>
                      <SelectItem value="Regular hours">Regular hours</SelectItem>
                      <SelectItem value="Varies">Varies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smoking">Smoking</Label>
                  <Select
                    value={roommatePreferences.smoking}
                    onValueChange={(value) => setRoommatePreferences({ ...roommatePreferences, smoking: value })}
                  >
                    <SelectTrigger id="smoking">
                      <SelectValue placeholder="Select smoking preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Non-smoker">Non-smoker</SelectItem>
                      <SelectItem value="Outside only">Outside only</SelectItem>
                      <SelectItem value="Smoker">Smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Guests</Label>
                  <Select
                    value={roommatePreferences.guests}
                    onValueChange={(value) => setRoommatePreferences({ ...roommatePreferences, guests: value })}
                  >
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select guest preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rarely">Rarely</SelectItem>
                      <SelectItem value="Occasionally">Occasionally</SelectItem>
                      <SelectItem value="Frequently">Frequently</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noise">Noise Level</Label>
                  <Select
                    value={roommatePreferences.noise}
                    onValueChange={(value) => setRoommatePreferences({ ...roommatePreferences, noise: value })}
                  >
                    <SelectTrigger id="noise">
                      <SelectValue placeholder="Select noise preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Very quiet">Very quiet</SelectItem>
                      <SelectItem value="Quiet">Quiet</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Lively">Lively</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handlePreferencesSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {notificationSaved && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your notification settings have been updated successfully.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="emailNotifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pushNotifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="smsNotifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notification Types</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="newListings"
                      checked={notifications.newListings}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newListings: checked })}
                    />
                    <div>
                      <Label htmlFor="newListings">New Listings</Label>
                      <p className="text-xs text-gray-500">Get notified when new properties match your criteria</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="messages"
                      checked={notifications.messages}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
                    />
                    <div>
                      <Label htmlFor="messages">Messages</Label>
                      <p className="text-xs text-gray-500">Get notified when you receive new messages</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="applications"
                      checked={notifications.applications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, applications: checked })}
                    />
                    <div>
                      <Label htmlFor="applications">Applications</Label>
                      <p className="text-xs text-gray-500">Get notified about application status changes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="roommates"
                      checked={notifications.roommates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, roommates: checked })}
                    />
                    <div>
                      <Label htmlFor="roommates">Roommate Matches</Label>
                      <p className="text-xs text-gray-500">Get notified about new roommate matches</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reminders"
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
                    />
                    <div>
                      <Label htmlFor="reminders">Reminders</Label>
                      <p className="text-xs text-gray-500">Get reminders about upcoming deadlines and events</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="marketing"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    />
                    <div>
                      <Label htmlFor="marketing">Marketing</Label>
                      <p className="text-xs text-gray-500">Receive promotional offers and updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNotificationsSave}>
                <Bell className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          {securitySaved && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your security settings have been updated successfully.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Login Alerts</h3>
                    <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                  </div>
                  <Switch
                    id="loginAlerts"
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Connected Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">University Account</h4>
                        <p className="text-sm text-gray-500">Connected to your university email</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Sharing</h4>
                      <p className="text-sm text-gray-500">Allow us to share anonymized data to improve our services</p>
                    </div>
                    <Switch
                      id="dataSharing"
                      checked={security.dataSharing}
                      onCheckedChange={(checked) => setSecurity({ ...security, dataSharing: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="destructive">Delete Account</Button>
              <Button onClick={handleSecuritySave}>
                <Lock className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Deleting your account is permanent and cannot be undone. All your data will be permanently removed.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
