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
  const [apiKey, setApiKey] = useState("")

  // Test direct API connection via server endpoint
  const testDirectApi = async () => {
    setIsLoading(true)
    setConnectionStatus("untested")

    try {
      const response = await fetch("/api/gemini-direct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: testMessage,
          apiKey: apiKey || undefined,
        }),
      })

      const data = await response.json()
      console.log("Direct API response:", data)

      if (data.error) {
        setConnectionStatus("failed")
        setResponse(`Error: ${data.error.message || JSON.stringify(data.error)}`)
      } else if (data.candidates && data.candidates[0].content.parts[0].text) {
        setConnectionStatus("success")
        setResponse(data.candidates[0].content.parts[0].text)
      } else {
        setConnectionStatus("failed")
        setResponse("Received response but couldn't find text content")
      }
    } catch (error) {
      console.error("Error testing direct API:", error)
      setConnectionStatus("failed")
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Test our API endpoint
  const testApiEndpoint = async () => {
    setIsLoading(true)
    setConnectionStatus("untested")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: testMessage }],
        }),
      })

      const data = await response.json()
      console.log("API endpoint response:", data)

      if (data.error) {
        setConnectionStatus("failed")
        setResponse(`Error: ${data.error}`)
      } else if (data.content) {
        setConnectionStatus("success")
        setResponse(data.content)
      } else {
        setConnectionStatus("failed")
        setResponse("Received response but couldn't find content")
      }
    } catch (error) {
      console.error("Error testing API endpoint:", error)
      setConnectionStatus("failed")
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
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
            <CardTitle>Test Direct API Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">API Key (optional)</label>
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                type="password"
              />
              <p className="text-xs text-gray-500 mt-1">If left empty, will use server's API key</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Test Message</label>
              <Input
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Enter a test message"
              />
            </div>

            <Button onClick={testDirectApi} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Test Direct API Connection
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test API Endpoint</CardTitle>
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

            <Button onClick={testApiEndpoint} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Test API Endpoint
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
