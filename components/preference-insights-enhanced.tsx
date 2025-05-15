"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type PreferenceProfile, bootstrapPreferences, getPreferenceInsights } from "@/lib/preference-learning-enhanced"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface PreferenceInsightsProps {
  preferenceProfile: PreferenceProfile
  onBootstrap: (profile: PreferenceProfile) => void
}

export function PreferenceInsightsEnhanced({ preferenceProfile, onBootstrap }: PreferenceInsightsProps) {
  const [showQuickStart, setShowQuickStart] = useState(false)
  const [quickPreferences, setQuickPreferences] = useState({
    cleanliness: 5,
    noise: 5,
    socialLevel: 5,
    smoking: false,
    sleepSchedule: "Regular",
    studyHabits: "Mixed",
    guests: "Occasionally",
  })

  const insights = getPreferenceInsights(preferenceProfile)

  // Calculate overall confidence
  const confidenceValues = Object.values(preferenceProfile).map((pref) => pref?.confidence || 0)

  const averageConfidence =
    confidenceValues.length > 0 ? confidenceValues.reduce((sum, val) => sum + val, 0) / confidenceValues.length : 0

  // Prepare data for visualization
  const confidenceData = Object.entries(preferenceProfile)
    .map(([category, data]) => ({
      category,
      confidence: Math.round((data?.confidence || 0) * 100),
    }))
    .filter((item) => item.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)

  const handleBootstrap = () => {
    const bootstrappedProfile = bootstrapPreferences(quickPreferences)
    onBootstrap(bootstrappedProfile)
    setShowQuickStart(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Preference Insights</span>
            <span className="text-sm font-normal text-muted-foreground">
              {Math.round(averageConfidence * 100)}% Confidence
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.length > 0 ? (
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium capitalize">{insight.category}</span>
                    <span className="text-muted-foreground">{Math.round(insight.confidence * 100)}%</span>
                  </div>
                  <p className="text-sm">{insight.insight}</p>
                </div>
              ))}

              {confidenceData.length > 0 && (
                <div className="mt-4 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={confidenceData}>
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="confidence" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-3">Not enough data to generate insights.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
