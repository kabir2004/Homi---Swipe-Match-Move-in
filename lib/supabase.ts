import { createClient } from "@supabase/supabase-js"

// Create a dummy client that doesn't throw errors
const dummyClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    getUser: () => Promise.resolve({ data: { user: null } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    signOut: () => Promise.resolve({}),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null }),
        or: () => Promise.resolve({ data: [] }),
      }),
      or: () => Promise.resolve({ data: [] }),
    }),
    insert: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
  }),
} as any

// Singleton instance
let supabaseInstance: any = null

export function getSupabaseClient() {
  // Skip Supabase on server side to avoid SSR issues
  if (typeof window === "undefined") {
    return dummyClient
  }

  // Return existing instance if available
  if (supabaseInstance) return supabaseInstance

  try {
    // IMPORTANT: Skip URL validation completely
    // Just check if the values exist
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    // Create client - this might still fail but we'll catch it
    supabaseInstance = createClient(url, key)
    return supabaseInstance
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return dummyClient
  }
}

// Server-side admin client - simplified
export async function getSupabaseAdmin() {
  // Skip on server side during rendering
  if (typeof window === "undefined") {
    return dummyClient
  }

  try {
    const { createClient } = await import("@supabase/supabase-js")
    return createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")
  } catch (error) {
    console.error("Error creating admin client:", error)
    return dummyClient
  }
}

// Helper function - simplified
export function isSupabaseConfigured(): boolean {
  // Skip on server side
  if (typeof window === "undefined") return false

  // Just check if values exist
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
