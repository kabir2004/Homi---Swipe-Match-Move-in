import type React from "react"

/**
 * Utility function to get an image URL with multiple fallbacks
 * @param primaryUrl The primary image URL to try
 * @param fallbackUrl The fallback image URL if primary fails
 * @param placeholderQuery Query for placeholder image if both primary and fallback fail
 * @returns The resolved image URL
 */
export const getImageWithFallback = (
  primaryUrl: string | undefined,
  fallbackUrl: string | undefined,
  placeholderQuery: string,
  width = 800,
  height = 1200,
): string => {
  // Check if primaryUrl exists and is not empty
  if (primaryUrl && primaryUrl.trim() !== "") {
    // For campus images, try multiple possible formats
    if (primaryUrl.includes("/campus/")) {
      const universityId = primaryUrl.split("/").pop()?.split("-")[0]
      if (universityId) {
        // Try multiple possible file formats and paths
        const possiblePaths = [
          primaryUrl,
          `/campus/${universityId}-campus.jpg`,
          `/campus/${universityId}-campus.webp`,
          `/campus/${universityId}-campus.png`,
          `/campus/${universityId}3d.png`,
        ]

        // Return the first path that exists (this is a client-side check, so we can't actually verify)
        // In production, you would implement server-side validation
        return primaryUrl
      }
    }
    return primaryUrl
  }

  // Check if fallbackUrl exists and is not empty
  if (fallbackUrl && fallbackUrl.trim() !== "") return fallbackUrl

  // Return placeholder as last resort
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(placeholderQuery)}`
}

/**
 * Handle image error by replacing with a placeholder or fallback
 * @param event The error event
 * @param placeholderQuery Query for placeholder image
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  placeholderQuery = "image placeholder",
  width?: number,
  height?: number,
): void => {
  const target = event.target as HTMLImageElement
  target.onerror = null // Prevent infinite loop

  // Try to extract university ID from the src if it's a campus image
  const src = target.src
  if (src.includes("/campus/")) {
    const match = src.match(/\/campus\/([a-z]+)-campus/)
    if (match && match[1]) {
      const universityId = match[1]

      // Try alternative formats
      const alternativeFormats = [".jpg", ".webp", ".png"]
      const currentFormat = src.substring(src.lastIndexOf("."))
      const currentFormatIndex = alternativeFormats.indexOf(currentFormat)

      if (currentFormatIndex >= 0 && currentFormatIndex < alternativeFormats.length - 1) {
        // Try next format
        const nextFormat = alternativeFormats[currentFormatIndex + 1]
        const newSrc = src.replace(currentFormat, nextFormat)
        target.src = newSrc
        return
      }

      // If we've tried all formats, try the 3D version
      target.src = `/universities/${universityId}3d.png`
      return
    }
  }

  // If all else fails, use placeholder
  target.src = `/placeholder.svg?height=${height || target.height || 400}&width=${width || target.width || 600}&query=${encodeURIComponent(placeholderQuery)}`
}

/**
 * Generate fallback listings data for a university
 * This ensures we always have data to display even if the database is empty
 */
export const generateListings = (universityId: string, count = 5) => {
  const listings = []
  const neighborhoods = {
    uoft: ["Annex", "Kensington Market", "Chinatown", "Harbord Village"],
    waterloo: ["Northdale", "Uptown", "Lakeshore", "University Downs"],
    western: ["Old North", "Downtown", "Masonville", "Oxford Park"],
    queens: ["University District", "Portsmouth", "Williamsville", "Sydenham"],
    mcmaster: ["Westdale", "Ainslie Wood", "Kirkendall", "Durand"],
    ryerson: ["Garden District", "Church-Wellesley", "St. Lawrence", "Moss Park"],
    tmu: ["Garden District", "Church-Wellesley", "St. Lawrence", "Moss Park"],
    york: ["Village at York", "Jane and Finch", "Rustic", "Northwood Park"],
    laurier: ["Uptown Waterloo", "Northdale", "Columbia Forest", "Beechwood"],
  }

  const amenities = [
    "In-unit laundry",
    "Dishwasher",
    "Air conditioning",
    "Balcony",
    "Gym",
    "Parking",
    "Pet-friendly",
    "Furnished",
    "Utilities included",
    "High-speed internet",
    "Security system",
    "Bike storage",
  ]

  for (let i = 0; i < count; i++) {
    const id = `${universityId}-listing-${i + 1}`
    const price = Math.floor(Math.random() * 1000) + 800
    const bedrooms = Math.floor(Math.random() * 3) + 1
    const bathrooms = Math.floor(Math.random() * 2) + 1
    const squareFeet = Math.floor(Math.random() * 500) + 500

    // Select 3-5 random amenities
    const listingAmenities = []
    const amenityCount = Math.floor(Math.random() * 3) + 3
    for (let j = 0; j < amenityCount; j++) {
      const randomIndex = Math.floor(Math.random() * amenities.length)
      if (!listingAmenities.includes(amenities[randomIndex])) {
        listingAmenities.push(amenities[randomIndex])
      }
    }

    // Select a random neighborhood
    const uniNeighborhoods = neighborhoods[universityId as keyof typeof neighborhoods] || ["Downtown"]
    const neighborhood = uniNeighborhoods[Math.floor(Math.random() * uniNeighborhoods.length)]

    listings.push({
      id,
      title: `${bedrooms} Bedroom Apartment near ${universityId.toUpperCase()}`,
      location: neighborhood,
      price,
      photos: [
        `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(`${bedrooms} bedroom apartment ${universityId}`)}`,
      ],
      features: {
        bedrooms,
        bathrooms,
        square_feet: squareFeet,
        amenities: listingAmenities,
      },
      match_tags: ["Student-friendly", "Close to campus", "Near transit"],
      university: universityId,
      city: "Toronto",
      latitude: 43.6532,
      longitude: -79.3832,
      walk_distance: Math.floor(Math.random() * 15) + 5,
      drive_distance: Math.floor(Math.random() * 5) + 1,
      maps_url: "https://maps.google.com",
      created_at: new Date().toISOString(),
    })
  }

  return listings
}
