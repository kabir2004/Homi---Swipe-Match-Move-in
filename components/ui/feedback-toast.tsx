"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface FeedbackToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

export function FeedbackToast({ message, type = "info", duration = 3000, onClose }: FeedbackToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "info":
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-md border ${getBgColor()}`}>
            {getIcon()}
            <p className="text-sm font-medium">{message}</p>
            <button onClick={handleClose} className="ml-2 text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper function to show toast programmatically
let toastId = 0
const toasts: { id: number; props: FeedbackToastProps }[] = []
let setToastsFunction: React.Dispatch<React.SetStateAction<{ id: number; props: FeedbackToastProps }[]>> | null = null

export function showToast(message: string, type: ToastType = "info", duration = 3000) {
  const id = toastId++
  const newToast = {
    id,
    props: {
      message,
      type,
      duration,
      onClose: () => {
        if (setToastsFunction) {
          setToastsFunction((prev) => prev.filter((toast) => toast.id !== id))
        }
      },
    },
  }

  if (setToastsFunction) {
    setToastsFunction((prev) => [...prev, newToast])
  } else {
    toasts.push(newToast)
  }

  return id
}

export function ToastContainer() {
  const [visibleToasts, setVisibleToasts] = useState<{ id: number; props: FeedbackToastProps }[]>([])

  useEffect(() => {
    setToastsFunction = setVisibleToasts
    if (toasts.length > 0) {
      setVisibleToasts(toasts)
      toasts.length = 0
    }

    return () => {
      setToastsFunction = null
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {visibleToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FeedbackToast {...toast.props} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
