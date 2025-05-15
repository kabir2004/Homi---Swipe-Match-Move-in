import { GoogleGenerativeAI } from "@google/generative-ai"

// Server-side only file - not exposed to client
const API_KEY = process.env.GEMINI_API_KEY || ""

// Initialize the Gemini API client
export const genAI = new GoogleGenerativeAI(API_KEY)

// Create a chat model instance
export const geminiChat = genAI.getGenerativeModel({ model: "gemini-pro" })

// Check if API key is valid
export const isApiKeyValid = () => {
  return API_KEY && API_KEY.length > 0
}

// Simple function to test if the API key is working
export async function testGeminiApiKey(customKey?: string) {
  const key = customKey || API_KEY

  if (!key || key.length === 0) {
    return {
      success: false,
      message: "API key is missing or invalid. Please provide a valid Gemini API key.",
    }
  }

  try {
    // Create a temporary client with the provided key
    const tempGenAI = new GoogleGenerativeAI(key)
    const tempModel = tempGenAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await tempModel.generateContent("Hello, are you working?")
    const response = await result.response

    return {
      success: true,
      message: response.text(),
    }
  } catch (error) {
    console.error("API key test failed:", error)

    // Check for API key errors specifically
    const errorMessage = error.toString().toLowerCase()
    if (errorMessage.includes("api key") || errorMessage.includes("key expired") || errorMessage.includes("invalid")) {
      return {
        success: false,
        message: "API key is expired or invalid. Please obtain a new API key from Google AI Studio.",
        isKeyError: true,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
