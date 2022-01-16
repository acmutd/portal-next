import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return <div></div>;
  return (
    <div>
      <h1 className="text-lg">Signed in as {session.user?.name}</h1>
      <h1 className="text-lg">Email: {session.user?.email}</h1>
      <button className="p-3 rounded-lg bg-green-400" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default Home;
