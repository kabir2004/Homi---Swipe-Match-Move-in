"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { testGeminiConnection } from "@/lib/gemini"

export default function TestGeminiKeyPage() {
  const [testResult, setTestResult] = useState<{
    success: boolean
    response?: string
    error?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")

  // Get the API key from environment variables on component mount
  useEffect(() => {
    setApiKey(process.env.GEMINI_API_KEY || "Not set")
  }, [])

  const runTest = async () => {
    setIsLoading(true)
    try {
      const result = await testGeminiConnection()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Gemini API Key Test</h1>
      <p className="mb-8">This page tests if your Gemini API key is working correctly.</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono bg-gray-100 p-2 rounded">
            {apiKey === "Not set" ? (
              <span className="text-red-500">API key not set in environment variables</span>
            ) : (
              <>
                {apiKey.substring(0, 10)}...{apiKey.substring(apiKey.length - 5)}
              </>
            )}
          </p>
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Make sure your API key is properly set in the .env.local file and that you've restarted your development
              server after making changes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Button onClick={runTest} disabled={isLoading} className="mb-8">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Test API Connection"}
      </Button>

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Test Result
              {testResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`p-4 rounded-md ${
                testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <p className={testResult.success ? "text-green-800" : "text-red-800"}>
                {testResult.success ? "API connection successful!" : "API connection failed"}
              </p>
              <p className="mt-2 font-mono text-sm whitespace-pre-wrap">
                {testResult.response || testResult.error || "No response"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
