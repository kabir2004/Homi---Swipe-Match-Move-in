"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, User2, Check, Star, Shield, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  FloatingElement,
  HiddenMessage,
  useEasterEggTracker,
  triggerConfetti,
  smoothScrollTo,
} from "@/components/ui-enhancements"

export default function LandingPage() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const { eggCount, incrementEggCount, showReward } = useEasterEggTracker()

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Demo data
  const demoSteps = [
    {
      title: "Take the Quiz",
      description: "Answer a few questions about your preferences and needs",
      image: "/homi-profile.png",
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "Browse Matches",
      description: "Swipe through personalized housing and roommate recommendations",
      image: "/browse-homi.png",
      color: "from-green-500/20 to-green-500/5",
    },
    {
      title: "Connect & Move In",
      description: "Chat with potential roommates and secure your perfect housing match",
      image: "/homi-connect.png",
      color: "from-purple-500/20 to-purple-500/5",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Sarah K.",
      university: "University of Toronto",
      image: "/placeholder.svg?height=80&width=80",
      text: "Homi made finding a place near UofT so much easier. I found a great apartment and roommate within a week!",
      rating: 5,
    },
    {
      name: "Michael T.",
      university: "Western University",
      image: "/placeholder.svg?height=80&width=80",
      text: "The roommate matching was spot on. My roommate and I have similar study habits and we get along great.",
      rating: 5,
    },
    {
      name: "Priya M.",
      university: "McMaster University",
      image: "/placeholder.svg?height=80&width=80",
      text: "As an international student, finding housing was stressful until I used Homi. The verified listings gave me peace of mind.",
      rating: 4,
    },
  ]

  // Easter egg: Click the stars 3 times
  const handleStarClick = () => {
    setShowEasterEgg((prev) => {
      const newValue = !prev
      if (newValue) {
        incrementEggCount()
        triggerConfetti()
        setTimeout(() => setShowEasterEgg(false), 3000)
      }
      return newValue
    })
  }

  // Auto-advance demo
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoSteps.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, demoSteps.length])

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" ref={containerRef}>
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" style={{ y, opacity }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50/80 to-white" />
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-100/50 blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute top-[60%] right-[5%] w-[30%] h-[30%] rounded-full bg-green-100/30 blur-3xl" />
          <div className="hidden md:block absolute top-[20%] left-[15%] w-[20%] h-[20%] rounded-full bg-yellow-100/30 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              className="md:w-1/2 md:pr-12 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                  #1 Housing App for Ontario Students
                </Badge>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Find Your Perfect{" "}
                <span className="text-primary relative">
                  University Housing
                  <motion.span
                    className="absolute bottom-2 left-0 w-full h-2 bg-primary/20 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Homi connects Ontario university students with ideal housing and roommates through AI-powered matching.
                Swipe, match, and move in!
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transition-all rounded-full group overflow-hidden"
                >
                  <Link href="/quiz">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-black/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 rounded-full group"
                  onClick={() => smoothScrollTo("how-it-works")}
                >
                  <Link href="#how-it-works">
                    <span className="relative z-10">See How It Works</span>
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="mt-8 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                      whileHover={{ scale: 1.1, y: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src={`/placeholder-icon.png?height=40&width=40&text=${i}`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
                <HiddenMessage message="Join them today!">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">1,200+</span> students found housing this month
                  </div>
                </HiddenMessage>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <Image src="/homi-building.png" alt="University Village Apartments" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <motion.div
                    className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold mb-2">University Village Apartments</h3>
                    <p className="text-gray-700 text-sm mb-3">5 min walk to University of Toronto</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">$1,200/month</span>
                      <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                        2 BR
                      </Badge>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FloatingElement delay={0.5} duration={4}>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User2 className="h-5 w-5 text-blue-600" />
                    </div>
                  </FloatingElement>
                  <div>
                    <h4 className="font-medium text-sm">Alex J.</h4>
                    <div className="text-xs text-gray-500">95% Match</div>
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap">
                  <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                    Clean
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                    Student
                  </Badge>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-center gap-2">
                  <FloatingElement>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  </FloatingElement>
                  <div className="text-sm font-medium">Verified Listing</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Homi Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes finding your perfect university housing and roommates simple and stress-free
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  {demoSteps.map((step, index) => (
                    <button
                      key={index}
                      className={cn(
                        "flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                        activeDemo === index
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                      onClick={() => {
                        setActiveDemo(index)
                        setIsPlaying(false)
                      }}
                    >
                      Step {index + 1}
                    </button>
                  ))}
                </div>

                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDemo}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-b ${demoSteps[activeDemo].color}`} />
                      <Image
                        src={
                          activeDemo === 0
                            ? "/homi-profile.png"
                            : activeDemo === 1
                              ? "/browse-homi.png"
                              : "/homi-connect.png"
                        }
                        alt={demoSteps[activeDemo].title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-2">{demoSteps[activeDemo].title}</h3>
                    <p className="text-white/90">{demoSteps[activeDemo].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <User2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                    <p className="text-gray-600">
                      Take our detailed quiz to help us understand your preferences, budget, and lifestyle. Our AI uses
                      this to find your perfect matches.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Discover Matches</h3>
                    <p className="text-gray-600">
                      Browse personalized housing recommendations and potential roommates with our intuitive swipe
                      interface.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Connect & Move In</h3>
                    <p className="text-gray-600">
                      Chat with potential roommates, schedule viewings, and secure your perfect housing match - all
                      within the app.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary-600 text-white rounded-full group overflow-hidden"
                >
                  <Link href="/quiz">
                    <span className="relative z-10 flex items-center">
                      Start Your Journey
                      <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-black/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 px-4 py-1.5">Ontario Coverage</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Universities We Support</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find housing near all major Ontario universities with verified listings and roommate matches
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { id: "uoft", name: "University of Toronto", logo: "/universities/uoft3d.png" },
              { id: "waterloo", name: "University of Waterloo", logo: "/universities/waterloo3d.png" },
              { id: "western", name: "Western University", logo: "/universities/western3d.png" },
              { id: "queens", name: "Queen's University", logo: "/universities/queens3d.png" },
              { id: "mcmaster", name: "McMaster University", logo: "/universities/mcmaster3d.png" },
              { id: "tmu", name: "Toronto Metropolitan University", logo: "/universities/tmu3d.png" },
              { id: "york", name: "York University", logo: "/universities/york3d.png" },
              { id: "ottawa", name: "University of Ottawa", logo: "/universities/ottawa3d.png" },
              { id: "laurier", name: "Wilfrid Laurier University", logo: "/universities/laurier3d.png" },
            ].map((university) => (
              <motion.div
                key={university.id}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-4 h-24 flex items-center justify-center">
                  <Image
                    src={university.logo || "/placeholder.svg"}
                    alt={university.name}
                    width={120}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-sm">{university.name}</h3>
                <div className="mt-3">
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 200) + 100}+ Listings
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200 px-4 py-1.5">Key Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Homi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've reimagined the housing search experience for university students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                All our listings are verified and located near Ontario universities, ensuring you find safe and
                convenient housing options.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Verified by our team
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Accurate details and photos
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Proximity to campus
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <User2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Roommate Matching</h3>
              <p className="text-gray-600">
                Our advanced algorithm matches you with compatible roommates based on lifestyle, study habits, and
                personal preferences.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Personality compatibility
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Lifestyle preferences
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Study habits alignment
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Time-Saving</h3>
              <p className="text-gray-600">
                Find your perfect match in days, not weeks. Our streamlined process helps you quickly find and secure
                housing. Our streamlined process helps you quickly find and secure housing.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Personalized recommendations
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  In-app communication
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Streamlined application process
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-200 px-4 py-1.5">Student Success</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied students who found their perfect housing match with Homi
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                <div
                  className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full cursor-pointer"
                  onClick={handleStarClick}
                >
                  <Star
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      showEasterEgg ? "text-yellow-400 scale-125" : "text-primary",
                    )}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="pt-6"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-gray-500">{testimonials[currentTestimonial].university}</p>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < testimonials[currentTestimonial].rating ? "text-yellow-400" : "text-gray-300",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-lg">"{testimonials[currentTestimonial].text}"</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
