"use client"

import type React from "react"

import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isMobile } = useMobile()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (conditionally rendered based on screen size) */}
      {!isMobile && (
        <div className="w-64 bg-gray-200 p-4">
          {/* Sidebar content */}
          Sidebar
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

export default DashboardLayout
