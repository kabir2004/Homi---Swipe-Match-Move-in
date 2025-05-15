import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: "API key not configured",
      })
    }

    // Test the API key
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent("Test")
    const response = await result.response

    return NextResponse.json({
      success: true,
      message: "API key is valid",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "API key is invalid",
    })
  }
}
