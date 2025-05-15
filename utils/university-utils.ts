import type { University } from "@/types"

// Get the campus image for a university with multiple fallbacks
export function getCampusImage(universityId: string): string {
  // Try multiple paths in order of preference
  const imagePaths = [
    `/campus/${universityId}-campus.jpg`,
    `/campus/${universityId}-campus.webp`,
    `/campus/${universityId}-campus.png`,
    `/universities/${universityId}3d.png`,
  ]

  // Generic fallback with university ID
  const genericFallback = `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(universityId + " university campus")}`

  // In a real app, we would check if the file exists
  // For now, we'll just return the first path and let the Image component handle errors with onError
  return imagePaths[0]
}

// Get a university by ID
export function getUniversityById(id: string, universities: University[]): University | undefined {
  return universities.find((uni) => uni.id === id)
}

// Format university name for display
export function formatUniversityName(name: string): string {
  // Handle common abbreviations
  if (name.toLowerCase() === "uoft") return "University of Toronto"
  if (name.toLowerCase() === "tmu") return "Toronto Metropolitan University"

  return name
}
