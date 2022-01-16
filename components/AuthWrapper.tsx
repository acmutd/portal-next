import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthWrapper({
  children,
}: React.PropsWithChildren<any>) {
  const { status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated")
    return (
      <div>
        <Link href="/api/auth/signin">
          <button className="p-3 bg-green-400 rounded-lg">Sign In</button>
        </Link>
      </div>
    );
  return children;
}
