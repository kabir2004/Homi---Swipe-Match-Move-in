import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { HomiBuoyImproved } from "@/components/homi-buoy-improved"
import { AuthProvider } from "@/contexts/auth-context-enhanced"
import { ToastContainer } from "@/components/ui/feedback-toast"

export const metadata: Metadata = {
  title: "Homi - Smart Housing for Students",
  description: "Swipe. Match. Move In. Find your perfect student housing and roommates.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <ToastContainer />
            <HomiBuoyImproved />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
