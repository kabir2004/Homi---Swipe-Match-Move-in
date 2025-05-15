import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey } = body

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "API key is required",
        },
        { status: 400 },
      )
    }

    // Test the provided API key
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent("Hello, are you working?")
    const response = await result.response

    return NextResponse.json({
      success: true,
      message: response.text(),
    })
  } catch (error) {
    console.error("Error testing custom API key:", error)

    // Check for API key errors specifically
    const errorMessage = error.toString().toLowerCase()
    if (errorMessage.includes("api key") || errorMessage.includes("key expired") || errorMessage.includes("invalid")) {
      return NextResponse.json({
        success: false,
        message: "API key is expired or invalid. Please obtain a new API key from Google AI Studio.",
        isKeyError: true,
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
