import type { Listing } from "@/types"

export function generateListings(count = 10): Listing[] {
  const listings: Listing[] = []
  for (let i = 0; i < count; i++) {
    listings.push({
      id: `generated-listing-${i + 1}`,
      title: `Generated Listing ${i + 1}`,
      location: "Generated Location",
      price: 1000,
      photos: [],
      features: {
        bedrooms: 1,
        bathrooms: 1,
        square_feet: 500,
        amenities: [],
      },
      match_tags: [],
      university_distance: {},
      created_at: new Date().toISOString(),
      university: "University of Toronto",
      city: "Toronto",
      latitude: 43.6532,
      longitude: -79.3832,
      walk_distance: 1.0,
      drive_distance: 2.0,
      maps_url: "https://maps.google.com",
      is_room_only: false,
    })
  }
  return listings
}
