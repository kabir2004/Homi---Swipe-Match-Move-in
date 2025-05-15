"use client"

import type React from "react"

import { useState } from "react"
import { type PreferenceProfile, getTopPreferences, getBottomPreferences } from "@/lib/preference-learning"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Lightbulb, User2, Book, MapPin, Coffee, Info } from "lucide-react"

interface PreferenceInsightsProps {
  profile: PreferenceProfile
  swipeCount: number
  onQuickStart?: () => void
}

export function PreferenceInsights({ profile, swipeCount, onQuickStart }: PreferenceInsightsProps) {
  const [activeTab, setActiveTab] = useState<string>("lifestyle")

  // Show insights after fewer swipes (3 instead of 5)
  const hasEnoughData = swipeCount >= 3

  const categoryIcons: Record<string, React.ReactNode> = {
    lifestyle: <User2 className="h-4 w-4" />,
    interests: <Coffee className="h-4 w-4" />,
    studyHabits: <Book className="h-4 w-4" />,
    personalityTraits: <Lightbulb className="h-4 w-4" />,
    locationPreferences: <MapPin className="h-4 w-4" />,
  }

  const categoryLabels: Record<string, string> = {
    lifestyle: "Lifestyle",
    interests: "Interests",
    studyHabits: "Study Habits",
    personalityTraits: "Personality",
    locationPreferences: "Location",
  }

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="bg-blue-50 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          Preference Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {!hasEnoughData ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 mb-2">Keep swiping to build your preference profile</p>
            <Progress value={(swipeCount / 3) * 100} className="h-2" />
            <p className="text-xs text-gray-400 mt-2">{swipeCount}/3 swipes</p>

            {onQuickStart && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Want to see better matches right away?</p>
                <Button variant="outline" size="sm" onClick={onQuickStart} className="w-full">
                  <Info className="h-4 w-4 mr-2" />
                  Take Quick Preference Quiz
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-4">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <TabsTrigger key={key} value={key} className="text-xs py-1 px-2">
                    <span className="flex items-center gap-1">
                      {categoryIcons[key]}
                      <span className="hidden sm:inline">{label}</span>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(categoryLabels).map((category) => (
                <TabsContent key={category} value={category} className="pt-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <h4 className="text-sm font-medium">You prefer</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getTopPreferences(profile, category as keyof PreferenceProfile, 3).map(([pref, score]) => (
                          <Badge key={pref} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {pref} ({(score * 100).toFixed(0)}%)
                          </Badge>
                        ))}
                        {getTopPreferences(profile, category as keyof PreferenceProfile, 3).length === 0 && (
                          <span className="text-xs text-gray-500">No strong preferences yet</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <h4 className="text-sm font-medium">You avoid</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getBottomPreferences(profile, category as keyof PreferenceProfile, 3).map(([pref, score]) => (
                          <Badge key={pref} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {pref} ({(score * -100).toFixed(0)}%)
                          </Badge>
                        ))}
                        {getBottomPreferences(profile, category as keyof PreferenceProfile, 3).length === 0 && (
                          <span className="text-xs text-gray-500">No strong dislikes yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 italic">
                Based on your {swipeCount} swipes, we're learning your preferences. Keep swiping to refine results.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
