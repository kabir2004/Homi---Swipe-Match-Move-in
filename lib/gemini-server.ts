import { GoogleGenerativeAI } from "@google/generative-ai"

// This file is for server-side usage of Gemini
// It uses the GEMINI_API_KEY environment variable (not exposed to client)

// Get API key from environment variable
const API_KEY = process.env.GEMINI_API_KEY || ""

// Initialize the Gemini API client
export const genAI = new GoogleGenerativeAI(API_KEY)

// Create a chat model instance
export const geminiChat = genAI.getGenerativeModel({ model: "gemini-pro" })

// Check if API key is valid
export const isApiKeyValid = () => {
  return API_KEY && API_KEY.length > 0
}

// Fallback response when API is unavailable
const getFallbackResponse = (query: string) => {
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

// Generate chat response
export async function generateChatResponse(messages: { role: string; content: string }[]) {
  // If API key is invalid, use fallback responses
  if (!isApiKeyValid()) {
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === "user")?.content || ""
    return getFallbackResponse(lastUserMessage)
  }

  try {
    // Extract the system prompt if it exists
    const systemPrompt = messages.find((msg) => msg.role === "system")?.content || ""

    // Filter out system messages as Gemini doesn't support them directly
    const chatMessages = messages.filter((msg) => msg.role !== "system")

    // Handle different scenarios based on message count
    if (chatMessages.length === 0) {
      return "Hello! How can I help you today?"
    }

    // Format messages for Gemini API
    const formattedMessages = chatMessages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    // For single message with system prompt, combine them
    if (formattedMessages.length === 1 && formattedMessages[0].role === "user" && systemPrompt) {
      const result = await geminiChat.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser query: ${formattedMessages[0].parts[0].text}` }],
          },
        ],
      })
      const response = await result.response
      return response.text()
    }

    // For conversations with history
    if (formattedMessages.length > 1) {
      // Make sure the first message is from the user (Gemini requirement)
      const history = [...formattedMessages]
      if (history[0].role !== "user") {
        // If first message isn't from user, we need to restructure
        const firstNonUserIndex = history.findIndex((msg) => msg.role === "user")
        if (firstNonUserIndex > 0) {
          // Move a user message to the front
          const userMsg = history.splice(firstNonUserIndex, 1)[0]
          history.unshift(userMsg)
        } else {
          // No user messages found, create a dummy one
          history.unshift({
            role: "user",
            parts: [{ text: "Hello" }],
          })
        }
      }

      // Create chat with history (all messages except the last one)
      const chat = geminiChat.startChat({
        history: history.slice(0, -1),
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      })

      // Send the last message
      const lastMessage = history[history.length - 1]
      const userQuery = lastMessage.parts[0].text

      // If we have a system prompt, include it with the query for context
      const queryWithContext = systemPrompt ? `[INSTRUCTIONS: ${systemPrompt}]\n\n${userQuery}` : userQuery

      const result = await chat.sendMessage(queryWithContext)
      const response = await result.response
      return response.text()
    } else {
      // Simple case: just one user message
      const userQuery = formattedMessages[0].parts[0].text

      // If we have a system prompt, include it with the query
      const queryWithContext = systemPrompt ? `[INSTRUCTIONS: ${systemPrompt}]\n\n${userQuery}` : userQuery

      const result = await geminiChat.generateContent(queryWithContext)
      const response = await result.response
      return response.text()
    }
  } catch (error) {
    console.error("Error generating chat response:", error)

    // Check for API key errors specifically
    const errorMessage = error.toString().toLowerCase()
    if (errorMessage.includes("api key") || errorMessage.includes("key expired") || errorMessage.includes("invalid")) {
      return "I'm currently unable to connect to my AI service due to an authentication issue. Please contact support to update the API key. In the meantime, I'll try to help with basic information."
    }

    // Get the last user message for fallback response
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === "user")?.content || ""
    return getFallbackResponse(lastUserMessage)
  }
}

// Test if the API key is working
export async function testGeminiApiKey() {
  if (!isApiKeyValid()) {
    return {
      success: false,
      message: "API key is missing or invalid. Please provide a valid Gemini API key.",
    }
  }

  try {
    const result = await geminiChat.generateContent("Hello, are you working?")
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
