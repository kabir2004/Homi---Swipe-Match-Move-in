"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { HomiBuoyLogo } from "./homi-buoy-logo"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function HomiBuoy({ className, initialContext = "" }: { className?: string; initialContext?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: initialContext ? [{ id: "context", role: "system", content: initialContext }] : [],
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
      // You could add toast notification here
    },
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {isOpen ? (
        <Card className="w-[350px] h-[500px] flex flex-col shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <HomiBuoyLogo className="h-6 w-6" />
              <CardTitle className="text-lg font-bold">HomiBuoy</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <HomiBuoyLogo className="h-12 w-12 mb-2 text-blue-600" />
                <p className="text-sm">Hi! I'm HomiBuoy, your roommate matching assistant.</p>
                <p className="text-xs mt-1">
                  Ask me anything about finding roommates, housing options, or how to use Homi!
                </p>
              </div>
            )}

            {messages
              .filter((m) => m.role !== "system")
              .map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 p-3 rounded-lg max-w-[90%]",
                    message.role === "user" ? "ml-auto bg-blue-600 text-white" : "bg-muted",
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/homi-buoy-logo.png" alt="HomiBuoy" />
                      <AvatarFallback>HB</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="text-sm">{message.content}</div>
                </div>
              ))}
            {isLoading && (
              <div className="flex gap-2 p-3 rounded-lg max-w-[90%] bg-muted">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/homi-buoy-logo.png" alt="HomiBuoy" />
                  <AvatarFallback>HB</AvatarFallback>
                </Avatar>
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="p-2 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Ask about roommates, housing..."
                value={input}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
        >
          <HomiBuoyLogo className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  )
}
