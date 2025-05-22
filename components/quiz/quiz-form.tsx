"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { QuizQuestion } from "@/types"
import { Button } from "@/components/ui/button"
import { QuizSingleChoice } from "./quiz-single-choice"
import { QuizMultipleChoice } from "./quiz-multiple-choice"
import { QuizRange } from "./quiz-range"
import { QuizText } from "./quiz-text"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"

interface QuizFormProps {
  questions: QuizQuestion[]
  onComplete: (results: Record<string, any>) => Promise<boolean>
}

export function QuizForm({ questions, onComplete }: QuizFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const success = await onComplete(answers)

      if (success) {
        setIsCompleted(true)

        // Redirect after showing completion screen
        setTimeout(() => {
          router.push("/swipe")
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting quiz:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if the current question has a valid answer
  const hasValidAnswer = () => {
    const answer = answers[currentQuestion.key]
    if (answer === undefined || answer === null) return false
    if (currentQuestion.type === "multiple" && Array.isArray(answer)) return answer.length > 0
    if (currentQuestion.type === "text") return answer.trim() !== ""
    return true
  }

  const renderQuestionComponent = () => {
    switch (currentQuestion.type) {
      case "single":
        return (
          <QuizSingleChoice
            question={currentQuestion}
            value={answers[currentQuestion.key] || ""}
            onChange={(value) => handleAnswer(currentQuestion.key, value)}
          />
        )
      case "multiple":
        return (
          <QuizMultipleChoice
            question={currentQuestion}
            value={answers[currentQuestion.key] || []}
            onChange={(value) => handleAnswer(currentQuestion.key, value)}
          />
        )
      case "range":
        return (
          <QuizRange
            question={currentQuestion}
            value={answers[currentQuestion.key] || currentQuestion.min || 0}
            onChange={(value) => handleAnswer(currentQuestion.key, value)}
          />
        )
      case "text":
        return (
          <QuizText
            question={currentQuestion}
            value={answers[currentQuestion.key] || ""}
            onChange={(value) => handleAnswer(currentQuestion.key, value)}
          />
        )
      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="h-10 w-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
        <p className="text-gray-600 mb-8">
          Thank you for completing the quiz. We're now finding the best matches for you.
        </p>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentStep + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-sm"
        >
          {renderQuestionComponent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : currentStep < questions.length - 1 ? (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Complete
              <Check className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
