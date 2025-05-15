import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function testGeminiApiKey() {
  try {
    const result = await model.generateContent("Hello, how are you?")
    const response = await result.response
    const text = response.text()
    return { success: true, message: "API key is valid", sample: text }
  } catch (error) {
    console.error("Error testing Gemini API key:", error)
    return { success: false, message: "API key is invalid or there was an error", error: String(error) }
  }
}

export async function testCustomApiKey(apiKey: string) {
  try {
    const customGenAI = new GoogleGenerativeAI(apiKey)
    const customModel = customGenAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await customModel.generateContent("Hello, how are you?")
    const response = await result.response
    const text = response.text()
    return { success: true, message: "API key is valid", sample: text }
  } catch (error) {
    console.error("Error testing custom Gemini API key:", error)
    return { success: false, message: "API key is invalid or there was an error", error: String(error) }
  }
}

export async function generateDirectResponse(prompt: string) {
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error generating direct response:", error)
    throw error
  }
}

export async function generateChatResponse(messages: any[]) {
  try {
    // Extract the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()

    if (!lastUserMessage) {
      throw new Error("No user message found")
    }

    // Create a chat session
    const chat = model.startChat({
      history: messages
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    })

    // Get the response stream
    const result = await chat.sendMessageStream(lastUserMessage.content)

    // Create a readable stream
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              // Send the chunk as a JSON event
              const data = JSON.stringify({ text })
              controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
            }
          }

          // Send a done event
          controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
          controller.close()
        } catch (error) {
          console.error("Error in streaming:", error)

          // Send error message as a chunk
          const errorMessage =
            "I'm sorry, I encountered an error while processing your request. Please try again later."
          const data = JSON.stringify({ text: errorMessage })
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
          controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
          controller.close()
        }
      },
    })
  } catch (error) {
    console.error("Error generating chat response:", error)

    // Return a stream with an error message
    return new ReadableStream({
      start(controller) {
        const errorMessage = "I'm sorry, I encountered an error while processing your request. Please try again later."
        const data = JSON.stringify({ text: errorMessage })
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
        controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
        controller.close()
      },
    })
  }
}
