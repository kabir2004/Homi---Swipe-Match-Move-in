import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Create a singleton instance of the Supabase client for client components
let supabaseClient: ReturnType<typeof createClientComponentClient> | null = null

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    // Return null during SSR
    return null
  }

  if (!supabaseClient) {
    // Initialize the client only once
    supabaseClient = createClientComponentClient()
  }

  return supabaseClient
}
