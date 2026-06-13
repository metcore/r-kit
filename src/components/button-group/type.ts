import type React from 'react';
import type {
  ButtonAsAnchorProps,
  ButtonAsButtonProps,
  ButtonProps,
} from '../button/button';

export interface ButtonGroupProps {
  children: React.ReactNode;
  size?: ButtonProps['size'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  direction?: 'horizontal' | 'vertical';
}

export type ButtonGroupItemProps =
  | Omit<ButtonAsButtonProps, 'size' | 'variant'>
  | Omit<ButtonAsAnchorProps, 'size' | 'variant'>;
