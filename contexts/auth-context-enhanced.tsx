"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const router = useRouter()

  // All auth functions are stubs that don't actually do anything
  // This is just to make the app render without errors

  const login = async () => {
    return { success: false, error: "Auth not available" }
  }

  const signUp = async () => {
    return { success: false, error: "Auth not available" }
  }

  const ssoLogin = async () => {
    // Do nothing
  }

  const logout = async () => {
    // Do nothing
  }

  const updateProfile = async () => {
    return { success: false, error: "Auth not available" }
  }

  const refreshProfile = async () => {
    // Do nothing
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
  return useContext(AuthContext)
}
