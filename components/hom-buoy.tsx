"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, Send, Sparkles, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { SUGGESTED_QUESTIONS, getResponse } from "@/lib/hom-buoy-prompts"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function HomBuoy() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I'm HomiBuoy, your student housing assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Check for navigation commands
    if (input.toLowerCase().includes("go to") || input.toLowerCase().includes("navigate to")) {
      const path = extractPath(input.toLowerCase())
      if (path) {
        setTimeout(() => {
          router.push(path)
        }, 500)
      }
    }

    // Generate response with minimal delay for snappiness
    setTimeout(() => {
      const response = getResponse(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 300) // Reduced delay for snappier responses
  }

  // Extract path from navigation command
  const extractPath = (input: string): string | null => {
    if (input.includes("quiz") || input.includes("get started")) return "/quiz"
    if (input.includes("how it works")) return "/how-it-works"
    if (input.includes("universities")) return "/universities"
    if (input.includes("about")) return "/about"
    if (input.includes("dashboard")) return "/dashboard"
    if (input.includes("swipe")) return "/swipe"
    if (input.includes("home") || input.includes("main page")) return "/"
    return null
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Generate response with minimal delay
    setTimeout(() => {
      const response = getResponse(question)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 300) // Reduced delay for snappier responses
  }

  return (
    <>
      {/* Chat bubble button - Simplified animation for snappiness */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }} // Faster animation
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
              <Bot className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>
          )}
        </Button>
      </motion.div>

      {/* Chat window - Simplified animation for snappiness */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }} // Faster animation
          >
            <Card className="border shadow-xl overflow-hidden">
              <CardHeader className="bg-primary py-3 px-4 flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
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
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("mb-3", message.role === "user" ? "justify-end flex" : "justify-start flex")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-lg px-3 py-2",
                          message.role === "user" ? "bg-primary text-white ml-auto" : "bg-gray-100 text-gray-800",
                        )}
                      >
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}></p>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator - Simplified */}
                  {isTyping && (
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

                  {/* Quick action buttons - Always visible for better functionality */}
                  {!isTyping && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.slice(0, 3).map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 h-auto bg-gray-50 hover:bg-gray-100 border-gray-200"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question.length > 25 ? question.substring(0, 22) + "..." : question}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs py-1 h-auto bg-primary-50 hover:bg-primary-100 text-primary border-primary-200"
                          onClick={() => handleSuggestedQuestion("Take the quiz")}
                        >
                          <Sparkles className="h-3 w-3 mr-1" /> Take the quiz
                        </Button>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <Separator />
              <CardFooter className="p-2">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    ref={inputRef}
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isTyping || !input.trim()}
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

// Helper function to format messages with links
function formatMessage(content: string): string {
  // Replace markdown-style links with HTML links
  const linkRegex = /\[([^\]]+)\]$$([^)]+)$$/g
  return content.replace(linkRegex, '<a href="$2" class="text-primary hover:underline">$1</a>')
}
