import React, { ReactElement } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface BaseProps {
  icon: ReactElement;
  buttonText: string;
  variant?: 'default' | 'secondary';
  openInNewTab?: boolean;
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
}: Props) => {
  if (linkUrl) {
    return (
      <Button variant={variant} size="sm" asChild>
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
      <Button variant={variant} size="sm" onClick={action}>
        {buttonText}
        {icon}
      </Button>
    );
  }
};
