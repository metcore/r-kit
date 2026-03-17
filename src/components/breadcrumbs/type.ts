import type { IconNameProps } from '../icons';

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export interface BreadcrumbsProps {
  separator?: IconNameProps;
  items: BreadcrumbItem[];
  linkComponent?: React.ElementType | string;
  separatorClassName?: string;
}
