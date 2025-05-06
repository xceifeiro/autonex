export default function Loading() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="border rounded-md">
        <div className="h-12 bg-gray-100 rounded-t-md"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-t p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
