"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"

interface PreferenceQuizProps {
  onComplete: (preferences: any) => void
  onCancel: () => void
}

export function PreferenceQuiz({ onComplete, onCancel }: PreferenceQuizProps) {
  const [preferences, setPreferences] = useState({
    lifestyle: {
      Clean: 0.5,
      Organized: 0.3,
    },
    studyHabits: "Quiet study environment",
    personalityTraits: ["Respectful", "Responsible"],
    interests: [],
    cleanliness: 5,
    noise: 5,
    socializing: 5,
    sleepSchedule: "Regular",
  })

  const handleSliderChange = (key: string, value: number[]) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value[0],
    }))
  }

  const handleRadioChange = (key: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    setPreferences((prev) => {
      const currentValues = prev[key] || []
      return {
        ...prev,
        [key]: checked ? [...currentValues, value] : currentValues.filter((item: string) => item !== value),
      }
    })
  }

  const handleSubmit = () => {
    onComplete(preferences)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quick Preference Quiz</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Help us understand your preferences to find better roommate matches</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>How clean do you prefer your living space?</Label>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Relaxed</span>
            <span>Very Clean</span>
          </div>
          <Slider
            defaultValue={[preferences.cleanliness]}
            max={10}
            step={1}
            onValueChange={(value) => handleSliderChange("cleanliness", value)}
          />
        </div>

        <div className="space-y-2">
          <Label>What noise level are you comfortable with?</Label>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Very Quiet</span>
            <span>Lively</span>
          </div>
          <Slider
            defaultValue={[preferences.noise]}
            max={10}
            step={1}
            onValueChange={(value) => handleSliderChange("noise", value)}
          />
        </div>

        <div className="space-y-2">
          <Label>How social do you want your roommate to be?</Label>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Private</span>
            <span>Very Social</span>
          </div>
          <Slider
            defaultValue={[preferences.socializing]}
            max={10}
            step={1}
            onValueChange={(value) => handleSliderChange("socializing", value)}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>What's your sleep schedule?</Label>
          <RadioGroup
            defaultValue={preferences.sleepSchedule}
            onValueChange={(value) => handleRadioChange("sleepSchedule", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Early bird" id="early" />
              <Label htmlFor="early">Early bird (before 11pm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Regular" id="regular" />
              <Label htmlFor="regular">Regular (11pm-1am)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Night owl" id="night" />
              <Label htmlFor="night">Night owl (after 1am)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>What study habits do you prefer?</Label>
          <RadioGroup
            defaultValue={preferences.studyHabits}
            onValueChange={(value) => handleRadioChange("studyHabits", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Quiet study environment" id="quiet" />
              <Label htmlFor="quiet">Quiet study environment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Moderate background noise" id="moderate" />
              <Label htmlFor="moderate">Moderate background noise</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Flexible study habits" id="flexible" />
              <Label htmlFor="flexible">Flexible study habits</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Select personality traits you value in a roommate:</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Respectful", "Responsible", "Friendly", "Organized", "Easygoing", "Communicative"].map((trait) => (
              <div key={trait} className="flex items-center space-x-2">
                <Checkbox
                  id={trait.toLowerCase()}
                  checked={preferences.personalityTraits.includes(trait)}
                  onCheckedChange={(checked) => handleCheckboxChange("personalityTraits", trait, checked as boolean)}
                />
                <Label htmlFor={trait.toLowerCase()}>{trait}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
