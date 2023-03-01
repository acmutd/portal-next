import Link from 'next/link';

export default function OfficerError() {
  return (
    <div>
      <h1 className="text-white font-semibold">
        Please sign in with your personal account then connect it with your ACM account.
      </h1>
      <Link href="/auth/signin" passHref>
        <button type="button" className="p-3 rounded-lg border-2">
          Sign in
        </button>
      </Link>
    </div>
  );
}
