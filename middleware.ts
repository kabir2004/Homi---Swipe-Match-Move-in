import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/social", "/landlord/dashboard"]

// Define routes that should redirect to dashboard if already logged in
const authRoutes = ["/login"]

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const path = request.nextUrl.pathname

  // Check for user in localStorage (client-side only)
  // For middleware, we need to use cookies instead
  const authCookie = request.cookies.get("homi_auth")
  const isAuthenticated = !!authCookie?.value

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some((route) => path.startsWith(route)) && !isAuthenticated) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if user is already logged in and trying to access auth routes
  if (authRoutes.includes(path) && isAuthenticated) {
    // Get user role from cookie to determine which dashboard to redirect to
    try {
      const userData = JSON.parse(authCookie.value)
      if (userData.role === "landlord") {
        return NextResponse.redirect(new URL("/landlord/dashboard", request.url))
      }
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } catch (e) {
      // If cookie parsing fails, just continue to the login page
      return res
    }
  }

  return res
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/social/:path*", "/landlord/:path*", "/login"],
}
