import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Create a model instance
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export const geminiChat = model
