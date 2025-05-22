"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { Search } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function MobileSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { isMobile } = useMobile()

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router])

  const onOpen = () => {
    setOpen(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 10)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!inputRef.current?.value) return

    router.push(`/search?q=${inputRef.current.value}`)
    onClose()
  }

  if (!isMobile) {
    return null
  }

  return (
    <div className="relative">
      <button onClick={onOpen} className="p-2 text-gray-600 transition hover:text-gray-800">
        <Search className="h-5 w-5" />
      </button>
      <div className={`absolute top-0 left-0 w-full bg-white border rounded-md shadow-md ${open ? "block" : "hidden"}`}>
        <form onSubmit={onSubmit} className="flex items-center px-4 py-2 border-b">
          <Search className="h-4 w-4 text-gray-600 mr-2" />
          <input ref={inputRef} className="w-full outline-none" placeholder="Search..." />
        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          Close
        </button>
      </div>
    </div>
  )
}
