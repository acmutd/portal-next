import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="h-10 w-64 bg-gray-200/10 rounded-lg animate-pulse mx-auto" />
          <div className="flex space-x-2 rounded-xl bg-gray-200/5 p-2 w-fit mx-auto">
            <div className="h-10 w-32 bg-gray-200/10 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-gray-200/10 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="bg-gray-200/5 rounded-xl h-[400px] animate-pulse flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-gray-200/10 rounded-lg" />
                  <div className="h-6 w-1/3 bg-gray-200/10 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200/10 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200/10 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200/10 rounded" />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100/10 space-y-3">
                <div className="h-12 w-full bg-gray-200/10 rounded-lg" />
                <div className="h-12 w-full bg-gray-200/10 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
