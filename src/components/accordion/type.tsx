import type { ReactNode } from 'react';
import type { ListItemProps, ListProps } from '../list';

export type AccordionRenderHeaderProps = ReactNode | null;

export interface AccordionProps extends ListProps {
  renderHeader?: AccordionRenderHeaderProps;
  isOpen?: boolean;
  onCollapse?: (isOpen: boolean) => void;
}

export interface AccordionItemProps extends ListItemProps {
  children: ReactNode;
  index?: number;
}
