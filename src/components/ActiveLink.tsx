'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string; // allow custom classes
  activeClassName?: string; // optional override
};

export default function ActiveLink({
  href,
  children,
  className = '',
  activeClassName = 'active',
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const combinedClass = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <Link href={href} className={combinedClass}>
      {children}
    </Link>
  );
}
