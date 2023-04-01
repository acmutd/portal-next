import { GraphQLError } from "graphql";

interface ErrorComponentProps {
  errorCode: string;
  errorMessage: string;
}

export default function ErrorComponent({ errorCode, errorMessage}: ErrorComponentProps) {
  let customErrorCode: string[] = ['LOGIN_REQUIRED', 'NETID_EXISTS', 'PROFILE_CREATION_REQUIRED', 'ERROR_GENERATING_VANITY_LINK', 'OFFICER_PERMISSION_REQUIRED', 'OFFICER_PERMISSION_REQUIRED', 'INVALID_USER_FOUND', 'PROFILE_DOES_NOT_EXIST'];
  let error: string;
  if (customErrorCode.includes(errorCode as string)) {
    error = errorCode as string;
  } else {
    error = errorMessage
  }
  return (
    <div className="bg-red-400 rounded-lg w-full mx-auto p-3 my-4 flex gap-x-3 items-center">
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h1 className="font-medium text-xl">Error: {error}</h1>
    </div>
  );
}
