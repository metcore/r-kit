import type { BaseColor } from '../base';
import type { IconNameProps } from '../icons';

export interface ToastProps {
  color?: BaseColor;
  title: string;
  description: string;
  onClose?: () => void;
  icon?: IconNameProps;
  onClickAction?: () => void;
  actionLabel?: string;
  iconSize?: number;
  variant?: 'outline';
  duration?: number;
}
