import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/social", "/landlord/dashboard"]

// Define routes that should redirect to dashboard if already logged in
const authRoutes = ["/login"]

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = request.nextUrl.pathname

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => path.startsWith(route)) && !session) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if user is already logged in and trying to access auth routes
  if (authRoutes.includes(path) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return res
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/social/:path*", "/landlord/:path*", "/login"],
}
