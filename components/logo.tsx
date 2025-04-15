"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useEasterEggTracker, triggerConfetti } from "./ui-enhancements"
import { AnimatePresence } from "framer-motion"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  withText?: boolean
  disableLink?: boolean
}

export function Logo({ className, size = "md", withText = true, disableLink = false }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const { incrementEggCount } = useEasterEggTracker()

  // Secret click counter for easter egg
  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    // Easter egg: After 5 clicks, show a special animation
    if (newCount === 5) {
      setShowEasterEgg(true)
      incrementEggCount()
      triggerConfetti()
      setTimeout(() => setShowEasterEgg(false), 3000)
      setClickCount(0)
    }
  }

  const logoElement = (
    <motion.div className={cn("relative group", className)} onClick={handleLogoClick}>
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{
          rotate: 5,
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Orange glow effect on hover with improved animation */}
        <motion.div
          className="absolute inset-0 rounded-md opacity-70 blur-sm"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.8, 0.7],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
          style={{ backgroundColor: "rgba(255, 122, 0, 0.3)" }}
        />

        {/* Easter egg animation */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-primary rounded-full z-20"
            />
          )}
        </AnimatePresence>

        <div className="relative">
          <Image
            src="/logo.png"
            alt="Homi Logo"
            width={sizes[size]}
            height={sizes[size]}
            className={cn("object-contain transition-all duration-300", showEasterEgg && "animate-pulse")}
          />
        </div>
      </motion.div>

      {withText && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "font-bold tracking-tight relative group-hover:transition-colors",
            size === "sm" && "text-xl",
            size === "md" && "text-2xl",
            size === "lg" && "text-3xl",
          )}
        >
          <motion.span
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            className="absolute -bottom-1 left-0 h-1 bg-primary/20 rounded-full"
          />
          <motion.span
            className="text-primary"
            animate={
              showEasterEgg
                ? {
                    color: ["#FF7A00", "#FFA94D", "#FFD8A8", "#FF7A00"],
                    transition: { duration: 2, repeat: 1 },
                  }
                : {}
            }
          >
            H
          </motion.span>
          <span className="text-gray-900">omi</span>
        </motion.span>
      )}
    </motion.div>
  )

  return disableLink ? (
    logoElement
  ) : (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      {logoElement}
    </Link>
  )
}
