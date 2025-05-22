import { Skeleton } from "@/components/ui/skeleton"

export default function GetStartedLoading() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicators Skeleton */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-3 h-3 rounded-full mx-1" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-10 w-full mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-6" />

                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                    <div className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </div>
                </div>

                <div>
                  <Skeleton className="aspect-[4/3] rounded-xl w-full" />
                </div>
              </div>
            </div>

            {/* Navigation Buttons Skeleton */}
            <div className="p-6 border-t flex justify-between items-center">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          {/* Skip to Quiz Button Skeleton */}
          <div className="text-center mt-6">
            <Skeleton className="h-6 w-24 mx-auto" />
          </div>

          {/* Features Preview Skeleton */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Skeleton className="w-10 h-10 rounded-full mx-auto mb-3" />
                <Skeleton className="h-5 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
