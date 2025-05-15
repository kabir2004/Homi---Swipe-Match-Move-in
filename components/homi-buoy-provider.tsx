"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react"
import { HomiBuoy } from "./homi-buoy"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

type HomiBuoyContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  clearMessages: () => void
}

const HomiBuoyContext = createContext<HomiBuoyContextType | undefined>(undefined)

export function HomiBuoyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm HomiBuoy, your housing and roommate assistant. How can I help you today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Clean up any pending requests when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message to state
      const userMessage: Message = { role: "user", content }
      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create a new abort controller for this request
      abortControllerRef.current = new AbortController()
      const { signal } = abortControllerRef.current

      try {
        // Prepare the messages to send
        const messagesToSend = [...messages, userMessage]

        // Start the SSE connection
        const response = await fetch("/api/chat-stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: messagesToSend }),
          signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Create a new assistant message with empty content
        const assistantMessage: Message = { role: "assistant", content: "" }
        setMessages((prev) => [...prev, assistantMessage])

        // Process the stream
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          throw new Error("Response body is null")
        }

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          // Decode the chunk and parse the events
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)

              if (data === "[DONE]") {
                // Stream is complete
                break
              }

              try {
                const { text } = JSON.parse(data)

                // Update the last message with the new content
                setMessages((prev) => {
                  const newMessages = [...prev]
                  const lastMessage = newMessages[newMessages.length - 1]
                  if (lastMessage.role === "assistant") {
                    lastMessage.content += text
                  }
                  return newMessages
                })
              } catch (e) {
                console.error("Error parsing SSE data:", e)
              }
            }
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error in chat:", error)
          // Add an error message
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
            },
          ])
        }
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [messages],
  )

  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hi there! I'm HomiBuoy, your housing and roommate assistant. How can I help you today?",
      },
    ])
  }, [])

  const value = {
    isOpen,
    setIsOpen,
    messages,
    sendMessage,
    isLoading,
    clearMessages,
  }

  return (
    <HomiBuoyContext.Provider value={value}>
      {children}
      <HomiBuoy />
    </HomiBuoyContext.Provider>
  )
}

export function useHomiBuoy() {
  const context = useContext(HomiBuoyContext)
  if (context === undefined) {
    throw new Error("useHomiBuoy must be used within a HomiBuoyProvider")
  }
  return context
}
