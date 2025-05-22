import { createClient } from "@supabase/supabase-js"
import type { UserProfile, UserRole } from "@/types"

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton instance of the Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

// Demo users for reliable login in development/demo mode
const DEMO_USERS = {
  student: {
    email: "student@uni.com",
    password: "student123",
    profile: {
      id: "student-demo-id",
      email: "student@uni.com",
      role: "student" as UserRole,
      first_name: "Alex",
      last_name: "Student",
      university_id: "uoft",
      university_name: "University of Toronto",
      verified: true,
      created_at: new Date().toISOString(),
      avatar_url: "/diverse-students-studying.png",
    },
  },
  landlord: {
    email: "property@manager.com",
    password: "landlord123",
    profile: {
      id: "landlord-demo-id",
      email: "property@manager.com",
      role: "landlord" as UserRole,
      first_name: "Sam",
      last_name: "Property",
      company_name: "Urban Living Properties",
      verified: true,
      created_at: new Date().toISOString(),
      avatar_url: "/diverse-landlords.png",
    },
  },
}

// Get the current user and their profile data
export async function getCurrentUser(): Promise<{
  user: any
  profile: UserProfile | null
  error: any
}> {
  try {
    // Check if we have a valid API URL before making the request
    const apiUrl = typeof window !== "undefined" ? `${window.location.origin}/api/auth/user` : null

    if (!apiUrl) {
      return { user: null, profile: null, error: new Error("Invalid API URL") }
    }

    // For demo purposes, check if we have a stored user in localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("homi_user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          return { user: { id: parsedUser.id }, profile: parsedUser, error: null }
        } catch (e) {
          console.error("Error parsing stored user:", e)
        }
      }
    }

    // If no stored user, try to get from Supabase
    const supabase = getSupabaseClient()

    try {
      // Get user from session
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        return { user: null, profile: null, error: userError }
      }

      // Get extended profile data
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        return { user, profile: null, error: profileError }
      }

      return { user, profile, error: null }
    } catch (supabaseError) {
      console.error("Supabase error getting current user:", supabaseError)
      return { user: null, profile: null, error: supabaseError }
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return { user: null, profile: null, error }
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  // Check for demo users first for reliable demo experience
  if (email === DEMO_USERS.student.email && password === DEMO_USERS.student.password) {
    return {
      data: {
        user: { id: DEMO_USERS.student.profile.id, email },
        session: { access_token: "demo-token" },
      },
      error: null,
      profile: DEMO_USERS.student.profile,
    }
  }

  if (email === DEMO_USERS.landlord.email && password === DEMO_USERS.landlord.password) {
    return {
      data: {
        user: { id: DEMO_USERS.landlord.profile.id, email },
        session: { access_token: "demo-token" },
      },
      error: null,
      profile: DEMO_USERS.landlord.profile,
    }
  }

  try {
    // If not a demo user, try regular authentication
    const supabase = getSupabaseClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      return { data: { user: null, session: null }, error, profile: null }
    }

    // Get profile data
    const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single()

    return { data, error, profile }
  } catch (error) {
    console.error("Error signing in with email:", error)
    return {
      data: { user: null, session: null },
      error: error instanceof Error ? error : new Error("Unknown error signing in"),
      profile: null,
    }
  }
}

// Sign up with email and password
export async function signUpWithEmail(
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
) {
  try {
    const supabase = getSupabaseClient()

    // Create the auth user
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
      return { data: { user: null, session: null }, error }
    }

    // Create the extended profile
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
    })

    if (profileError) {
      return { data, error: profileError }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error signing up with email:", error)
    return {
      data: { user: null, session: null },
      error: error instanceof Error ? error : new Error("Unknown error signing up"),
    }
  }
}

// Sign in with SSO provider
export async function signInWithSSO(provider: "google" | "microsoft" | "university") {
  try {
    const supabase = getSupabaseClient()

    // For demo mode, create a fake successful response
    if (process.env.NODE_ENV === "development") {
      // Return a demo user based on the provider
      const demoUser = DEMO_USERS.student

      // Store in localStorage for demo purposes
      if (typeof window !== "undefined") {
        localStorage.setItem("homi_user", JSON.stringify(demoUser.profile))
      }

      return {
        data: { url: "#demo-sso-redirect", provider },
        error: null,
      }
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider === "university" ? "azure" : provider, // Use Azure AD for university SSO
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
        queryParams:
          provider === "university"
            ? {
                // Add university-specific parameters for Azure AD
                domain_hint: "university.edu",
              }
            : undefined,
      },
    })

    return { data, error }
  } catch (error) {
    console.error("Error signing in with SSO:", error)
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error in SSO login"),
    }
  }
}

// Sign out
export async function signOut() {
  try {
    // For demo mode, just clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("homi_user")
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    console.error("Error signing out:", error)
    return { error: error instanceof Error ? error : new Error("Unknown error signing out") }
  }
}

// Update user profile
export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) {
  try {
    // For demo mode, just update localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("homi_user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          const updatedUser = { ...parsedUser, ...profileData }
          localStorage.setItem("homi_user", JSON.stringify(updatedUser))
          return { data: updatedUser, error: null }
        } catch (e) {
          console.error("Error updating stored user:", e)
        }
      }
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from("user_profiles").update(profileData).eq("id", userId).select().single()

    return { data, error }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error updating profile"),
    }
  }
}
