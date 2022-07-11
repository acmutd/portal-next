import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

import Background from './Background';
import { ACMDesktopNavbar, ACMMobileNavbar } from '@acmutd/acm-ui/src';
import { ACMNavbarItem } from 'packages/acm-ui/src';

const Skeleton = ({ children }) => {
  const mobile = useMediaQuery({ maxWidth: 900 });

  return (
    <>
      <Background splotches={3} />
      <div className="h-screen w-screen overflow-hidden flex">
        {!mobile && (
          <ACMDesktopNavbar>
            <Link href="\events" passHref>
              <ACMNavbarItem>events</ACMNavbarItem>
            </Link>
            <Link href="\apply" passHref>
              <ACMNavbarItem active>apply</ACMNavbarItem>
            </Link>
            <Link href="\profile" passHref>
              <ACMNavbarItem>profile</ACMNavbarItem>
            </Link>
            <Link href="\" passHref>
              <ACMNavbarItem>resume</ACMNavbarItem>
            </Link>
          </ACMDesktopNavbar>
        )}
        {children}
        {mobile && (
          <ACMMobileNavbar>
            <ACMNavbarItem>EEE</ACMNavbarItem>
            <div>events</div>
            <div>apply</div>
            <div>profile</div>
            <div>account</div>
            <div>resumes</div>
          </ACMMobileNavbar>
        )}
      </div>
    </>
  );
};

export default Skeleton;
