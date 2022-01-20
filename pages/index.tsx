import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return <div></div>;
  return (
    <div>
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <div className="flex gap-x-3">
        <button
          className="p-3 rounded-lg bg-green-400"
          onClick={() => signOut()}
        >
          Sign out
        </button>
        <Link href="/api/auth/signin">
          <button className="p-3 rounded-lg bg-green-400">
            Add another account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
