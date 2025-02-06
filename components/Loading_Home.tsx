import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="bg-gray-200/5 outline outline-gray-100/10 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Welcome Text */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-10 w-64 bg-gray-200/10 rounded-lg animate-pulse" />
                <div className="h-12 w-48 bg-gray-200/10 rounded-lg animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-6 w-24 bg-gray-200/10 rounded-full animate-pulse" />
                <div className="h-6 w-32 bg-gray-200/10 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Mascot Image */}
            <div className="flex justify-center">
              <div className="w-48 md:w-64 aspect-square bg-gray-200/5 rounded-lg animate-pulse" />
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="bg-gray-200/5 rounded-lg p-4 space-y-1">
                <div className="h-4 w-16 bg-gray-200/10 rounded animate-pulse" />
                <div className="h-6 w-32 bg-gray-200/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-gray-200/10 rounded-lg animate-pulse" />
            <div className="h-10 w-28 bg-gray-200/10 rounded-lg animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200/5 outline outline-gray-100/10 rounded-xl p-6 space-y-4"
              >
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-200/10 rounded animate-pulse" />
                  <div className="h-8 w-full bg-gray-200/10 rounded animate-pulse" />
                  <div className="h-16 w-full bg-gray-200/10 rounded animate-pulse" />
                </div>
                <div className="flex justify-end">
                  <div className="h-5 w-20 bg-gray-200/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
