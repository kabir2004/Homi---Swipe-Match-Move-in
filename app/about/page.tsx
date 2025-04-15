"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  Check,
  Users,
  Building,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Home,
  Shield,
  Lightbulb,
  Target,
  Heart,
  School,
  Star,
} from "lucide-react"

export default function AboutPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const missionRef = useRef(null)
  const teamRef = useRef(null)
  const techRef = useRef(null)
  const partnersRef = useRef(null)

  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 })
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 })
  const isTechInView = useInView(techRef, { once: true, amount: 0.3 })
  const isPartnersInView = useInView(partnersRef, { once: true, amount: 0.3 })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsLoginModalOpen(false)
      // You would normally redirect or update state here
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsLoginModalOpen(false)
      // You would normally redirect or update state here
    }, 1500)
  }

  const stats = [
    { number: "3,500+", label: "Students Housed", icon: <Users className="h-6 w-6 text-primary" /> },
    { number: "1,200+", label: "Active Listings", icon: <Home className="h-6 w-6 text-primary" /> },
    { number: "7", label: "Ontario Universities", icon: <School className="h-6 w-6 text-primary" /> },
    { number: "95%", label: "Satisfaction Rate", icon: <Star className="h-6 w-6 text-primary" /> },
  ]

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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Revolutionizing Student Housing in Ontario</h1>
            <p className="text-lg text-gray-600 mb-8">
              Homi is on a mission to transform how Ontario university students find housing and roommates, making the
              process simpler, safer, and more personalized than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-primary hover:bg-primary-600 text-white rounded-full px-8"
              >
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section ref={missionRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">Our Mission</Badge>
              <h2 className="text-3xl font-bold mb-4">Solving the Student Housing Crisis</h2>
              <p className="text-gray-600 mb-6">
                The student housing market in Ontario is broken. Skyrocketing rents, scams, and a lack of quality
                options have created a crisis for university students. Homi was born from our own frustrating
                experiences as students.
              </p>
              <p className="text-gray-600 mb-6">
                We're building a platform that uses technology to match students with their ideal housing situations
                based on their unique preferences, budgets, and lifestyles. Our mission is to ensure every Ontario
                university student has access to safe, affordable, and suitable housing.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Personalized matching for housing and roommates</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Verified listings near Ontario universities</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Secure, in-app communication and scheduling</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isMissionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[4/3]">
                  <Image src="/people-together.png" alt="Students using Homi together" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Solving Real Problems</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 px-4 py-1.5">
              Our Vision & Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Building the Future of Student Housing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our vision is to create a world where every student has access to safe, affordable housing that meets
              their unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Student-Centered</h3>
              <p className="text-gray-600">
                We put students first in everything we do, designing our platform to address their unique housing needs
                and challenges. Every feature we build starts with the question: "How does this help students?"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                We verify all listings and prioritize user safety through secure communication and transparent
                processes. We're committed to creating a trustworthy platform where students feel safe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our platform with new features and technologies to better serve the student
                community. We're not afraid to challenge the status quo and reimagine the housing experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Housing</h3>
              <p className="text-gray-600">
                We're committed to connecting students with safe, affordable, and quality housing options near their
                universities. We believe that where you live impacts your academic success and wellbeing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Building</h3>
              <p className="text-gray-600">
                We believe in fostering positive living environments where students can thrive academically and
                socially. Our platform helps create communities where lasting friendships are formed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We're committed to making quality housing accessible to all students, regardless of background or
                budget. We believe that everyone deserves a great place to live during their university years.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section ref={teamRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200 px-4 py-1.5">Founder's Story</Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Kabir Saamir, Our Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The story behind Homi's creation and how we're transforming student housing across Ontario universities.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="h-64 relative">
                  <Image src="/founder.jpeg" alt="Kabir Saamir" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Kabir Saamir</h3>
                  <p className="text-primary font-medium mb-3">Founder & CEO</p>
                  <p className="text-gray-500 text-sm mb-2">Student at Wilfrid Laurier University</p>
                  <div className="flex space-x-3 mb-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-md h-full"
              >
                <h3 className="text-2xl font-bold mb-4">My Story</h3>
                <div className="prose prose-lg">
                  <p>Homi didn't start in an office. It started in frustration—and a bit of heartbreak.</p>
                  <p>
                    During my second year at Wilfrid Laurier University, I had a few unexpected experiences that shook
                    me. I got placed with people I didn't know, and it completely changed how I saw student housing. I
                    felt unsafe, unsupported, and honestly—alone. I realized it wasn't just me. A lot of students were
                    going through the same thing: scams, awkward roommate situations, misleading listings, and feeling
                    like there was no one to turn to.
                  </p>
                  <p>
                    So I started small—just helping a few friends find decent places and decent people to live with. I
                    put together a spreadsheet of trusted landlords. Then a group chat. Then it grew. That's how Homi
                    was born.
                  </p>
                  <p>
                    We're not a big company—we're students who've lived this ourselves. We built Homi because we know
                    what it feels like to not feel at home, and we're doing everything we can to change that.
                  </p>
                  <p>
                    At Homi, every listing is verified. We use AI to match roommates based on compatibility. And we're
                    building a platform that actually puts students first—not landlords, not middlemen.
                  </p>
                  <p>
                    Over 3,500 students in Ontario have found safer housing through Homi. But we're still just getting
                    started. We're building something that speaks for every student who's ever felt anxious, scammed, or
                    stuck when it came to finding a place to live.
                  </p>
                  <p>Because every student deserves a place that feels like home.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Team</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate people who want to make a difference in the student housing market.
            </p>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/careers">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 border-yellow-200 px-4 py-1.5">Student Success</Badge>
            <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied students who found their perfect housing match with Homi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.university}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section ref={techRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isTechInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="order-2 md:order-1"
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 px-4 py-1.5">Our Technology</Badge>
              <h2 className="text-3xl font-bold mb-4">Powered by AI and Data Science</h2>
              <p className="text-gray-600 mb-6">
                At the heart of Homi is our proprietary matching algorithm that uses artificial intelligence and machine
                learning to connect students with their ideal housing and roommates. Our technology analyzes hundreds of
                data points to create personalized matches based on lifestyle preferences, study habits, and housing
                needs.
              </p>

              <p className="text-gray-600 mb-6">
                We've built a platform that not only simplifies the search process but also improves match quality
                through continuous learning. As more students use Homi, our algorithm gets smarter, delivering
                increasingly accurate recommendations.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 bg-purple-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="ml-3 text-gray-600">AI-powered matching algorithm</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-purple-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Real-time availability updates</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-purple-100 rounded-full p-1">
                    <Check className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="ml-3 text-gray-600">Secure messaging and verification system</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isTechInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="relative order-1 md:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-[4/3]">
                  <Image src="/homi-data.png" alt="Our technology" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium">AI-Powered Matching</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section ref={partnersRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">Our Partners</Badge>
            <h2 className="text-3xl font-bold mb-4">Working with Ontario Universities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with universities across Ontario to improve the housing experience for their students.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { id: "uoft", name: "University of Toronto", logo: "/universities/uoft3d.png" },
              { id: "western", name: "Western University", logo: "/universities/western3d.png" },
              { id: "mcmaster", name: "McMaster University", logo: "/universities/mcmaster3d.png" },
              { id: "queens", name: "Queen's University", logo: "/universities/queens3d.png" },
              { id: "waterloo", name: "University of Waterloo", logo: "/universities/waterloo3d.png" },
              { id: "tmu", name: "Toronto Metropolitan University", logo: "/universities/tmu3d.png" },
              { id: "york", name: "York University", logo: "/universities/york3d.png" },
              { id: "ottawa", name: "University of Ottawa", logo: "/universities/ottawa3d.png" },
            ].map((university, index) => (
              <motion.div
                key={university.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isPartnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 h-20 flex items-center justify-center">
                  <Image
                    src={university.logo || "/placeholder.svg"}
                    alt={university.name}
                    width={100}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-sm">{university.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Are you a university or housing provider interested in partnering with Homi? We'd love to hear from you.
            </p>
            <Button asChild className="bg-primary hover:bg-primary-600 text-white rounded-full">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200 px-4 py-1.5">Common Questions</Badge>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about Homi</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-xl shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">
                    What makes Homi different from other housing platforms?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Homi is specifically designed for Ontario university students, with verified listings near campus and
                  AI-powered roommate matching. Unlike general housing platforms, we focus exclusively on the unique
                  needs of students, with features like compatibility scoring, university proximity filters, and
                  student-specific amenities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-xl shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">Is Homi free for students?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Yes, Homi is completely free for students to use. We make our revenue from landlords and property
                  managers who list their properties on our platform. Our mission is to make quality housing accessible
                  to all students.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-xl shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">How do you verify listings?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Our team verifies all listings through a combination of virtual and in-person checks, property
                  documentation review, and landlord verification to ensure the safety and accuracy of all listings. We
                  also collect feedback from students who have viewed or lived in the properties.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-xl shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">How does roommate matching work?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Our AI-powered matching algorithm analyzes your preferences, lifestyle habits, study patterns, and
                  personality traits to find compatible roommates. You'll receive a compatibility score for each
                  potential match, and you can chat with them directly through our platform before making any decisions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-xl shadow-sm border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-semibold">I'm a landlord. How can I list my property?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  We'd love to have your property on Homi! You can create a landlord account and submit your listing
                  through our platform. Our team will verify your property before it goes live. We offer various listing
                  packages to help you reach the right students for your property.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 px-4 py-1.5">Looking Forward</Badge>
            <h2 className="text-3xl font-bold mb-4">Our Roadmap</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're constantly evolving and improving Homi to better serve the student community. Here's what's coming
              next:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {[
                {
                  title: "Expansion to More Universities",
                  description:
                    "We're expanding to more universities across Canada, bringing Homi to even more students.",
                  timeline: "In Progress",
                  icon: <School className="h-6 w-6 text-white" />,
                  iconBg: "bg-blue-500",
                },
                {
                  title: "Enhanced Roommate Matching",
                  description:
                    "We're improving our AI algorithm to provide even more accurate roommate matches based on compatibility.",
                  timeline: "Coming Q3 2023",
                  icon: <Users className="h-6 w-6 text-white" />,
                  iconBg: "bg-purple-500",
                },
                {
                  title: "Virtual Tours",
                  description:
                    "Soon you'll be able to take virtual tours of properties without leaving the Homi platform.",
                  timeline: "Coming Q4 2023",
                  icon: <Home className="h-6 w-6 text-white" />,
                  iconBg: "bg-green-500",
                },
                {
                  title: "Rental Payments & Management",
                  description:
                    "We're building tools to help students and landlords manage rent payments and maintenance requests.",
                  timeline: "Coming 2024",
                  icon: <Building className="h-6 w-6 text-white" />,
                  iconBg: "bg-primary",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-12 pb-12"
                >
                  <div
                    className={`absolute left-0 top-0 w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center z-10`}
                  >
                    {item.icon}
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {item.timeline}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-br from-primary via-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-primary-300/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-primary-300/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)]"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Housing Revolution</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Be part of the movement to transform student housing in Ontario. Whether you're a student, landlord, or
                university partner, there's a place for you at Homi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full px-8"
                >
                  Join as a Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8"
                >
                  <Link href="/landlords">
                    List Your Property
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Login/Signup Modal */}
      {isLoginModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsLoginModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "login" | "signup")}
            >
              <div className="px-6 pt-6">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login" className="text-sm">
                    Log In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="#" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-primary-600" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Log In"
                        )}
                      </Button>

                      <div className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline font-medium"
                          onClick={() => setActiveTab("signup")}
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <select
                          id="university"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                        >
                          <option value="">Select your university</option>
                          <option value="uoft">University of Toronto</option>
                          <option value="waterloo">University of Waterloo</option>
                          <option value="western">Western University</option>
                          <option value="queens">Queen's University</option>
                          <option value="mcmaster">McMaster University</option>
                          <option value="ryerson">Toronto Metropolitan University</option>
                          <option value="york">York University</option>
                        </select>
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-primary-600" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                      <div className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline font-medium"
                          onClick={() => setActiveTab("login")}
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
