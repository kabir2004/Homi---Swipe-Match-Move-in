import { testGeminiApiKey } from "@/lib/gemini-utils"

export const runtime = "nodejs"

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Gemini API key is not configured",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      )
    }

    const result = await testGeminiApiKey(apiKey)

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error testing Gemini API:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
