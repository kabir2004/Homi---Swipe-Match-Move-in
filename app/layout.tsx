import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context-enhanced"
import { ToastContainer } from "@/components/ui/feedback-toast"
import { MobileNav } from "@/components/mobile-nav"

export const metadata: Metadata = {
  title: "Homi - Smart Housing for Students",
  description: "Swipe. Match. Move In. Find your perfect student housing and roommates.",
  icons: {
    icon: [
      {
        url: "/homi-slug.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/homi-slug.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: {
      url: "/homi-slug.png",
      type: "image/png",
      sizes: "180x180",
    },
    shortcut: "/homi-slug.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://homi.ca",
    title: "Homi - Smart Housing for Students",
    description: "Swipe. Match. Move In. Find your perfect student housing and roommates.",
    siteName: "Homi",
    images: [
      {
        url: "/homi-slug.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Homi - Smart Housing for Students",
    description: "Swipe. Match. Move In. Find your perfect student housing and roommates.",
    images: ["/homi-slug.png"],
  },
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
            <MobileNav />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
