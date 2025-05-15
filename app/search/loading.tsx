import { SlugImage } from "@/components/slug-image"

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <SlugImage size="lg" priority />
        <h1 className="text-2xl font-bold">Homi Search</h1>
      </div>

      <div className="mb-8">
        <div className="h-10 bg-muted animate-pulse rounded-md max-w-2xl"></div>
      </div>

      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-muted animate-pulse rounded-md flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-5 bg-muted animate-pulse rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted animate-pulse rounded-md w-full mb-1"></div>
                  <div className="h-4 bg-muted animate-pulse rounded-md w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
