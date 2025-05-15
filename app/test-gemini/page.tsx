"use client"

import type React from "react"

import { useState } from "react"
import { HomiBuoyProvider, useHomiBuoy } from "@/components/homi-buoy-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send } from "lucide-react"

// Component that uses the HomiBuoy context
function HomiBuoyTester() {
  const { isOpen, setIsOpen, sendMessage, messages, isLoading } = useHomiBuoy()
  const [testMessage, setTestMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (testMessage.trim()) {
      sendMessage(testMessage)
      setTestMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">HomiBuoy Controls</h2>
        <Button
          variant={isOpen ? "outline" : "default"}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          {isOpen ? "Close HomiBuoy" : "Open HomiBuoy"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Send Message Directly</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Type a message to HomiBuoy..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !testMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 overflow-y-auto space-y-2 p-2 border rounded-md">
            {messages.length > 1 ? (
              messages.map((msg, i) => (
                <div key={i} className={`p-2 rounded-md ${msg.role === "user" ? "bg-blue-50" : "bg-gray-50"}`}>
                  <p className="text-xs font-medium">{msg.role === "user" ? "You" : "HomiBuoy"}</p>
                  <p className="text-sm">
                    {msg.content.length > 100 ? `${msg.content.substring(0, 100)}...` : msg.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No messages yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TestGeminiPage() {
  return (
    <HomiBuoyProvider>
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">HomiBuoy with Gemini Test Page</h1>
        <p className="mb-8">
          This page demonstrates how to use the HomiBuoy context provider to interact with the chatbot from any
          component.
        </p>

        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <h2 className="font-semibold mb-2">Features:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Open/close the chatbot programmatically</li>
            <li>Send messages directly from other components</li>
            <li>Access chat history and loading state</li>
            <li>Streaming responses for a natural conversation flow</li>
          </ul>
        </div>

        <HomiBuoyTester />
      </div>
    </HomiBuoyProvider>
  )
}
