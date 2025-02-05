import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with buttons */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-12 w-48 bg-gray-200/10 rounded-lg animate-pulse" />
          <div className="flex gap-4">
            <div className="h-10 w-28 bg-gray-200/10 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-gray-200/10 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Info */}
          <div className="flex-grow space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="h-8 w-48 bg-gray-200/10 rounded-lg animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Fields */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200/5 rounded-lg p-4 space-y-1 animate-pulse">
                    <div className="h-4 w-24 bg-gray-200/10 rounded-lg" />
                    <div className="h-6 w-full bg-gray-200/10 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>

            {/* ACM Status Section */}
            <div className="space-y-6">
              <div className="h-8 w-48 bg-gray-200/10 rounded-lg animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-gray-200/5 rounded-lg p-4 space-y-1 animate-pulse">
                    <div className="h-4 w-24 bg-gray-200/10 rounded-lg" />
                    <div className="h-6 w-full bg-gray-200/10 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Mascot */}
          <div className="lg:w-80">
            <div className="flex flex-col items-center gap-4">
              {/* Mascot Image Placeholder */}
              <div className="w-48 md:w-64 aspect-square bg-gray-200/5 rounded-lg animate-pulse" />
              
              {/* NetID Info */}
              <div className="w-full space-y-4">
                <div className="bg-gray-200/5 rounded-lg p-4 space-y-1 animate-pulse">
                  <div className="h-4 w-24 bg-gray-200/10 rounded-lg" />
                  <div className="h-6 w-32 bg-gray-200/10 rounded-lg" />
                </div>
                <div className="bg-gray-200/5 rounded-lg p-4 space-y-1 animate-pulse">
                  <div className="h-4 w-24 bg-gray-200/10 rounded-lg" />
                  <div className="h-6 w-32 bg-gray-200/10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}