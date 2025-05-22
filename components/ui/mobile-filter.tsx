"use client"

import * as React from "react"
import { Button } from "./button"
import { Filter } from "lucide-react"
import { MobileBottomSheet } from "./mobile-bottom-sheet"

interface MobileFilterProps {
  children: React.ReactNode
  title?: string
  className?: string
  buttonText?: string
  buttonIcon?: React.ReactNode
}

export function MobileFilter({
  children,
  title = "Filters",
  className,
  buttonText = "Filter",
  buttonIcon = <Filter className="h-4 w-4 mr-2" />,
}: MobileFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="md:hidden flex items-center">
        {buttonIcon}
        {buttonText}
      </Button>

      <MobileBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} className={className}>
        {children}
      </MobileBottomSheet>
    </>
  )
}
