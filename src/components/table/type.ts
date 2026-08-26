import type { ReactNode } from 'react';

export interface TableRootProps {
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  children: ReactNode;
  responsive?: boolean;
  hoverable?: boolean;
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}
export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}
export interface TableRowProps {
  children: ReactNode;
  isLast?: boolean;
  isHeader?: boolean;
  className?: string;
  onClick?: () => void;
}
export interface TableFooterProps {
  children: ReactNode;
  colSpan?: number;
  className?: string;
}

// table cell
type WithChildren = {
  children: ReactNode;
  value?: never;
  className?: string;
};

type WithValue = {
  value: string | number;
  children?: never;
};

export type TableCellHeadProps = {
  className?: string;
  onClick?: () => void;
  sortable?: boolean;
} & (WithChildren | WithValue);

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  className?: string;
  onClick?: () => void;
  textClassName?: string;
} & (WithChildren | WithValue);

export type TablePaginationProps = {
  perPages?: number[];
  currentPage: number;
  totalPage: number;
  selectedPerpage?: number;
  onChangePerpage?: (val: number) => void;
  defaultPerpage?: number;
  showNumber?: boolean;
  showController?: boolean;

  numberOnClick?: (page: number) => void;
  nextOnClick?: () => void;
  prevOnClick?: () => void;
  setNumberLink?: (url?: string, item?: number) => string;

  wrapperClassName?: string;
  dropdownTriggerClassName?: string;
  dropdownContentClassName?: string;
  dropdownItemClassName?: string;
};
