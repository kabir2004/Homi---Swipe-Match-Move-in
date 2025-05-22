"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, type PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Heart, X, Info, MapPin, School, Star, Clock, DollarSign, Home, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Listing, Roommate } from "@/types"
import type { PreferenceProfile } from "@/lib/preference-learning"

interface SwipeCardProps {
  item: Listing | Roommate
  type: "listing" | "roommate"
  onSwipe: (direction: "like" | "dislike", id: string) => void
  onInfo: (id: string) => void
  preferenceProfile?: PreferenceProfile | null
}

export function SwipeCardEnhanced({ item, type, onSwipe, onInfo, preferenceProfile }: SwipeCardProps) {
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)
  const [direction, setDirection] = useState<"like" | "dislike" | null>(null)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const dragConstraintsRef = useRef(null)

  // Calculate opacity for like/dislike indicators based on drag position
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      setExitX(1000)
      setDirection("like")
      controls.start({ x: 1000, opacity: 0, transition: { duration: 0.5 } })
      onSwipe("like", item.id)
    } else if (info.offset.x < -threshold) {
      setExitX(-1000)
      setDirection("dislike")
      controls.start({ x: -1000, opacity: 0, transition: { duration: 0.5 } })
      onSwipe("dislike", item.id)
    } else {
      controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
    }
  }

  const handleLike = () => {
    setExitX(1000)
    setDirection("like")
    controls.start({ x: 1000, opacity: 0, transition: { duration: 0.5 } })
    onSwipe("like", item.id)
  }

  const handleDislike = () => {
    setExitX(-1000)
    setDirection("dislike")
    controls.start({ x: -1000, opacity: 0, transition: { duration: 0.5 } })
    onSwipe("dislike", item.id)
  }

  const handleInfo = () => {
    onInfo(item.id)
  }

  if (type === "listing") {
    const listing = item as Listing
    return (
      <motion.div
        ref={dragConstraintsRef}
        className="absolute w-full h-full"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-md">
          {/* Like/Dislike Indicators */}
          <motion.div
            className="absolute top-10 right-10 z-30 transform rotate-[-30deg]"
            style={{ opacity: likeOpacity }}
          >
            <div className="bg-green-500 text-white px-6 py-2 rounded-lg border-4 border-white shadow-xl">
              <span className="text-2xl font-bold">LIKE</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-10 left-10 z-30 transform rotate-[30deg]"
            style={{ opacity: dislikeOpacity }}
          >
            <div className="bg-red-500 text-white px-6 py-2 rounded-lg border-4 border-white shadow-xl">
              <span className="text-2xl font-bold">NOPE</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="relative h-[65%] bg-gray-200">
            <Image
              src={listing.photos[0] || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-blue-600 hover:bg-blue-700">
                {typeof listing.price === "number"
                  ? `$${listing.price}/month`
                  : `$${listing.price_min}-${listing.price_max}/month`}
              </Badge>
            </div>
          </div>

          <div className="p-4 h-[35%] flex flex-col">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{listing.title}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <p className="text-sm line-clamp-1">{listing.location}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex items-center">
                <Home className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm">
                  {listing.features.bedrooms === 0 ? "Studio" : `${listing.features.bedrooms} BR`}
                </span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm">
                  {typeof listing.price === "number" ? `$${listing.price}` : `$${listing.price_min}+`}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-amber-600 mr-1" />
                <span className="text-sm">{listing.walk_distance || "5"} min</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {listing.features.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {amenity}
                </Badge>
              ))}
              {listing.features.amenities.length > 3 && (
                <Badge variant="outline" className="bg-gray-100">
                  +{listing.features.amenities.length - 3} more
                </Badge>
              )}
            </div>

            <div className="mt-auto flex justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-red-200 bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600"
                onClick={handleDislike}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Dislike</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-gray-200 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600"
                onClick={handleInfo}
              >
                <Info className="h-6 w-6" />
                <span className="sr-only">Info</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-green-200 bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600"
                onClick={handleLike}
              >
                <Heart className="h-6 w-6" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  } else {
    const roommate = item as Roommate
    const matchScore = roommate.match_score

    return (
      <motion.div
        ref={dragConstraintsRef}
        className="absolute w-full h-full"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x, y, rotate }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-md">
          {/* Like/Dislike Indicators */}
          <motion.div
            className="absolute top-10 right-10 z-30 transform rotate-[-30deg]"
            style={{ opacity: likeOpacity }}
          >
            <div className="bg-green-500 text-white px-6 py-2 rounded-lg border-4 border-white shadow-xl">
              <span className="text-2xl font-bold">LIKE</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-10 left-10 z-30 transform rotate-[30deg]"
            style={{ opacity: dislikeOpacity }}
          >
            <div className="bg-red-500 text-white px-6 py-2 rounded-lg border-4 border-white shadow-xl">
              <span className="text-2xl font-bold">NOPE</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="relative h-[65%] bg-gray-200">
            <Image
              src={roommate.photo || "/placeholder.svg"}
              alt={roommate.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 z-10">
              <Badge
                className={cn(
                  "text-white",
                  matchScore > 80
                    ? "bg-green-600 hover:bg-green-700"
                    : matchScore > 60
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-amber-600 hover:bg-amber-700",
                )}
              >
                {matchScore}% Match
              </Badge>
            </div>
          </div>

          <div className="p-4 h-[35%] flex flex-col">
            <h3 className="text-xl font-bold mb-1">{roommate.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <School className="h-4 w-4 mr-1" />
              <p className="text-sm line-clamp-1">{roommate.university || "University Student"}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm">{roommate.program || "Student"}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-600 mr-1" />
                <span className="text-sm">Year {roommate.year || "1"}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm">{roommate.lifestyle_preferences?.sleep_schedule || "Flexible"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {roommate.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {tag}
                </Badge>
              ))}
              {roommate.tags.length > 3 && (
                <Badge variant="outline" className="bg-gray-100">
                  +{roommate.tags.length - 3} more
                </Badge>
              )}
            </div>

            <div className="mt-auto flex justify-between">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-red-200 bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600"
                onClick={handleDislike}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Dislike</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-gray-200 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600"
                onClick={handleInfo}
              >
                <Info className="h-6 w-6" />
                <span className="sr-only">Info</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-green-200 bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600"
                onClick={handleLike}
              >
                <Heart className="h-6 w-6" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
}
