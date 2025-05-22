import { NextResponse } from "next/server"

// Demo users for reliable login
const DEMO_USERS = {
  "student@uni.com": {
    id: "student-demo-id",
    email: "student@uni.com",
    password: "student123",
    role: "student",
    first_name: "Alex",
    last_name: "Student",
    university_name: "University of Toronto",
    avatar_url: "/universities/uoft.svg",
  },
  "property@manager.com": {
    id: "landlord-demo-id",
    email: "property@manager.com",
    password: "landlord123",
    role: "landlord",
    first_name: "Taylor",
    last_name: "Manager",
    company_name: "Campus Housing Solutions",
    avatar_url: "/homi-building.png",
  },
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Check demo users
    const demoUser = DEMO_USERS[email]
    if (demoUser && demoUser.password === password) {
      // Create a copy without the password
      const { password: _, ...userWithoutPassword } = demoUser

      // Set cookie for auth
      const response = NextResponse.json({
        success: true,
        user: userWithoutPassword,
        role: demoUser.role,
      })

      response.cookies.set({
        name: "homi_auth",
        value: JSON.stringify(userWithoutPassword),
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
      })

      return response
    }

    // If no matching user found
    return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 })
  }
}
