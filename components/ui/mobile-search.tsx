"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Search, X } from "lucide-react"

interface MobileSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  initialValue?: string
}

export function MobileSearch({ onSearch, placeholder = "Search...", className, initialValue = "" }: MobileSearchProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [query, setQuery] = React.useState(initialValue)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  React.useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  return (
    <div className={cn("relative", className)}>
      {!isExpanded ? (
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)} className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        <motion.form
          initial={{ width: 40, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: 40, opacity: 0 }}
          className="flex items-center"
          onSubmit={handleSubmit}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsExpanded(false)
              setQuery("")
            }}
            className="ml-1"
          >
            <X className="h-5 w-5" />
          </Button>
        </motion.form>
      )}
    </div>
  )
}
