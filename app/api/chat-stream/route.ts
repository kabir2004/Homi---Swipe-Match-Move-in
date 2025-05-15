import { createGeminiChatSession } from "@/lib/gemini"
import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    console.log("Chat stream API route called")
    const { messages, config } = await req.json()
    console.log("Received messages for streaming:", messages.length)

    // Add the system prompt if it's not already included
    const messagesWithSystemPrompt =
      messages[0]?.role === "system" ? messages : [{ role: "system", content: HOMIBUOY_SYSTEM_PROMPT }, ...messages]

    // Create a chat session with history (all messages except the last one)
    console.log("Creating chat session with history")
    const chat = createGeminiChatSession(messagesWithSystemPrompt.slice(0, -1), config || {})

    // Get the last message (the user's query)
    const lastMessage = messagesWithSystemPrompt[messagesWithSystemPrompt.length - 1]
    const userQuery = lastMessage.content
    console.log("User query for streaming:", userQuery)

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log("Starting stream")
          const result = await chat.sendMessageStream(userQuery)
          console.log("Stream created successfully")

          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              console.log("Streaming chunk:", text.substring(0, 50) + (text.length > 50 ? "..." : ""))
              // Send the chunk as a JSON event
              const data = JSON.stringify({ text })
              controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
            }
          }

          // Send a done event
          controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
          controller.close()
          console.log("Stream completed")
        } catch (error) {
          console.error("Error in streaming:", error)

          // Send error message as a chunk
          const errorMessage =
            "I'm sorry, I encountered an error while processing your request. Please try again later."
          const data = JSON.stringify({ text: errorMessage })
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
          controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
          controller.close()
        }
      },
      cancel() {
        console.log("Stream cancelled by client")
      },
    })

    // Return the streaming response with appropriate headers
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // Disable buffering for Nginx
      },
    })
  } catch (error) {
    console.error("Error in chat stream API:", error)

    // Create a stream that just returns an error message
    const stream = new ReadableStream({
      start(controller) {
        const errorMessage = "I'm sorry, I encountered an error while processing your request. Please try again later."
        const data = JSON.stringify({ text: errorMessage })
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
        controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    })
  }
}
