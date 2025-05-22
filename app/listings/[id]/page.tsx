"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateListings, type Listing } from "@/utils/generate-realistic-data"
import { ArrowLeft, Heart, MessageCircle, Share2, Star, MapPin, Maximize, BedDouble, Bath, Check } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ListingDetailPage() {
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  useEffect(() => {
    // Simulate fetching listing data
    const timer = setTimeout(() => {
      const listings = generateListings(50)
      const found = listings.find((l) => l.id === id) || listings[0]
      setListing(found)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  const handleBack = () => {
    router.back()
  }

  const nextImage = () => {
    if (listing && currentImageIndex < listing.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
    }
  }

  if (isLoading || !listing) {
    return (
      <div className="h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Listing Details</h1>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Image gallery */}
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <Image
          src={listing.images[currentImageIndex] || "/placeholder.svg"}
          alt={listing.name}
          fill
          className="object-cover"
        />

        {/* Image navigation */}
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/30 text-white"
            onClick={prevImage}
            disabled={currentImageIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/30 text-white"
            onClick={nextImage}
            disabled={currentImageIndex === listing.images.length - 1}
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>

        {/* Image pagination */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {listing.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index ? "bg-white w-6" : "bg-white/60"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Match percentage */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2.5 py-1 text-sm font-semibold text-green-600 flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {listing.matchPercentage}% Match
        </div>
      </div>

      {/* Listing info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{listing.name}</h2>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {listing.location.address}, {listing.location.city}
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">{listing.details.price}</div>
        </div>

        {/* Key details */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center">
            <BedDouble className="w-6 h-6 text-gray-600 mb-1" />
            <span className="font-semibold">{listing.details.bedrooms}</span>
            <span className="text-xs text-gray-500">Bedrooms</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-6 h-6 text-gray-600 mb-1" />
            <span className="font-semibold">{listing.details.bathrooms}</span>
            <span className="text-xs text-gray-500">Bathrooms</span>
          </div>
          <div className="flex flex-col items-center">
            <Maximize className="w-6 h-6 text-gray-600 mb-1" />
            <span className="font-semibold">{listing.details.sqft}</span>
            <span className="text-xs text-gray-500">Sq Ft</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {listing.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full mt-2">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">
            Details
          </TabsTrigger>
          <TabsTrigger value="amenities" className="flex-1">
            Amenities
          </TabsTrigger>
          <TabsTrigger value="landlord" className="flex-1">
            Landlord
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="p-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{listing.description}</p>

              <h3 className="font-semibold mb-2">Property Details</h3>
              <div className="grid grid-cols-2 gap-y-2">
                {Object.entries(listing.details).map(([key, value], index) => (
                  <div key={index} className="flex items-center">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="ml-1 text-gray-600">{value.toString()}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mt-4 mb-2">Location</h3>
              <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-400 mr-2" />
                <span className="text-gray-500">Map view</span>
              </div>
              <p className="text-gray-700 mt-2">{listing.location.distance}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="p-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="landlord" className="p-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  {listing.landlord.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{listing.landlord.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>
                      {listing.landlord.rating} · {listing.landlord.responseRate} response rate
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-2">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Landlord
              </Button>

              <p className="text-gray-600 text-sm mt-2">Usually responds within 24 hours</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
        <Button variant="outline" className="flex-1">
          <Heart className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button className="flex-1">Apply Now</Button>
      </div>
    </div>
  )
}
