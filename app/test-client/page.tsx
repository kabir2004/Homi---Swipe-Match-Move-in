"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send, CheckCircle, XCircle } from "lucide-react"
// No direct import needed as we'll use fetch API
import { HomiBuoyClient } from "@/components/homi-buoy-client"

export default function TestClientPage() {
  const [testMessage, setTestMessage] = useState("Hello, are you working?")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "failed">("untested")
  const [apiKeyStatus, setApiKeyStatus] = useState<"available" | "missing">("untested")

  // Check API key status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("/api/test-gemini")
        const result = await response.json()
        setApiKeyStatus(result.success ? "available" : "missing")
      } catch (error) {
        console.error("Error checking API status:", error)
        setApiKeyStatus("missing")
      }
    }

    checkApiStatus()
  }, [])

  const testDirectApi = async () => {
    setIsLoading(true)
    setConnectionStatus("untested")

    try {
      const response = await fetch("/api/test-gemini")
      const result = await response.json()

      if (result.success) {
        setConnectionStatus("success")
        setResponse(result.message)
      } else {
        setConnectionStatus("failed")
        setResponse(`Error: ${result.message}`)
      }
    } catch (error) {
      console.error("Error testing API:", error)
      setConnectionStatus("failed")
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">HomiBuoy Client Test Page</h1>
      <p className="mb-8">This page tests the client-side implementation of HomiBuoy using the Gemini API directly.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              API Key Status
              {apiKeyStatus === "available" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {apiKeyStatus === "available"
                ? "NEXT_PUBLIC_GEMINI_API_KEY is available in environment variables."
                : "NEXT_PUBLIC_GEMINI_API_KEY is missing from environment variables."}
            </p>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm font-mono">
                {apiKeyStatus === "available" ? "API Key is configured on the server" : "API Key is not available"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test API Connection</CardTitle>
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

            <Button onClick={testDirectApi} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              Test API Connection
            </Button>

            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Response:</p>
              <div className="p-4 bg-gray-50 rounded-md min-h-[100px] whitespace-pre-wrap">
                {connectionStatus === "success" && <CheckCircle className="h-4 w-4 text-green-500 inline mr-2" />}
                {connectionStatus === "failed" && <XCircle className="h-4 w-4 text-red-500 inline mr-2" />}
                {response || "No response yet. Run a test to see results."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">HomiBuoy Chat Test</h2>
        <p className="mb-4">Click the chat bubble in the bottom right corner to test the HomiBuoy chat interface.</p>
        <HomiBuoyClient />
      </div>
    </div>
  )
}
