"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HomBuoyLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

export function HomBuoyLogo({ size = "md", className, animated = true }: HomBuoyLogoProps) {
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
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hombuoy-T2hFj29wIwKK2lA2o2XCRm2vSmNwAp.png"
                  alt="HomBuoy"
                  width={sizes[size]}
                  height={sizes[size]}
                  className="object-contain"
                />
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
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hombuoy-T2hFj29wIwKK2lA2o2XCRm2vSmNwAp.png"
              alt="HomBuoy"
              width={sizes[size]}
              height={sizes[size]}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// This component is no longer needed as we've simplified the design
// We'll keep it for now but it's not being used in the updated HomBuoy component
