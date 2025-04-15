"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getSupabaseClient } from "@/lib/supabase"
import type { Listing, Roommate } from "@/types"
import { Home, User2, MapPin, ArrowRight, Loader2, Filter, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const [savedListings, setSavedListings] = useState<Listing[]>([])
  const [savedRoommates, setSavedRoommates] = useState<Roommate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "price" | "match">("newest")

  useEffect(() => {
    fetchSavedItems()
  }, [])

  const fetchSavedItems = async () => {
    setIsLoading(true)

    try {
      const supabase = getSupabaseClient()
      const mockUserId = "demo-user-id"

      // Fetch saved listings
      const { data: listingSwipes } = await supabase
        .from("swipes")
        .select("target_id")
        .eq("user_id", mockUserId)
        .eq("type", "listing")
        .eq("direction", "like")

      if (listingSwipes && listingSwipes.length > 0) {
        const targetIds = listingSwipes.map((swipe) => swipe.target_id)

        const { data: listings } = await supabase.from("listings").select("*").in("id", targetIds)

        if (listings) {
          setSavedListings(listings as Listing[])
        }
      }

      // Fetch saved roommates
      const { data: roommateSwipes } = await supabase
        .from("swipes")
        .select("target_id")
        .eq("user_id", mockUserId)
        .eq("type", "roommate")
        .eq("direction", "like")

      if (roommateSwipes && roommateSwipes.length > 0) {
        const targetIds = roommateSwipes.map((swipe) => swipe.target_id)

        const { data: roommates } = await supabase.from("roommates").select("*").in("id", targetIds)

        if (roommates) {
          setSavedRoommates(roommates as Roommate[])
        }
      }
    } catch (error) {
      console.error("Error fetching saved items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredListings = savedListings
    .filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.match_tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  const filteredRoommates = savedRoommates
    .filter(
      (roommate) =>
        roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roommate.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        roommate.intro_bio.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "match") return b.match_score - a.match_score
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold">Your Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your saved listings and roommate matches</p>
            </div>

            <Button asChild className="mt-4 md:mt-0 bg-primary hover:bg-primary-600 text-white">
              <Link href="/swipe">
                Continue Swiping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <Tabs defaultValue="listings">
            <TabsList className="grid grid-cols-2 mb-6 bg-white shadow-sm">
              <TabsTrigger
                value="listings"
                className="flex items-center gap-2 data-[state=active]:bg-primary-50 data-[state=active]:text-primary"
              >
                <Home className="h-4 w-4" />
                Saved Listings
              </TabsTrigger>
              <TabsTrigger
                value="roommates"
                className="flex items-center gap-2 data-[state=active]:bg-primary-50 data-[state=active]:text-primary"
              >
                <User2 className="h-4 w-4" />
                Roommate Matches
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, location, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price")}>Price (Low to High)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("match")}>Match Score</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <TabsContent value="listings">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : filteredListings.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredListings.map((listing, index) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                        <div className="relative h-48 w-full">
                          <Image
                            src={listing.photos[0] || "/placeholder.svg"}
                            alt={listing.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-white font-bold">{listing.title}</h3>
                            <p className="text-white/90 text-sm flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {listing.location}
                            </p>
                          </div>
                        </div>
                        <CardContent className="pt-4 flex-grow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold text-primary">${listing.price}/month</span>
                            <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                              {listing.features.bedrooms === 0 ? "Studio" : `${listing.features.bedrooms} BR`}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {listing.match_tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-primary-50 text-primary-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full hover:bg-primary-50 hover:text-primary transition-colors"
                          >
                            <Link href={`/listings/${listing.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Home className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No Saved Listings Yet</h3>
                      <p className="text-gray-600 text-center mb-6">
                        {searchTerm
                          ? "No listings match your search criteria."
                          : "Start swiping to find your perfect housing match."}
                      </p>
                      <Button asChild className="bg-primary hover:bg-primary-600 text-white">
                        <Link href="/swipe">Start Swiping</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="roommates">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : filteredRoommates.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredRoommates.map((roommate, index) => (
                    <motion.div
                      key={roommate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                        <CardContent className="pt-6 flex-grow">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary-100">
                              <Image
                                src={roommate.photo || "/placeholder.svg"}
                                alt={roommate.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{roommate.name}</h3>
                              <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                                {roommate.match_score}% Match
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {roommate.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-blue-50 text-blue-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-gray-600 text-sm line-clamp-3">{roommate.intro_bio}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full hover:bg-primary-50 hover:text-primary transition-colors"
                          >
                            <Link href={`/roommates/${roommate.id}`}>View Profile</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <User2 className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No Roommate Matches Yet</h3>
                      <p className="text-gray-600 text-center mb-6">
                        {searchTerm
                          ? "No roommates match your search criteria."
                          : "Start swiping to find your perfect roommate match."}
                      </p>
                      <Button asChild className="bg-primary hover:bg-primary-600 text-white">
                        <Link href="/swipe">Start Swiping</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
