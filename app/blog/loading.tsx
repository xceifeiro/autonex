import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8 bg-white/20" />
          <Skeleton className="h-12 w-full max-w-xl mx-auto bg-white/20" />
        </div>
      </div>

      {/* Featured Post Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <Skeleton className="h-64 md:h-96 md:w-1/2" />
            <div className="md:w-1/2 p-6 md:p-8">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <div className="flex items-center mb-4">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-10 w-full md:w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <Skeleton className="h-10 w-48 mb-4 md:mb-0" />
          <Skeleton className="h-10 w-full md:w-80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center mb-2">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-24 mr-3" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
