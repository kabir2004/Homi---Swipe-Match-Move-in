"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { HomiBuoyDirect } from "@/components/homi-buoy-direct"
import { HOMIBUOY_SYSTEM_PROMPT } from "@/lib/homi-buoy-prompts"

export default function TestDirectPage() {
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState("Tell me about student housing near UofT")
  const API_KEY = "AIzaSyDNTkuEZsi2Nrh2wHrQ_SesESNLDIcPQio"

  const testApi = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: HOMIBUOY_SYSTEM_PROMPT }],
              },
              {
                role: "model",
                parts: [{ text: "I understand my role as HomiBuoy. I'll help with student housing questions." }],
              },
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1000,
            },
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setResult(`Error: ${JSON.stringify(data, null, 2)}`)
      } else if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setResult(data.candidates[0].content.parts[0].text)
      } else {
        setResult(`Unexpected response format: ${JSON.stringify(data, null, 2)}`)
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">HomiBuoy Direct API Test</h1>
      <p className="mb-8">This page tests the direct API implementation with your specific API key.</p>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">API Key</label>
          <div className="font-mono bg-gray-100 p-2 rounded">
            {API_KEY.substring(0, 10)}...{API_KEY.substring(API_KEY.length - 5)}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Test Prompt</label>
          <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="mb-4" />
        </div>

        <Button onClick={testApi} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Test API"}
        </Button>
      </div>

      {result && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto whitespace-pre-wrap">{result}</pre>
          </CardContent>
        </Card>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">HomiBuoy Chat Component</h2>
        <p className="mb-4">Click the chat bubble in the bottom right to test the HomiBuoy component.</p>
        <HomiBuoyDirect />
      </div>
    </div>
  )
}
