"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import type { Listing, Roommate } from "@/types"
import { cn } from "@/lib/utils"
import { Check, X, Info, Home, User2, Heart, MapPin, DollarSign, School } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SwipeCardProps {
  item: Listing | Roommate
  type: "listing" | "roommate"
  onSwipe: (direction: "like" | "dislike", id: string) => void
  onInfo: (id: string) => void
}

export function SwipeCard({ item, type, onSwipe, onInfo }: SwipeCardProps) {
  const [exitX, setExitX] = useState<number>(0)
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])
  const scale = useTransform(x, [-200, -150, 0, 150, 200], [0.9, 0.95, 1, 0.95, 0.9])

  // Dynamic background color based on swipe direction
  const likeOpacity = useTransform(x, [0, 150], [0, 0.8])
  const dislikeOpacity = useTransform(x, [-150, 0], [0.8, 0])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)

    if (info.offset.x > 100) {
      setExitX(500)
      onSwipe("like", item.id)
    } else if (info.offset.x < -100) {
      setExitX(-500)
      onSwipe("dislike", item.id)
    }
  }

  const isListing = type === "listing"
  const photo = isListing ? (item as Listing).photos[0] : (item as Roommate).photo

  return (
    <motion.div
      ref={cardRef}
      className="absolute top-0 left-0 right-0 w-full h-full"
      style={{ x, rotate, opacity, scale }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Like overlay */}
      <motion.div
        className="absolute inset-0 bg-green-500/20 rounded-2xl z-10 flex items-center justify-center"
        style={{ opacity: likeOpacity }}
      >
        <Heart className="h-24 w-24 text-green-500" strokeWidth={1.5} />
      </motion.div>

      {/* Dislike overlay */}
      <motion.div
        className="absolute inset-0 bg-red-500/20 rounded-2xl z-10 flex items-center justify-center"
        style={{ opacity: dislikeOpacity }}
      >
        <X className="h-24 w-24 text-red-500" strokeWidth={1.5} />
      </motion.div>

      <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        <div className="relative w-full h-3/5">
          <Image
            src={photo || "/placeholder.svg?height=400&width=600"}
            alt={isListing ? (item as Listing).title : (item as Roommate).name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Badge variant="secondary" className="flex items-center gap-1 shadow-sm bg-white/90 backdrop-blur-sm">
              {isListing ? <Home className="h-3 w-3" /> : <User2 className="h-3 w-3" />}
              {isListing ? "Listing" : "Roommate"}
            </Badge>

            {isListing && (
              <Badge variant="secondary" className="flex items-center gap-1 shadow-sm bg-white/90 backdrop-blur-sm">
                <DollarSign className="h-3 w-3" />${(item as Listing).price}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">
              {isListing ? (item as Listing).title : (item as Roommate).name}
            </h3>
            {isListing ? (
              <p className="text-sm text-white/90 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {(item as Listing).location}
              </p>
            ) : (
              <p className="text-sm text-white/90 flex items-center">
                {(item as Roommate).university && (
                  <>
                    <School className="h-3 w-3 mr-1" />
                    {(item as Roommate).university}
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 h-2/5 flex flex-col">
          {isListing ? (
            <>
              <div className="mt-2 flex flex-wrap gap-2">
                {(item as Listing).match_tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {(item as Listing).features.bedrooms} bed • {(item as Listing).features.bathrooms} bath •{" "}
                {(item as Listing).features.square_feet} sq ft
              </p>

              {(item as Listing).university_distance &&
                Object.keys((item as Listing).university_distance).length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-medium">Distance to campus: </span>
                    {Object.entries((item as Listing).university_distance).map(([uni, distance], i) => (
                      <span key={uni}>
                        {i > 0 && ", "}
                        {distance} km to {uni}
                      </span>
                    ))}
                  </div>
                )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Match Score:</span>
                <Badge
                  variant="outline"
                  className={cn(
                    (item as Roommate).match_score > 80
                      ? "bg-green-100 text-green-700 border-green-200"
                      : (item as Roommate).match_score > 60
                        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                        : "bg-red-100 text-red-700 border-red-200",
                  )}
                >
                  {(item as Roommate).match_score}%
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(item as Roommate).tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{(item as Roommate).intro_bio}</p>

              {(item as Roommate).program && (
                <p className="mt-1 text-xs text-gray-500">
                  {(item as Roommate).program}, Year {(item as Roommate).year}
                </p>
              )}
            </>
          )}

          <div className="mt-auto flex justify-between">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-14 w-14 border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors shadow-sm hover:shadow"
              onClick={() => onSwipe("dislike", item.id)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Dislike</span>
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-14 w-14 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors shadow-sm hover:shadow"
              onClick={() => onInfo(item.id)}
            >
              <Info className="h-6 w-6" />
              <span className="sr-only">More Info</span>
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-14 w-14 border-2 border-green-500 text-green-500 hover:bg-green-50 transition-colors shadow-sm hover:shadow"
              onClick={() => onSwipe("like", item.id)}
            >
              <Check className="h-6 w-6" />
              <span className="sr-only">Like</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
