"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { HOMIBUOY_SYSTEM_PROMPT, SUGGESTED_QUESTIONS } from "@/lib/homi-buoy-prompts"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

// Fallback response when API is unavailable
const getFallbackResponse = (query: string) => {
  // Simple keyword-based responses for common questions
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("housing") || lowerQuery.includes("apartment") || lowerQuery.includes("rent")) {
    return "I recommend starting your housing search 3-4 months before the semester starts. The average rent near most Ontario universities ranges from $800-2500 depending on the city and proximity to campus."
  }

  if (lowerQuery.includes("roommate") || lowerQuery.includes("matching")) {
    return "Homi matches roommates based on lifestyle preferences, study habits, cleanliness standards, and social compatibility. The more you swipe, the better our algorithm understands your preferences!"
  }

  if (lowerQuery.includes("university") || lowerQuery.includes("campus")) {
    return "Homi supports all major Ontario universities including UofT, Waterloo, Western, Queen's, McMaster, TMU, York, and Laurier."
  }

  // Default fallback
  return "I'm currently operating in offline mode due to API connection issues. For the best experience, please try again later when our AI service is back online. In the meantime, you can browse listings and potential roommates directly through the app."
}

// Call the server-side API route instead of directly calling Gemini
async function callServerAPI(messages: Message[], systemPrompt: string) {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        systemPrompt,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.text || getFallbackResponse(messages[messages.length - 1]?.content || "")
  } catch (error) {
    console.error("Error calling server API:", error)
    return getFallbackResponse(messages[messages.length - 1]?.content || "")
  }
}

export function HomiBuoyImproved() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm HomiBuoy, your housing and roommate assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Call server API route instead of direct API call
      const response = await callServerAPI([...messages, userMessage], HOMIBUOY_SYSTEM_PROMPT)

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error in chat:", error)
      setError(error instanceof Error ? error.message : "Unknown error occurred")

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInput(question)

    // Use setTimeout to ensure the input is updated before submitting
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>
      handleSubmit(fakeEvent)
    }, 100)
  }

  return (
    <>
      {/* Chat bubble button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
            isOpen ? "bg-gray-800 hover:bg-gray-900" : "bg-primary hover:bg-primary-600",
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>
          )}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border shadow-xl overflow-hidden">
              <CardHeader className="bg-primary py-3 px-4 flex flex-row items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg text-white">HomiBuoy</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8 text-white hover:bg-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn("mb-3", message.role === "user" ? "justify-end flex" : "justify-start flex")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-lg px-3 py-2",
                          message.role === "user" ? "bg-primary text-white ml-auto" : "bg-gray-100 text-gray-800",
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start mb-3">
                      <div className="bg-gray-100 max-w-[85%] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <p className="text-xs text-red-600">Error: {error}</p>
                      </div>
                    </div>
                  )}

                  {/* Suggested questions */}
                  {messages.length < 3 && !isLoading && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 h-auto"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question.length > 20 ? question.substring(0, 17) + "..." : question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-2">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-primary-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
