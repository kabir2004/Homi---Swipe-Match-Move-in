"use client"

import type React from "react"

import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface MobileFabProps {
  children: React.ReactNode
}

const MobileFab: React.FC<MobileFabProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  if (!isMobile) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 rounded-full p-2 shadow-md">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[75vh]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through the application.</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default MobileFab
