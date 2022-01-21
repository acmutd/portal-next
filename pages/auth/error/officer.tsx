import Link from "next/link";

export default function OfficerError() {
  return (
    <div>
      <h1>
        Please sign in with your personal account then connect it with your ACM
        account.
      </h1>
      <Link href="/auth/signin">
        <button className="p-3 rounded-lg border-2">Sign in</button>
      </Link>
    </div>
  );
}
