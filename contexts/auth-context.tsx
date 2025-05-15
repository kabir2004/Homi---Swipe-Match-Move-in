"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signInWithSSO,
  signOut,
  type UserProfile,
  type UserRole,
} from "@/lib/auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: any | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: any }>
  signUp: (
    email: string,
    password: string,
    role: UserRole,
    userData: {
      first_name: string
      last_name: string
      university_id?: string
      university_name?: string
      company_name?: string
    },
  ) => Promise<{ success: boolean; error: any }>
  ssoSignIn: (provider: "google" | "microsoft" | "university") => Promise<{ success: boolean; error: any }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      setIsLoading(true)
      const { user, profile, error } = await getCurrentUser()

      setUser(user)
      setProfile(profile)
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await signInWithEmail(email, password)

      if (error) {
        return { success: false, error }
      }

      setUser(data.user)

      // Fetch profile data
      const { profile } = await getCurrentUser()
      setProfile(profile)

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error }
    }
  }

  const signUp = async (
    email: string,
    password: string,
    role: UserRole,
    userData: {
      first_name: string
      last_name: string
      university_id?: string
      university_name?: string
      company_name?: string
    },
  ) => {
    try {
      const { data, error } = await signUpWithEmail(email, password, role, userData)

      if (error) {
        return { success: false, error }
      }

      setUser(data.user)

      // Fetch profile data
      const { profile } = await getCurrentUser()
      setProfile(profile)

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error }
    }
  }

  const ssoSignIn = async (provider: "google" | "microsoft" | "university") => {
    try {
      const { data, error } = await signInWithSSO(provider)

      if (error) {
        return { success: false, error }
      }

      return { success: true, error: null }
    } catch (error) {
      return { success: false, error }
    }
  }

  const logout = async () => {
    await signOut()
    setUser(null)
    setProfile(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        ssoSignIn,
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
