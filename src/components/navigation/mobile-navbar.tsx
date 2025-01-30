import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';

export const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <div
          className="md:hidden flex items-center text-light-blue dark:text-white p-1"
          id="navbar_burger"
        >
          <Menu className="h-6 w-6" />
        </div>
      </SheetTrigger>
      <SheetOverlay className="md:hidden" />
      <SheetContent className="md:hidden bg-blue-200 dark:bg-dark-blue">
        <SheetHeader>
          <SheetTitle>ALSE</SheetTitle>
          <Link
            className="py-1.5 px-3 m-1 text-center bg-blue-200 border border-slate-800 rounded-md text-light-blue hover:bg-blue-300 dark:hover:bg-gray-600 dark:text-gray-300 dark:bg-gray-700"
            href="/blog"
          >
            Blog
          </Link>
          <ModeToggle className="w-full !mt-10" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
