"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { SwipeCard } from "@/components/swipe-card"
import type { Listing, Roommate } from "@/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  User2,
  RefreshCw,
  Loader2,
  Heart,
  X,
  Filter,
  MapPin,
  School,
  Lightbulb,
  MessageCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { fetchRealListings, generateRoommates, calculateMatchRatio, generateListings } from "@/utils/generate-data"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  type PreferenceProfile,
  initializePreferenceProfile,
  updatePreferenceProfile,
  sortRoommatesByPreference,
  bootstrapPreferenceProfile,
  generateSyntheticSwipes,
  calculateMatchScore,
} from "@/lib/preference-learning"
import { PreferenceInsights } from "@/components/preference-insights"
import { HomiBuoy } from "@/components/homi-buoy"
import { PreferenceQuiz } from "@/components/preference-quiz"

// Generate more roommates for better learning
const ROOMMATE_COUNT = 500

export default function SwipePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"listings" | "roommates">("listings")
  const [listings, setListings] = useState<Listing[]>([])
  const [roommates, setRoommates] = useState<Roommate[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [detailItem, setDetailItem] = useState<Listing | Roommate | null>(null)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [university, setUniversity] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [matchRatio, setMatchRatio] = useState<string>("0/0 (0%)")
  const [totalSwipes, setTotalSwipes] = useState<number>(0)
  const [likedItems, setLikedItems] = useState<number>(0)

  const [preferenceProfile, setPreferenceProfile] = useState<PreferenceProfile>(initializePreferenceProfile())
  const [isLearningMode, setIsLearningMode] = useState<boolean>(true)
  const [showPreferenceInsights, setShowPreferenceInsights] = useState<boolean>(false)
  const [showPreferenceQuiz, setShowPreferenceQuiz] = useState<boolean>(false)
  const [showHomiBuoy, setShowHomiBuoy] = useState<boolean>(false)

  useEffect(() => {
    fetchItems()
  }, [activeTab, university, priceRange])

  // Improve error handling in fetchItems
  const fetchItems = async () => {
    setIsLoading(true)
    try {
      // Fetch real listings or generate roommates
      if (activeTab === "listings") {
        // Use the new fetchRealListings function
        const realListings = await fetchRealListings(100, { university, priceRange })

        if (realListings.length === 0) {
          console.log("No listings found, using fallback data")
          // If no listings were found, use fallback data
          setListings(generateListings(20))
        } else {
          // Sort by created_at
          realListings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          setListings(realListings)
        }
      } else {
        // Generate more roommates for better learning
        const generatedRoommates = generateRoommates(ROOMMATE_COUNT)

        // Apply filters
        let filteredRoommates = [...generatedRoommates]

        if (university) {
          filteredRoommates = filteredRoommates.filter((roommate) =>
            roommate.university?.toLowerCase().includes(university.toLowerCase()),
          )
        }

        // If filtering resulted in too few roommates, add some that match the filter
        if (filteredRoommates.length < 10 && university) {
          const additionalRoommates = generateRoommates(20).map((roommate) => ({
            ...roommate,
            university: university,
          }))
          filteredRoommates = [...filteredRoommates, ...additionalRoommates]
        }

        // Sort by match_score
        filteredRoommates.sort((a, b) => b.match_score - a.match_score)

        setRoommates(filteredRoommates)
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error)
      // Provide fallback data in case of error
      if (activeTab === "listings") {
        setListings(generateListings(20))
      } else {
        setRoommates(generateRoommates(20))
      }
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

      // Update preference profile if in roommates tab
      if (activeTab === "roommates") {
        const roommate = roommates.find((r) => r.id === id)
        if (roommate) {
          // Pass swipe count to updatePreferenceProfile for adaptive learning
          const updatedProfile = updatePreferenceProfile(preferenceProfile, roommate, direction, totalSwipes)
          setPreferenceProfile(updatedProfile)

          // If we have enough swipes, sort the remaining roommates by preference
          // Reduced threshold to 3 swipes for faster learning
          if (totalSwipes >= 3 && isLearningMode) {
            const sortedRoommates = sortRoommatesByPreference(updatedProfile, roommates.slice(currentIndex + 1))

            // Replace the remaining roommates with sorted ones
            setRoommates([...roommates.slice(0, currentIndex + 1), ...sortedRoommates])
          }
        }
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

    // Re-fetch items to get a fresh batch
    fetchItems()
  }

  const handleQuickStart = () => {
    setShowPreferenceQuiz(true)
  }

  const handleQuizComplete = (preferences: any) => {
    // Bootstrap preference profile with quiz data
    const bootstrappedProfile = bootstrapPreferenceProfile(preferenceProfile, preferences)

    // Apply synthetic swipes to enhance learning
    const enhancedProfile = generateSyntheticSwipes(bootstrappedProfile)

    setPreferenceProfile(enhancedProfile)
    setShowPreferenceQuiz(false)

    // Re-sort roommates based on bootstrapped preferences
    if (isLearningMode) {
      const sortedRoommates = sortRoommatesByPreference(enhancedProfile, roommates.slice(currentIndex))
      setRoommates([...roommates.slice(0, currentIndex), ...sortedRoommates])
    }

    // Set total swipes to 5 to show insights
    setTotalSwipes(5)
    setShowPreferenceInsights(true)
  }

  // Update match scores for roommates based on current preference profile
  useEffect(() => {
    if (activeTab === "roommates" && isLearningMode && totalSwipes > 0) {
      const updatedRoommates = roommates.map((roommate) => {
        const matchScore = calculateMatchScore(preferenceProfile, roommate)
        return { ...roommate, match_score: matchScore }
      })

      setRoommates(updatedRoommates)
    }
  }, [preferenceProfile, isLearningMode])

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
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-l-xl"
                >
                  <Home className="h-4 w-4" />
                  Listings
                </TabsTrigger>
                <TabsTrigger
                  value="roommates"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-r-xl"
                >
                  <User2 className="h-4 w-4" />
                  Roommates
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
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

                {activeTab === "roommates" && (
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-10 w-10 ${showPreferenceInsights ? "bg-blue-50 text-blue-600" : ""}`}
                    onClick={() => setShowPreferenceInsights(!showPreferenceInsights)}
                  >
                    <Lightbulb className="h-4 w-4" />
                    <span className="sr-only">Preference Insights</span>
                  </Button>
                )}
              </div>
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

            {activeTab === "roommates" && showPreferenceInsights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <PreferenceInsights
                  profile={preferenceProfile}
                  swipeCount={totalSwipes}
                  onQuickStart={handleQuickStart}
                />
              </motion.div>
            )}

            {activeTab === "roommates" && (
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Switch
                    checked={isLearningMode}
                    onCheckedChange={setIsLearningMode}
                    id="learning-mode"
                    className="mr-2"
                  />
                  <Label htmlFor="learning-mode" className="text-sm cursor-pointer">
                    AI Learning Mode
                  </Label>
                </div>
                <div className="text-xs text-gray-500">
                  {isLearningMode ? "AI is learning your preferences" : "Standard matching"}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[600px]"
                >
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
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
                          <Button onClick={resetCards} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                          preferenceProfile={isLearningMode ? preferenceProfile : null}
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
                          <Button onClick={resetCards} className="bg-blue-600 hover:bg-blue-700 text-white">
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

          {/* HomiBuoy toggle button */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setShowHomiBuoy(!showHomiBuoy)}
            >
              <MessageCircle className="h-4 w-4" />
              {showHomiBuoy ? "Hide HomiBuoy Assistant" : "Need Help? Ask HomiBuoy"}
            </Button>

            {showHomiBuoy && (
              <div className="mt-4">
                <HomiBuoy />
              </div>
            )}
          </div>
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
                    <span className="text-2xl font-bold text-blue-600">
                      {typeof (detailItem as Listing).price === "number"
                        ? `$${(detailItem as Listing).price}/month`
                        : `$${(detailItem as Listing).price_min}-${(detailItem as Listing).price_max}/month`}
                    </span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {(detailItem as Listing).features.bedrooms === 0
                        ? "Studio"
                        : `${(detailItem as Listing).features.bedrooms} BR`}
                    </Badge>
                  </div>

                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {(detailItem as Listing).location}
                  </p>

                  {(detailItem as Listing).university && (
                    <p className="text-gray-600">
                      <span className="font-medium">University:</span> {(detailItem as Listing).university}
                    </p>
                  )}

                  {(detailItem as Listing).walk_distance && (detailItem as Listing).drive_distance && (
                    <div className="text-gray-600">
                      <span className="font-medium">Distance to campus:</span>
                      <ul className="list-disc pl-5 mt-1">
                        <li>{(detailItem as Listing).walk_distance} km walking distance</li>
                        <li>{(detailItem as Listing).drive_distance} km driving distance</li>
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

                  {(detailItem as Listing).maps_url && (
                    <div>
                      <h4 className="font-medium mb-2">Map:</h4>
                      <Button asChild variant="outline" className="w-full">
                        <a href={(detailItem as Listing).maps_url} target="_blank" rel="noopener noreferrer">
                          <MapPin className="h-4 w-4 mr-2" />
                          View on Google Maps
                        </a>
                      </Button>
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
                                    ? "bg-blue-600"
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
                                    ? "bg-blue-600"
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
                                    ? "bg-blue-600"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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

      {/* Preference Quiz Dialog */}
      <Dialog open={showPreferenceQuiz} onOpenChange={setShowPreferenceQuiz}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
          <PreferenceQuiz onComplete={handleQuizComplete} onCancel={() => setShowPreferenceQuiz(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
