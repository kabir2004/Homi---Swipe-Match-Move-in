import { NextResponse } from "next/server"
import { testGeminiApiKey } from "@/lib/gemini-server"

export async function GET() {
  try {
    const result = await testGeminiApiKey()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
