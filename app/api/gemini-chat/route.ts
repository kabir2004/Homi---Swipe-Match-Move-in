import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts"
import { GoogleGenerativeAI } from "@google/generative-ai"

export const runtime = "nodejs"

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Add the system prompt if it's not already included
    const messagesWithSystemPrompt =
      messages[0]?.role === "system" ? messages : [{ role: "system", content: HOMIBUOY_SYSTEM_PROMPT }, ...messages]

    // Extract the last user message
    const lastUserMessage = messagesWithSystemPrompt.filter((m) => m.role === "user").pop()

    if (!lastUserMessage) {
      return new Response(
        JSON.stringify({
          error: "No user message found",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    // Create a chat session
    const chat = model.startChat({
      history: messagesWithSystemPrompt
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    })

    // Get the response
    const result = await chat.sendMessage(lastUserMessage.content)
    const response = await result.response
    const text = response.text()

    // Return the response as JSON
    return new Response(JSON.stringify({ text }), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (error) {
    console.error("Error in Gemini chat API:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
