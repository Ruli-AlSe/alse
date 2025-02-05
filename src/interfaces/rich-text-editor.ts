import { ChangeEvent, JSX } from 'react';

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

export interface LinkInputProps {
  label: string;
  buttonText: string;
  onChangeAction: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAction: () => void;
  icon: JSX.Element;
}

export interface WidthHeightControlsProps {
  widthLabel: string;
  heightLabel: string;
  defaultWidth: number;
  defaultHeight: number;
  onChangeWidthAction: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeHeightAction: (event: ChangeEvent<HTMLInputElement>) => void;
}
