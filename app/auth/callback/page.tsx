"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState<string>("Completing your sign in...")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleAuthCallback() {
      const supabase = getSupabaseClient()

      try {
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!data.session) {
          throw new Error("No session found")
        }

        // Check if user has a profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          // PGRST116 is the error code for "no rows returned"
          throw profileError
        }

        if (!profile) {
          // Create a profile if it doesn't exist
          const userData = data.session.user
          const { error: createProfileError } = await supabase.from("profiles").insert({
            id: userData.id,
            email: userData.email,
            full_name: userData.user_metadata?.full_name || "",
            first_name: userData.user_metadata?.full_name?.split(" ")[0] || "",
            last_name: userData.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
            avatar_url: userData.user_metadata?.avatar_url || null,
            verified: true, // SSO users are verified by default
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (createProfileError) {
            throw createProfileError
          }

          setStatus("success")
          setMessage("Account created successfully!")

          // Redirect to onboarding after a short delay
          setTimeout(() => {
            router.push("/onboarding")
          }, 1500)
          return
        }

        setStatus("success")
        setMessage("Sign in successful!")

        // Redirect based on role after a short delay
        setTimeout(() => {
          if (profile.role === "landlord") {
            router.push("/landlord/dashboard")
          } else {
            router.push("/dashboard")
          }
        }, 1500)
      } catch (err: any) {
        console.error("Error during auth callback:", err)
        setStatus("error")
        setError(err.message || "Authentication failed. Please try again.")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center"
      >
        {status === "loading" && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mx-auto mb-6"
            >
              <Loader2 className="h-12 w-12 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">Completing Sign In</h1>
            <p className="text-gray-600">Please wait while we complete your authentication...</p>
          </>
        )}

        {status === "success" && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Success!</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting you automatically...</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
            <p className="text-red-500 mb-6">{error}</p>
            <Button onClick={() => router.push("/login")} className="bg-primary hover:bg-primary-600">
              Return to Login
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
