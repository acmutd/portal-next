interface SuccessfulComponentProps {
  message: string;
}

export default function SuccessfulComponent({ message }: SuccessfulComponentProps) {
  return (
    <div className="bg-green-400 rounded-lg w-full mx-auto p-3 my-4 flex gap-x-3 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h1 className="font-medium text-xl">{message}</h1>
    </div>
  );
}
