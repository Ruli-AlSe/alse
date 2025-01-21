import { ModeToggle } from '../mode-toggle';
import Link from 'next/link';
import { MobileNavbar } from './mobile-navbar';

export const Navbar = () => {
  return (
    <nav className="relative px-4 py-2 flex justify-between items-center bg-white dark:bg-gray-800 border-b-2 dark:border-gray-600">
      <Link href="/" className="font-bold text-orange-400 dark:text-white">
        <h1 className="text-2xl">ALSE</h1> <span className="italic text-sm">by Raul Almanza</span>
      </Link>

      <MobileNavbar />

      <div className="hidden md:flex justify-center items-center">
        <Link
          className=" py-1.5 px-3 m-1 text-center bg-gray-100 border border-gray-300 rounded-md text-black  hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-700 hidden md:inline-block "
          href="/blog"
        >
          Blog
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};
