"use client"

import { useState, useEffect } from "react"
import type { QuizQuestion } from "@/types"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"

interface QuizRangeProps {
  question: QuizQuestion
  value: number
  onChange: (value: number) => void
}

export function QuizRange({ question, value, onChange }: QuizRangeProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  const handleChange = (values: number[]) => {
    setDisplayValue(values[0])
    onChange(values[0])
  }

  // Determine if this is a budget question
  const isBudget = question.key.toLowerCase().includes("budget") || question.key.toLowerCase().includes("price")
  const isDistance = question.key.toLowerCase().includes("distance")

  // Get appropriate label based on question type
  const getValueLabel = () => {
    if (isBudget) {
      return `$${displayValue}`
    } else if (isDistance) {
      return `${displayValue} km`
    }
    return displayValue
  }

  // Get appropriate description
  const getDescription = () => {
    if (isBudget) {
      if (displayValue < 1000) return "Budget-friendly"
      if (displayValue < 1500) return "Mid-range"
      if (displayValue < 2000) return "Premium"
      return "Luxury"
    } else if (isDistance) {
      if (displayValue <= 5) return "Walking distance"
      if (displayValue <= 10) return "Short commute"
      if (displayValue <= 20) return "Medium commute"
      return "Long commute"
    }
    return ""
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>

      <div className="space-y-8 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayValue}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <span className="text-4xl font-bold text-primary">{getValueLabel()}</span>
            {getDescription() && <div className="mt-2 text-sm font-medium text-gray-500">{getDescription()}</div>}
          </motion.div>
        </AnimatePresence>

        <div className="px-2">
          <Slider
            defaultValue={[value]}
            value={[displayValue]}
            min={question.min || 0}
            max={question.max || 100}
            step={isBudget ? 50 : 1}
            onValueChange={handleChange}
            className="py-4"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>{isBudget ? `$${question.min}` : question.min}</span>
          <span>{isBudget ? `$${question.max}` : question.max}</span>
        </div>
      </div>
    </div>
  )
}
