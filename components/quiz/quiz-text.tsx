"use client"

import type { QuizQuestion } from "@/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface QuizTextProps {
  question: QuizQuestion
  value: string
  onChange: (value: string) => void
}

export function QuizText({ question, value, onChange }: QuizTextProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>

      <div className="space-y-2 pt-2">
        <Label htmlFor={question.key} className="text-gray-700">
          Your answer
        </Label>
        <Input
          id={question.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-2 border-gray-200 focus:border-primary focus:ring-primary rounded-xl"
        />
      </div>
    </div>
  )
}
