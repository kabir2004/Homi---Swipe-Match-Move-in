"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HomiBuoyLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

export function HomiBuoyLogo({ size = "md", className, animated = true }: HomiBuoyLogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  return (
    <div className={cn("relative", className)}>
      {animated ? (
        <motion.div
          className="relative"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="bg-white rounded-full p-1 shadow-md">
              <div className="relative" style={{ width: sizes[size], height: sizes[size] }}>
                {/* Fallback to a simple colored circle with H if image isn't available */}
                <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
              </div>
            </div>

            {/* Animated water ripple effect */}
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-primary/30"
              animate={{ scale: [1, 1.2, 1.4], opacity: [0.7, 0.5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-full p-1 shadow-md">
          <div className="relative" style={{ width: sizes[size], height: sizes[size] }}>
            {/* Fallback to a simple colored circle with H if image isn't available */}
            <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
