"use client"

import type React from "react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface MobileDrawerProps {
  children: React.ReactNode
}

const MobileDrawer = ({ children }: MobileDrawerProps) => {
  const isMobile = useMobile()

  if (!isMobile) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-full">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through the application.</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default MobileDrawer
