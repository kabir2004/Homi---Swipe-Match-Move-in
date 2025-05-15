"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send, CheckCircle, XCircle } from "lucide-react"

export default function TestApiPage() {
  const [testMessage, setTestMessage] = useState("Hello, are you working?")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "failed">("untested")

  // Test API connection
  const testApiConnection = async () => {
    setIsLoading(true)
    setConnectionStatus("untested")

    try {
      const response = await fetch("/api/test-gemini")
      const data = await response.json()

      if (data.success) {
        setConnectionStatus("success")
        setResponse("API connection successful")
      } else {
        setConnectionStatus("failed")
        setResponse(`Error: ${data.message}`)
      }
    } catch (error) {
      setConnectionStatus("failed")
      setResponse(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Test chat API
  const testChatApi = async () => {
    setIsLoading(true)
    setConnectionStatus("untested")

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: testMessage }],
        }),
      })

      const data = await response.json()

      if (data.error) {
        setConnectionStatus("failed")
        setResponse(`Error: ${data.error}`)
      } else {
        setConnectionStatus("success")
        setResponse(data.text || "No response received")
      }
    } catch (error) {
      setConnectionStatus("failed")
      setResponse(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <p className="mb-8">This page tests the connection to the Gemini API to help diagnose any issues.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Test API Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testApiConnection} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Test API Connection
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Chat API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Test Message</label>
              <Input
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Enter a test message"
              />
            </div>

            <Button onClick={testChatApi} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Test Chat API
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Response
            {connectionStatus === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {connectionStatus === "failed" && <XCircle className="h-5 w-5 text-red-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
            {response || "No response yet. Run a test to see results."}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
