import type React from 'react';
import type { ButtonProps } from '../button/button';

export interface ButtonGroupProps {
  direction?: 'horizontal' | 'vertical';
  size?: ButtonProps['size'];
  children?: React.ReactNode;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
}
