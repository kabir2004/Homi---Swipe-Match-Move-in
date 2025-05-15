import { OpenAIStream, StreamingTextResponse } from "ai"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts-enhanced"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Add the system prompt if it's not already included
  const messagesWithSystemPrompt =
    messages[0]?.role === "system" ? messages : [{ role: "system", content: HOMIBUOY_SYSTEM_PROMPT }, ...messages]

  // Generate streaming response using AI SDK
  const { text: completion } = await generateText({
    model: openai("gpt-4o"),
    prompt: messagesWithSystemPrompt.map((m) => m.content).join("\n"),
    temperature: 0.7,
    maxTokens: 1000,
  })

  // Create a stream from the completion
  const stream = OpenAIStream({
    model: "gpt-4o",
    messages: messagesWithSystemPrompt,
    temperature: 0.7,
    max_tokens: 1000,
  })

  // Return the stream as a streaming response
  return new StreamingTextResponse(stream)
}
