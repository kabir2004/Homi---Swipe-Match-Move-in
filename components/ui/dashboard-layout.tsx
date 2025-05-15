"use client"

import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardShell, DashboardHeader } from "@/components/ui/dashboard-shell"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description: string
  user: any
  onLogout: () => void
  actions?: ReactNode
}

export function DashboardLayout({ children, title, description, user, onLogout, actions }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <DashboardShell>
        <DashboardHeader title={title} description={description}>
          <div className="flex items-center gap-3">
            {actions}
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4 mr-2" />
              <span className="relative">
                Notifications
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  3
                </span>
              </span>
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log Out
            </Button>
          </div>
        </DashboardHeader>
        <AnimatePresence mode="wait">
          <motion.div
            key="dashboard-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="pb-20 md:pb-0" // Add padding at bottom for mobile nav
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </DashboardShell>
    </>
  )
}
