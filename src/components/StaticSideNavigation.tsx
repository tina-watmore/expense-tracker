import Link from 'next/link';
import ActiveLink from './ActiveLink';
import Image from 'next/image';
import {
  LayoutDashboard,
  BanknoteArrowDown,
  FileText,
  CircleUserRound,
  CirclePlus,
  Settings,
  LogOut,
} from 'lucide-react';

export default function StaticSiteNavigation() {
  return (
    <div className="static-side-navigation">
      <Link href="/" className="nav-logo">
        <Image
          className="logo-image"
          src="/logo.png"
          alt="Expense Tracker logo"
          width={40}
          height={40}
        />
        <span className="logo-text">TJ Tracker</span>
        <span className="logo-sub-text">Expenses & Budgets</span>
      </Link>
      <nav className="navigation">
        <ul className="nav-links">
          <li>
            <ActiveLink className="nav-item" href="/">
              <LayoutDashboard strokeWidth={1} className="nav-icon" />
              Dashboard
            </ActiveLink>
          </li>       
          <li>
            <ActiveLink className="nav-item" href="/transactions">
              <BanknoteArrowDown strokeWidth={1} className="nav-icon" />
              Transactions
            </ActiveLink>
          </li>
          <li>
            <ActiveLink className="nav-item" href="/budget">
              <FileText strokeWidth={1} className="nav-icon" />
              CSP Budget
            </ActiveLink>
          </li>
        </ul>
      </nav>
      <ul className="site-links">
        <li>
          <ActiveLink className="nav-item" href="/profile">
            <CircleUserRound strokeWidth={1} className="nav-icon" />
            Profile
          </ActiveLink>
        </li>
        <li>
          <ActiveLink className="nav-item" href="/settings">
            <Settings strokeWidth={1} className="nav-icon" />
            Settings
          </ActiveLink>
        </li>
        <li>
          <ActiveLink className="nav-item" href="#">
            <LogOut strokeWidth={1} className="nav-icon" />
            Logout
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
}
