import { GoogleGenerativeAI } from "@google/generative-ai"

// Function to test if the Gemini API key is valid
export async function testGeminiApiKey(apiKey: string) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent("Hello, are you working?")
    const response = await result.response
    return {
      success: true,
      message: response.text(),
    }
  } catch (error) {
    console.error("API key test failed:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Function to generate a simple response from Gemini
export async function generateSimpleResponse(prompt: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error("Gemini API key is not configured")
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating response:", error)
    throw error
  }
}
