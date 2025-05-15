import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-simple"

export async function GET() {
  try {
    const { user } = await getCurrentUser()
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ user: null, error: "An unexpected error occurred" }, { status: 500 })
  }
}
