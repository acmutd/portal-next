import Link from 'next/link';

interface NavItemProps {
  href: string;
  title: string;
  customClass?: string;
}

export default function NavItem({ href, title, customClass = '' }: NavItemProps) {
  return (
    <Link href={href} passHref>
      <h1 className={`text-center md:text-left ${customClass} hover:cursor-pointer`}>{title}</h1>
    </Link>
  );
}
