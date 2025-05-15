// This file will be modified to use real data from the database
import type { Listing, Roommate } from "@/types"
import { getSupabaseClient } from "@/lib/supabase"

// Helper function to calculate match ratio
export function calculateMatchRatio(index: number, total: number): string {
  const viewed = index + 1
  const percentage = total > 0 ? Math.round((viewed / total) * 100) : 0
  return `${viewed}/${total} (${percentage}%)`
}

// Update the fetchRealListings function to handle empty data better
export async function fetchRealListings(limit = 100, filters: any = {}): Promise<Listing[]> {
  try {
    const supabase = getSupabaseClient()
    let query = supabase.from("listings").select("*").limit(limit)

    // Apply filters if provided
    if (filters.university) {
      query = query.ilike("university", `%${filters.university}%`)
    }

    if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
      if (filters.priceRange[0] > 0) {
        query = query.gte("price_min", filters.priceRange[0])
      }
      if (filters.priceRange[1] < 3000) {
        query = query.lte("price_max", filters.priceRange[1])
      }
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching listings:", error)
      return []
    }

    // If no data is returned, use the fallback generator
    if (!data || data.length === 0) {
      console.log("No listings found in database, using generated data")
      return generateListingsFallback(limit)
    }

    // Transform the data to match our Listing type
    return (data || []).map((item: any) => {
      // Handle price as either a single value or a range
      const price = typeof item.price === "number" ? item.price : item.price_min || 1000

      return {
        id: item.id || `listing-${Math.random().toString(36).substring(2, 9)}`,
        title: item.title || "Student Housing",
        location: item.location || "Near Campus",
        price: price,
        photos: item.photos || ["/campus-commons.png"],
        features: item.features || {
          bedrooms: 1,
          bathrooms: 1,
          square_feet: 500,
          amenities: ["Wi-Fi", "Laundry"],
        },
        match_tags: item.match_tags || ["Student Housing"],
        university_distance: {
          [item.university || "University of Toronto"]: item.walk_distance || 1.5,
        },
        created_at: item.created_at || new Date().toISOString(),
        description: `Convenient student housing near ${item.university || "campus"}. ${
          item.is_room_only ? "Room rental with shared facilities." : "Full unit available."
        }`,
        university: item.university || "University of Toronto",
        city: item.city || "Toronto",
        latitude: item.latitude || 43.6532,
        longitude: item.longitude || -79.3832,
        walk_distance: item.walk_distance || 1.5,
        drive_distance: item.drive_distance || 3.0,
        maps_url: item.maps_url || "https://maps.google.com",
        is_room_only: item.is_room_only || false,
      }
    })
  } catch (error) {
    console.error("Error in fetchRealListings:", error)
    return generateListingsFallback(limit)
  }
}

// Add a fallback generator function
function generateListingsFallback(count = 10): Listing[] {
  const listings: Listing[] = []
  const universities = [
    "University of Toronto",
    "Western University",
    "Queen's University",
    "McMaster University",
    "York University",
  ]
  const locations = ["Near Campus", "Downtown", "West End", "East Side", "North Campus"]
  const amenities = ["Wi-Fi", "Laundry", "Gym", "Parking", "Air Conditioning", "Dishwasher", "Furnished"]

  for (let i = 0; i < count; i++) {
    const university = universities[Math.floor(Math.random() * universities.length)]
    const bedrooms = Math.floor(Math.random() * 4) + 1
    const price = 800 + bedrooms * 200 + Math.floor(Math.random() * 300)

    listings.push({
      id: `listing-${i + 1}`,
      title: `${bedrooms}BR Apartment near ${university}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      price: price,
      photos: ["/campus-commons.png"],
      features: {
        bedrooms: bedrooms,
        bathrooms: Math.ceil(bedrooms / 2),
        square_feet: 400 + bedrooms * 200,
        amenities: amenities.slice(0, Math.floor(Math.random() * 4) + 2),
      },
      match_tags: ["Student Housing", bedrooms > 1 ? "Shared" : "Private", price < 1200 ? "Budget Friendly" : "Luxury"],
      university_distance: {
        [university]: 0.5 + Math.random() * 2,
      },
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      description: `Comfortable ${bedrooms} bedroom apartment near ${university}. Great for students!`,
      university: university,
      city: university.includes("Toronto") ? "Toronto" : university.includes("Western") ? "London" : "Kingston",
      latitude: 43.6532 + (Math.random() - 0.5) * 0.1,
      longitude: -79.3832 + (Math.random() - 0.5) * 0.1,
      walk_distance: 0.5 + Math.random() * 2,
      drive_distance: 1 + Math.random() * 3,
      maps_url: "https://maps.google.com",
      is_room_only: bedrooms === 1 ? Math.random() > 0.5 : false,
    })
  }

  return listings
}

// Keep the generateListings function as a fallback, but it will use fetchRealListings first
export function generateListings(count = 10): Listing[] {
  // This is now just a placeholder that returns an empty array
  // We'll use fetchRealListings instead
  return []
}

// Add personality traits
const personalityTraits = [
  "Outgoing",
  "Reserved",
  "Organized",
  "Spontaneous",
  "Analytical",
  "Creative",
  "Practical",
  "Ambitious",
  "Relaxed",
  "Energetic",
]

// Add study habits
const studyHabits = [
  "Morning Studier",
  "Night Owl",
  "Group Study",
  "Solo Study",
  "Library Focused",
  "Home Studier",
  "Consistent Schedule",
  "Cramming",
]

// Keep the generateRoommates function for now
export function generateRoommates(count = 10): Roommate[] {
  // This function remains unchanged as we don't have real roommate data yet
  const universities = [
    "University of Toronto",
    "York University",
    "McMaster University",
    "Western University",
    "Queen's University",
    "University of Waterloo",
    "Wilfrid Laurier University",
  ]

  const programs = [
    "Computer Science",
    "Engineering",
    "Business",
    "Psychology",
    "Biology",
    "English",
    "History",
    "Mathematics",
    "Physics",
    "Chemistry",
  ]

  const tags = [
    "Early Riser",
    "Night Owl",
    "Clean",
    "Quiet",
    "Social",
    "Studious",
    "Athletic",
    "Artistic",
    "Foodie",
    "Gamer",
    "Pet Friendly",
    "Non-Smoker",
    "Vegetarian",
    "International Student",
  ]

  const interests = [
    "Reading",
    "Gaming",
    "Cooking",
    "Sports",
    "Music",
    "Movies",
    "Hiking",
    "Photography",
    "Travel",
    "Art",
    "Dancing",
    "Yoga",
    "Gym",
    "Volunteering",
  ]

  const roommates: Roommate[] = []

  for (let i = 0; i < count; i++) {
    const id = `roommate-${i + 1}`
    const name = `Student ${i + 1}`
    const university = universities[Math.floor(Math.random() * universities.length)]
    const program = programs[Math.floor(Math.random() * programs.length)]
    const year = Math.floor(Math.random() * 4) + 1
    const match_score = Math.floor(Math.random() * 101)

    // Select 2-4 random tags
    const selectedTags: string[] = []
    const tagCount = Math.floor(Math.random() * 3) + 2
    for (let j = 0; j < tagCount; j++) {
      const tag = tags[Math.floor(Math.random() * tags.length)]
      if (!selectedTags.includes(tag)) {
        selectedTags.push(tag)
      }
    }

    // Select 3-5 random interests
    const selectedInterests: string[] = []
    const interestCount = Math.floor(Math.random() * 3) + 3
    for (let j = 0; j < interestCount; j++) {
      const interest = interests[Math.floor(Math.random() * interests.length)]
      if (!selectedInterests.includes(interest)) {
        selectedInterests.push(interest)
      }
    }

    const roommate: Roommate = {
      id,
      name,
      photo: `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(`student ${i + 1}`)}`,
      tags: selectedTags,
      intro_bio: `Hi, I'm a ${year}${getOrdinal(year)} ${program} student at ${university}. Looking for a compatible roommate!`,
      match_score,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      university,
      program,
      year,
      interests: selectedInterests,
      lifestyle_preferences: {
        cleanliness: Math.floor(Math.random() * 5) + 1,
        noise_level: Math.floor(Math.random() * 5) + 1,
        guests: Math.floor(Math.random() * 5) + 1,
        sleep_schedule: ["early_bird", "night_owl", "flexible"][Math.floor(Math.random() * 3)] as
          | "early_bird"
          | "night_owl"
          | "flexible",
      },
    }

    roommates.push(roommate)
  }

  return roommates
}

// Helper function to get ordinal suffix
function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}
