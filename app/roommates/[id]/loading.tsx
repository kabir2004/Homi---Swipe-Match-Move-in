import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Header } from "@/components/header"

export default function RoommateDetailLoading() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  )
}
