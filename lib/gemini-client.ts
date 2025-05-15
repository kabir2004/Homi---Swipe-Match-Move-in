// Client-side Gemini utilities that don't use API keys directly

// Generate chat response by calling the server endpoint
export async function generateChatResponse(messages: { role: string; content: string }[]) {
  try {
    const response = await fetch("/api/gemini-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.text || "No response received"
  } catch (error) {
    console.error("Error generating chat response:", error)
    return "Sorry, I encountered an error. Please try again later."
  }
}

// Test API connection
export async function testApiConnection() {
  try {
    const response = await fetch("/api/test-gemini")
    return await response.json()
  } catch (error) {
    return { success: false, message: "Connection error" }
  }
}
