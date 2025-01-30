'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { CustomButton } from '../custom-button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const icon = (
    <>
      <Sun className="h-[1.2rem] w-[1.2rem] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
    </>
  );

  return (
    <CustomButton
      icon={icon}
      buttonText=""
      action={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
    />
  );
}
