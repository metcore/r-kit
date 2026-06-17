import type React from 'react';

export interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLast?: boolean;
  index?: number;
  active?: boolean;
  variant?: 'default' | 'striped';
}

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'striped';
}
