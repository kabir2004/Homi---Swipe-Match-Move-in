import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { HomBuoy } from "@/components/hom-buoy"

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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <HomBuoy />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'