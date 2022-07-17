import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Image from 'next/image';

import Background from './Background';
import {
  ACMDesktopNavbar,
  ACMMobileNavbar,
  ACMDesktopNavbarItem,
  ACMMobileNavbarItem,
} from '@acmutd/acm-ui/src';
// } from '@acmutd/acm-ui';

import WhiteACMLogo from '../public/assets/acm/logo_white.svg';

const Skeleton = ({ children }: any) => {
  const mobile = useMediaQuery({ maxWidth: 900 });

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

            <Link href="/events" passHref>
              <ACMDesktopNavbarItem>events</ACMDesktopNavbarItem>
            </Link>
            <Link href="/opportunities" passHref>
              <ACMDesktopNavbarItem active>apply</ACMDesktopNavbarItem>
            </Link>
            <Link href="/profile" passHref>
              <ACMDesktopNavbarItem>profile</ACMDesktopNavbarItem>
            </Link>
            <Link href="/profile/resume" passHref>
              <ACMDesktopNavbarItem>resume</ACMDesktopNavbarItem>
            </Link>
          </ACMDesktopNavbar>
        )}
        <div className="w-full relative">{children}</div>
        {mobile && (
          <ACMMobileNavbar>
            <Link href="/events" passHref>
              <ACMMobileNavbarItem>events</ACMMobileNavbarItem>
            </Link>
            <Link href="/opportunities" passHref>
              <ACMMobileNavbarItem active>apply</ACMMobileNavbarItem>
            </Link>
            <Link href="/evenprofilets" passHref>
              <ACMMobileNavbarItem>profile</ACMMobileNavbarItem>
            </Link>
            <Link href="/profile/resume" passHref>
              <ACMMobileNavbarItem>resumes</ACMMobileNavbarItem>
            </Link>
          </ACMMobileNavbar>
        )}
      </div>
    </>
  );
};

export default Skeleton;
