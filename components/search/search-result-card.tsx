import Link from "next/link"
import { SlugImage } from "@/components/slug-image"

interface SearchResultCardProps {
  title: string
  description: string
  url: string
  type: "listing" | "university" | "article"
}

export function SearchResultCard({ title, description, url, type }: SearchResultCardProps) {
  return (
    <Link href={url} className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3">
        <SlugImage size="sm" priority className="flex-shrink-0 mt-1" />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground">{title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {type === "listing" ? "Housing" : type === "university" ? "University" : "Article"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-primary">
            <span>homi.ca</span>
            <span className="text-muted-foreground">{url.replace(/^\//, "")}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
