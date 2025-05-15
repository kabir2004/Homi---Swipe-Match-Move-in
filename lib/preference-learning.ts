// Types for preference learning
export interface PreferenceProfile {
  lifestyle: Record<string, number> // e.g., "Clean": 0.8, "Social": -0.2
  interests: Record<string, number>
  studyHabits: Record<string, number>
  personalityTraits: Record<string, number>
  locationPreferences: Record<string, number>
}

// Initialize a new preference profile
export function initializePreferenceProfile(): PreferenceProfile {
  return {
    lifestyle: {},
    interests: {},
    studyHabits: {},
    personalityTraits: {},
    locationPreferences: {},
  }
}

// Update preference profile based on a swipe with enhanced learning rate for small datasets
export function updatePreferenceProfile(
  profile: PreferenceProfile,
  roommate: any,
  direction: "like" | "dislike",
  swipeCount = 0,
): PreferenceProfile {
  const newProfile = { ...profile }

  // Calculate adaptive weight - higher for early swipes to learn faster
  const baseWeight = direction === "like" ? 0.15 : -0.1
  const adaptiveWeight = swipeCount < 10 ? baseWeight * (1.5 - swipeCount / 10) : baseWeight

  // Update lifestyle preferences
  if (roommate.tags) {
    roommate.tags.forEach((tag: string) => {
      newProfile.lifestyle[tag] = (newProfile.lifestyle[tag] || 0) + adaptiveWeight
    })
  }

  // Update interests
  if (roommate.interests) {
    roommate.interests.forEach((interest: string) => {
      newProfile.interests[interest] = (newProfile.interests[interest] || 0) + adaptiveWeight
    })
  }

  // Update study habits
  if (roommate.lifestyle_preferences?.study_habits) {
    const habit = roommate.lifestyle_preferences.study_habits
    newProfile.studyHabits[habit] = (newProfile.studyHabits[habit] || 0) + adaptiveWeight
  }

  // Update personality traits
  if (roommate.personality_traits) {
    roommate.personality_traits.forEach((trait: string) => {
      newProfile.personalityTraits[trait] = (newProfile.personalityTraits[trait] || 0) + adaptiveWeight
    })
  }

  // Update location preferences
  if (roommate.university) {
    newProfile.locationPreferences[roommate.university] =
      (newProfile.locationPreferences[roommate.university] || 0) + adaptiveWeight
  }

  return newProfile
}

// Get top preferences from a profile
export function getTopPreferences(
  profile: PreferenceProfile,
  category: keyof PreferenceProfile,
  limit = 5,
): Array<[string, number]> {
  const categoryData = profile[category]
  return Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .filter(([_, value]) => value > 0)
}

// Get bottom preferences from a profile
export function getBottomPreferences(
  profile: PreferenceProfile,
  category: keyof PreferenceProfile,
  limit = 5,
): Array<[string, number]> {
  const categoryData = profile[category]
  return Object.entries(categoryData)
    .sort((a, b) => a[1] - b[1])
    .slice(0, limit)
    .filter(([_, value]) => value < 0)
}

// Calculate match score based on preference profile with enhanced accuracy for small datasets
export function calculateMatchScore(profile: PreferenceProfile, roommate: any): number {
  let score = 50 // Base score
  let factors = 0
  let totalWeight = 0
  let weightedScore = 0

  // Check lifestyle tags
  if (roommate.tags) {
    roommate.tags.forEach((tag: string) => {
      if (profile.lifestyle[tag] !== undefined) {
        const weight = 1.5 // Lifestyle is important
        weightedScore += profile.lifestyle[tag] * 100 * weight
        totalWeight += weight
        factors++
      }
    })
  }

  // Check interests
  if (roommate.interests) {
    roommate.interests.forEach((interest: string) => {
      if (profile.interests[interest] !== undefined) {
        const weight = 1.0 // Interests are moderately important
        weightedScore += profile.interests[interest] * 100 * weight
        totalWeight += weight
        factors++
      }
    })
  }

  // Check study habits
  if (
    roommate.lifestyle_preferences?.study_habits &&
    profile.studyHabits[roommate.lifestyle_preferences.study_habits] !== undefined
  ) {
    const weight = 1.8 // Study habits are very important
    weightedScore += profile.studyHabits[roommate.lifestyle_preferences.study_habits] * 100 * weight
    totalWeight += weight
    factors++
  }

  // Check personality traits
  if (roommate.personality_traits) {
    roommate.personality_traits.forEach((trait: string) => {
      if (profile.personalityTraits[trait] !== undefined) {
        const weight = 1.3 // Personality is important
        weightedScore += profile.personalityTraits[trait] * 100 * weight
        totalWeight += weight
        factors++
      }
    })
  }

  // Check location preferences
  if (roommate.university && profile.locationPreferences[roommate.university] !== undefined) {
    const weight = 1.2 // Location is important
    weightedScore += profile.locationPreferences[roommate.university] * 100 * weight
    totalWeight += weight
    factors++
  }

  // Calculate final score
  if (factors > 0 && totalWeight > 0) {
    score = Math.min(Math.max(Math.round(50 + weightedScore / totalWeight), 0), 100)
  }

  return score
}

// Sort roommates based on preference profile
export function sortRoommatesByPreference(profile: PreferenceProfile, roommates: any[]): any[] {
  return [...roommates].sort((a, b) => {
    const scoreA = calculateMatchScore(profile, a)
    const scoreB = calculateMatchScore(profile, b)
    return scoreB - scoreA
  })
}

// Bootstrap preference profile with initial data to accelerate learning
export function bootstrapPreferenceProfile(profile: PreferenceProfile, initialData: any): PreferenceProfile {
  const newProfile = { ...profile }

  // Add lifestyle preferences
  if (initialData.lifestyle) {
    Object.entries(initialData.lifestyle).forEach(([key, value]) => {
      newProfile.lifestyle[key] = (newProfile.lifestyle[key] || 0) + (value as number) * 0.3
    })
  }

  // Add interest preferences
  if (initialData.interests) {
    initialData.interests.forEach((interest: string) => {
      newProfile.interests[interest] = (newProfile.interests[interest] || 0) + 0.3
    })
  }

  // Add study habits
  if (initialData.studyHabits) {
    newProfile.studyHabits[initialData.studyHabits] = (newProfile.studyHabits[initialData.studyHabits] || 0) + 0.4
  }

  // Add personality traits
  if (initialData.personalityTraits) {
    initialData.personalityTraits.forEach((trait: string) => {
      newProfile.personalityTraits[trait] = (newProfile.personalityTraits[trait] || 0) + 0.3
    })
  }

  // Add location preferences
  if (initialData.university) {
    newProfile.locationPreferences[initialData.university] =
      (newProfile.locationPreferences[initialData.university] || 0) + 0.4
  }

  return newProfile
}

// Generate synthetic swipe data to enhance learning
export function generateSyntheticSwipes(profile: PreferenceProfile, count = 10): PreferenceProfile {
  const enhancedProfile = { ...profile }

  // For each category, amplify existing preferences
  Object.keys(enhancedProfile).forEach((category) => {
    const categoryKey = category as keyof PreferenceProfile
    const preferences = enhancedProfile[categoryKey]

    // Get top preferences
    const topPrefs = getTopPreferences(enhancedProfile, categoryKey, 3)

    // Amplify top preferences
    topPrefs.forEach(([key, value]) => {
      preferences[key] = value * 1.5
    })

    // Get bottom preferences
    const bottomPrefs = getBottomPreferences(enhancedProfile, categoryKey, 3)

    // Amplify bottom preferences
    bottomPrefs.forEach(([key, value]) => {
      preferences[key] = value * 1.5
    })
  })

  return enhancedProfile
}
