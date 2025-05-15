import { GoogleGenerativeAI, type GenerationConfig } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key
const API_KEY = process.env.GEMINI_API_KEY || ""

// Add validation for API key
if (!API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables")
}

const genAI = new GoogleGenerativeAI(API_KEY)

// Default generation config
const DEFAULT_CONFIG: GenerationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1000,
}

// Create and export the Gemini model with default config
// Using gemini-pro instead of gemini-2.0-flash as it has broader access
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: DEFAULT_CONFIG,
})

// Helper function to generate chat responses with custom config
export async function generateGeminiResponse(messages: any[], config: Partial<GenerationConfig> = {}) {
  try {
    console.log("Generating Gemini response with messages:", JSON.stringify(messages.slice(-1)))

    // Format messages for Gemini API
    const formattedMessages = formatMessagesForGemini(messages)

    // Merge default config with custom config
    const generationConfig = {
      ...DEFAULT_CONFIG,
      ...config,
    }

    // Generate content using Gemini
    const result = await geminiModel.generateContent({
      contents: formattedMessages,
      generationConfig,
    })

    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error generating Gemini response:", error)

    // Check for specific error types
    if (error.toString().includes("API key")) {
      return "I'm having trouble connecting to my knowledge base due to an authentication issue. Please try again later or contact support."
    }

    if (error.toString().includes("timeout") || error.toString().includes("network")) {
      return "I'm experiencing network issues. Please check your connection and try again."
    }

    // Return a fallback response instead of throwing
    return "I'm sorry, I encountered an error while processing your request. Please try again later."
  }
}

// Helper function to format messages for Gemini API
function formatMessagesForGemini(messages: any[]) {
  return messages.map((msg) => {
    // Map OpenAI role format to Gemini format
    // Gemini only supports 'user' and 'model' roles
    const role = msg.role === "user" ? "user" : "model"

    return {
      role: role,
      parts: [{ text: msg.content }],
    }
  })
}

// Create a chat session with custom config
export function createGeminiChatSession(history: any[] = [], config: Partial<GenerationConfig> = {}) {
  try {
    console.log("Creating Gemini chat session with history:", JSON.stringify(history))

    // Format messages for Gemini API
    const formattedHistory = history.map((msg) => {
      const role = msg.role === "user" ? "user" : "model"
      return {
        role: role,
        parts: [{ text: msg.content }],
      }
    })

    // Merge default config with custom config
    const generationConfig = {
      ...DEFAULT_CONFIG,
      ...config,
    }

    // Create and return a chat session
    return geminiModel.startChat({
      history: formattedHistory,
      generationConfig,
    })
  } catch (error) {
    console.error("Error creating Gemini chat session:", error)
    throw error
  }
}

// Simple test function to verify API connection
export async function testGeminiConnection() {
  try {
    const response = await generateGeminiResponse([{ role: "user", content: "Hello, are you working?" }])
    console.log("Gemini test response:", response)
    return { success: true, response }
  } catch (error) {
    console.error("Gemini connection test failed:", error)
    return { success: false, error: error.message }
  }
}
