"use client"

import type { QuizQuestion } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface QuizMultipleChoiceProps {
  question: QuizQuestion
  value: string[]
  onChange: (value: string[]) => void
}

export function QuizMultipleChoice({ question, value, onChange }: QuizMultipleChoiceProps) {
  // Add console logs to debug
  console.log("QuizMultipleChoice question:", question)
  console.log("QuizMultipleChoice options:", question.options)

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>
      <p className="text-gray-500 text-sm">Select all that apply</p>

      {question.options && question.options.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {question.options.map((option, index) => {
            const isSelected = value.includes(option)

            return (
              <motion.div
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex items-center space-x-2 rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? "border-primary bg-primary-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Checkbox
                  id={option}
                  checked={isSelected}
                  onCheckedChange={() => handleToggle(option)}
                  className="text-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <Label
                  htmlFor={option}
                  className={`flex-1 cursor-pointer font-medium ${isSelected ? "text-primary-900" : "text-gray-700"}`}
                >
                  {option}
                </Label>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-red-500">No options available for this question</div>
      )}
    </div>
  )
}
