import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';

import Background from './Background';
import { default as ACMDesktopNavbar } from './PortalNavbar';
import { default as ACMMobileNavbar } from './PortalMobileNavbar';
import { default as ACMDesktopNavbarItem } from './PortalNavbarItem';
import { default as ACMMobileNavbarItem } from './PortalMobileNavbarItem';

import WhiteACMLogo from '../public/assets/acm/logo_white.svg';
import { useRouter } from 'next/router';

const pages = [
  {
    uri: '/events',
    name: 'events',
  },
  {
    uri: '/opportunities',
    name: 'apply',
  },
  {
    uri: '/profile',
    name: 'profile',
  },
  {
    uri: '/profile/resume',
    name: 'resume',
  },
];

const Skeleton = ({ children }: any) => {
  const mobile = useMediaQuery({ maxWidth: 900 });
  const router = useRouter();

  // if (disable) return children;

  return (
    <>
      <Background splotches={3} />
      <div className="h-screen w-screen overflow-x-hidden flex">
        {!mobile && (
          <ACMDesktopNavbar>
            <Link href="/" passHref>
              <ACMDesktopNavbarItem isLogo>
                <Image src={WhiteACMLogo} alt="ACM Logo" />
              </ACMDesktopNavbarItem>
            </Link>
            {pages.map((page) => {
              return (
                <Link key={page.name} href={page.uri} passHref>
                  <ACMDesktopNavbarItem active={router.pathname === page.uri ? true : false}>
                    {page.name}
                  </ACMDesktopNavbarItem>
                </Link>
              );
            })}
          </ACMDesktopNavbar>
        )}
        <div className="w-full relative">{children}</div>
        {mobile && (
          <ACMMobileNavbar>
            {pages.map((page) => {
              return (
                <Link href={page.uri} passHref>
                  <ACMMobileNavbarItem active={router.pathname === page.uri ? true : false}>
                    {page.name}
                  </ACMMobileNavbarItem>
                </Link>
              );
            })}
          </ACMMobileNavbar>
        )}
      </div>
    </>
  );
};

export default Skeleton;
