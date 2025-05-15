import { HomiBuoy } from "@/components/homi-buoy"

export default function TestChatPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">HomiBuoy Test Page</h1>
      <p className="mb-8">
        This page is for testing the HomiBuoy chatbot. Click the chat bubble in the bottom right corner to start a
        conversation.
      </p>

      <div className="p-4 bg-blue-50 rounded-lg mb-4">
        <h2 className="font-semibold mb-2">Testing Instructions:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click the chat bubble in the bottom right</li>
          <li>Try asking a question about Homi or student housing</li>
          <li>Check the browser console for any error messages</li>
        </ol>
      </div>

      <HomiBuoy />
    </div>
  )
}
