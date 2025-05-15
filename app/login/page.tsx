"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context-enhanced"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { login, isAuthenticating } = useAuth()
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("homi_user")
    if (userData) {
      try {
        const user = JSON.parse(userData)
        if (user.role === "landlord") {
          router.push("/landlord/dashboard")
        } else {
          router.push("/dashboard")
        }
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem("homi_user")
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Demo login credentials
      if (email === "student@uni.com" && password === "student123") {
        // Store demo student user data
        const demoStudentUser = {
          id: "student-demo-id",
          email: "student@uni.com",
          first_name: "Alex",
          last_name: "Student",
          role: "student",
          university_name: "University of Toronto",
          avatar_url: "/universities/uoft.svg",
          program: "Computer Science",
          year: 3,
        }

        localStorage.setItem("homi_user", JSON.stringify(demoStudentUser))
        setLoginSuccess(true)

        // Redirect after showing success message
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
        return
      } else if (email === "property@manager.com" && password === "landlord123") {
        // Store demo landlord user data
        const demoLandlordUser = {
          id: "landlord-demo-id",
          email: "property@manager.com",
          first_name: "Taylor",
          last_name: "Manager",
          role: "landlord",
          company_name: "Campus Housing Solutions",
          avatar_url: "/homi-building.png",
        }

        localStorage.setItem("homi_user", JSON.stringify(demoLandlordUser))
        setLoginSuccess(true)

        // Redirect after showing success message
        setTimeout(() => {
          router.push("/landlord/dashboard")
        }, 1500)
        return
      }

      // For non-demo logins
      const result = await login(email, password)

      if (result.success) {
        setLoginSuccess(true)
        setTimeout(() => {
          if (result.role === "landlord") {
            router.push("/landlord/dashboard")
          } else {
            router.push("/dashboard")
          }
        }, 1500)
      } else {
        setError(result.error || "Invalid login credentials")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  // Add this function to the login page component
  const handleDemoLogin = (role: "student" | "landlord") => {
    setIsLoading(true)

    // Create a demo user based on role
    const demoUser = {
      id: `demo-${role}`,
      first_name: "Demo",
      last_name: role === "student" ? "Student" : "Landlord",
      email: `demo@${role}.com`,
      role: role,
      university_name: role === "student" ? "University of Toronto" : undefined,
      company_name: role === "landlord" ? "Demo Properties" : undefined,
      created_at: new Date().toISOString(),
    }

    // Store in localStorage
    localStorage.setItem("homi_user", JSON.stringify(demoUser))

    // Redirect to appropriate dashboard
    setTimeout(() => {
      router.push(role === "student" ? "/dashboard" : "/landlord/dashboard")
    }, 1000)
  }

  if (loginSuccess) {
    return (
      <>
        <Header />
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Login Successful!</h1>
            <p className="text-gray-600 mb-8">Redirecting you to your dashboard...</p>
            <div className="animate-pulse h-1 bg-primary rounded-full max-w-xs mx-auto"></div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to Homi</h1>
            <p className="text-gray-600 mt-2">Sign in to continue to your account</p>
          </div>

          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="credentials">Email & Password</TabsTrigger>
              <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="credentials">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Enter your email and password to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || isAuthenticating}>
                      {isLoading || isAuthenticating ? "Signing in..." : "Sign In"}
                    </Button>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={() => handleDemoLogin("student")}
                      >
                        Demo Student Login
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={() => handleDemoLogin("landlord")}
                      >
                        Demo Landlord Login
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="demo">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDemoLogin("student")}
                >
                  <CardHeader>
                    <CardTitle>Student Demo</CardTitle>
                    <CardDescription>Access the student dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                      <Image
                        src="/universities/uoft.svg"
                        alt="Student"
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Email: student@uni.com</p>
                      <p className="text-sm text-gray-500">Password: student123</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in as Student"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleDemoLogin("landlord")}
                >
                  <CardHeader>
                    <CardTitle>Landlord Demo</CardTitle>
                    <CardDescription>Access the property manager dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
                      <Image
                        src="/homi-building.png"
                        alt="Landlord"
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Email: property@manager.com</p>
                      <p className="text-sm text-gray-500">Password: landlord123</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in as Landlord"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
