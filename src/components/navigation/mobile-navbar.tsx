import { Menu, StickyNote } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

import { ModeToggle } from '../theme/mode-toggle';
import { CustomButton } from '../custom-button';

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
      <SheetContent className="md:hidden bg-white dark:bg-dark-blue">
        <SheetHeader>
          <SheetTitle className="font-firaCode text-blue-500 dark:text-light-green">
            AlSe
          </SheetTitle>
          <CustomButton buttonText="Blog" linkUrl="/blog" variant="default" icon={<StickyNote />} />
          <ModeToggle />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
