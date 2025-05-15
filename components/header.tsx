"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useKonamiCode, triggerConfetti } from "./ui-enhancements"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, Building, Home } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Check for user data in localStorage
  useEffect(() => {
    const userData = localStorage.getItem("homi_user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Konami code easter egg
  useKonamiCode(() => {
    setShowEasterEgg(true)
    triggerConfetti()
    setTimeout(() => setShowEasterEgg(false), 5000)
  })

  const navItems = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Universities", href: "/universities" },
    { name: "About", href: "/about" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("homi_user")
    setUser(null)
    router.push("/login")
  }

  // Get auth buttons based on authentication state
  const getAuthButtons = () => {
    if (user) {
      // Show user avatar and dropdown when logged in
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-primary">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url || "/placeholder.svg"}
                    alt={`${user.first_name}'s avatar`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                    {user.first_name?.[0]}
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>
                  {user.first_name} {user.last_name}
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(user.role === "landlord" ? "/landlord/dashboard" : "/dashboard")}
            >
              {user.role === "landlord" ? (
                <>
                  <Building className="mr-2 h-4 w-4" />
                  <span>Landlord Dashboard</span>
                </>
              ) : (
                <>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Student Dashboard</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    } else {
      return (
        <>
          <Button
            asChild
            variant="ghost"
            className="hover:text-primary hover:bg-primary-50 relative overflow-hidden group"
          >
            <Link href="/login">
              <span className="relative z-10">Log In</span>
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </Button>

          <Button
            asChild
            className="bg-primary hover:bg-primary-600 transition-all duration-300 shadow-sm hover:shadow rounded-full overflow-hidden group"
          >
            <Link href="/quiz">
              <span className="relative z-10 flex items-center">
                Get Started
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                  initial={false}
                  animate={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </motion.svg>
              </span>
            </Link>
          </Button>
        </>
      )
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Logo />
        </motion.div>

        <div className="hidden md:flex items-center justify-center flex-1">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all relative group",
                  pathname === item.href ? "text-primary" : "text-gray-600 hover:text-primary",
                )}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Animated underline for active page */}
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4"
                    layoutId="underline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Improved hover effect for non-active items */}
                {pathname !== item.href && (
                  <motion.div
                    className="absolute inset-0 bg-primary-50/0 rounded-lg transition-all duration-300"
                    initial={false}
                    whileHover={{ backgroundColor: "rgba(255, 122, 0, 0.05)" }}
                  />
                )}
              </Link>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {getAuthButtons()}
        </motion.div>
      </div>

      {/* Easter egg animation */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-primary/20 backdrop-blur-md p-8 rounded-xl text-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-2"
                animate={{
                  color: ["#FF7A00", "#FFA94D", "#FFD8A8", "#FF7A00"],
                  transition: { duration: 2, repeat: 2 },
                }}
              >
                You found a secret!
              </motion.h2>
              <p className="text-lg">Konami code activated! 🎮✨</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
