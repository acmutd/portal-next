import { FC, SVGProps } from 'react';

const CameraIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="33" viewBox="0 0 43 33" {...props}>
      <path d="M5.375 5.375A5.375 5.375 0 000 10.75v16.125a5.375 5.375 0 005.375 5.375h32.25A5.375 5.375 0 0043 26.875V10.75a5.375 5.375 0 00-5.375-5.375h-3.15a5.375 5.375 0 01-3.8-1.575L28.45 1.575A5.375 5.375 0 0024.65 0h-6.3a5.375 5.375 0 00-3.8 1.575L12.325 3.8a5.375 5.375 0 01-3.8 1.575h-3.15zm1.344 5.375a1.344 1.344 0 110-2.688 1.344 1.344 0 010 2.688zm24.187 6.719a9.406 9.406 0 11-18.813 0 9.406 9.406 0 0118.813 0z"></path>
    </svg>
  );
};

export default CameraIcon;
