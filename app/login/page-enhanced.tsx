"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context-provider"
import { SSOProviders } from "@/components/auth/sso-providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import type { UserRole } from "@/types"

export default function LoginPage() {
  const router = useRouter()
  const { login, signUp, ssoLogin, isAuthenticating, loadingProvider } = useAuth()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "student" as UserRole,
    universityName: "",
    companyName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password")
      return
    }

    const { success, error, role } = await login(formData.email, formData.password)

    if (success) {
      // Redirect based on role
      if (role === "landlord") {
        router.push("/landlord/dashboard")
      } else {
        router.push("/dashboard")
      }
    } else {
      setError(error || "Login failed. Please check your credentials.")
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.role === "student" && !formData.universityName) {
      setError("Please enter your university name")
      return
    }

    if (formData.role === "landlord" && !formData.companyName) {
      setError("Please enter your company name")
      return
    }

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      university_name: formData.universityName,
      company_name: formData.companyName,
    }

    const { success, error } = await signUp(formData.email, formData.password, formData.role, userData)

    if (success) {
      // Redirect based on role
      if (formData.role === "landlord") {
        router.push("/landlord/dashboard")
      } else {
        router.push("/dashboard")
      }
    } else {
      setError(error || "Sign up failed. Please try again.")
    }
  }

  const handleSSOLogin = async (provider: string) => {
    setError(null)
    try {
      await ssoLogin(provider)
    } catch (error: any) {
      setError(error.message || "SSO login failed. Please try again.")
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <Image src="/homi-slug.png" alt="Homi Logo" width={120} height={40} className="mx-auto mb-2" />
                <h1 className="text-2xl font-bold text-gray-900">Welcome to Homi</h1>
                <p className="text-gray-600">Find your perfect student housing match</p>
              </div>

              <Tabs defaultValue="login" value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-blue-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isAuthenticating}>
                      {isAuthenticating && !loadingProvider ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Log In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input
                        id="email-signup"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <Input
                        id="password-signup"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={formData.role === "student" ? "default" : "outline"}
                          className="w-full"
                          onClick={() => handleRoleChange("student")}
                        >
                          Student
                        </Button>
                        <Button
                          type="button"
                          variant={formData.role === "landlord" ? "default" : "outline"}
                          className="w-full"
                          onClick={() => handleRoleChange("landlord")}
                        >
                          Landlord
                        </Button>
                      </div>
                    </div>

                    {formData.role === "student" && (
                      <div className="space-y-2">
                        <Label htmlFor="universityName">University</Label>
                        <Input
                          id="universityName"
                          name="universityName"
                          placeholder="University of Toronto"
                          value={formData.universityName}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    {formData.role === "landlord" && (
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name (Optional)</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="Your Property Management"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isAuthenticating}>
                      {isAuthenticating && !loadingProvider ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <SSOProviders
                    onSSOLogin={handleSSOLogin}
                    isLoading={isAuthenticating}
                    loadingProvider={loadingProvider}
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 text-center text-sm text-gray-600">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setActiveTab("login")}
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>
          </motion.div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
