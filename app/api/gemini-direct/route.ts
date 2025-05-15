import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message, apiKey } = await request.json()

    // Use provided API key or server's API key
    const key = apiKey || process.env.GEMINI_API_KEY || ""

    if (!key) {
      return NextResponse.json({ error: "API key is missing" }, { status: 400 })
    }

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message || "Hello, are you working?",
              },
            ],
          },
        ],
      }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in direct Gemini API call:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
