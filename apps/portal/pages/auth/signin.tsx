import ACMButton from 'components/PortalButton';
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

// map providers to icons
const providerIcons = {
  Google: '/assets/acm/google.png',
  Discord: '/assets/acm/discord.png',
  'ACM Account': '/assets/acm/logo_white.fbdb4d95.svg',
};

export default function SignInPage({ providers }: SignInPageProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.query.error) {
    return <div>{router.query.error}</div>;
  }

  return (
    <div className="w-full grid place-items-center">
      <div className="flex flex-col p-10 place-items-center">
        <div className="text-xl font-semibold text-gray-100">Login with</div>
      </div>

      <div className="flex flex-col md:flex-row w-full md:w-[50%] backdrop-blur-lg">
        <div className="flex flex-col place-items-center">
          <img src="/assets/acm/mrpeechi.png" alt="acm mascot" />
        </div>
        <div className="w-full flex flex-col ">
          {Object.values(providers)
            .filter(
              (provider) =>
                (provider.id !== 'google_admin' && provider.name !== 'Cognito') || session,
            )
            .map((provider) => (
              <div
                className="rounded-lg border-2 text-white flex place-content-center mt-2 p-2"
                key={provider.name}
              >
                <button
                  type="button"
                  className="p-3 text-l font-semibold text-gray-100 flex flex-row place-content-center"
                  onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}/` })}
                >
                  <div>
                    <img src={providerIcons[provider.name]} alt={provider.name} />
                  </div>
                  <div className="mx-5 w-full whitespace-nowrap overflow-hidden w-90">
                    {provider.name}
                  </div>
                </button>
              </div>
            ))}
        </div>
      </div>
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
