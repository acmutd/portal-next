import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';

interface SignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

export default function SignInPage({ providers }: SignInPageProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.query.error) {
    return <div>{router.query.error}</div>;
  }

  return (
    <div className="flex gap-x-3 p-2">
      {Object.values(providers)
        .filter((provider) => provider.id !== 'google_admin' || session)
        .map((provider) => (
          <div className="p-3 rounded-lg border-2" key={provider.name}>
            <button
              type="button"
              onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}/` })}
            >
              {session ? 'Connect' : 'Sign in'}
              {' with '}
              {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
