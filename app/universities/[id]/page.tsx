"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ONTARIO_UNIVERSITIES } from "@/types"
import { MapPin, ArrowRight, Home, User2, Info, Clock, Check } from "lucide-react"
import type { Listing } from "@/types"
import { getSupabaseClient } from "@/lib/supabase"
import { UniversityLogo } from "@/components/university-logo"

export default function UniversityDetailPage() {
  const params = useParams()
  const universityId = params.id as string
  const [university, setUniversity] = useState(ONTARIO_UNIVERSITIES.find((uni) => uni.id === universityId))
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true)
      try {
        const supabase = getSupabaseClient()

        // Mock university-specific listings
        const { data } = await supabase.from("listings").select("*").limit(6)

        if (data) {
          setListings(data as Listing[])
        }
      } catch (error) {
        console.error("Error fetching listings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [universityId])

  if (!university) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">University Not Found</h1>
          <p className="text-gray-600 mb-8">The university you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/universities">Back to Universities</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 overflow-hidden">
                  <UniversityLogo
                    university={{
                      id: university.id,
                      name: university.name,
                      logo3d: `/universities/${university.id}3d.png`,
                    }}
                    size="md"
                  />
                </div>
                <div>
                  <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 px-4 py-1">
                    University Housing
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold">{university.name}</h1>
                </div>
              </div>
              <p className="text-gray-600 flex items-center mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                {university.location}
              </p>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Find the perfect housing options and roommates near {university.name}. We have a wide selection of
                verified listings in popular student areas.
              </p>
            </div>
            <div className="shrink-0">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-600 text-white rounded-full">
                <Link href="/quiz">
                  Find Housing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Areas */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Campus Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {university.campusAreas.map((campus, index) => (
              <motion.div
                key={campus}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold mb-2">{campus}</h3>
                <p className="text-gray-600 mb-4">
                  Housing options near the {campus} area of {university.name}.
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    <Home className="inline h-4 w-4 mr-1" />
                    {Math.floor(Math.random() * 50) + 20} listings
                  </span>
                  <span className="text-gray-500">
                    <Clock className="inline h-4 w-4 mr-1" />~{Math.floor(Math.random() * 20) + 5} min to campus
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Housing Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Available Housing</h2>
            <Button asChild variant="outline">
              <Link href="/swipe">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="listings">
            <TabsList className="mb-8">
              <TabsTrigger value="listings" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Listings
              </TabsTrigger>
              <TabsTrigger value="roommates" className="flex items-center gap-2">
                <User2 className="h-4 w-4" />
                Roommates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                      <div className="relative h-48 w-full">
                        <Image
                          src={listing.photos[0] || "/placeholder.svg?height=200&width=400"}
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
                      <div className="p-4 pt-0 mt-auto">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full hover:bg-primary-50 hover:text-primary transition-colors"
                        >
                          <Link href={`/listings/${listing.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {listings.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Listings Available</h3>
                  <p className="text-gray-600 mb-6">
                    We don't have any listings near {university.name} at the moment. Check back soon!
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary-600 text-white">
                    <Link href="/quiz">Take the Quiz</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="roommates">
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Your Perfect Roommate</h3>
                <p className="text-gray-600 mb-6">
                  Take our matching quiz to find compatible roommates at {university.name}.
                </p>
                <Button asChild className="bg-primary hover:bg-primary-600 text-white">
                  <Link href="/quiz">Find Roommates</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose Homi */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Homi for {university.name} Housing</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All our listings near {university.name} are verified to ensure accuracy and safety for students.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Campus Proximity</h3>
              <p className="text-gray-600">
                Find housing options within walking distance or a short commute to {university.name}.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Info className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                Our team has deep knowledge of the {university.city} area and {university.name} housing market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of {university.name} students who've found their ideal housing situation with Homi.
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/quiz">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
