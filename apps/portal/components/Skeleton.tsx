import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';

import Background from './Background';
import { default as ACMDesktopNavbar } from './PortalNavbar';
import { default as ACMMobileNavbar, MobileNavPlaceholder } from './PortalMobileNavbar';
import { default as ACMDesktopNavbarItem } from './PortalNavbarItem';
import { default as ACMMobileNavbarItem } from './PortalMobileNavbarItem';

import WhiteACMLogo from '../public/assets/acm/logo_white.svg';
import { useRouter } from 'next/router';

import EventIcon from '../icons/EventIcon';
import ProfileIcon from '../icons/ProfileIcon';
import ApplyIcon from '../icons/ApplyIcon';
import CameraIcon from '../icons/CameraIcon';

const pages = [
  {
    uri: '/',
    name: 'home',
    svg: undefined,
  },
  {
    uri: '/events',
    name: 'events',
    svg: EventIcon,
  },
  {
    uri: '/opportunities',
    name: 'apply',
    svg: ApplyIcon,
  },
  {
    uri: '/profile',
    name: 'profile',
    svg: ProfileIcon,
  },
  {
    uri: '/profile/resume',
    name: 'resume',
    svg: CameraIcon,
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
            {pages.map((page, idx) => {
              return (
                <Link key={idx} href={page.uri} passHref>
                  <ACMDesktopNavbarItem $active={router.pathname === page.uri ? true : false}>
                    {page.name}
                  </ACMDesktopNavbarItem>
                </Link>
              );
            })}
          </ACMDesktopNavbar>
        )}
        <div className="w-full">
          <div className="w-full relative">{children}</div>
          {mobile && (
            <>
              <MobileNavPlaceholder />
              <ACMMobileNavbar>
                {pages.map((page, idx) => {
                  const active = router.pathname === page.uri;
                  return (
                    <Link key={idx} href={page.uri} passHref>
                      <ACMMobileNavbarItem $active={active}>
                        {page.svg && <page.svg fill={active ? '#fff' : '#000'} />}
                        {page.name}
                      </ACMMobileNavbarItem>
                    </Link>
                  );
                })}
              </ACMMobileNavbar>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Skeleton;
