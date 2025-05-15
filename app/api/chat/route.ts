import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts"
import { generateChatResponse } from "@/lib/gemini-server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Add the system prompt if it's not already included
    const messagesWithSystemPrompt =
      messages[0]?.role === "system" ? messages : [{ role: "system", content: HOMIBUOY_SYSTEM_PROMPT }, ...messages]

    // Create a stream from the completion
    const stream = await generateChatResponse(messagesWithSystemPrompt)

    // Return the stream as a streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
