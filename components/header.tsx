"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useKonamiCode, triggerConfetti } from "./ui-enhancements"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const pathname = usePathname()

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
