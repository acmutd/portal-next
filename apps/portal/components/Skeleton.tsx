import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

import Background from './Background';
import { ACMDesktopNavbar, ACMMobileNavbar } from '@acmutd/acm-ui/src';

const Skeleton = ({ children }) => {
  const mobile = useMediaQuery({ maxWidth: 900 });

  return (
    <>
      <Background splotches={3} />
      <div className="h-screen w-screen overflow-hidden">
        {/* {!mobile &&
                    <ACMDesktopNavbar />
                } */}
        {children}
        {mobile && <ACMMobileNavbar />}
      </div>
    </>
  );
};

export default Skeleton;
