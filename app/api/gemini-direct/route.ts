import { type NextRequest, NextResponse } from "next/server"
import { geminiChat } from "@/lib/gemini-server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const result = await geminiChat.generateContent(message)
    const response = await result.response

    return NextResponse.json({
      success: true,
      content: response.text(),
    })
  } catch (error) {
    console.error("Error in Gemini direct API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
