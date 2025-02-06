interface SuccessfulComponentProps {
  message: string;
}

export default function SuccessfulComponent({ message }: SuccessfulComponentProps) {
  return (
    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 backdrop-blur-sm border border-green-500/10">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm md:text-base">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
