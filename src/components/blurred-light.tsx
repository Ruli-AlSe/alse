import { cn } from '@/lib/utils';
import React from 'react';

export const BlurredLight = ({ extraClasses }: { extraClasses: string }) => {
  return (
    <div
      className={cn(
        'z-10 rounded-ful absolute w-16 h-16 blur-[90px] overflow-hidden',
        extraClasses
      )}
    />
  );
};
