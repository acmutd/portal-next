import ACMButton from 'components/PortalButton';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import Image from 'next/image';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

// map providers to icons
const providerIcons = {
  Google: '/assets/acm/google.png',
  Discord: '/assets/acm/discord.png',
  'ACM Account': '/assets/acm/logo_white.svg',
  Cognito: '/assets/acm/logo_white.fbdb4d95.svg',
};

export default function SignInPage({ providers }: SignInPageProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.query.error) {
    if (router.query.error === 'SessionRequired') {
      return (
        <>
          <div className="text-white font-semibold">
            Error: You must be signed in to view this page. Please sign in and try again.
          </div>
          <Link href="/auth/signin">
            <ACMButton>Sign In</ACMButton>
          </Link>
        </>
      );
    }
    return (
      <div className="text-white font-semibold">
        Error: {router.query.error} - Please contact an ACM Development officer
      </div>
    );
  }

  return (
    <div className="w-full grid place-items-center h-full">
      <div className="flex flex-col md:flex-row w-full md:w-[65%] place-items-center md:h-[30%]">
        <div className="w-[70%] flex flex-row md:flex-col place-items-center">
          <div>
            <img className="-rotate-12" src="/assets/acm/mrpeechi.png" alt="acm mascot" />
          </div>
        </div>
        <div className="w-full flex flex-col h-full">
          <div className="flex flex-col p-10 place-items-center space-y-1 h-full">
            {!session && <div className="text-2xl font-bold text-gray-100">Welcome to the</div>}
            <div className="flex flex-row place-content-center space-x-2">
              <div className="flex flex-col place-content-center">
                <Image src="/assets/acm/logo_white.svg" alt="ACM Logo" width={70} height={70} />
              </div>
              <div className="flex flex-col place-content-center">
                <p className="text-4xl text-white font-bold text-center">acm</p>
                <p className="text-4xl text-white font-bold text-center">portal</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row place-content-center space-x-2">
            <div className="text-xl mt-6 font-semibold text-gray-100 h-[60%]">
              {session ? 'connect your account' : 'log in'} with
            </div>
          </div>
          {Object.values(providers)
            .filter(
              (provider) =>
                (provider.id !== 'google_admin' && provider.name != 'Cognito') || session,
            )
            .map((provider) => (
              <div className=" text-white flex place-content-center mt-2 p-2" key={provider.name}>
                <button
                  type="button"
                  className="text-l font-semibold  text-gray-100 flex space-x-2 place-content-evenly px-3 py-2"
                  onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}/` })}
                >
                  <div className="flex flex-col place-content-center">
                    <img src={providerIcons[provider.name]} alt={provider.name} />
                  </div>
                  <div className="mx-5 w-full h-full whitespace-nowrap overflow-hidden flex flex-col place-content-center text-xl">
                    <div>{provider.name != 'ACM Account' ? provider.name : 'ACM Email'}</div>
                  </div>
                  {/* <span>{provider.name}</span> */}
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
