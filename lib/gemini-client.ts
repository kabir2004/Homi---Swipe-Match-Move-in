// This file is for client-side usage of Gemini
// It uses server API endpoints instead of direct API calls with keys

// Check if API key is valid by calling the server endpoint
export async function testGeminiApiKey() {
  try {
    const response = await fetch("/api/test-gemini")
    return await response.json()
  } catch (error) {
    console.error("Error testing API key:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Generate chat response by calling the server endpoint
export async function generateChatResponse(messages: { role: string; content: string }[]) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    const data = await response.json()

    if (data.error) {
      console.error("Error from chat API:", data.error)
      return getFallbackResponse(messages[messages.length - 1]?.content || "")
    }

    return data.content
  } catch (error) {
    console.error("Error generating chat response:", error)
    return getFallbackResponse(messages[messages.length - 1]?.content || "")
  }
}

// Fallback response when API is unavailable
function getFallbackResponse(query: string) {
  // Simple keyword-based responses for common questions
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("housing") || lowerQuery.includes("apartment") || lowerQuery.includes("rent")) {
    return "I recommend starting your housing search 3-4 months before the semester starts. The average rent near most Ontario universities ranges from $800-2500 depending on the city and proximity to campus."
  }

  if (lowerQuery.includes("roommate") || lowerQuery.includes("matching")) {
    return "Homi matches roommates based on lifestyle preferences, study habits, cleanliness standards, and social compatibility. The more you swipe, the better our algorithm understands your preferences!"
  }

  if (lowerQuery.includes("university") || lowerQuery.includes("campus")) {
    return "Homi supports all major Ontario universities including UofT, Waterloo, Western, Queen's, McMaster, TMU, York, and Laurier."
  }

  // Default fallback
  return "I'm currently operating in offline mode due to API connection issues. For the best experience, please try again later when our AI service is back online. In the meantime, you can browse listings and potential roommates directly through the app."
}
