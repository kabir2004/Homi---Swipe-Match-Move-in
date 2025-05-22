"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { QuizForm } from "@/components/quiz/quiz-form"
import type { QuizQuestion } from "@/types"
import { ONTARIO_UNIVERSITIES } from "@/types"
import { getSupabaseClient } from "@/lib/supabase"

const quizQuestions: QuizQuestion[] = [
  {
    key: "university",
    question: "Which Ontario university will you be attending?",
    type: "single",
    options: ONTARIO_UNIVERSITIES.map((uni) => uni.name),
  },
  {
    key: "campus",
    question: "Which campus will you be attending?",
    type: "single",
    options: ["Main Campus", "Satellite Campus", "Not Sure Yet"],
  },
  {
    key: "housing_type",
    question: "What type of housing are you looking for?",
    type: "single",
    options: ["Apartment", "House", "Townhouse", "Studio", "Room in Shared Housing"],
  },
  {
    key: "budget",
    question: "What's your monthly budget for housing?",
    type: "range",
    min: 500,
    max: 3000,
  },
  {
    key: "roommates",
    question: "Are you looking for roommates?",
    type: "single",
    options: ["Yes, I want to find roommates", "No, I prefer to live alone", "I already have roommates"],
  },
  {
    key: "distance",
    question: "How far from campus are you willing to live?",
    type: "range",
    min: 1,
    max: 30,
  },
  {
    key: "move_in_date",
    question: "When do you plan to move in?",
    type: "single",
    options: ["Immediately", "Within 1 month", "1-3 months", "3+ months"],
  },
  {
    key: "amenities",
    question: "Which amenities are important to you?",
    type: "multiple",
    options: [
      "In-unit Laundry",
      "Gym",
      "Parking",
      "Pet-friendly",
      "Furnished",
      "Utilities Included",
      "Air Conditioning",
      "Balcony/Patio",
    ],
  },
  {
    key: "lifestyle",
    question: "How would you describe your lifestyle?",
    type: "multiple",
    options: ["Studious", "Social", "Clean", "Early Riser", "Night Owl", "Active", "Quiet", "Foodie"],
  },
  {
    key: "study_habits",
    question: "What are your study habits?",
    type: "single",
    options: [
      "I study mostly at home",
      "I study mostly at the library/campus",
      "I study in cafes/public spaces",
      "Mix of all options",
    ],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async (results: Record<string, any>) => {
    setIsSubmitting(true)

    try {
      // Save quiz results to Supabase
      const supabase = getSupabaseClient()

      // Generate a mock user ID for demo purposes
      const mockUserId = "demo-user-id"

      await supabase.from("user_preferences").upsert({
        user_id: mockUserId,
        preferences: results,
      })

      // Wait a moment to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return true
    } catch (error) {
      console.error("Error saving quiz results:", error)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Match</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Answer a few questions to help us find the best housing and roommate options for you near your Ontario
              university.
            </p>
          </div>

          <QuizForm questions={quizQuestions} onComplete={handleComplete} />
        </div>
      </main>
    </div>
  )
}
