"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useTheme } from "next-themes"
import { Sun, Moon, Sparkles } from "lucide-react"

// Easter egg counter to track interactions
export const useEasterEggTracker = () => {
  const [eggCount, setEggCount] = useState(0)
  const [showReward, setShowReward] = useState(false)

  const incrementEggCount = () => {
    const newCount = eggCount + 1
    setEggCount(newCount)

    // Show reward animation at certain milestones
    if (newCount === 5 || newCount === 10 || newCount === 15) {
      setShowReward(true)
      triggerConfetti()
      setTimeout(() => setShowReward(false), 3000)
    }
  }

  return { eggCount, incrementEggCount, showReward }
}

// Confetti animation for rewards
export const triggerConfetti = () => {
  const duration = 3000
  const end = Date.now() + duration

  const colors = ["#FF7A00", "#FFA94D", "#FFD8A8", "#FFF4E6"]
  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

// Floating elements animation
export const FloatingElement = ({ children, delay = 0, duration = 6 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// Hidden message that appears on hover
export const HiddenMessage = ({ children, message }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-black/80 text-white text-sm rounded-md whitespace-nowrap z-50"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Theme toggle with animation
export const AnimatedThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

// Interactive logo that reacts to clicks
export const InteractiveLogo = ({ onClick }) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    onClick?.()
    setTimeout(() => setClicked(false), 1000)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        clicked
          ? {
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <div className="relative">
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
          }}
          className="absolute inset-0 rounded-full bg-primary/30 blur-md"
        />
        <div className="relative z-10">
          {/* Logo content here */}
          <div className="font-bold text-2xl">
            <span className="text-primary">H</span>omi
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Sparkle effect component
export const SparkleEffect = ({ children }) => {
  const [sparkling, setSparkling] = useState(false)

  const triggerSparkle = () => {
    if (!sparkling) {
      setSparkling(true)
      setTimeout(() => setSparkling(false), 1000)
    }
  }

  return (
    <div className="relative" onClick={triggerSparkle}>
      {children}
      <AnimatePresence>
        {sparkling && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: (Math.random() - 0.5) * 20,
                  y: (Math.random() - 0.5) * 20,
                }}
                animate={{
                  opacity: [1, 0.8, 0],
                  scale: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 50,
                  y: (Math.random() - 0.5) * 50,
                }}
                transition={{ duration: 0.6 + Math.random() * 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Konami code easter egg
export const useKonamiCode = (callback) => {
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    let konamiIndex = 0

    const keyHandler = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          callback()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", keyHandler)
    return () => {
      window.removeEventListener("keydown", keyHandler)
    }
  }, [callback])
}

// Smooth scroll to section
export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 100,
      behavior: "smooth",
    })
  }
}
