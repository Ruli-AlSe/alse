'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';

type Props = {
  className?: string;
};

export function ModeToggle({ className }: Props) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className={clsx(
        'dark:bg-gray-700 bg-blue-200 border-slate-800 text-light-blue dark:text-gray-300 hover:bg-blue-300 dark:hover:bg-gray-600',
        className
      )}
      onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
