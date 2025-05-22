"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface MobileFilterProps {
  children: React.ReactNode
}

const MobileFilter: React.FC<MobileFilterProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  if (!isMobile) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Make changes to your filter preferences here.</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilter
