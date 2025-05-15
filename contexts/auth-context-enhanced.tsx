"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

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
  verified: boolean
  created_at: string
  avatar_url?: string
  bio?: string
  program?: string
  year?: number
  preferences?: Record<string, any>
  social_links?: Record<string, string>
  privacy_settings?: Record<string, boolean>
}

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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    const supabase = getSupabaseClient()

    async function loadUser() {
      try {
        setIsLoading(true)

        // Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setIsLoading(false)
          return
        }

        // Get user from session
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setIsLoading(false)
          return
        }

        setUser(authUser)

        // Get extended profile data
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError)
        } else {
          setProfile(profileData)
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setUser(session.user)

        // Get profile data
        const { data: profileData } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        setProfile(profileData)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setProfile(null)
      }
    })

    loadUser()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setIsAuthenticating(true)
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      setUser(data.user)

      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        return { success: true, error: "Logged in but couldn't fetch profile" }
      }

      setProfile(profileData)

      // Return the user role for proper redirection
      return { success: true, error: null, role: profileData?.role || "student" }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Sign up with email and password
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
      setIsAuthenticating(true)
      const supabase = getSupabaseClient()

      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            first_name: userData.first_name,
            last_name: userData.last_name,
          },
        },
      })

      if (error || !data.user) {
        return { success: false, error: error?.message || "Failed to create user" }
      }

      // Create extended profile
      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: data.user.id,
        email,
        role,
        first_name: userData.first_name,
        last_name: userData.last_name,
        university_id: userData.university_id || null,
        university_name: userData.university_name || null,
        company_name: userData.company_name || null,
        verified: false,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      setUser(data.user)

      // Get the newly created profile
      const { data: profileData } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single()

      setProfile(profileData)

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsAuthenticating(false)
    }
  }

  // SSO login
  const ssoLogin = async (provider: string) => {
    try {
      setIsAuthenticating(true)
      setLoadingProvider(provider)
      const supabase = getSupabaseClient()

      let providerName: "google" | "microsoft" | "azure" = "google"

      if (provider === "google") {
        providerName = "google"
      } else if (provider === "microsoft") {
        providerName = "microsoft"
      } else if (provider === "university") {
        providerName = "azure" // Use Azure AD for university SSO
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: providerName,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams:
            provider === "university"
              ? {
                  // Add university-specific parameters for Azure AD
                  domain_hint: "university.edu",
                }
              : undefined,
        },
      })

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        })
      }

      // Note: The user will be redirected to the OAuth provider,
      // so we don't need to update the state here
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsAuthenticating(false)
      setLoadingProvider(null)
    }
  }

  // Logout
  const logout = async () => {
    try {
      setIsAuthenticating(true)
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push("/login")
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Update profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) {
        return { success: false, error: "Not authenticated" }
      }

      const supabase = getSupabaseClient()

      const { error } = await supabase.from("user_profiles").update(data).eq("id", user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      // Update local profile state
      setProfile((prev) => (prev ? { ...prev, ...data } : null))

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Refresh profile data
  const refreshProfile = async () => {
    try {
      if (!user) return

      const supabase = getSupabaseClient()

      const { data, error } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

      if (error) {
        console.error("Error refreshing profile:", error)
        return
      }

      setProfile(data)
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
        isAuthenticated: !!user,
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
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
