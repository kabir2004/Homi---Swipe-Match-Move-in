"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
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
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
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
import { SwipeCardEnhanced } from "@/components/swipe-card-enhanced"
import { PremiumUpgrade } from "@/components/premium-upgrade"

// Generate more roommates and listings for better experience
const ROOMMATE_COUNT = 100
const LISTING_COUNT = 100
const FREE_SWIPE_LIMIT = 30

// Helper function to generate listings
const generateListings = (count: number): Listing[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `listing-${i + 1}`,
    type: "listing",
    title: `${["Modern", "Cozy", "Spacious", "Luxury", "Budget"][Math.floor(Math.random() * 5)]} ${
      ["Apartment", "House", "Studio", "Condo", "Townhouse"][Math.floor(Math.random() * 5)]
    } near ${["Campus", "Downtown", "University", "Park", "Station"][Math.floor(Math.random() * 5)]}`,
    description: `A ${
      ["beautiful", "charming", "comfortable", "stylish", "affordable"][Math.floor(Math.random() * 5)]
    } place to live with great amenities and convenient location.`,
    location: `${Math.floor(Math.random() * 999) + 1} ${
      ["University Ave", "College St", "Main St", "Park Rd", "Queen St"][Math.floor(Math.random() * 5)]
    }, ${
      ["Toronto", "Waterloo", "London", "Kingston", "Hamilton", "Ottawa", "Mississauga"][Math.floor(Math.random() * 7)]
    }`,
    university: [
      "University of Toronto",
      "Western University",
      "Queen's University",
      "McMaster University",
      "University of Waterloo",
      "Wilfrid Laurier University",
    ][Math.floor(Math.random() * 6)],
    price: Math.floor(Math.random() * 1500) + 800,
    price_min: Math.floor(Math.random() * 500) + 800,
    price_max: Math.floor(Math.random() * 1000) + 1300,
    photos: [
      `/placeholder.svg?height=600&width=800&query=${encodeURIComponent("modern apartment exterior")}`,
      `/placeholder.svg?height=600&width=800&query=${encodeURIComponent("apartment living room")}`,
      `/placeholder.svg?height=600&width=800&query=${encodeURIComponent("apartment kitchen")}`,
      `/placeholder.svg?height=600&width=800&query=${encodeURIComponent("apartment bedroom")}`,
    ],
    features: {
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 2) + 1,
      square_feet: Math.floor(Math.random() * 800) + 400,
      amenities: Array.from(
        { length: Math.floor(Math.random() * 5) + 3 },
        () =>
          [
            "Laundry",
            "Dishwasher",
            "Air Conditioning",
            "Heating",
            "Parking",
            "Gym",
            "Pool",
            "Elevator",
            "Balcony",
            "Patio",
            "Rooftop",
            "Security System",
            "Doorman",
            "Pets Allowed",
            "Furnished",
            "Utilities Included",
            "WiFi Included",
            "Cable Included",
          ][Math.floor(Math.random() * 18)],
      ),
    },
    walk_distance: (Math.random() * 3 + 0.5).toFixed(1),
    drive_distance: (Math.random() * 5 + 1).toFixed(1),
    match_tags: Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () =>
        [
          "Near Campus",
          "Utilities Included",
          "Newly Renovated",
          "Pet Friendly",
          "Furnished",
          "Private Bathroom",
          "Laundry On-site",
          "Parking Available",
          "Air Conditioning",
          "Heating",
        ][Math.floor(Math.random() * 10)],
    ),
    match_score: Math.floor(Math.random() * 30) + 70,
    created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    maps_url: "https://maps.google.com",
  }))
}

// Helper function to generate roommates
const generateRoommates = (count: number): Roommate[] => {
  const firstNames = [
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Avery",
    "Quinn",
    "Jamie",
    "Skyler",
    "Cameron",
    "Reese",
    "Finley",
    "Dakota",
    "Hayden",
    "Rowan",
    "Sasha",
    "Kai",
    "Jaden",
    "Phoenix",
    "Remy",
    "Emerson",
    "Harley",
    "River",
  ]

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
  ]

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const gender = Math.random() > 0.5 ? "male" : "female"

    return {
      id: `roommate-${i + 1}`,
      type: "roommate",
      name: `${firstName} ${lastName.charAt(0)}.`,
      photo: `/placeholder.svg?height=800&width=800&query=${encodeURIComponent(`portrait of ${gender} student smiling`)}`,
      university: [
        "University of Toronto",
        "Western University",
        "Queen's University",
        "McMaster University",
        "University of Waterloo",
        "Wilfrid Laurier University",
      ][Math.floor(Math.random() * 6)],
      program: [
        "Computer Science",
        "Engineering",
        "Business",
        "Psychology",
        "Biology",
        "English",
        "History",
        "Mathematics",
        "Physics",
        "Chemistry",
      ][Math.floor(Math.random() * 10)],
      year: Math.floor(Math.random() * 4) + 1,
      intro_bio: `Hi, I'm ${firstName}! I'm a ${["friendly", "outgoing", "quiet", "studious", "easygoing"][Math.floor(Math.random() * 5)]} student looking for a compatible roommate.`,
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 3 },
        () =>
          [
            "Early Riser",
            "Night Owl",
            "Clean",
            "Organized",
            "Quiet",
            "Social",
            "Studious",
            "Athletic",
            "Creative",
            "Outdoorsy",
            "Tech-Savvy",
            "Foodie",
            "Vegan",
            "Non-Smoker",
          ][Math.floor(Math.random() * 14)],
      ),
      interests: Array.from(
        { length: Math.floor(Math.random() * 4) + 2 },
        () =>
          [
            "Reading",
            "Writing",
            "Hiking",
            "Biking",
            "Swimming",
            "Running",
            "Yoga",
            "Cooking",
            "Photography",
            "Painting",
            "Music",
            "Movies",
            "Video Games",
            "Board Games",
            "Sports",
          ][Math.floor(Math.random() * 15)],
      ),
      match_score: Math.floor(Math.random() * 30) + 70,
      lifestyle_preferences: {
        cleanliness: Math.floor(Math.random() * 5) + 1,
        noise_level: Math.floor(Math.random() * 5) + 1,
        guests: Math.floor(Math.random() * 5) + 1,
        sleep_schedule: ["early_bird", "night_owl", "flexible"][Math.floor(Math.random() * 3)],
      },
    }
  })
}

// Helper function to calculate match ratio
const calculateMatchRatio = (index: number, total: number): string => {
  if (total === 0) return "0/0 (0%)"
  const percentage = Math.round((index / total) * 100)
  return `${index}/${total} (${percentage}%)`
}

export default function SwipePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
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
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false)
  const [isPremium, setIsPremium] = useState<boolean>(false)

  const [preferenceProfile, setPreferenceProfile] = useState<PreferenceProfile>(initializePreferenceProfile())
  const [isLearningMode, setIsLearningMode] = useState<boolean>(true)
  const [showPreferenceInsights, setShowPreferenceInsights] = useState<boolean>(false)
  const [showPreferenceQuiz, setShowPreferenceQuiz] = useState<boolean>(false)
  const [showHomiBuoy, setShowHomiBuoy] = useState<boolean>(false)
  const [userPreferences, setUserPreferences] = useState<Record<string, any> | null>(null)

  const type = searchParams.get("type") || "listing"

  // Check if user is premium
  useEffect(() => {
    try {
      const premiumStatus = localStorage.getItem("homiPremium")
      if (premiumStatus === "true") {
        setIsPremium(true)
      }
    } catch (error) {
      console.error("Error checking premium status:", error)
    }
  }, [])

  // Load user preferences from localStorage
  useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem("userPreferences")
      if (storedPreferences) {
        const preferences = JSON.parse(storedPreferences)
        setUserPreferences(preferences)

        // Set university filter if it exists in preferences
        if (preferences.university) {
          setUniversity(preferences.university)
        }

        // Set price range if budget exists in preferences
        if (preferences.budget) {
          setPriceRange([0, preferences.budget])
        }

        // Bootstrap preference profile with quiz data
        const bootstrappedProfile = bootstrapPreferenceProfile(preferenceProfile, preferences)
        setPreferenceProfile(bootstrappedProfile)
      }

      // Load saved swipe count
      const savedSwipes = localStorage.getItem("totalSwipes")
      if (savedSwipes) {
        setTotalSwipes(Number.parseInt(savedSwipes, 10))
      }

      const savedLikes = localStorage.getItem("likedItems")
      if (savedLikes) {
        setLikedItems(Number.parseInt(savedLikes, 10))
      }
    } catch (error) {
      console.error("Error loading user preferences:", error)
    }
  }, [])

  // Save swipe count to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("totalSwipes", totalSwipes.toString())
      localStorage.setItem("likedItems", likedItems.toString())
    } catch (error) {
      console.error("Error saving swipe count:", error)
    }
  }, [totalSwipes, likedItems])

  // Generate initial data
  useEffect(() => {
    // Generate initial data
    const initialListings = generateListings(LISTING_COUNT)
    const initialRoommates = generateRoommates(ROOMMATE_COUNT)

    setListings(initialListings)
    setRoommates(initialRoommates)
    setIsLoading(false)

    console.log(`Generated ${initialListings.length} listings and ${initialRoommates.length} roommates`)
  }, [])

  // Update match ratio when current index changes
  useEffect(() => {
    const totalItems = activeTab === "listings" ? listings.length : roommates.length
    setMatchRatio(calculateMatchRatio(currentIndex, totalItems))
  }, [currentIndex, activeTab, listings.length, roommates.length])

  const handleSwipe = async (direction: "like" | "dislike", id: string) => {
    try {
      // Check if user has reached the free swipe limit
      if (!isPremium && totalSwipes >= FREE_SWIPE_LIMIT) {
        setShowPremiumModal(true)
        return
      }

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
        } else if (activeTab === "roommates" && currentIndex < roommates.length - 1) {
          const newIndex = currentIndex + 1
          setCurrentIndex(newIndex)
        } else {
          // No more items to swipe, generate more
          if (activeTab === "listings") {
            const newListings = generateListings(50)
            setListings((prev) => [...prev, ...newListings])
            setCurrentIndex((prev) => prev + 1)
          } else {
            const newRoommates = generateRoommates(50)
            setRoommates((prev) => [...prev, ...newRoommates])
            setCurrentIndex((prev) => prev + 1)
          }
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
  }

  const resetCards = () => {
    setCurrentIndex(0)

    // Generate new cards
    if (activeTab === "listings") {
      const newListings = generateListings(LISTING_COUNT)
      setListings(newListings)
    } else {
      const newRoommates = generateRoommates(ROOMMATE_COUNT)
      setRoommates(newRoommates)
    }
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

  const handleUpgradeToPremium = () => {
    // In a real app, this would handle payment processing
    // For demo purposes, we'll just set the premium status
    setIsPremium(true)
    localStorage.setItem("homiPremium", "true")
    setShowPremiumModal(false)
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

  // Calculate remaining free swipes
  const remainingFreeSwipes = Math.max(0, FREE_SWIPE_LIMIT - totalSwipes)

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Ensure we always have cards to show
  if (activeTab === "listings" && (!listings.length || currentIndex >= listings.length)) {
    const newListings = generateListings(50)
    setListings((prev) => [...prev, ...newListings])
    if (currentIndex >= listings.length) {
      setCurrentIndex(0)
    }
  }

  if (activeTab === "roommates" && (!roommates.length || currentIndex >= roommates.length)) {
    const newRoommates = generateRoommates(50)
    setRoommates((prev) => [...prev, ...newRoommates])
    if (currentIndex >= roommates.length) {
      setCurrentIndex(0)
    }
  }

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

            {/* Premium status and swipe limit display */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Progress:</span> {matchRatio}
              </div>
              {isPremium ? (
                <div className="flex items-center text-sm text-amber-600 font-medium">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Premium
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Free Swipes:</span> {remainingFreeSwipes}/{FREE_SWIPE_LIMIT}
                </div>
              )}
            </div>

            {/* Match ratio display */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Liked:</span> {likedItems}/{totalSwipes} (
                {totalSwipes > 0 ? Math.round((likedItems / totalSwipes) * 100) : 0}%)
              </div>
              {!isPremium && remainingFreeSwipes <= 5 && remainingFreeSwipes > 0 && (
                <div className="text-xs text-amber-600 font-medium flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {remainingFreeSwipes} swipes left
                </div>
              )}
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
                        <SwipeCardEnhanced
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
                          <h3 className="text-xl font-bold mb-4">Loading More Listings</h3>
                          <p className="text-gray-600 mb-6">
                            We're finding more great listings for you. Please wait a moment...
                          </p>
                          <Button onClick={resetCards} className="bg-blue-600 hover:bg-blue-700 text-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Listings
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="roommates" className="mt-0">
                    <div className="relative h-[600px] w-full">
                      {hasItems && activeTab === "roommates" ? (
                        <SwipeCardEnhanced
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
                          <h3 className="text-xl font-bold mb-4">Loading More Roommates</h3>
                          <p className="text-gray-600 mb-6">
                            We're finding more potential roommates for you. Please wait a moment...
                          </p>
                          <Button onClick={resetCards} className="bg-blue-600 hover:bg-blue-700 text-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh Roommates
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
                      {(detailItem as Listing).features.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
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
                      {(detailItem as Roommate).tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {(detailItem as Roommate).interests && (detailItem as Roommate).interests.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Interests:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(detailItem as Roommate).interests.map((interest, index) => (
                          <Badge key={index} variant="outline">
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

      {/* Premium Upgrade Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="max-w-md">
          <PremiumUpgrade onUpgrade={handleUpgradeToPremium} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
