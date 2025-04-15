"use client"
import type { QuizQuestion } from "@/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface QuizSingleChoiceProps {
  question: QuizQuestion
  value: string
  onChange: (value: string) => void
}

export function QuizSingleChoice({ question, value, onChange }: QuizSingleChoiceProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-3 pt-2">
        {question.options?.map((option, index) => (
          <motion.div
            key={option}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className={`flex items-center space-x-2 rounded-xl border-2 p-4 transition-all ${
              value === option
                ? "border-primary bg-primary-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <RadioGroupItem value={option} id={option} className="text-primary" />
            <Label
              htmlFor={option}
              className={`flex-1 cursor-pointer font-medium ${value === option ? "text-primary-900" : "text-gray-700"}`}
            >
              {option}
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  )
}
