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
import { useSession } from 'next-auth/react';
import HomeIcon from '../icons/HomeIcon';
import SignOutIcon from '../icons/SignOutIcon';
import AdminIcon from 'icons/AdminIcon';
import { gqlQueries } from 'src/api';
import { useQuery } from 'react-query';
import { OfficerStatusContext } from './context/OfficerStatus';

const pages = [
  {
    uri: '/',
    name: 'home',
    svg: HomeIcon,
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
  {
    uri: '/auth/signout',
    name: 'sign out',
    svg: SignOutIcon,
  },
];

const officerOnlyPages = [...pages, {
    uri: '/admin',
    name: 'admin',
    svg: AdminIcon,
}];

const Skeleton = ({ children }: any) => {
  const mobile = useMediaQuery({ maxWidth: 900 });
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: officerStatusData, isLoading } = useQuery(
    ['officerStatus'],
    () => gqlQueries.getOfficerStatus(),
    { enabled: status === 'authenticated' }
  );
  if (isLoading || status === 'loading') return <></>;

  if (!session)
    return (
      <>
        <Background splotches={3} />
        <div className="h-screen w-screen overflow-x-hidden flex">
          <div className="w-full relative">{children}</div>
        </div>
      </>
    );

  return (
    <>
      <OfficerStatusContext.Provider value={!!officerStatusData?.me.isOfficer}>
        <Background splotches={3} />
        <div className="h-screen w-screen overflow-x-hidden flex">
          {!mobile && (
            <>
              <ACMDesktopNavbar>
                <Link href="/" passHref>
                  <ACMDesktopNavbarItem isLogo>
                    <Image src={WhiteACMLogo} alt="ACM Logo" />
                  </ACMDesktopNavbarItem>
                </Link>
                {(officerStatusData?.me.isOfficer ? officerOnlyPages : pages).map((page, idx) => (
                  <Link key={idx} href={page.uri} passHref className="cursor-pointer">
                    <ACMDesktopNavbarItem $active={page.uri === router.asPath} key={idx}>
                      {page.name}
                    </ACMDesktopNavbarItem>
                  </Link>
                ))}
              </ACMDesktopNavbar>
            </>
          )}
          <div className="w-full h-full">
            <div className="w-full relative">{children}</div>
            {mobile && (
              <>
                <MobileNavPlaceholder />
                <ACMMobileNavbar>
                  {(officerStatusData?.me.isOfficer ? officerOnlyPages : pages).map((page, idx) => {
                    const active = router.pathname === page.uri;
                    return (
                      <Link key={idx} href={page.uri} passHref className="cursor-pointer">
                        <ACMMobileNavbarItem $active={active}>
                          {page.svg && <page.svg fill={active ? '#fff' : '#000'} />}
                          <span className="text-center whitespace-nowrap">{page.name}</span>
                        </ACMMobileNavbarItem>
                      </Link>
                    );
                  })}
                </ACMMobileNavbar>
              </>
            )}
          </div>
        </div>
      </OfficerStatusContext.Provider>
    </>
  );
};

export default Skeleton;
