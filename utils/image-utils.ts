import type React from "react"

/**
 * Utility function to get an image URL with fallback
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
  if (primaryUrl && primaryUrl.trim() !== "") return primaryUrl
  if (fallbackUrl && fallbackUrl.trim() !== "") return fallbackUrl
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(placeholderQuery)}`
}

/**
 * Handle image error by replacing with a placeholder
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
  target.src = `/placeholder.svg?height=${height || target.height || 400}&width=${width || target.width || 600}&query=${encodeURIComponent(placeholderQuery)}`
}
