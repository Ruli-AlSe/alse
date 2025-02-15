import Link from 'next/link';

import { ModeToggle } from '../theme/mode-toggle';
import { MobileNavbar } from './mobile-navbar';
import { CustomButton } from '../custom-button';
import { StickyNote } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="w-full px-4 py-2 flex justify-between items-center bg-white dark:bg-dark-blue border-b-2">
      <Link
        href="/"
        className="text-xl font-firaCode font-bold text-blue-500 dark:text-light-green"
      >
        Ruli-AlSe
      </Link>

      <MobileNavbar />

      <div className="hidden md:flex justify-center items-center gap-3">
        <CustomButton buttonText="Blog" linkUrl="/blog" variant="default" icon={<StickyNote />} />

        <ModeToggle />
      </div>
    </nav>
  );
};
