"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateListings, type Listing } from "@/utils/generate-realistic-data"
import { ArrowLeft, Heart, Home, MapPin, DollarSign, BedDouble, Bath } from "lucide-react"
import Image from "next/image"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ListingMatchesPage() {
  const [matches, setMatches] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate fetching matches
    const timer = setTimeout(() => {
      const allListings = generateListings(50)
      // Get top matches (highest match percentage)
      const topMatches = [...allListings].sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 10)
      setMatches(topMatches)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleViewListing = (id: string) => {
    router.push(`/listings/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Finding Your Matches</h2>
            <p className="text-gray-600">We're finding the best housing matches based on your preferences...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Your Housing Matches</h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Home className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold">Top Housing Matches</h2>
            <p className="text-sm text-gray-600">Based on your preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          {matches.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-semibold text-green-600 flex items-center">
                  <Heart className="w-3 h-3 fill-green-600 text-green-600 mr-1" />
                  {listing.matchPercentage}% Match
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{listing.name}</h3>
                  <span className="font-bold text-primary">{listing.details.price}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>
                    {listing.location.address}, {listing.location.city}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <BedDouble className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm">{listing.details.bedrooms} BR</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm">{listing.details.bathrooms} BA</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm">{listing.details.price.replace("/month", "")}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {listing.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {listing.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{listing.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <Button className="w-full" onClick={() => handleViewListing(listing.id)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => router.push("/swipe?type=listing")} className="w-full">
            Find More Listings
          </Button>
        </div>
      </div>
    </div>
  )
}
