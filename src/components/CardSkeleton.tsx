export default function CardSkeleton({ index }: { index: number }) {
  return (
    <div
      key={`skeleton-${index}`}
      className="bg-white shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md"
    >
      {/* Image skeleton with aspect ratio */}
      <div className="relative w-full pb-[100%] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-100 w-4/5 animate-pulse" />

        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-100 w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-100 w-1/4 animate-pulse" />
        </div>

        {/* Action button skeleton */}
        <div className="h-8 bg-gray-100 w-full animate-pulse mt-2" />

        {/* Price and button skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 w-16" />
            {Math.random() > 0.7 && <div className="h-4 bg-gray-200 w-12" />}
          </div>
          <div className="h-7 bg-gray-200 w-20" />
        </div>
      </div>
    </div>
  );
}
