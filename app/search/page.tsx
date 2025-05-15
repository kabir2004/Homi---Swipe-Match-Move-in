"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SlugImage } from "@/components/slug-image"
import { SearchResultCard } from "@/components/search/search-result-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, Filter, MapPin } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)

    // This would normally be an API call to your backend
    // For demo purposes, we're generating mock results
    setTimeout(() => {
      const mockResults = [
        {
          id: "1",
          title: "Cozy 2BR near UofT St. George Campus",
          description:
            "Modern 2-bedroom apartment just 5 minutes walk from University of Toronto St. George Campus. Includes utilities, high-speed internet, and in-unit laundry.",
          url: "/listings/uoft-cozy-2br",
          type: "listing",
        },
        {
          id: "2",
          title: "University of Toronto",
          description:
            "Browse student housing options near University of Toronto campuses. Find apartments, houses, and rooms for rent close to UofT St. George, Mississauga, and Scarborough.",
          url: "/universities/uoft",
          type: "university",
        },
        {
          id: "3",
          title: "5 Tips for Finding Student Housing in Toronto",
          description:
            "Learn the best strategies for securing affordable and convenient student housing in Toronto. Includes neighborhood guides and budgeting advice.",
          url: "/blog/toronto-student-housing-tips",
          type: "article",
        },
        {
          id: "4",
          title: "Luxury Studio in Downtown Toronto",
          description:
            "Modern studio apartment in the heart of downtown Toronto. Walking distance to UofT and Ryerson University. Includes gym access and rooftop patio.",
          url: "/listings/downtown-luxury-studio",
          type: "listing",
        },
        {
          id: "5",
          title: "Shared 4BR House near Annex",
          description:
            "Spacious 4-bedroom house in the Annex neighborhood. Perfect for students looking for roommates. Close to subway and campus.",
          url: "/listings/annex-4br-house",
          type: "listing",
        },
      ]

      setResults(mockResults)
      setLoading(false)
    }, 800)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <SlugImage size="lg" priority />
        <h1 className="text-2xl font-bold">Homi Search</h1>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search for housing, universities, or articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
          <Button variant="outline" type="button">
            <Filter className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Filters</span>
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Searching for the perfect match...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {results.length} results found for "{initialQuery}"
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" /> Map View
              </Button>
            </div>
          </div>

          {results.map((result) => (
            <SearchResultCard
              key={result.id}
              title={result.title}
              description={result.description}
              url={result.url}
              type={result.type}
            />
          ))}
        </div>
      ) : initialQuery ? (
        <div className="text-center py-12">
          <SlugImage size="xl" className="mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground mb-4">We couldn't find any matches for "{initialQuery}"</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search terms or browse our universities</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <SlugImage size="xl" className="mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Find your perfect student housing</h2>
          <p className="text-muted-foreground">Search for universities, neighborhoods, or specific housing options</p>
        </div>
      )}
    </main>
  )
}
