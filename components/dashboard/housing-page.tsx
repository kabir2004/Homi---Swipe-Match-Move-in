"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Check, Heart, MapPin, X } from "lucide-react"
import Image from "next/image"

// Sample housing data
const housingListings = [
  {
    id: 1,
    title: "Modern Studio Near Campus",
    description: "Bright studio apartment with full kitchen, 5 min walk to campus",
    price: 1200,
    image: "/cozy-student-studio.png",
    location: "123 University Ave",
    distance: "0.5 miles from campus",
    amenities: ["WiFi", "Laundry", "Parking"],
    available: "Aug 1, 2023",
    saved: false,
    applied: false,
  },
  {
    id: 2,
    title: "Shared 3BR Apartment",
    description: "Spacious 3 bedroom apartment with 2 bathrooms, perfect for roommates",
    price: 800,
    image: "/campus-commons.png",
    location: "456 College St",
    distance: "1.2 miles from campus",
    amenities: ["WiFi", "Gym", "Pool", "Laundry"],
    available: "Sep 1, 2023",
    saved: false,
    applied: false,
  },
  {
    id: 3,
    title: "Luxury Student Housing",
    description: "Brand new luxury student housing with all amenities included",
    price: 1500,
    image: "/urban-glass-facade.png",
    location: "789 Graduate Blvd",
    distance: "0.8 miles from campus",
    amenities: ["WiFi", "Gym", "Pool", "Study Rooms", "Game Room"],
    available: "Aug 15, 2023",
    saved: false,
    applied: false,
  },
]

export function HousingPage() {
  const [listings, setListings] = useState(housingListings)
  const [activeTab, setActiveTab] = useState("browse")
  const [priceRange, setPriceRange] = useState([500, 2000])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    wifi: true,
    laundry: false,
    parking: false,
    gym: false,
    furnished: false,
  })

  // Toggle saved status
  const toggleSaved = (id: number) => {
    setListings(listings.map((listing) => (listing.id === id ? { ...listing, saved: !listing.saved } : listing)))
  }

  // Toggle applied status
  const toggleApplied = (id: number) => {
    setListings(listings.map((listing) => (listing.id === id ? { ...listing, applied: !listing.applied } : listing)))
  }

  // Filter listings based on search and filters
  const filteredListings = listings.filter((listing) => {
    // Search term filter
    if (
      searchTerm &&
      !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Price range filter
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Get saved listings
  const savedListings = listings.filter((listing) => listing.saved)

  // Get applied listings
  const appliedListings = listings.filter((listing) => listing.applied)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input
                      id="search"
                      placeholder="Search listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      defaultValue={[500, 2000]}
                      min={500}
                      max={2000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="wifi"
                          checked={filters.wifi}
                          onCheckedChange={(checked) => setFilters({ ...filters, wifi: checked })}
                        />
                        <Label htmlFor="wifi">WiFi</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="laundry"
                          checked={filters.laundry}
                          onCheckedChange={(checked) => setFilters({ ...filters, laundry: checked })}
                        />
                        <Label htmlFor="laundry">Laundry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="parking"
                          checked={filters.parking}
                          onCheckedChange={(checked) => setFilters({ ...filters, parking: checked })}
                        />
                        <Label htmlFor="parking">Parking</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="gym"
                          checked={filters.gym}
                          onCheckedChange={(checked) => setFilters({ ...filters, gym: checked })}
                        />
                        <Label htmlFor="gym">Gym</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="furnished"
                          checked={filters.furnished}
                          onCheckedChange={(checked) => setFilters({ ...filters, furnished: checked })}
                        />
                        <Label htmlFor="furnished">Furnished</Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setPriceRange([500, 2000])
                      setFilters({
                        wifi: false,
                        laundry: false,
                        parking: false,
                        gym: false,
                        furnished: false,
                      })
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-3/4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white rounded-full"
                        onClick={() => toggleSaved(listing.id)}
                      >
                        <Heart className={`h-5 w-5 ${listing.saved ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                      </Button>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{listing.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                          </CardDescription>
                        </div>
                        <Badge>${listing.price}/mo</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-2">{listing.description}</p>
                      <p className="text-sm text-gray-500 mb-2">{listing.distance}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {listing.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-gray-500">Available: {listing.available}</p>
                      <Button
                        variant={listing.applied ? "outline" : "default"}
                        onClick={() => toggleApplied(listing.id)}
                      >
                        {listing.applied ? (
                          <>
                            <Check className="h-4 w-4 mr-2" /> Applied
                          </>
                        ) : (
                          "Apply Now"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredListings.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">No listings match your search criteria.</p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setPriceRange([500, 2000])
                    }}
                  >
                    Reset Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white rounded-full"
                      onClick={() => toggleSaved(listing.id)}
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{listing.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                        </CardDescription>
                      </div>
                      <Badge>${listing.price}/mo</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">{listing.description}</p>
                    <p className="text-sm text-gray-500 mb-2">{listing.distance}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {listing.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">Available: {listing.available}</p>
                    <Button variant={listing.applied ? "outline" : "default"} onClick={() => toggleApplied(listing.id)}>
                      {listing.applied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" /> Applied
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">You haven't saved any listings yet.</p>
              <Button className="mt-4" onClick={() => setActiveTab("browse")}>
                Browse Listings
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          {appliedListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appliedListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Applied
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{listing.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                        </CardDescription>
                      </div>
                      <Badge>${listing.price}/mo</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">{listing.description}</p>
                    <p className="text-sm text-gray-500 mb-2">{listing.distance}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {listing.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-gray-500">Available: {listing.available}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => toggleSaved(listing.id)}>
                        {listing.saved ? (
                          <>
                            <Heart className="h-4 w-4 mr-2 fill-red-500 text-red-500" /> Saved
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4 mr-2" /> Save
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => toggleApplied(listing.id)}>
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">You haven't applied to any listings yet.</p>
              <Button className="mt-4" onClick={() => setActiveTab("browse")}>
                Browse Listings
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
