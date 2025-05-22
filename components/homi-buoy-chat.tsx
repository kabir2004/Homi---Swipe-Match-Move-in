"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Send, User, Bot } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function HomiBuoyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm HomiBuoy, your housing assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // Generate response based on user input
      let responseContent = ""
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("housing") || lowerInput.includes("apartment") || lowerInput.includes("rent")) {
        responseContent =
          "I can help you find housing near your university! What's your budget and how far from campus would you like to be?"
      } else if (lowerInput.includes("roommate") || lowerInput.includes("housemate")) {
        responseContent =
          "Looking for a roommate? I can help you find compatible roommates based on your preferences. Would you like to take our roommate compatibility quiz?"
      } else if (lowerInput.includes("budget") || lowerInput.includes("afford")) {
        responseContent =
          "Managing your housing budget is important! The general rule is to spend no more than 30% of your income on rent. Would you like me to help you calculate an affordable rent range?"
      } else if (lowerInput.includes("application") || lowerInput.includes("apply")) {
        responseContent =
          "For housing applications, you'll typically need proof of income, identification, and sometimes references. Would you like tips on improving your application success rate?"
      } else {
        responseContent =
          "I'm here to help with all your student housing needs! You can ask me about finding apartments, roommates, budgeting, or the application process."
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-primary/5 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="/homi-buoy-logo.png" alt="HomiBuoy" />
          <AvatarFallback>HB</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">HomiBuoy Assistant</h3>
          <p className="text-xs text-gray-500">Your personal housing guide</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === "assistant" ? <Bot className="h-4 w-4 mr-1" /> : <User className="h-4 w-4 mr-1" />}
                <span className="text-xs opacity-75">
                  {message.sender === "user" ? "You" : "HomiBuoy"} •{" "}
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "600ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-2"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center mt-2">
          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1" />
            Suggest housing near campus
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1" />
            Find roommates
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
            <Sparkles className="h-3 w-3 mr-1" />
            Budget calculator
          </Button>
        </div>
      </div>
    </div>
  )
}
