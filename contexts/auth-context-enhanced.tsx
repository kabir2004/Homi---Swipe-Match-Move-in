"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define user types
export type UserRole = "student" | "landlord" | "admin"

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  first_name: string
  last_name: string
  university_id?: string
  university_name?: string
  company_name?: string
  avatar_url?: string
}

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticating: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: UserRole }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const router = useRouter()

  // Helper function to set auth cookie
  const setAuthCookie = (userData: any) => {
    document.cookie = `homi_auth=${JSON.stringify(userData)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax;`
  }

  // Check for existing user on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true)
      try {
        // Try to get user from localStorage first
        const storedUser = localStorage.getItem("homi_user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setAuthCookie(userData) // Ensure cookie is set
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        // Clear potentially corrupted data
        localStorage.removeItem("homi_user")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true)
    try {
      // Demo login credentials
      if (email === "student@uni.com" && password === "student123") {
        const demoStudentUser = {
          id: "student-demo-id",
          email: "student@uni.com",
          first_name: "Alex",
          last_name: "Student",
          role: "student" as UserRole,
          university_name: "University of Toronto",
          avatar_url: "/universities/uoft.svg",
        }

        localStorage.setItem("homi_user", JSON.stringify(demoStudentUser))
        setAuthCookie(demoStudentUser)
        setUser(demoStudentUser)
        return { success: true, role: "student" }
      } else if (email === "property@manager.com" && password === "landlord123") {
        const demoLandlordUser = {
          id: "landlord-demo-id",
          email: "property@manager.com",
          first_name: "Taylor",
          last_name: "Manager",
          role: "landlord" as UserRole,
          company_name: "Campus Housing Solutions",
          avatar_url: "/homi-building.png",
        }

        localStorage.setItem("homi_user", JSON.stringify(demoLandlordUser))
        setAuthCookie(demoLandlordUser)
        setUser(demoLandlordUser)
        return { success: true, role: "landlord" }
      }

      // For non-demo users, try the API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!data.success) {
        return { success: false, error: data.error || "Login failed" }
      }

      setUser(data.user)
      localStorage.setItem("homi_user", JSON.stringify(data.user))
      return { success: true, role: data.role }
    } catch (error: any) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "An unexpected error occurred" }
    } finally {
      setIsAuthenticating(false)
    }
  }

  const logout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem("homi_user")

      // Clear cookie
      document.cookie = "homi_auth=; path=/; max-age=0; SameSite=Lax;"

      // Update state
      setUser(null)

      // Redirect to login
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticating,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
