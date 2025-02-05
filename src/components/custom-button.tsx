import React, { JSX } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface BaseProps {
  icon: JSX.Element;
  buttonText: string;
  variant?: 'default' | 'secondary';
  openInNewTab?: boolean;
  disabled?: boolean;
  buttonAsBadge?: boolean;
  extraClasses?: string;
}

interface ActionButtonProps extends BaseProps {
  action: () => void;
  linkUrl?: never;
}

interface LinkButtonProps extends BaseProps {
  linkUrl: string;
  action?: never;
}

type Props = ActionButtonProps | LinkButtonProps;

export const CustomButton = ({
  icon,
  buttonText,
  linkUrl,
  action,
  openInNewTab = false,
  variant = 'default',
  disabled = false,
  buttonAsBadge: buttonAsDiv = false,
  extraClasses,
}: Props) => {
  if (buttonAsDiv && action) {
    return (
      <Badge
        variant={variant}
        onClick={action}
        className={cn('h-9 rounded-md px-3', extraClasses, {
          'cursor-none pointer-events-none opacity-45': disabled,
        })}
      >
        {buttonText}
        {icon}
      </Badge>
    );
  }

  if (linkUrl) {
    return (
      <Button variant={variant} size="sm" disabled={disabled} className={cn(extraClasses)} asChild>
        <Link
          href={linkUrl}
          target={openInNewTab ? '_blank' : '_self'}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {buttonText}
          {icon}
        </Link>
      </Button>
    );
  }

  if (action) {
    return (
      <Button
        variant={variant}
        size="sm"
        disabled={disabled}
        className={cn(extraClasses)}
        onClick={action}
      >
        {buttonText}
        {icon}
      </Button>
    );
  }
};
