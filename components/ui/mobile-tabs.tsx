"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface MobileTabsProps {
  tabs: {
    label: string
    content: React.ReactNode
  }[]
}

const MobileTabs: React.FC<MobileTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    // Reset active tab when tabs change (e.g., different props passed)
    setActiveTab(0)
  }, [tabs])

  if (!isMobile) {
    return null // Or render a different component for non-mobile
  }

  return (
    <div className="mobile-tabs">
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  )
}

export default MobileTabs
