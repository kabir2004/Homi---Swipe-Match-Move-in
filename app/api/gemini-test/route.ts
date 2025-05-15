import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Server-side API key access
const API_KEY = process.env.GEMINI_API_KEY || ""

// Initialize the Gemini API client on the server
const genAI = new GoogleGenerativeAI(API_KEY)
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key is missing. Please set the GEMINI_API_KEY environment variable." },
        { status: 500 },
      )
    }

    const result = await geminiModel.generateContent(message || "Hello, are you working?")
    const response = await result.response

    return NextResponse.json({
      success: true,
      message: response.text(),
    })
  } catch (error) {
    console.error("Error testing Gemini API:", error)

    // Check for API key errors specifically
    const errorMessage = error.toString().toLowerCase()
    if (errorMessage.includes("api key") || errorMessage.includes("key expired") || errorMessage.includes("invalid")) {
      return NextResponse.json(
        {
          success: false,
          message: "API key is expired or invalid. Please obtain a new API key from Google AI Studio.",
          isKeyError: true,
        },
        { status: 401 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
