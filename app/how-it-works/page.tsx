"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, ExternalLink } from "lucide-react"
import { ONTARIO_UNIVERSITIES } from "@/types"
import type { Listing } from "@/types"

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState("students")
  const [isTallyLoaded, setIsTallyLoaded] = useState(false)

  // Add this function to preload images
  const preloadUniversityImages = () => {
    if (typeof window !== "undefined" && Array.isArray(ONTARIO_UNIVERSITIES)) {
      ONTARIO_UNIVERSITIES.forEach((uni) => {
        if (uni && uni.id) {
          const img = new window.Image()
          img.src = uni.campusImage || `/campus/${uni.id}-campus.jpg`
        }
      })
    }
  }

  // Load Tally script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://tally.so/widgets/embed.js"
    script.async = true
    script.onload = () => setIsTallyLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Initialize Tally when script is loaded
  useEffect(() => {
    if (isTallyLoaded && window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [isTallyLoaded])

  // Call this in useEffect
  useEffect(() => {
    try {
      preloadUniversityImages()
    } catch (error) {
      console.error("Error preloading university images:", error)
    }
  }, [])

  // Sample listings for universities
  const universityListings: Record<string, Listing[]> = {
    uoft: [
      {
        id: "uoft-1",
        title: "Modern Studio near St. George Campus",
        location: "Spadina & College, Toronto",
        price: 1650,
        photos: ["/placeholder.svg?height=200&width=400&text=UofT+Studio"],
        features: {
          bedrooms: 0,
          bathrooms: 1,
          square_feet: 450,
          amenities: ["Gym", "Laundry", "Security"],
        },
        match_tags: ["Close to Campus", "Public Transit", "Furnished"],
        university_distance: { UofT: 0.5 },
        created_at: "2023-05-15",
      },
      {
        id: "uoft-2",
        title: "2BR Apartment in The Annex",
        location: "Bloor & Bathurst, Toronto",
        price: 2400,
        photos: ["/placeholder.svg?height=200&width=400&text=Annex+Apartment"],
        features: {
          bedrooms: 2,
          bathrooms: 1,
          square_feet: 750,
          amenities: ["Balcony", "Dishwasher", "Pet Friendly"],
        },
        match_tags: ["Roommate Friendly", "Quiet Area", "Near Restaurants"],
        university_distance: { UofT: 1.2 },
        created_at: "2023-05-10",
      },
    ],
    waterloo: [
      {
        id: "waterloo-1",
        title: "Student Housing near UW Campus",
        location: "University Ave, Waterloo",
        price: 850,
        photos: ["/placeholder.svg?height=200&width=400&text=Waterloo+Student+Housing"],
        features: {
          bedrooms: 1,
          bathrooms: 1,
          square_feet: 400,
          amenities: ["Shared Kitchen", "Laundry", "Internet"],
        },
        match_tags: ["Student Housing", "All Inclusive", "Furnished"],
        university_distance: { Waterloo: 0.3, Laurier: 0.8 },
        created_at: "2023-05-12",
      },
      {
        id: "waterloo-2",
        title: "Luxury Condo in Uptown Waterloo",
        location: "King St N, Waterloo",
        price: 1950,
        photos: ["/placeholder.svg?height=200&width=400&text=Uptown+Condo"],
        features: {
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 900,
          amenities: ["Gym", "Pool", "Concierge", "Parking"],
        },
        match_tags: ["Luxury", "Modern", "Near Shops"],
        university_distance: { Waterloo: 1.5, Laurier: 1.0 },
        created_at: "2023-05-08",
      },
    ],
    laurier: [
      {
        id: "laurier-1",
        title: "Cozy Apartment near Laurier",
        location: "Albert St, Waterloo",
        price: 1200,
        photos: ["/placeholder.svg?height=200&width=400&text=Laurier+Apartment"],
        features: {
          bedrooms: 1,
          bathrooms: 1,
          square_feet: 550,
          amenities: ["Laundry", "Parking", "Storage"],
        },
        match_tags: ["Close to Campus", "Quiet Area", "Utilities Included"],
        university_distance: { Laurier: 0.4, Waterloo: 1.2 },
        created_at: "2023-05-14",
      },
      {
        id: "laurier-2",
        title: "Shared Student House",
        location: "Ezra Ave, Waterloo",
        price: 700,
        photos: ["/placeholder.svg?height=200&width=400&text=Student+House"],
        features: {
          bedrooms: 1,
          bathrooms: 2,
          square_feet: 350,
          amenities: ["Shared Kitchen", "Laundry", "Backyard"],
        },
        match_tags: ["Student Housing", "Social", "Close to Campus"],
        university_distance: { Laurier: 0.2, Waterloo: 1.0 },
        created_at: "2023-05-11",
      },
    ],
    western: [
      {
        id: "western-1",
        title: "Modern Townhouse near Western",
        location: "Richmond St, London",
        price: 1800,
        photos: ["/placeholder.svg?height=200&width=400&text=Western+Townhouse"],
        features: {
          bedrooms: 3,
          bathrooms: 2.5,
          square_feet: 1200,
          amenities: ["Garage", "Backyard", "Fireplace"],
        },
        match_tags: ["Roommate Friendly", "Spacious", "Near Campus"],
        university_distance: { Western: 0.7 },
        created_at: "2023-05-09",
      },
      {
        id: "western-2",
        title: "Studio Apartment Downtown",
        location: "Dundas St, London",
        price: 1100,
        photos: ["/placeholder.svg?height=200&width=400&text=Downtown+Studio"],
        features: {
          bedrooms: 0,
          bathrooms: 1,
          square_feet: 500,
          amenities: ["Gym", "Laundry", "Security"],
        },
        match_tags: ["Downtown", "Modern", "Public Transit"],
        university_distance: { Western: 2.5 },
        created_at: "2023-05-13",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">Simple Process</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Homi Works</h1>
            <p className="text-lg text-gray-600 mb-8">
              Our platform makes finding your perfect university housing and roommates simple, fast, and stress-free.
              Here's how we do it.
            </p>
            <div className="flex justify-center">
              <Tabs defaultValue="students" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="students" className="text-sm">
                    For Students
                  </TabsTrigger>
                  <TabsTrigger value="landlords" className="text-sm">
                    For Landlords
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="students">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 relative">
                    <Image src="/homi-profile.png" alt="Take the Quiz" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center mb-2">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-white">Take the Quiz</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Answer questions about your preferences, budget, lifestyle, and university to create your profile.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Personalized matching algorithm</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Takes just 5 minutes to complete</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Detailed preference analysis</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 relative">
                    <Image src="/browse-homi.png" alt="Browse Matches" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center mb-2">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-white">Browse Matches</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Swipe through personalized housing and roommate recommendations tailored to your preferences.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">AI-powered matching system</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Detailed listing information</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Compatibility scores for roommates</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 relative">
                    <Image src="/homi-connect.png" alt="Connect and Move In" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center mb-2">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-white">Connect & Move In</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Chat with potential roommates, schedule viewings, and secure your perfect housing match.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">In-app messaging system</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Viewing scheduler</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Secure application process</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="landlords">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400&text=List"
                      alt="List Your Property"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center mb-2">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-white">List Your Property</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Create a detailed listing with photos, amenities, and pricing information.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Easy-to-use listing creator</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Photo upload and management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Detailed amenity selection</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400&text=Connect"
                      alt="Connect with Students"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center mb-2">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-white">Connect with Students</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Receive inquiries from qualified students who match your property's criteria.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Pre-screened student inquiries</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">In-app messaging system</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Student profile information</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=400&text=Manage"
                      alt="Manage Applications"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-primary text-white text-sm font-medium rounded-full w-8 h-8 flex items-center justify-center mb-2">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-white">Manage Applications</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Review applications, schedule viewings, and secure reliable student tenants.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Application management dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Viewing scheduler</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Tenant selection tools</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Beta Signup Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">Limited Access</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Homi Beta</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Be among the first to experience the future of student housing. Sign up now to get early access and
                  exclusive perks when we launch on July 15, 2025.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Early access to all premium features</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Priority matching with top listings</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <span className="text-gray-700">Exclusive discounts on first month's rent</span>
                  </li>
                </ul>
                <div className="hidden md:block">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary-600 text-white rounded-full group overflow-hidden"
                  >
                    <a href="https://tally.so/r/mDy28p" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 flex items-center">
                        Sign Up for Beta Access
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </span>
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-1">
                  <iframe
                    data-tally-src="https://tally.so/embed/mDy28p?alignLeft=1&hideTitle=1&transparentBackground=1"
                    loading="lazy"
                    width="100%"
                    height="500"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Join the Homi Beta"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="md:hidden p-6 pt-0 text-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary-600 text-white rounded-full group overflow-hidden mt-4 w-full"
                  >
                    <a href="https://tally.so/r/mDy28p" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 flex items-center justify-center">
                        Sign Up for Beta Access
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </span>
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 px-4 py-1.5">Coming Soon</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Roadmap</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're constantly working to improve Homi and bring you the best student housing experience. Here's a sneak
              peek at what's coming next.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Roommate+Matching"
                  alt="Enhanced Roommate Matching"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-blue-50 text-blue-700 text-sm font-medium rounded-full px-3 py-1 mb-2 inline-flex items-center">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Coming Q3 2025</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white">Enhanced Roommate Matching</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Our enhanced roommate matching algorithm will take into account even more factors to help you find the
                  perfect roommate.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Personality assessments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Lifestyle compatibility</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Virtual+Tours"
                  alt="Virtual Tours"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-purple-50 text-purple-700 text-sm font-medium rounded-full px-3 py-1 mb-2 inline-flex items-center">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">Coming Q4 2025</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white">Virtual Tours</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Explore potential housing options from the comfort of your own home with our immersive virtual tours.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">360° property views</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Interactive floor plans</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400&text=Rental+Payments"
                  alt="Rental Payments &"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-amber-50 text-amber-700 text-sm font-medium rounded-full px-3 py-1 mb-2 inline-flex items-center">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200">Coming 2026</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white">Rental Payments & Management</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Simplify your rental experience with our integrated payment and management system.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Automated rent payments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Maintenance request management</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
