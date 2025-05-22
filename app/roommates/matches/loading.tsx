import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Header } from "@/components/header"

export default function RoommateMatchesLoading() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Finding Your Matches</h2>
          <p className="text-gray-600">We're finding the best roommate matches based on your preferences...</p>
        </div>
      </div>
    </div>
  )
}
