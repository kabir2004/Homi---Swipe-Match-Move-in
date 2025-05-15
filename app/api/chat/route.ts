import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Server-side API key access
const API_KEY = process.env.GEMINI_API_KEY || ""

// Initialize the Gemini API client on the server
const genAI = new GoogleGenerativeAI(API_KEY)
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" })

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

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!API_KEY) {
      return NextResponse.json(
        {
          content: getFallbackResponse(messages[messages.length - 1]?.content || ""),
          error: "API key is missing",
        },
        { status: 200 }, // Return 200 with fallback to not break the UI
      )
    }

    // Extract the system prompt if it exists
    const systemPrompt = messages.find((msg: any) => msg.role === "system")?.content || ""

    // Filter out system messages as Gemini doesn't support them directly
    const chatMessages = messages.filter((msg: any) => msg.role !== "system")

    // Handle different scenarios based on message count
    if (chatMessages.length === 0) {
      return NextResponse.json({ content: "Hello! How can I help you today?" })
    }

    // For single message with system prompt, combine them
    if (chatMessages.length === 1 && chatMessages[0].role === "user" && systemPrompt) {
      const result = await geminiModel.generateContent(`${systemPrompt}\n\nUser query: ${chatMessages[0].content}`)
      const response = await result.response
      return NextResponse.json({ content: response.text() })
    }

    // For simple case with just one user message
    if (chatMessages.length === 1 && chatMessages[0].role === "user") {
      const userQuery = chatMessages[0].content
      const queryWithContext = systemPrompt ? `${systemPrompt}\n\n${userQuery}` : userQuery
      const result = await geminiModel.generateContent(queryWithContext)
      const response = await result.response
      return NextResponse.json({ content: response.text() })
    }

    // For conversations with history, we need to format differently
    // This is a simplified version - for complex conversations, you might need a more robust approach
    const conversationText = chatMessages
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    const fullPrompt = systemPrompt
      ? `${systemPrompt}\n\nConversation history:\n${conversationText}\n\nAssistant:`
      : `Conversation history:\n${conversationText}\n\nAssistant:`

    const result = await geminiModel.generateContent(fullPrompt)
    const response = await result.response
    return NextResponse.json({ content: response.text() })
  } catch (error) {
    console.error("Error in chat API:", error)

    // Return a fallback response with the error
    return NextResponse.json(
      {
        content: getFallbackResponse(""),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }, // Return 200 with fallback to not break the UI
    )
  }
}
