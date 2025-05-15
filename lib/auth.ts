import { getSupabaseClient } from "./supabase"

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

  // If not a demo user, try regular authentication
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    return { data, error, profile: null }
  }

  // Get profile data
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", data.user.id).single()

  return { data, error, profile }
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
    return { data, error }
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
}

// Sign in with SSO provider
export async function signInWithSSO(provider: "google" | "microsoft" | "university") {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider === "university" ? "azure" : provider, // Use Azure AD for university SSO
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

  return { data, error }
}

// Sign out
export async function signOut() {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}
