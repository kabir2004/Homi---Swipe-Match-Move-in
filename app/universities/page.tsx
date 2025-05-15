"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ONTARIO_UNIVERSITIES } from "@/types"
import { Search, MapPin, ArrowRight, School, Users, Home } from "lucide-react"
import { getImageWithFallback, handleImageError } from "@/utils/image-utils"

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUniversities = ONTARIO_UNIVERSITIES.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.province.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">Ontario Coverage</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Universities We Support</h1>
            <p className="text-lg text-gray-600 mb-8">
              Find housing near all major Ontario universities with verified listings and roommate matches
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search universities by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg rounded-full shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Universities List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUniversities.map((university, index) => {
              // Create a placeholder image URL with the university name
              const placeholderImage = `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(university.name + " campus")}`

              // Use our utility function to get a valid image source
              const campusImageSrc = getImageWithFallback(
                university.campusImage,
                `/campus/${university.id}-campus.jpg`,
                university.name + " campus",
                1200,
                800,
              )

              // Use our utility function to get a valid logo source
              const logoSrc = getImageWithFallback(
                `/universities/${university.id}3d.png`,
                `/universities/${university.id}.svg`,
                university.name + " logo",
                60,
                60,
              )

              return (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{
                    y: -12,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 border-gray-100 relative bg-gradient-to-b from-white to-gray-50">
                    {/* Interactive hover effect overlay */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={campusImageSrc || "/placeholder.svg"}
                        alt={`${university.name} Campus`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => handleImageError(e, university.name + " campus", 1200, 800)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      {/* Box for university logo */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <div className="flex justify-between items-end">
                          <div className="text-white">
                            <h2 className="text-xl font-bold">{university.name}</h2>
                            <p className="text-white/90 flex items-center text-sm">
                              <MapPin className="h-3 w-3 mr-1" />
                              {university.city}, {university.province}
                            </p>
                          </div>
                          <div className="transform translate-y-4 z-20">
                            <div className="bg-white rounded-lg p-2 shadow-md">
                              <Image
                                src={
                                  logoSrc && logoSrc.trim() !== ""
                                    ? logoSrc
                                    : `/placeholder.svg?height=60&width=60&query=${encodeURIComponent(university.name + " logo")}`
                                }
                                alt={`${university.name} Logo`}
                                width={60}
                                height={60}
                                className="object-contain"
                                onError={(e) => handleImageError(e, university.name + " logo", 60, 60)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 relative z-10">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {university.campusAreas.map((campus) => (
                            <Badge
                              key={campus}
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 transition-all duration-300 hover:bg-blue-100 hover:border-blue-300"
                            >
                              {campus}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <motion.div
                            className="bg-gray-50 p-3 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          >
                            <div className="flex justify-center mb-1">
                              <Home className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-lg font-bold">{Math.floor(Math.random() * 200) + 100}</div>
                            <div className="text-xs text-gray-500">Listings</div>
                          </motion.div>
                          <motion.div
                            className="bg-gray-50 p-3 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          >
                            <div className="flex justify-center mb-1">
                              <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-lg font-bold">{Math.floor(Math.random() * 500) + 200}</div>
                            <div className="text-xs text-gray-500">Students</div>
                          </motion.div>
                          <motion.div
                            className="bg-gray-50 p-3 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300"
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          >
                            <div className="flex justify-center mb-1">
                              <School className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-lg font-bold">{Math.floor(Math.random() * 10) + 5}</div>
                            <div className="text-xs text-gray-500">Residences</div>
                          </motion.div>
                        </div>

                        <Button
                          asChild
                          className="w-full bg-primary hover:bg-black hover:text-primary transition-all relative overflow-hidden"
                        >
                          <Link href={`/universities/${university.id}`}>
                            <span className="relative z-10 flex items-center justify-center">
                              View Housing Options
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <School className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Universities Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any universities matching "{searchTerm}". Try a different search term.
              </p>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of Ontario university students who've found their ideal housing situation with Homi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Link href="/quiz">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg transition-all hover:scale-105"
                >
                  <Link href="/how-it-works">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { id: "uoft", name: "University of Toronto", logo: "/universities/uoft3d.png" },
                  { id: "waterloo", name: "University of Waterloo", logo: "/universities/waterloo3d.png" },
                  { id: "western", name: "Western University", logo: "/universities/western3d.png" },
                  { id: "queens", name: "Queen's University", logo: "/universities/queens3d.png" },
                  { id: "laurier", name: "Wilfrid Laurier University", logo: "/universities/laurier3d.png" },
                ].map((uni) => {
                  // Create a placeholder for each university logo
                  const logoPlaceholder = `/placeholder.svg?height=48&width=48&query=${encodeURIComponent(uni.name + " logo")}`

                  return (
                    <Link href={`/universities/${uni.id}`} key={uni.id} className="flex flex-col items-center group">
                      <div className="w-16 h-16 relative mb-2 group-hover:scale-110 transition-transform">
                        <div className="absolute inset-0 rounded-full opacity-0 blur-md bg-white/60 transition-all duration-300 group-hover:opacity-100"></div>
                        <div className="relative z-10 bg-white rounded-full p-2 shadow-sm">
                          <Image
                            src={
                              uni.logo && uni.logo.trim() !== ""
                                ? uni.logo
                                : `/placeholder.svg?height=48&width=48&query=${encodeURIComponent(uni.name + " logo")}`
                            }
                            alt={`${uni.name} Logo`}
                            width={48}
                            height={48}
                            className="object-contain"
                            onError={(e) => handleImageError(e, uni.name + " logo", 48, 48)}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-white/80 group-hover:text-white transition-colors">
                        {uni.name.split(" ")[0]}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
