"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateRoommates, type Roommate } from "@/utils/generate-realistic-data"
import { ArrowLeft, User2, School, MessageCircle } from "lucide-react"
import Image from "next/image"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RoommateMatchesPage() {
  const [matches, setMatches] = useState<Roommate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate fetching matches
    const timer = setTimeout(() => {
      const allRoommates = generateRoommates(50)
      // Get top matches (highest match percentage)
      const topMatches = [...allRoommates].sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 10)
      setMatches(topMatches)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleViewRoommate = (id: string) => {
    router.push(`/roommates/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Finding Your Matches</h2>
            <p className="text-gray-600">We're finding the best roommate matches based on your preferences...</p>
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
        <h1 className="text-lg font-semibold">Your Roommate Matches</h1>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <User2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold">Top Roommate Matches</h2>
            <p className="text-sm text-gray-600">Based on your preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          {matches.map((roommate) => (
            <Card key={roommate.id} className="overflow-hidden">
              <div className="flex">
                <div className="relative w-1/3 h-32">
                  <Image
                    src={roommate.images[0] || "/placeholder.svg"}
                    alt={roommate.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4 w-2/3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold">{roommate.name}</h3>
                    <Badge className="bg-green-100 text-green-700 border-0">{roommate.matchPercentage}%</Badge>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <School className="w-3 h-3 mr-1" />
                    <span>{roommate.university?.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{roommate.description.split(".")[0]}.</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {roommate.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {roommate.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{roommate.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewRoommate(roommate.id)}
                    >
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => router.push("/swipe?type=roommate")} className="w-full">
            Find More Roommates
          </Button>
        </div>
      </div>
    </div>
  )
}
