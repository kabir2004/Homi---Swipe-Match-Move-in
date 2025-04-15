"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { HomiBuoyLogo } from "./homi-buoy-logo"
import { HOMIBUOY_SYSTEM_PROMPT, SUGGESTED_QUESTIONS } from "@/lib/homi-buoy-prompts"
import { cn } from "@/lib/utils"

export function HomiBuoy() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi there! I'm HomiBuoy, your student housing assistant. How can I help you today?",
      },
    ],
    body: {
      systemPrompt: HOMIBUOY_SYSTEM_PROMPT,
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsTyping(true)
    handleSubmit(e)

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(false)
    }, 1000)
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
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg flex items-center justify-center",
            isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-primary hover:bg-primary-600",
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
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="border shadow-xl overflow-hidden">
              <CardHeader className="bg-primary/10 py-3 px-4 flex flex-row items-center gap-3">
                <HomiBuoyLogo size="sm" />
                <CardTitle className="text-lg">
                  <span className="text-primary">H</span>omiBuoy
                </CardTitle>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-muted max-w-[80%] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <p className="text-xs text-muted-foreground">HomiBuoy is typing...</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggested questions (only show if there are few messages) */}
                  {messages.length < 3 && !isLoading && (
                    <div className="mt-6">
                      <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.slice(0, 4).map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            className="text-xs py-1 h-auto"
                            onClick={() => handleSuggestedQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <Separator />
              <CardFooter className="p-3">
                <form onSubmit={onSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
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
