import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Add the system prompt if it's not already included
    const messagesWithSystemPrompt =
      messages[0]?.role === "system" ? messages : [{ role: "system", content: HOMIBUOY_SYSTEM_PROMPT }, ...messages]

    // Use fetch to call OpenAI API directly
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messagesWithSystemPrompt,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    return new Response(JSON.stringify({ content }), {
      headers: {
        "Content-Type": "application/json",
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
