import type { Listing } from "@/types"

// Generate fallback listings when database is empty
export function generateListings(universityId: string, count = 3): Listing[] {
  const listings: Listing[] = []

  // University-specific data for more realistic listings
  const universityData: Record<string, { city: string; neighborhoods: string[]; amenities: string[] }> = {
    uoft: {
      city: "Toronto",
      neighborhoods: ["Annex", "Kensington Market", "Harbord Village", "Chinatown"],
      amenities: ["Study lounge", "Rooftop patio", "Bike storage", "24/7 security"],
    },
    waterloo: {
      city: "Waterloo",
      neighborhoods: ["University District", "Uptown Waterloo", "Northdale", "Lakeshore"],
      amenities: ["High-speed internet", "Fitness center", "Study rooms", "Game lounge"],
    },
    western: {
      city: "London",
      neighborhoods: ["Old North", "Downtown", "Masonville", "Oxford Park"],
      amenities: ["Outdoor pool", "Tennis court", "Study spaces", "Parking included"],
    },
    queens: {
      city: "Kingston",
      neighborhoods: ["University District", "Williamsville", "Sydenham", "Portsmouth"],
      amenities: ["Laundry facilities", "Outdoor space", "Study rooms", "Bike storage"],
    },
    mcmaster: {
      city: "Hamilton",
      neighborhoods: ["Westdale", "Ainslie Wood", "Kirkendall", "Durand"],
      amenities: ["Fitness room", "Study lounge", "Outdoor patio", "Laundry on-site"],
    },
    ryerson: {
      // TMU
      city: "Toronto",
      neighborhoods: ["Garden District", "Church-Wellesley", "St. Lawrence", "Cabbagetown"],
      amenities: ["Rooftop terrace", "24/7 security", "Study spaces", "High-speed internet"],
    },
    york: {
      city: "Toronto",
      neighborhoods: ["Village at York", "Keele & Finch", "Downsview", "Jane & Finch"],
      amenities: ["Shuttle to campus", "Study rooms", "Fitness center", "Outdoor space"],
    },
    laurier: {
      city: "Waterloo",
      neighborhoods: ["University District", "Uptown Waterloo", "Northdale", "Columbia Lake"],
      amenities: ["High-speed internet", "Laundry facilities", "Study lounge", "Bike storage"],
    },
  }

  // Default data if university not found
  const defaultData = {
    city: "Ontario",
    neighborhoods: ["University District", "Downtown", "Midtown", "Uptown"],
    amenities: ["Laundry facilities", "High-speed internet", "Study space", "Bike storage"],
  }

  // Get university-specific data or use default
  const uniData = universityData[universityId] || defaultData

  // Generate listings
  for (let i = 0; i < count; i++) {
    const bedrooms = Math.floor(Math.random() * 3) + 1
    const bathrooms = Math.floor(Math.random() * 2) + 1
    const price = (Math.floor(Math.random() * 600) + 800) * bedrooms
    const squareFeet = (Math.floor(Math.random() * 300) + 500) * bedrooms

    // Random neighborhood
    const neighborhood = uniData.neighborhoods[Math.floor(Math.random() * uniData.neighborhoods.length)]

    // Random amenities (3-5)
    const amenitiesCount = Math.floor(Math.random() * 3) + 3
    const selectedAmenities = [...uniData.amenities]
    const shuffledAmenities = selectedAmenities.sort(() => 0.5 - Math.random()).slice(0, amenitiesCount)

    // Random walk distance (5-20 minutes)
    const walkDistance = Math.floor(Math.random() * 16) + 5

    // Random drive distance (2-10 minutes)
    const driveDistance = Math.floor(Math.random() * 9) + 2

    listings.push({
      id: `${universityId}-${i}`,
      title: `${bedrooms}BR ${bathrooms}BA ${neighborhood} Apartment`,
      location: `${neighborhood}, ${uniData.city}`,
      price: price,
      photos: [
        `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(`${bedrooms} bedroom apartment near ${universityId}`)}`,
      ],
      features: {
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        square_feet: squareFeet,
        amenities: shuffledAmenities,
      },
      match_tags: ["Student-friendly", "Close to campus", "Utilities included"],
      university_distance: {
        [universityId]: walkDistance / 20, // Convert minutes to km (rough estimate)
      },
      created_at: new Date().toISOString(),
      description: `Spacious ${bedrooms} bedroom apartment located in the heart of ${neighborhood}, just a ${walkDistance}-minute walk to campus. This unit features modern appliances, in-unit laundry, and is perfect for students.`,
      neighborhood: neighborhood,
      transit_options: ["Bus", "Bike lanes", walkDistance <= 10 ? "Walking distance" : "Shuttle service"],
      university: universityId,
      city: uniData.city,
      latitude: 43.6532 + (Math.random() * 0.1 - 0.05),
      longitude: -79.3832 + (Math.random() * 0.1 - 0.05),
      walk_distance: walkDistance,
      drive_distance: driveDistance,
      maps_url: `https://maps.google.com/?q=${neighborhood},${uniData.city}`,
      is_room_only: Math.random() > 0.7, // 30% chance it's a room only
    })
  }

  return listings
}
