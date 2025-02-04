import { JSX } from 'react';

export interface TooltipWrapperProps {
  tooltipContent: string;
  element: JSX.Element;
}

export interface DialogWrapperProps {
  openModal: boolean;
  openChange: (open: boolean) => void;
  dialogTitle: string;
  triggerElement: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
}
