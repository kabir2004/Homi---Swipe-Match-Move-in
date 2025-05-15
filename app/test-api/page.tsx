"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestApiPage() {
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error">("loading")
  const [apiMessage, setApiMessage] = useState("")
  const [prompt, setPrompt] = useState("Tell me about student housing in Ontario")
  const [response, setResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    checkApiStatus()
  }, [])

  async function checkApiStatus() {
    try {
      setApiStatus("loading")
      const res = await fetch("/api/test-gemini")
      const data = await res.json()

      if (data.success) {
        setApiStatus("success")
        setApiMessage(data.message || "API is working correctly")
      } else {
        setApiStatus("error")
        setApiMessage(data.message || "API key is invalid or not configured")
      }
    } catch (error) {
      setApiStatus("error")
      setApiMessage("Error checking API status")
      console.error("Error checking API status:", error)
    }
  }

  async function generateResponse() {
    if (!prompt.trim()) return

    try {
      setIsGenerating(true)
      setResponse("")

      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setResponse(data.text || "No response received")
      } else {
        setResponse(`Error: ${data.message || "Failed to generate response"}`)
      }
    } catch (error) {
      setResponse("Error generating response. Please try again.")
      console.error("Error generating response:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>API Status</CardTitle>
          <CardDescription>Check if the Gemini API is configured correctly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className={`w-4 h-4 rounded-full ${
                apiStatus === "loading" ? "bg-yellow-500" : apiStatus === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <p>
              {apiStatus === "loading"
                ? "Checking API status..."
                : apiStatus === "success"
                  ? "API is working correctly"
                  : "API error"}
            </p>
          </div>
          {apiMessage && <p className="mt-2 text-sm">{apiMessage}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={checkApiStatus} disabled={apiStatus === "loading"}>
            {apiStatus === "loading" ? "Checking..." : "Check API Status"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Gemini API</CardTitle>
          <CardDescription>Generate a response using the Gemini API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here"
            />
          </div>

          {response && (
            <div className="space-y-2">
              <Label>Response</Label>
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">{response}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={generateResponse} disabled={isGenerating || apiStatus !== "success" || !prompt.trim()}>
            {isGenerating ? "Generating..." : "Generate Response"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
