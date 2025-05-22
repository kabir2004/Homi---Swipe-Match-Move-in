"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateRoommates, type Roommate } from "@/utils/generate-realistic-data"
import {
  ArrowLeft,
  Share2,
  Star,
  Calendar,
  BookOpen,
  Briefcase,
  User,
  MessageCircle,
  Heart,
  Coffee,
  Music,
  Utensils,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Users,
  DollarSign,
} from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RoommateDetailPage() {
  const [roommate, setRoommate] = useState<Roommate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  useEffect(() => {
    // Simulate fetching roommate data
    const timer = setTimeout(() => {
      const roommates = generateRoommates(50)
      const found = roommates.find((r) => r.id === id) || roommates[0]
      setRoommate(found)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  const handleBack = () => {
    router.back()
  }

  const nextImage = () => {
    if (roommate && currentImageIndex < roommate.images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
    }
  }

  if (isLoading || !roommate) {
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
        <h1 className="text-lg font-semibold">Roommate Profile</h1>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Image gallery */}
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <Image
          src={roommate.images[currentImageIndex] || "/placeholder.svg"}
          alt={roommate.name}
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
            disabled={currentImageIndex === roommate.images.length - 1}
          >
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>

        {/* Image pagination */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {roommate.images.map((_, index) => (
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
          {roommate.matchPercentage}% Match
        </div>
      </div>

      {/* Roommate info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">
              {roommate.name}, {roommate.details.age}
            </h2>
            <div className="flex items-center text-gray-600 mt-1">
              <Briefcase className="w-4 h-4 mr-1" />
              <span>{roommate.details.occupation}</span>
            </div>
          </div>
          <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">{roommate.details.gender}</div>
        </div>

        {/* Key details */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center">
            <BookOpen className="w-6 h-6 text-gray-600 mb-1" />
            <span className="font-semibold">{roommate.university?.program}</span>
            <span className="text-xs text-gray-500">Program</span>
          </div>
          <div className="flex flex-col items-center">
            <User className="w-6 h-6 text-gray-600 mb-1" />
            <span className="font-semibold">Year {roommate.university?.year}</span>
            <span className="text-xs text-gray-500">Student</span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-6 h-6 text-gray-600 mb-1" />
            <span className="font-semibold">{roommate.details.moveInDate.split(" ")[0]}</span>
            <span className="text-xs text-gray-500">Move-in</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {roommate.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full mt-2">
        <TabsList className="w-full">
          <TabsTrigger value="about" className="flex-1">
            About
          </TabsTrigger>
          <TabsTrigger value="interests" className="flex-1">
            Interests
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex-1">
            Lifestyle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="p-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">About Me</h3>
              <p className="text-gray-700 mb-4">{roommate.description}</p>

              <h3 className="font-semibold mb-2">Education</h3>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{roommate.university?.name}</p>
                  <p className="text-sm text-gray-600">
                    {roommate.university?.program}, Year {roommate.university?.year}
                  </p>
                </div>
              </div>

              <h3 className="font-semibold mb-2">Housing Preferences</h3>
              <div className="grid grid-cols-2 gap-y-2">
                {Object.entries(roommate.details).map(([key, value], index) => {
                  if (key !== "age" && key !== "gender" && key !== "occupation") {
                    return (
                      <div key={index} className="flex items-center">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="ml-1 text-gray-600">{value.toString()}</span>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="p-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Interests & Hobbies</h3>
              <div className="grid grid-cols-2 gap-4">
                {roommate.interests.map((interest, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      {index % 5 === 0 ? (
                        <Music className="w-4 h-4 text-blue-600" />
                      ) : index % 5 === 1 ? (
                        <Coffee className="w-4 h-4 text-blue-600" />
                      ) : index % 5 === 2 ? (
                        <Utensils className="w-4 h-4 text-blue-600" />
                      ) : index % 5 === 3 ? (
                        <Heart className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Star className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle" className="p-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Lifestyle Preferences</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Cleanliness</span>
                    <span className="text-sm text-gray-600">
                      {roommate.lifestyle.cleanliness >= 4
                        ? "Very Clean"
                        : roommate.lifestyle.cleanliness >= 3
                          ? "Clean"
                          : roommate.lifestyle.cleanliness >= 2
                            ? "Average"
                            : "Relaxed"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(roommate.lifestyle.cleanliness / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Noise Level</span>
                    <span className="text-sm text-gray-600">
                      {roommate.lifestyle.noise >= 4
                        ? "Loud"
                        : roommate.lifestyle.noise >= 3
                          ? "Moderate"
                          : roommate.lifestyle.noise >= 2
                            ? "Quiet"
                            : "Very Quiet"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(roommate.lifestyle.noise / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Guest Frequency</span>
                    <span className="text-sm text-gray-600">
                      {roommate.lifestyle.guestsFrequency >= 4
                        ? "Very Often"
                        : roommate.lifestyle.guestsFrequency >= 3
                          ? "Often"
                          : roommate.lifestyle.guestsFrequency >= 2
                            ? "Sometimes"
                            : "Rarely"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(roommate.lifestyle.guestsFrequency / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      {roommate.lifestyle.sleepSchedule.includes("Early") ? (
                        <Sun className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Moon className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium">Sleep Schedule</span>
                      <p className="text-xs text-gray-600">{roommate.lifestyle.sleepSchedule}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      {roommate.lifestyle.noise >= 3 ? (
                        <Volume2 className="w-4 h-4 text-blue-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium">Noise Preference</span>
                      <p className="text-xs text-gray-600">
                        {roommate.lifestyle.noise >= 4
                          ? "Loud environment"
                          : roommate.lifestyle.noise >= 3
                            ? "Moderate noise"
                            : roommate.lifestyle.noise >= 2
                              ? "Quiet environment"
                              : "Very quiet"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">Social Preference</span>
                      <p className="text-xs text-gray-600">
                        {roommate.lifestyle.guestsFrequency >= 4
                          ? "Very social"
                          : roommate.lifestyle.guestsFrequency >= 3
                            ? "Social"
                            : roommate.lifestyle.guestsFrequency >= 2
                              ? "Moderately social"
                              : "Private"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium">Budget</span>
                      <p className="text-xs text-gray-600">{roommate.details.Budget}</p>
                    </div>
                  </div>
                </div>
              </div>
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
        <Button className="flex-1">
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
      </div>
    </div>
  )
}
