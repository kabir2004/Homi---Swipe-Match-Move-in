"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { SwipeCard, type SwipeCardProps } from "./swipe-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Filter, Undo } from "lucide-react"
import { Header } from "@/components/header"

type SwipeContainerProps = {
  items: Omit<SwipeCardProps, "onSwipe" | "onInfo">[]
  type: "listing" | "roommate"
  onFinish?: () => void
}

export function SwipeContainer({ items, type, onFinish }: SwipeContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipedItems, setSwipedItems] = useState<{ id: string; direction: "left" | "right" | "up" }[]>([])
  const [likedItems, setLikedItems] = useState<string[]>([])
  const router = useRouter()

  const currentItem = items[currentIndex]

  const handleSwipe = (id: string, direction: "left" | "right" | "up") => {
    setSwipedItems((prev) => [...prev, { id, direction }])

    if (direction === "right") {
      setLikedItems((prev) => [...prev, id])
    }

    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // No more items
      onFinish?.()
    }
  }

  const handleUndo = () => {
    if (currentIndex > 0 && swipedItems.length > 0) {
      setCurrentIndex((prev) => prev - 1)

      const lastSwiped = swipedItems[swipedItems.length - 1]
      setSwipedItems((prev) => prev.slice(0, -1))

      if (lastSwiped.direction === "right") {
        setLikedItems((prev) => prev.filter((id) => id !== lastSwiped.id))
      }
    }
  }

  const handleInfo = (id: string) => {
    if (type === "listing") {
      router.push(`/listings/${id}`)
    } else {
      router.push(`/roommates/${id}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex justify-between items-center px-4 py-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">{type === "listing" ? "Find Housing" : "Find Roommates"}</h1>

        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {currentIndex >= items.length ? (
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold mb-2">You've seen all {type}s!</h2>
              <p className="text-gray-600 mb-6">
                You liked {likedItems.length} {type}
                {likedItems.length !== 1 ? "s" : ""}.
              </p>
              <Button
                onClick={() => router.push(`/${type === "listing" ? "listings" : "roommates"}/matches`)}
                className="mb-3"
              >
                View Matches
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0)
                  setSwipedItems([])
                  setLikedItems([])
                }}
              >
                Start Over
              </Button>
            </div>
          ) : (
            <div className="relative w-full max-w-md h-[70vh] mx-auto">
              <AnimatePresence>
                {currentItem && (
                  <SwipeCard key={currentItem.id} {...currentItem} onSwipe={handleSwipe} onInfo={handleInfo} />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="p-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUndo}
          disabled={swipedItems.length === 0}
          className="flex items-center gap-1"
        >
          <Undo className="h-4 w-4" />
          Undo
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="px-4 pb-6">
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${(currentIndex / items.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>
            {currentIndex} of {items.length}
          </span>
          <span>{Math.round((currentIndex / items.length) * 100)}% Complete</span>
        </div>
      </div>
    </div>
  )
}
