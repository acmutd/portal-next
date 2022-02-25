import Link from 'next/link';
import React from 'react';

interface NavItemWithChildrenProps {
  href: string;
  title: string;
  customClass?: string;
}

export default function NavItemWithChildren({
  children,
  href,
  title,
  customClass = '',
}: React.PropsWithChildren<NavItemWithChildrenProps>) {
  return (
    <>
      <Link href={href} passHref>
        <h1 className={`text-center md:text-left ${customClass} hover:cursor-pointer`}>{title}</h1>
      </Link>
      <div className="md:ml-5">{children}</div>
    </>
  );
}
