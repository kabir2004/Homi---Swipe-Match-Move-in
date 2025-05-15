"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Check,
  User2,
  Home,
  Search,
  MessageCircle,
  Calendar,
  Shield,
  MapPin,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ONTARIO_UNIVERSITIES } from "@/types"
import type { Listing } from "@/types"

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState("students")
  const [isTallyLoaded, setIsTallyLoaded] = useState(false)

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

      {/* Homi in Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See Homi in Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our intuitive swipe interface makes finding your perfect match quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                      <User2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Personalized Profile</h3>
                      <p className="text-gray-600">
                        Our detailed quiz captures your preferences, budget, and lifestyle to create a personalized
                        profile.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                      <p className="text-gray-600">
                        Our AI algorithm matches you with housing options and potential roommates based on
                        compatibility.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Seamless Communication</h3>
                      <p className="text-gray-600">
                        Connect with potential roommates and landlords through our secure in-app messaging system.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="h-[500px] relative">
                    {/* Replace with the swipe image when available */}
                    <Image
                      src="/placeholder.svg?height=500&width=400&text=Swipe+Interface"
                      alt="Homi Swipe Interface"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm font-medium">Easy to Use</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Listings Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">University Housing</Badge>
            <h2 className="text-3xl font-bold mb-4">Featured Listings by University</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our top housing options near popular Ontario universities
            </p>
          </div>

          <Tabs defaultValue="uoft" className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-8 gap-2">
              {Array.isArray(ONTARIO_UNIVERSITIES) && ONTARIO_UNIVERSITIES.length > 0 ? (
                ONTARIO_UNIVERSITIES.map((uni) => (
                  <TabsTrigger key={uni.id} value={uni.id} className="px-4 py-2">
                    {uni.shortName || uni.name}
                  </TabsTrigger>
                ))
              ) : (
                // Fallback tabs if ONTARIO_UNIVERSITIES is empty or not an array
                <>
                  <TabsTrigger value="uoft" className="px-4 py-2">
                    UofT
                  </TabsTrigger>
                  <TabsTrigger value="waterloo" className="px-4 py-2">
                    Waterloo
                  </TabsTrigger>
                  <TabsTrigger value="western" className="px-4 py-2">
                    Western
                  </TabsTrigger>
                  <TabsTrigger value="queens" className="px-4 py-2">
                    Queen's
                  </TabsTrigger>
                  <TabsTrigger value="mcmaster" className="px-4 py-2">
                    McMaster
                  </TabsTrigger>
                  <TabsTrigger value="york" className="px-4 py-2">
                    York
                  </TabsTrigger>
                  <TabsTrigger value="laurier" className="px-4 py-2">
                    Laurier
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            {Object.entries(universityListings).map(([uniId, listings]) => (
              <TabsContent key={uniId} value={uniId}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                        <div className="relative h-48 w-full">
                          <Image
                            src={
                              uniId
                                ? `/campus/${uniId}-campus.jpg`
                                : `/placeholder.svg?height=200&width=400&text=Campus+Image`
                            }
                            alt={listings[0]?.title || "Campus Image"}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.onerror = null // Prevent infinite loop
                              target.src = `/placeholder.svg?height=200&width=400&text=Campus+Image`
                            }}
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
                          <p className="text-sm text-gray-600 mt-2">
                            {Object.entries(listing.university_distance || {}).map(([uni, distance], i) => (
                              <span key={uni}>
                                {i > 0 && ", "}
                                {distance} km to {uni}
                              </span>
                            ))}
                          </p>
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200 px-4 py-1.5">Key Features</Badge>
            <h2 className="text-3xl font-bold mb-4">What Makes Homi Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique features designed specifically for university students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">All listings are verified to ensure accuracy and safety for students.</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <User2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Roommate Matching</h3>
              <p className="text-gray-600">
                Our AI algorithm finds compatible roommates based on lifestyle and preferences.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">University Proximity</h3>
              <p className="text-gray-600">Find housing options close to your specific Ontario university campus.</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Viewing Scheduler</h3>
              <p className="text-gray-600">
                Schedule property viewings directly through the app with calendar integration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">Looking Forward</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Roadmap</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're constantly improving Homi to make finding student housing even easier
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-700 border-green-200">Now Available</Badge>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered HomiBuoy</h3>
              <p className="text-gray-600">
                Our AI assistant helps answer all your housing and roommate questions instantly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Coming Q3 2025</Badge>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User2 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Enhanced Roommate Matching</h3>
              <p className="text-gray-600">
                We're improving our AI algorithm to provide even more accurate roommate matches based on compatibility.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">Coming Q4 2025</Badge>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Home className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Virtual Tours</h3>
              <p className="text-gray-600">
                Soon you'll be able to take virtual tours of properties without leaving the Homi platform.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">Coming 2026</Badge>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Rental Payments & Management</h3>
              <p className="text-gray-600">
                We're building tools to help students and landlords manage rent payments and maintenance requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            {/* Decorative floating elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            {/* Animated pulse effects */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary-300/20 rounded-full blur-xl animate-pulse-slow"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-primary-300/20 rounded-full blur-xl animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Subtle radial gradient overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)]"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of Ontario university students who've found their ideal housing situation with Homi.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <a href="https://tally.so/r/mDy28p" target="_blank" rel="noopener noreferrer">
                    Join the Beta
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
