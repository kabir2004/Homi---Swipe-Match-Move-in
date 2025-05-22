"use client"

import type React from "react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

interface MobileBottomSheetProps {
  trigger: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}

export function MobileBottomSheet({ trigger, title, description, children }: MobileBottomSheetProps) {
  const isMobile = useMobile()

  if (!isMobile) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
