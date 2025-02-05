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
import WhiteACMLogo from '../../public/assets/acm/logo_white.svg';

interface SignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

// map providers to icons
const providerIcons: Record<string, string> = {
  Google: '/assets/acm/google.png',
  Discord: '/assets/acm/discord.png',
};

export default function SignInPage({ providers }: SignInPageProps) {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.query.error) {
    if (router.query.error === 'SessionRequired') {
      router.push('/auth/signin');
    }
    return (
      <div className="text-white font-semibold">
        Error: {router.query.error} - Please contact an ACM Development officer for help or try
        again.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Portal Title Section */}
        <div className="w-full md:w-[512px] flex flex-col items-center gap-4 mb-8 md:mb-0">
          <div className="flex justify-center items-center gap-4">
            <Image src={WhiteACMLogo} alt="ACM Logo" width={150} height={150} />
            <div className="text-white text-[100px] font-bold font-['Gilroy']">
              portal
            </div>
          </div>
          <div className="text-center text-white text-3xl font-extralight font-['Gilroy']">
            The world's largest international
            <br />
            computing society, here at UT Dallas
          </div>
        </div>

        {/* Sign In Section */}
        <div className="w-full md:w-auto p-6 bg-black/30 flex flex-col justify-start items-center gap-6">
          <div className="w-full px-2.5 flex flex-col items-center gap-2.5">
            <div>
              <span className="text-white text-2xl md:text-3xl font-bold font-['Gilroy']">
                Sign in{' '}
              </span>
              <span className="text-white text-2xl md:text-3xl font-normal font-['Gilroy']">
                to access acm portal{' '}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-3">
            {Object.values(providers)
              .filter((provider) => provider.name === 'Google' || provider.name === 'Discord')
              .map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}/` })}
                  className="w-full max-w-[432px] px-8 py-3 bg-white/10 backdrop-blur-sm flex justify-center items-center gap-8"
                >
                  <div className="w-10 h-10 relative flex items-center justify-center">
                    <Image
                      src={providerIcons[provider.name]}
                      alt={provider.name}
                      width={42}
                      height={42}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-white text-xl md:text-3xl font-normal font-['Gilroy']">
                      Continue with{' '}
                    </span>
                    <span className="text-white text-xl md:text-3xl font-bold font-['Gilroy']">
                      {provider.name}
                    </span>
                  </div>
                </button>
              ))}
          </div>
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
