"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface SSOProvidersProps {
  onSSOLogin: (provider: string) => Promise<void>
  isLoading: boolean
  loadingProvider: string | null
}

export function SSOProviders({ onSSOLogin, isLoading, loadingProvider }: SSOProvidersProps) {
  const providers = [
    {
      id: "google",
      name: "Google",
      logo: "/auth/google-logo.png",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      borderColor: "border-gray-300",
    },
    {
      id: "microsoft",
      name: "Microsoft",
      logo: "/auth/microsoft-logo.png",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      borderColor: "border-gray-300",
    },
    {
      id: "university",
      name: "University SSO",
      logo: "/auth/university-logo.png",
      bgColor: "bg-blue-600",
      textColor: "text-white",
      borderColor: "border-blue-700",
    },
  ]

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <motion.div key={provider.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            variant="outline"
            className={`w-full flex items-center justify-center gap-3 h-11 ${provider.bgColor} ${provider.textColor} border ${provider.borderColor} hover:shadow-md transition-all duration-300`}
            onClick={() => onSSOLogin(provider.id)}
            disabled={isLoading}
          >
            {isLoading && loadingProvider === provider.id ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <div className="w-5 h-5 relative">
                <Image
                  src={provider.logo || "/placeholder.svg"}
                  alt={`${provider.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {isLoading && loadingProvider === provider.id
              ? `Signing in with ${provider.name}...`
              : `Continue with ${provider.name}`}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
