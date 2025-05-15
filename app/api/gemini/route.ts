import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Server-side API route for Gemini
export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json()

    // Get API key from server environment variable
    const API_KEY = process.env.GEMINI_API_KEY

    if (!API_KEY) {
      return NextResponse.json({ error: "API key is not configured on the server" }, { status: 500 })
    }

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(API_KEY)
    const geminiChat = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Extract the last user message
    const lastUserMessage = messages.find((msg: any) => msg.role === "user")?.content || ""

    // Format the prompt with system instructions if provided
    const prompt = systemPrompt ? `${systemPrompt}\n\nUser question: ${lastUserMessage}` : lastUserMessage

    // Generate content
    const result = await geminiChat.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    })

    const response = await result.response
    return NextResponse.json({ text: response.text() })
  } catch (error) {
    console.error("Error in Gemini API route:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
