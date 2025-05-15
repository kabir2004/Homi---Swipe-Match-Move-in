import type { RoommateProfile } from "@/types"

// Define preference categories and their weights
export const preferenceCategories = {
  cleanliness: { weight: 1.5 },
  noise: { weight: 1.3 },
  socialLevel: { weight: 1.2 },
  sleepSchedule: { weight: 1.0 },
  studyHabits: { weight: 1.1 },
  guests: { weight: 0.9 },
  smoking: { weight: 1.4 },
  drinking: { weight: 0.8 },
  pets: { weight: 1.0 },
  cooking: { weight: 0.7 },
  sharedItems: { weight: 0.6 },
  personality: { weight: 1.2 },
}

// Define the preference profile structure
export type PreferenceProfile = {
  [key in keyof typeof preferenceCategories]?: {
    value: number | string | boolean
    confidence: number // 0-1 scale
    swipeData: Array<{
      value: number | string | boolean
      action: "like" | "dislike"
    }>
  }
}

// Initialize an empty preference profile
export const initializePreferenceProfile = (): PreferenceProfile => {
  const profile: PreferenceProfile = {}

  Object.keys(preferenceCategories).forEach((category) => {
    profile[category as keyof typeof preferenceCategories] = {
      value: null as any, // Will be determined through learning
      confidence: 0,
      swipeData: [],
    }
  })

  return profile
}

// Update preference profile based on a swipe action
export const updatePreferenceProfile = (
  profile: PreferenceProfile,
  roommate: RoommateProfile,
  action: "like" | "dislike",
): PreferenceProfile => {
  const updatedProfile = { ...profile }

  // For each preference category that exists in both the profile and roommate
  Object.keys(preferenceCategories).forEach((category) => {
    const key = category as keyof typeof preferenceCategories

    if (roommate[key] !== undefined && updatedProfile[key]) {
      // Add this swipe data to the category
      updatedProfile[key]!.swipeData.push({
        value: roommate[key] as any,
        action,
      })

      // Analyze the swipe data to determine the preferred value
      const { value, confidence } = analyzePreference(updatedProfile[key]!.swipeData)

      updatedProfile[key]!.value = value
      updatedProfile[key]!.confidence = confidence
    }
  })

  return updatedProfile
}

// Analyze swipe data to determine preference
const analyzePreference = (
  swipeData: Array<{
    value: number | string | boolean
    action: "like" | "dislike"
  }>,
): { value: any; confidence: number } => {
  // If no data, return null with zero confidence
  if (swipeData.length === 0) {
    return { value: null, confidence: 0 }
  }

  // For boolean values
  if (typeof swipeData[0].value === "boolean") {
    const trueCount =
      swipeData.filter((d) => d.value === true && d.action === "like").length +
      swipeData.filter((d) => d.value === false && d.action === "dislike").length

    const falseCount =
      swipeData.filter((d) => d.value === false && d.action === "like").length +
      swipeData.filter((d) => d.value === true && d.action === "dislike").length

    const value = trueCount > falseCount
    const confidence = Math.min(0.3 + (Math.abs(trueCount - falseCount) / swipeData.length) * 0.7, 1)

    return { value, confidence }
  }

  // For numeric values
  if (typeof swipeData[0].value === "number") {
    // Calculate weighted average based on likes/dislikes
    let weightedSum = 0
    let weightSum = 0

    swipeData.forEach((d) => {
      const weight = d.action === "like" ? 1 : -0.5 // Likes have more weight than dislikes
      weightedSum += (d.value as number) * weight
      weightSum += Math.abs(weight)
    })

    const value = weightSum !== 0 ? weightedSum / weightSum : 0
    const confidence = Math.min(0.2 + (swipeData.length / 10) * 0.8, 1) // Confidence increases with more data

    return { value, confidence }
  }

  // For string values (categorical)
  if (typeof swipeData[0].value === "string") {
    const valueCounts: Record<string, { likes: number; dislikes: number }> = {}

    // Count likes and dislikes for each value
    swipeData.forEach((d) => {
      const val = d.value as string
      if (!valueCounts[val]) {
        valueCounts[val] = { likes: 0, dislikes: 0 }
      }

      if (d.action === "like") {
        valueCounts[val].likes++
      } else {
        valueCounts[val].dislikes++
      }
    })

    // Find the value with the highest score (likes - dislikes)
    let bestValue = ""
    let bestScore = Number.NEGATIVE_INFINITY

    Object.entries(valueCounts).forEach(([val, counts]) => {
      const score = counts.likes - counts.dislikes * 0.5
      if (score > bestScore) {
        bestScore = score
        bestValue = val
      }
    })

    const totalItems = swipeData.length
    const confidence = Math.min(0.2 + (totalItems / 10) * 0.8, 1)

    return { value: bestValue, confidence }
  }

  return { value: null, confidence: 0 }
}

// Calculate match score between a roommate and the preference profile
export const calculateMatchScore = (
  profile: PreferenceProfile,
  roommate: RoommateProfile,
): { score: number; breakdown: Record<string, number> } => {
  let totalScore = 0
  let totalWeight = 0
  const breakdown: Record<string, number> = {}

  Object.keys(preferenceCategories).forEach((category) => {
    const key = category as keyof typeof preferenceCategories
    const { weight } = preferenceCategories[key]

    // Skip if we don't have a preference for this category or roommate doesn't have this attribute
    if (!profile[key] || profile[key]!.confidence === 0 || roommate[key] === undefined) {
      breakdown[key] = 0
      return
    }

    const preferredValue = profile[key]!.value
    const roommateValue = roommate[key]
    const confidence = profile[key]!.confidence

    // Calculate category score based on value type
    let categoryScore = 0

    if (typeof preferredValue === "boolean" && typeof roommateValue === "boolean") {
      categoryScore = preferredValue === roommateValue ? 1 : 0
    } else if (typeof preferredValue === "number" && typeof roommateValue === "number") {
      // For numeric values, calculate similarity (1 - normalized difference)
      const maxRange = 10 // Assuming values are on a 0-10 scale
      const normalizedDiff = Math.abs(preferredValue - roommateValue) / maxRange
      categoryScore = 1 - Math.min(normalizedDiff, 1)
    } else if (typeof preferredValue === "string" && typeof roommateValue === "string") {
      categoryScore = preferredValue === roommateValue ? 1 : 0
    }

    // Apply confidence and weight
    const weightedScore = categoryScore * confidence * weight
    totalScore += weightedScore
    totalWeight += weight * confidence

    // Store in breakdown
    breakdown[key] = categoryScore * 100 // Convert to percentage
  })

  // Calculate final score (0-100)
  const finalScore = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 50

  return {
    score: Math.round(finalScore),
    breakdown,
  }
}

// Bootstrap preference learning with initial data
export const bootstrapPreferences = (initialPreferences: Record<string, any>): PreferenceProfile => {
  const profile = initializePreferenceProfile()

  Object.keys(initialPreferences).forEach((key) => {
    const category = key as keyof typeof preferenceCategories

    if (profile[category]) {
      profile[category]!.value = initialPreferences[key]
      profile[category]!.confidence = 0.5 // Medium confidence for bootstrapped values

      // Add synthetic swipe data to support the preference
      profile[category]!.swipeData = [
        { value: initialPreferences[key], action: "like" },
        { value: initialPreferences[key], action: "like" },
        // Add opposite values as dislikes for boolean/categorical
        ...(typeof initialPreferences[key] === "boolean"
          ? [{ value: !initialPreferences[key], action: "dislike" as const }]
          : []),
      ]
    }
  })

  return profile
}

// Get insights about the user's preferences
export const getPreferenceInsights = (
  profile: PreferenceProfile,
): Array<{
  category: string
  insight: string
  confidence: number
}> => {
  const insights: Array<{
    category: string
    insight: string
    confidence: number
  }> = []

  // Generate insights for each category with sufficient confidence
  Object.keys(preferenceCategories).forEach((category) => {
    const key = category as keyof typeof preferenceCategories
    const pref = profile[key]

    if (!pref || pref.confidence < 0.4) return // Skip low confidence preferences

    let insight = ""
    const value = pref.value

    switch (key) {
      case "cleanliness":
        insight =
          typeof value === "number"
            ? value > 7
              ? "You strongly prefer very clean roommates"
              : value > 4
                ? "You prefer moderately clean roommates"
                : "You're comfortable with more relaxed cleaning habits"
            : ""
        break
      case "noise":
        insight =
          typeof value === "number"
            ? value > 7
              ? "You prefer roommates who are very quiet"
              : value > 4
                ? "You're okay with moderate noise levels"
                : "You're comfortable with louder environments"
            : ""
        break
      case "socialLevel":
        insight =
          typeof value === "number"
            ? value > 7
              ? "You prefer very social roommates"
              : value > 4
                ? "You prefer moderately social roommates"
                : "You prefer roommates who are less social"
            : ""
        break
      case "smoking":
        insight =
          typeof value === "boolean"
            ? value
              ? "You prefer roommates who are okay with smoking"
              : "You prefer non-smoking roommates"
            : ""
        break
      // Add more cases for other categories
      default:
        insight = `You have a preference for ${key}: ${value}`
    }

    if (insight) {
      insights.push({
        category: key,
        insight,
        confidence: pref.confidence,
      })
    }
  })

  return insights.sort((a, b) => b.confidence - a.confidence)
}

// Generate more diverse roommate profiles for better learning
export const generateDiverseRoommateProfiles = (count: number): RoommateProfile[] => {
  const profiles: RoommateProfile[] = []
  
  // Helper function to get random value
  const getRandomValue = <T>(values: T[]): T => {
    return values[Math.floor(Math.random() * values.length)]
  }
  
  // Helper function to get random number in range
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  // Names for diverse profiles
  const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Jamie', 'Skyler', 'Cameron', 'Reese', 'Finley', 'Dakota', 'Hayden', 'Rowan',
    'Sasha', 'Kai', 'Jaden', 'Phoenix', 'Remy', 'Emerson', 'Harley', 'River',
    'Ari', 'Sage', 'Blair', 'Ellis', 'Parker', 'Sawyer', 'Zion', 'Lennox',
    'Noor', 'Ravi', 'Chen', 'Yara', 'Amir', 'Zara', 'Omar', 'Leila', 'Mateo',
    'Sofia', 'Dante', 'Nia', 'Kenji', 'Mei', 'Raj', 'Priya', 'Jamal', 'Amara'
  ]
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter',
    'Patel', 'Kim', 'Zhang', 'Wong', 'Singh', 'Kumar', 'Ali', 'Khan', 'Chen', 'Yang'
  ]
  
  // Universities
  const universities = [
    'University of Toronto', 'Western University', 'Queen\'s University', 
    'McMaster University', 'York University', 'Toronto Metropolitan University',
    'Wilfrid Laurier University', 'University of Waterloo'
  ]
  
  // Programs
  const programs = [
    'Computer Science', 'Engineering', 'Business', 'Psychology', 'Biology',
    'English Literature', 'History', 'Mathematics', 'Physics', 'Chemistry',
    'Political Science', 'Sociology', 'Economics', 'Art History', 'Music',
    'Film Studies', 'Environmental Science', 'Nursing', 'Education', 'Architecture',
    'Kinesiology', 'Philosophy', 'Anthropology', 'Communications', 'Marketing'
  ]
  
  // Hobbies
  const hobbies = [
    'Reading', 'Gaming', 'Hiking', 'Cooking', 'Photography', 'Painting',
    'Playing guitar', 'Yoga', 'Running', 'Swimming', 'Cycling', 'Singing',
    'Dancing', 'Knitting', 'Gardening', 'Watching movies', 'Traveling',
    'Baking', 'Rock climbing', 'Skateboarding', 'Pottery', 'Meditation',
    'Basketball', 'Soccer', 'Tennis', 'Volleyball', 'Chess', 'Coding'
  ]
  
  // Generate diverse profiles
  for (let i = 0; i < count; i++) {
    const firstName = getRandomValue(firstNames)
    const lastName = getRandomValue(lastNames)
    const id = `profile-${i + 1}`
    
    const profile: RoommateProfile = {
      id: id,
      name: `${firstName} ${lastName}`,
      age: getRandomNumber(18, 30),
      gender: getRandomValue(['Male', 'Female', 'Non-binary']),
      university: getRandomValue(universities),
      program: getRandomValue(programs),
      year: getRandomValue([1, 2, 3, 4, 'Masters', 'PhD']),
      bio: `Hi, I'm ${firstName}! I'm studying ${getRandomValue(programs)} and looking for a compatible roommate.`,
      hobbies: Array.from({ length: getRandomNumber(2, 4) }, () => getRandomValue(hobbies)),
      profileImage: `/placeholder.svg?height=400&width=400&query=student%20portrait%20${firstName}`,
      
      // Preference categories with diverse values
      cleanliness: getRandomNumber(1, 10),
      noise: getRandomNumber(1, 10),
      socialLevel: getRandomNumber(1, 10),
      sleepSchedule: getRandomValue(['Early bird', 'Night owl', 'Regular']),
      studyHabits: getRandomValue(['At home', 'Library', 'Coffee shops', 'Mixed']),
      guests: getRandomValue(['Frequently', 'Occasionally', 'Rarely']),
      smoking: getRandomValue([true, false]),
      drinking: getRandomValue(['Frequently', 'Socially', 'Rarely', 'Never']),
      pets: getRandomValue(['Yes', 'No', 'Allergic']),
      cooking: getRandomValue(['Often', 'Sometimes', 'Rarely', 'Never']),
      sharedItems: getRandomValue(['Everything', 'Some things', 'Nothing']),
      personality: getRandomValue(['Extrovert', 'Introvert', 'Ambivert']),
      
      // Additional fields for more diversity
      budget: `${getRandomNumber(500, 1500)}`,
      moveInDate: getRandomValue(['Immediate', 'Next month', 'Next semester']),
      leaseLength: getRandomValue(['4 months', '8 months', '12 months']),
      location: getRandomValue(['On campus', 'Near campus', 'Downtown', 'Suburbs']),
    }
    
    profiles.push(profile)
  }
  
  return profiles
}
