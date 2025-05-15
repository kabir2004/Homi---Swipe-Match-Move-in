"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Plus } from "lucide-react"

interface MobileFabProps {
  onClick: () => void
  icon?: React.ReactNode
  label?: string
  className?: string
  variant?: "primary" | "secondary" | "outline"
}

export function MobileFab({
  onClick,
  icon = <Plus className="h-5 w-5" />,
  label,
  className,
  variant = "primary",
}: MobileFabProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white hover:bg-primary-600"
      case "secondary":
        return "bg-secondary text-white hover:bg-secondary-600"
      case "outline":
        return "bg-white text-primary border border-primary hover:bg-primary-50"
      default:
        return "bg-primary text-white hover:bg-primary-600"
    }
  }

  return (
    <motion.div
      className="fixed z-40 right-4 bottom-20 md:bottom-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={onClick}
        className={cn(
          "rounded-full shadow-lg flex items-center justify-center",
          label ? "px-4 py-2 h-12" : "w-14 h-14",
          getVariantClasses(),
          className,
        )}
      >
        {icon}
        {label && <span className="ml-2">{label}</span>}
      </Button>
    </motion.div>
  )
}
