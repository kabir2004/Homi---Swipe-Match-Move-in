"use server"

import { cookies } from "next/headers"

// User types
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
}

// Demo users
const DEMO_USERS = {
  "student@uni.com": {
    id: "student-123",
    email: "student@uni.com",
    password: "123456789",
    role: "student" as UserRole,
    first_name: "Student",
    last_name: "User",
    university_id: "uoft",
    university_name: "University of Toronto",
  },
  "property@manager.com": {
    id: "landlord-123",
    email: "property@manager.com",
    password: "123456789",
    role: "landlord" as UserRole,
    first_name: "Property",
    last_name: "Manager",
    company_name: "ABC Property Management",
  },
}

// Login function
export async function login(email: string, password: string) {
  // Check if email exists in demo users
  if (!DEMO_USERS[email]) {
    return { success: false, error: "User not found" }
  }

  // Check if password matches
  if (DEMO_USERS[email].password !== password) {
    return { success: false, error: "Invalid password" }
  }

  // Set user in cookie
  const user = { ...DEMO_USERS[email] }
  delete user.password

  // Store user in cookie
  cookies().set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true, user }
}

// Get current user
export async function getCurrentUser() {
  const userCookie = cookies().get("user")

  if (!userCookie) {
    return { user: null }
  }

  try {
    const user = JSON.parse(userCookie.value)
    return { user }
  } catch (error) {
    return { user: null }
  }
}

// Logout function
export async function logout() {
  cookies().delete("user")
  return { success: true }
}
