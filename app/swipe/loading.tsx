import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SwipeLoading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
