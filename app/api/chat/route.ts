import { OpenAIStream, StreamingTextResponse } from "ai"
import { openai } from "@/lib/openai"
import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts"

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    stream: true,
    messages: [
      {
        role: "system",
        content: HOMIBUOY_SYSTEM_PROMPT,
      },
      ...messages,
    ],
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
