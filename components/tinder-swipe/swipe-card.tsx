"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { Heart, X, Star, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type SwipeCardProps = {
  id: string
  type: "listing" | "roommate"
  name: string
  images: string[]
  description: string
  details: {
    [key: string]: string | number | boolean
  }
  tags: string[]
  matchPercentage: number
  onSwipe: (id: string, direction: "left" | "right" | "up") => void
  onInfo?: (id: string) => void
}

export function SwipeCard({
  id,
  type,
  name,
  images,
  description,
  details,
  tags,
  matchPercentage,
  onSwipe,
  onInfo,
}: SwipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)

  // Motion values for the card
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-30, 0, 30])

  // Calculate background opacity based on drag
  const bgOpacityRight = useTransform(x, [0, 100], [0, 1])
  const bgOpacityLeft = useTransform(x, [-100, 0], [1, 0])

  // Refs for touch handling
  const cardRef = useRef<HTMLDivElement>(null)

  // Handle drag end
  const handleDragEnd = () => {
    const xVal = x.get()
    const yVal = y.get()

    if (xVal > 100) {
      setExitX(200)
      onSwipe(id, "right")
    } else if (xVal < -100) {
      setExitX(-200)
      onSwipe(id, "left")
    } else if (yVal < -100) {
      setExitY(-200)
      onSwipe(id, "up")
    }
  }

  // Handle image navigation
  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
    }
  }

  // Handle tap on image (left/right sides)
  const handleImageTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left

    if (x < rect.width / 2) {
      prevImage()
    } else {
      nextImage()
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full h-full"
      style={{ x, y, rotate, touchAction: "none" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: exitX,
        y: exitY,
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Like/Dislike Overlays */}
      <motion.div
        className="absolute inset-0 bg-green-500/30 rounded-3xl z-10 flex items-center justify-center"
        style={{ opacity: bgOpacityRight }}
      >
        <div className="bg-white/90 rounded-full p-3 rotate-12 border-4 border-green-500">
          <Heart className="w-12 h-12 text-green-500" fill="currentColor" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-red-500/30 rounded-3xl z-10 flex items-center justify-center"
        style={{ opacity: bgOpacityLeft }}
      >
        <div className="bg-white/90 rounded-full p-3 -rotate-12 border-4 border-red-500">
          <X className="w-12 h-12 text-red-500" strokeWidth={3} />
        </div>
      </motion.div>

      {/* Card Content */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-xl bg-white">
        {/* Image */}
        <div className="relative w-full h-[70%] bg-gray-200 overflow-hidden" onClick={handleImageTap}>
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            priority
          />

          {/* Image pagination dots */}
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full bg-white/80 transition-all",
                  currentImageIndex === index ? "w-6" : "",
                )}
              />
            ))}
          </div>

          {/* Match percentage */}
          <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2.5 py-1 text-sm font-semibold text-green-600 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {matchPercentage}% Match
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 h-[30%] overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold truncate">{name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
            {tags.length > 5 && (
              <Badge variant="outline" className="bg-gray-100">
                +{tags.length - 5} more
              </Badge>
            )}
          </div>

          {/* Key details */}
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {Object.entries(details)
              .slice(0, 4)
              .map(([key, value], index) => (
                <div key={index} className="flex items-center text-sm">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="ml-1 text-gray-600">{value.toString()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full h-14 w-14 bg-white shadow-lg border-2 border-red-500"
          onClick={() => onSwipe(id, "left")}
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="rounded-full h-14 w-14 bg-white shadow-lg border-2 border-blue-500"
          onClick={() => onInfo?.(id)}
        >
          <Info className="h-6 w-6 text-blue-500" />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="rounded-full h-14 w-14 bg-white shadow-lg border-2 border-green-500"
          onClick={() => onSwipe(id, "right")}
        >
          <Heart className="h-6 w-6 text-green-500" />
        </Button>
      </div>
    </motion.div>
  )
}
