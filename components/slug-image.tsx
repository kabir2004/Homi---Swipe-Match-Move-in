import Image from "next/image"
import { cn } from "@/lib/utils"

interface SlugImageProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  priority?: boolean
}

export function SlugImage({ size = "md", className, priority = false }: SlugImageProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  }

  const pixelSize = sizes[size]

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <Image
        src="/homi-slug.png"
        alt="Homi"
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
        priority={priority}
        sizes={`${pixelSize}px`}
      />
    </div>
  )
}
