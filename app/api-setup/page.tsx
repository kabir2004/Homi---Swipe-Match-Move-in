"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink, Copy, Check, AlertCircle } from "lucide-react"

export default function ApiSetupPage() {
  const [apiKey, setApiKey] = useState("")
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async () => {
    if (!apiKey.trim()) return

    setIsLoading(true)
    setTestResult(null)

    try {
      // Test the API key via server endpoint
      const response = await fetch("/api/gemini-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello, testing API key",
          apiKey: apiKey,
        }),
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyEnvVariable = () => {
    navigator.clipboard.writeText(`GEMINI_API_KEY=${apiKey}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">API Key Setup</h1>
        <p className="text-gray-600 mb-8">Set up your Gemini API key to enable HomiBuoy's AI capabilities</p>

        <Tabs defaultValue="get-key">
          <TabsList className="mb-6">
            <TabsTrigger value="get-key">Get API Key</TabsTrigger>
            <TabsTrigger value="test-key">Test API Key</TabsTrigger>
            <TabsTrigger value="setup">Setup Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="get-key">
            <Card>
              <CardHeader>
                <CardTitle>Get a Gemini API Key</CardTitle>
                <CardDescription>Follow these steps to obtain a free API key from Google AI Studio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <p>Visit Google AI Studio</p>
                    <Button variant="outline" asChild className="mt-2">
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Open Google AI Studio <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </li>
                  <li>
                    <p>Sign in with your Google account</p>
                  </li>
                  <li>
                    <p>Click on "Get API key" or "Create API key"</p>
                  </li>
                  <li>
                    <p>Name your API key (e.g., "HomiBuoy")</p>
                  </li>
                  <li>
                    <p>Copy the generated API key</p>
                  </li>
                </ol>

                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Important</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Keep your API key secure and never share it publicly. The free tier includes generous usage limits
                    that should be sufficient for personal use.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test-key">
            <Card>
              <CardHeader>
                <CardTitle>Test Your API Key</CardTitle>
                <CardDescription>Verify that your Gemini API key is working correctly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Gemini API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <Button onClick={handleTest} disabled={!apiKey.trim() || isLoading}>
                  {isLoading ? "Testing..." : "Test API Key"}
                </Button>

                {testResult && (
                  <div
                    className={`p-4 rounded-md mt-4 ${testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                  >
                    <div className="flex items-start gap-2">
                      {testResult.success ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-medium ${testResult.success ? "text-green-800" : "text-red-800"}`}>
                          {testResult.success ? "API Key is valid!" : "API Key error"}
                        </p>
                        <p className={`text-sm mt-1 ${testResult.success ? "text-green-700" : "text-red-700"}`}>
                          {testResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={copyEnvVariable} disabled={!apiKey.trim()}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy as ENV variable
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="setup">
            <Card>
              <CardHeader>
                <CardTitle>Setup Instructions</CardTitle>
                <CardDescription>How to add your API key to your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold">Option 1: Environment Variables (Recommended)</h3>
                <p className="text-sm text-gray-600">
                  Add this line to your <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> file:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-sm">
                  <pre>GEMINI_API_KEY=your_api_key_here</pre>
                </div>

                <h3 className="font-semibold pt-4">Option 2: Vercel Environment Variables</h3>
                <p className="text-sm text-gray-600">
                  If deploying to Vercel, add this environment variable in your project settings:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded">GEMINI_API_KEY</code> (for server-side usage)
                  </li>
                </ul>

                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Remember</AlertTitle>
                  <AlertDescription>
                    After adding environment variables, you'll need to restart your development server or redeploy your
                    application for the changes to take effect.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
