"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Home, User2, MessageSquare, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Homi",
      description: "The #1 platform for finding your perfect university housing and roommates in Ontario.",
      image: "/homi-building.png",
      color: "from-primary-50 to-white",
    },
    {
      title: "Take the Quiz",
      description: "Answer a few questions about your preferences to help us find your perfect match.",
      image: "/homi-profile.png",
      color: "from-blue-50 to-white",
    },
    {
      title: "Swipe & Match",
      description: "Browse personalized housing and roommate recommendations with our intuitive swipe interface.",
      image: "/browse-homi.png",
      color: "from-green-50 to-white",
    },
    {
      title: "Connect & Move In",
      description: "Chat with potential roommates, schedule viewings, and secure your perfect housing match.",
      image: "/homi-connect.png",
      color: "from-purple-50 to-white",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        {/* Progress Indicator */}
        <div className="fixed top-16 left-0 right-0 h-1 bg-gray-100 z-10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Step Indicators */}
            <div className="hidden md:flex justify-center mb-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full mx-1 transition-all",
                    currentStep === index ? "bg-primary scale-125" : "bg-gray-300",
                  )}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <div className={`bg-gradient-to-b ${steps[currentStep].color} p-6 md:p-8`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="order-2 md:order-1">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                          Step {currentStep + 1} of {steps.length}
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{steps[currentStep].title}</h1>
                        <p className="text-gray-600 text-lg mb-6">{steps[currentStep].description}</p>

                        {currentStep === 0 && (
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Why choose Homi?</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Verified listings near Ontario universities</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>AI-powered roommate matching</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>In-app messaging and scheduling</span>
                              </li>
                            </ul>
                          </div>
                        )}

                        {currentStep === 1 && (
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">The quiz helps us understand:</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Your budget and location preferences</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Your lifestyle and study habits</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Your roommate compatibility factors</span>
                              </li>
                            </ul>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Our matching system provides:</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Personalized housing recommendations</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Compatible roommate suggestions</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Detailed match percentage explanations</span>
                              </li>
                            </ul>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Connect with your matches:</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Secure in-app messaging</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Viewing scheduler with reminders</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Application and lease management</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="order-1 md:order-2">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={steps[currentStep].image || "/placeholder.svg"}
                            alt={steps[currentStep].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="p-6 border-t flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className={currentStep === 0 ? "invisible" : ""}
                    >
                      Back
                    </Button>

                    {currentStep < steps.length - 1 ? (
                      <Button onClick={handleNext}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button asChild className="bg-primary hover:bg-primary-600">
                        <Link href="/quiz">
                          Start the Quiz
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Skip to Quiz Button */}
            {currentStep < steps.length - 1 && (
              <div className="text-center mt-6">
                <Button asChild variant="link" className="text-gray-500 hover:text-primary">
                  <Link href="/quiz">Skip to Quiz</Link>
                </Button>
              </div>
            )}

            {/* Features Preview */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-sm">Housing</h3>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User2 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-sm">Roommates</h3>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium text-sm">Messaging</h3>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-sm">Favorites</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
