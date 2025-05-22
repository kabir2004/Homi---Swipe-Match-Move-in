"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signInWithSSO,
  signOut,
  updateUserProfile,
} from "@/lib/auth-service"
import type { UserProfile, UserRole } from "@/types"

interface AuthContextType {
  user: any | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticating: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error: any; role?: UserRole }>
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
  ssoLogin: (provider: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error: any }>
  refreshProfile: () => Promise<void>
  loadingProvider: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: false,
  isAuthenticating: false,
  isAuthenticated: false,
  login: async () => ({ success: false, error: "Not implemented" }),
  signUp: async () => ({ success: false, error: "Not implemented" }),
  ssoLogin: async () => {},
  logout: async () => {},
  updateProfile: async () => ({ success: false, error: "Not implemented" }),
  refreshProfile: async () => {},
  loadingProvider: null,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true)
      try {
        // Check if we're in a browser environment before making API calls
        if (typeof window !== "undefined") {
          try {
            const { user, profile, error } = await getCurrentUser()

            if (user && profile) {
              setUser(user)
              setProfile(profile)
            } else {
              // Check for demo user in localStorage (for development)
              const storedUser = localStorage.getItem("homi_user")
              if (storedUser) {
                try {
                  const parsedUser = JSON.parse(storedUser)
                  setProfile(parsedUser)
                } catch (e) {
                  console.error("Error parsing stored user:", e)
                  localStorage.removeItem("homi_user") // Remove invalid data
                }
              }
            }
          } catch (apiError) {
            console.error("API error checking session:", apiError)
            // Fall back to local storage if API fails
            const storedUser = localStorage.getItem("homi_user")
            if (storedUser) {
              try {
                const parsedUser = JSON.parse(storedUser)
                setProfile(parsedUser)
              } catch (e) {
                console.error("Error parsing stored user:", e)
              }
            }
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true)
    try {
      const { data, error, profile } = await signInWithEmail(email, password)

      if (error) {
        return { success: false, error: error.message }
      }

      setUser(data.user)

      if (profile) {
        setProfile(profile)
        // Store in localStorage for demo purposes
        localStorage.setItem("homi_user", JSON.stringify(profile))
        return { success: true, error: null, role: profile.role }
      } else {
        return { success: false, error: "Profile not found" }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsAuthenticating(false)
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
    setIsAuthenticating(true)
    try {
      const { data, error } = await signUpWithEmail(email, password, role, userData)

      if (error) {
        return { success: false, error: error.message }
      }

      // Create a profile object for the new user
      const newProfile: UserProfile = {
        id: data.user?.id || "",
        email,
        role,
        first_name: userData.first_name,
        last_name: userData.last_name,
        university_id: userData.university_id,
        university_name: userData.university_name,
        company_name: userData.company_name,
        verified: false,
        created_at: new Date().toISOString(),
      }

      setUser(data.user)
      setProfile(newProfile)

      // Store in localStorage for demo purposes
      localStorage.setItem("homi_user", JSON.stringify(newProfile))

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsAuthenticating(false)
    }
  }

  const ssoLogin = async (provider: string) => {
    setLoadingProvider(provider)
    try {
      const { data, error } = await signInWithSSO(provider as "google" | "microsoft" | "university")

      if (error) {
        console.error("SSO login error:", error)
      }
    } catch (error) {
      console.error("SSO login error:", error)
    } finally {
      setLoadingProvider(null)
    }
  }

  const logout = async () => {
    try {
      await signOut()
      setUser(null)
      setProfile(null)
      localStorage.removeItem("homi_user")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !profile) {
      return { success: false, error: "Not authenticated" }
    }

    try {
      const { data: updatedProfile, error } = await updateUserProfile(profile.id, data)

      if (error) {
        return { success: false, error: error.message }
      }

      // Update the local profile state
      const newProfile = { ...profile, ...data }
      setProfile(newProfile)

      // Update localStorage for demo purposes
      localStorage.setItem("homi_user", JSON.stringify(newProfile))

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const refreshProfile = async () => {
    if (!user) return

    try {
      // Only attempt to refresh from API if we're in a browser environment
      if (typeof window !== "undefined") {
        try {
          const { profile: refreshedProfile } = await getCurrentUser()
          if (refreshedProfile) {
            setProfile(refreshedProfile)
            localStorage.setItem("homi_user", JSON.stringify(refreshedProfile))
          }
        } catch (apiError) {
          console.error("API error refreshing profile:", apiError)
        }
      }
    } catch (error) {
      console.error("Error refreshing profile:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticating,
        isAuthenticated: !!user || !!profile,
        login,
        signUp,
        ssoLogin,
        logout,
        updateProfile,
        refreshProfile,
        loadingProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
