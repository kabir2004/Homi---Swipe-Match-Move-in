"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface MobileTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function MobileTabs({ tabs, activeTab, onChange, className }: MobileTabsProps) {
  return (
    <div className={cn("flex overflow-x-auto scrollbar-hide", className)}>
      <div className="flex space-x-2 p-1 min-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center justify-center px-4 py-2 rounded-full whitespace-nowrap transition-colors",
              activeTab === tab.id ? "text-primary" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span className="text-sm font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-full bg-primary-50 rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
