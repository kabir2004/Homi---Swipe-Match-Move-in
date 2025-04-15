"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { QuizQuestion } from "@/types"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuizSingleChoice } from "./quiz-single-choice"
import { QuizMultipleChoice } from "./quiz-multiple-choice"
import { QuizRange } from "./quiz-range"
import { QuizText } from "./quiz-text"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import confetti from "canvas-confetti"

interface QuizFormProps {
  questions: QuizQuestion[]
  onComplete: (results: Record<string, any>) => Promise<boolean>
}

export function QuizForm({ questions, onComplete }: QuizFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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
        setShowSuccess(true)
        // Trigger confetti effect
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#4F46E5", "#10B981", "#F59E0B"],
        })

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 2500)
      }
    } catch (error) {
      console.error("Error submitting quiz:", error)
    } finally {
      setIsSubmitting(false)
    }
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

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, times: [0, 0.8, 1] }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
        >
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-4">Perfect Match Coming Up!</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We're finding your ideal housing and roommate matches near your Ontario university based on your preferences.
        </p>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1, 0.98],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
          className="text-primary font-medium"
        >
          Redirecting to your dashboard...
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-gray-100 rounded-full overflow-hidden"
          indicatorClassName="bg-primary transition-all duration-500 ease-in-out"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          {renderQuestionComponent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 rounded-xl px-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion.key] || isSubmitting}
          className="bg-primary hover:bg-primary-600 text-white flex items-center gap-2 rounded-xl px-6 shadow-sm hover:shadow"
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
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
