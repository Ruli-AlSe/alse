import Link from 'next/link';

import { ModeToggle } from '../mode-toggle';
import { MobileNavbar } from './mobile-navbar';

export const Navbar = () => {
  return (
    <nav className="w-full px-4 py-2 flex justify-between items-center bg-gray-200 dark:bg-dark-blue border-b-2">
      <Link href="/" className="font-bold text-light-blue dark:text-white">
        <h1 className="text-2xl">ALSE</h1> <span className="italic text-sm">by Raul Almanza</span>
      </Link>

      <MobileNavbar />

      <div className="hidden md:flex justify-center items-center">
        <Link
          className="py-1.5 px-3 m-1 text-center bg-white border border-gray-300 rounded-md text-light-blue hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 hidden md:inline-block "
          href="/blog"
        >
          Blog
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};
