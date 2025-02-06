import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-12">
          <div className="h-10 w-48 bg-gray-200/10 rounded-lg animate-pulse" />
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-200/10 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-gray-200/10 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-12">
          <div className="h-8 w-48 bg-gray-200/10 rounded-lg animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="bg-gray-200/5 rounded-xl p-6 animate-pulse h-[280px] flex flex-col"
              >
                <div className="flex-grow space-y-4">
                  <div className="h-8 w-3/4 bg-gray-200/10 rounded-lg" />
                  <div className="h-4 w-1/3 bg-gray-200/10 rounded-lg" />
                  <div className="h-24 w-full bg-gray-200/10 rounded-lg" />
                  <div className="h-4 w-2/3 bg-gray-200/10 rounded-lg" />
                </div>
                <div className="h-10 w-full bg-gray-200/10 rounded-lg mt-4" />
              </div>
            ))}
          </div>
        </section>

        {/* Attended Events Section */}
        <section>
          <div className="h-8 w-48 bg-gray-200/10 rounded-lg animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="bg-gray-200/5 rounded-xl p-6 animate-pulse h-[280px] flex flex-col"
              >
                <div className="flex-grow space-y-4">
                  <div className="h-8 w-3/4 bg-gray-200/10 rounded-lg" />
                  <div className="h-4 w-1/3 bg-gray-200/10 rounded-lg" />
                  <div className="h-24 w-full bg-gray-200/10 rounded-lg" />
                  <div className="h-4 w-2/3 bg-gray-200/10 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

