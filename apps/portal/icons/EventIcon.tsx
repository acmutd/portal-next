import { FC, SVGProps } from 'react';

const ProfileIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="#000"
      viewBox="0 0 36 36"
      {...props}
    >
      <path d="M0 34.56C0 35.356.643 36 1.44 36h33.12c.796 0 1.44-.644 1.44-1.44v-18.9H0v18.9zM34.56 3.24H27V.36a.361.361 0 00-.36-.36h-2.52a.361.361 0 00-.36.36v2.88H12.24V.36a.361.361 0 00-.36-.36H9.36A.361.361 0 009 .36v2.88H1.44C.644 3.24 0 3.883 0 4.68v7.92h36V4.68c0-.796-.644-1.44-1.44-1.44z"></path>
    </svg>
  );
};

export default ProfileIcon;
