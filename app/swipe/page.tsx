"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { SwipeCard } from "@/components/swipe-card"
import type { Listing, Roommate } from "@/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, User2, RefreshCw, Loader2, Heart, X, Filter, MapPin, School } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { generateListings, generateRoommates, calculateMatchRatio } from "@/utils/generate-data"

export default function SwipePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"listings" | "roommates">("listings")
  const [listings, setListings] = useState<Listing[]>([])
  const [roommates, setRoommates] = useState<Roommate[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [detailItem, setDetailItem] = useState<Listing | Roommate | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [university, setUniversity] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [matchRatio, setMatchRatio] = useState<string>("0/0 (0%)")
  const [totalSwipes, setTotalSwipes] = useState<number>(0)
  const [likedItems, setLikedItems] = useState<number>(0)

  useEffect(() => {
    fetchItems()
  }, [activeTab, university, priceRange])

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      // Generate 50 listings and 50 roommates instead of fetching from Supabase
      if (activeTab === "listings") {
        const generatedListings = generateListings(50)

        // Apply filters
        let filteredListings = [...generatedListings]

        if (university) {
          filteredListings = filteredListings.filter(
            (listing) =>
              listing.match_tags.some((tag) => tag.toLowerCase().includes(university.toLowerCase())) ||
              Object.keys(listing.university_distance || {}).some((uni) =>
                uni.toLowerCase().includes(university.toLowerCase()),
              ),
          )
        }

        if (priceRange[0] > 0 || priceRange[1] < 3000) {
          filteredListings = filteredListings.filter(
            (listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1],
          )
        }

        // Sort by created_at
        filteredListings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        setListings(filteredListings)
      } else {
        const generatedRoommates = generateRoommates(50)

        // Apply filters
        let filteredRoommates = [...generatedRoommates]

        if (university) {
          filteredRoommates = filteredRoommates.filter((roommate) =>
            roommate.university?.toLowerCase().includes(university.toLowerCase()),
          )
        }

        // Sort by match_score
        filteredRoommates.sort((a, b) => b.match_score - a.match_score)

        setRoommates(filteredRoommates)
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error)
    } finally {
      setIsLoading(false)
      setCurrentIndex(0)
      updateMatchRatio(0)
    }
  }

  const updateMatchRatio = (index: number) => {
    const totalItems = activeTab === "listings" ? listings.length : roommates.length
    setMatchRatio(calculateMatchRatio(index, totalItems))
  }

  const handleSwipe = async (direction: "like" | "dislike", id: string) => {
    try {
      // Update swipe statistics
      setTotalSwipes((prev) => prev + 1)
      if (direction === "like") {
        setLikedItems((prev) => prev + 1)
      }

      // Move to the next item after a short delay
      setTimeout(() => {
        if (activeTab === "listings" && currentIndex < listings.length - 1) {
          const newIndex = currentIndex + 1
          setCurrentIndex(newIndex)
          updateMatchRatio(newIndex)
        } else if (activeTab === "roommates" && currentIndex < roommates.length - 1) {
          const newIndex = currentIndex + 1
          setCurrentIndex(newIndex)
          updateMatchRatio(newIndex)
        } else {
          // No more items to swipe
          setCurrentIndex(-1)
        }
      }, 300)
    } catch (error) {
      console.error("Error saving swipe:", error)
    }
  }

  const handleInfo = (id: string) => {
    const items = activeTab === "listings" ? listings : roommates
    const item = items.find((item) => item.id === id)
    if (item) {
      setDetailItem(item)
      setShowDetail(true)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as "listings" | "roommates")
    setCurrentIndex(0)
    setTotalSwipes(0)
    setLikedItems(0)
  }

  const resetCards = () => {
    setCurrentIndex(0)
    setTotalSwipes(0)
    setLikedItems(0)
    updateMatchRatio(0)
  }

  const currentItems = activeTab === "listings" ? listings : roommates
  const hasItems = currentItems.length > 0 && currentIndex >= 0 && currentIndex < currentItems.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <Tabs defaultValue="listings" onValueChange={handleTabChange}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid grid-cols-2 bg-white shadow-sm rounded-xl">
                <TabsTrigger
                  value="listings"
                  className="flex items-center gap-2 data-[state=active]:bg-primary-50 data-[state=active]:text-primary rounded-l-xl"
                >
                  <Home className="h-4 w-4" />
                  Listings
                </TabsTrigger>
                <TabsTrigger
                  value="roommates"
                  className="flex items-center gap-2 data-[state=active]:bg-primary-50 data-[state=active]:text-primary rounded-r-xl"
                >
                  <User2 className="h-4 w-4" />
                  Roommates
                </TabsTrigger>
              </TabsList>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setUniversity(null)}>All Universities</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUniversity("University of Toronto")}>
                    University of Toronto
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUniversity("Western University")}>
                    Western University
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUniversity("McMaster University")}>
                    McMaster University
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUniversity("Queen's University")}>
                    Queen's University
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUniversity("University of Waterloo")}>
                    University of Waterloo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUniversity("Wilfrid Laurier University")}>
                    Wilfrid Laurier University
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Match ratio display */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Progress:</span> {matchRatio}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Liked:</span> {likedItems}/{totalSwipes} (
                {totalSwipes > 0 ? Math.round((likedItems / totalSwipes) * 100) : 0}%)
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[600px]"
                >
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-gray-600">Loading {activeTab}...</p>
                </motion.div>
              ) : (
                <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <TabsContent value="listings" className="mt-0">
                    <div className="relative h-[600px] w-full">
                      {hasItems && activeTab === "listings" ? (
                        <SwipeCard
                          item={listings[currentIndex]}
                          type="listing"
                          onSwipe={handleSwipe}
                          onInfo={handleInfo}
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center h-full bg-white rounded-2xl p-8 text-center shadow-sm"
                        >
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Home className="h-10 w-10 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-bold mb-4">No More Listings</h3>
                          <p className="text-gray-600 mb-6">
                            {university
                              ? `No more listings near ${university} match your criteria.`
                              : "You've gone through all available listings. Check back later for more options."}
                          </p>
                          <Button onClick={resetCards} className="bg-primary hover:bg-primary-600 text-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Start Over
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="roommates" className="mt-0">
                    <div className="relative h-[600px] w-full">
                      {hasItems && activeTab === "roommates" ? (
                        <SwipeCard
                          item={roommates[currentIndex]}
                          type="roommate"
                          onSwipe={handleSwipe}
                          onInfo={handleInfo}
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center justify-center h-full bg-white rounded-2xl p-8 text-center shadow-sm"
                        >
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <User2 className="h-10 w-10 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-bold mb-4">No More Roommates</h3>
                          <p className="text-gray-600 mb-6">
                            {university
                              ? `No more potential roommates at ${university} match your criteria.`
                              : "You've gone through all potential roommates. Check back later for more matches."}
                          </p>
                          <Button onClick={resetCards} className="bg-primary hover:bg-primary-600 text-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Start Over
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {detailItem && (activeTab === "listings" ? (detailItem as Listing).title : (detailItem as Roommate).name)}
            </DialogTitle>
            {detailItem && activeTab === "listings" && (
              <DialogDescription className="flex items-center text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {(detailItem as Listing).location}
              </DialogDescription>
            )}
            {detailItem && activeTab === "roommates" && (detailItem as Roommate).university && (
              <DialogDescription className="flex items-center text-gray-500">
                <School className="h-3 w-3 mr-1" />
                {(detailItem as Roommate).university}
              </DialogDescription>
            )}
          </DialogHeader>

          {detailItem && (
            <div className="space-y-4">
              <div className="relative w-full h-64 rounded-md overflow-hidden">
                <Image
                  src={activeTab === "listings" ? (detailItem as Listing).photos[0] : (detailItem as Roommate).photo}
                  alt={activeTab === "listings" ? (detailItem as Listing).title : (detailItem as Roommate).name}
                  fill
                  className="object-cover"
                />
              </div>

              {activeTab === "listings" ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${(detailItem as Listing).price}/month</span>
                    <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                      {(detailItem as Listing).features.bedrooms === 0
                        ? "Studio"
                        : `${(detailItem as Listing).features.bedrooms} BR`}
                    </Badge>
                  </div>

                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {(detailItem as Listing).location}
                  </p>

                  {(detailItem as Listing).university_distance &&
                    Object.keys((detailItem as Listing).university_distance).length > 0 && (
                      <div className="text-gray-600">
                        <span className="font-medium">Distance to campus:</span>
                        <ul className="list-disc pl-5 mt-1">
                          {Object.entries((detailItem as Listing).university_distance).map(([uni, distance]) => (
                            <li key={uni}>
                              {distance} km to {uni}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div>
                    <h4 className="font-medium mb-2">Features:</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>{(detailItem as Listing).features.bedrooms} Bedroom(s)</li>
                      <li>{(detailItem as Listing).features.bathrooms} Bathroom(s)</li>
                      <li>{(detailItem as Listing).features.square_feet} sq ft</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(detailItem as Listing).features.amenities.map((amenity) => (
                        <Badge key={amenity} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(detailItem as Listing).description && (
                    <div>
                      <h4 className="font-medium mb-2">Description:</h4>
                      <p className="text-gray-600">{(detailItem as Listing).description}</p>
                    </div>
                  )}

                  {(detailItem as Listing).neighborhood && (
                    <div>
                      <h4 className="font-medium mb-2">Neighborhood:</h4>
                      <p className="text-gray-600">{(detailItem as Listing).neighborhood}</p>
                    </div>
                  )}

                  {(detailItem as Listing).transit_options && (detailItem as Listing).transit_options.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Transit Options:</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        {(detailItem as Listing).transit_options.map((option, index) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Match Score:</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        (detailItem as Roommate).match_score > 80
                          ? "bg-green-100 text-green-700 border-green-200"
                          : (detailItem as Roommate).match_score > 60
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200",
                      )}
                    >
                      {(detailItem as Roommate).match_score}%
                    </Badge>
                  </div>

                  {(detailItem as Roommate).university && (
                    <div>
                      <h4 className="font-medium mb-1">University:</h4>
                      <p className="text-gray-600">{(detailItem as Roommate).university}</p>
                    </div>
                  )}

                  {(detailItem as Roommate).program && (
                    <div>
                      <h4 className="font-medium mb-1">Program:</h4>
                      <p className="text-gray-600">
                        {(detailItem as Roommate).program}, Year {(detailItem as Roommate).year}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">About:</h4>
                    <p className="text-gray-600">{(detailItem as Roommate).intro_bio}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(detailItem as Roommate).tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(detailItem as Roommate).interests && (detailItem as Roommate).interests.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Interests:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(detailItem as Roommate).interests.map((interest) => (
                          <Badge key={interest} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {(detailItem as Roommate).lifestyle_preferences && (
                    <div>
                      <h4 className="font-medium mb-2">Lifestyle Preferences:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Cleanliness</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-6 mx-0.5 rounded-full ${
                                  i < (detailItem as Roommate).lifestyle_preferences.cleanliness
                                    ? "bg-primary"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Noise Level</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-6 mx-0.5 rounded-full ${
                                  i < (detailItem as Roommate).lifestyle_preferences.noise_level
                                    ? "bg-primary"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Guests</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-6 mx-0.5 rounded-full ${
                                  i < (detailItem as Roommate).lifestyle_preferences.guests
                                    ? "bg-primary"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Sleep Schedule</span>
                          <Badge variant="outline">
                            {(detailItem as Roommate).lifestyle_preferences.sleep_schedule === "early_bird"
                              ? "Early Bird"
                              : (detailItem as Roommate).lifestyle_preferences.sleep_schedule === "night_owl"
                                ? "Night Owl"
                                : "Flexible"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    handleSwipe("dislike", detailItem.id)
                    setShowDetail(false)
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Pass
                </Button>

                <Button
                  className="bg-primary hover:bg-primary-600 text-white"
                  onClick={() => {
                    handleSwipe("like", detailItem.id)
                    setShowDetail(false)
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
