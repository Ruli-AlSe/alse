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
          className="md:hidden flex items-center text-orange-400 dark:text-gray-100 p-1"
          id="navbar_burger"
        >
          <Menu className="h-6 w-6" />
        </div>
      </SheetTrigger>
      <SheetOverlay className="md:hidden" />
      <SheetContent className="md:hidden">
        <SheetHeader>
          <SheetTitle>ALSE</SheetTitle>
          <Link
            className="w-full py-1.5 px-3 text-center bg-gray-100 rounded-md text-black dark:text-gray-300 dark:bg-gray-700"
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
