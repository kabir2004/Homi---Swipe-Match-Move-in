"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SparkleEffect } from "./ui-enhancements"

interface UniversityLogoProps {
  university: {
    id: string
    name: string
    logo3d: string
  }
  size?: "sm" | "md" | "lg"
  className?: string
  withAnimation?: boolean
  disableLink?: boolean
}

export function UniversityLogo({
  university,
  size = "md",
  className,
  withAnimation = true,
  disableLink = false,
}: UniversityLogoProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
  }

  const [isHovered, setIsHovered] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const logoElement = (
    <div
      className={cn("relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setHasInteracted(true)}
    >
      <SparkleEffect>
        {withAnimation ? (
          <motion.div
            className="relative"
            whileHover={{
              scale: 1.05,
              rotate: [0, 2, 0, -2, 0],
              transition: {
                scale: { duration: 0.2 },
                rotate: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
              },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Orange glow effect on hover with improved animation */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 blur-md bg-primary/80 transition-all duration-300"
              animate={isHovered ? { opacity: 1, scale: 1.15 } : { opacity: 0, scale: 1 }}
            />

            {/* Subtle ambient animation */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-30 blur-sm"
              animate={
                withAnimation
                  ? {
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }
                  : {}
              }
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              style={{ backgroundColor: "rgba(255, 122, 0, 0.2)" }}
            />

            <div
              className="relative bg-white rounded-full p-2 shadow-sm z-10 flex items-center justify-center"
              style={{ width: sizes[size] + 16, height: sizes[size] + 16 }}
            >
              <Image
                src={university.logo3d || `/universities/${university.id}.svg` || "/placeholder.svg"}
                alt={`${university.name} Logo`}
                width={sizes[size]}
                height={sizes[size]}
                className="object-contain"
              />

              {/* Hidden university name tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
                  >
                    {university.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div
            className="relative bg-white rounded-full p-2 shadow-sm flex items-center justify-center"
            style={{ width: sizes[size] + 16, height: sizes[size] + 16 }}
          >
            <Image
              src={university.logo3d || `/universities/${university.id}.svg` || "/placeholder.svg"}
              alt={`${university.name} Logo`}
              width={sizes[size]}
              height={sizes[size]}
              className="object-contain"
            />
          </div>
        )}
      </SparkleEffect>
    </div>
  )

  return university.id && !disableLink ? (
    <Link href={`/universities/${university.id}`}>{logoElement}</Link>
  ) : (
    logoElement
  )
}
