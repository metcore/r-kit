import type { ReactNode } from "react";
import type { TextVariant } from "../text";

export interface TableRootProps {
  className?: string;
  children: ReactNode;
  variant?:
    | "basic"
    | "bordered"
    | "stripped"
    | "hovered"
    | "row-bordered"
    | "wrapped-row-bordered"
    | "headed";
}

export interface TableHeadProps {
  children: ReactNode;
}
export interface TableBodyProps {
  children: ReactNode;
}
export interface TableRowProps {
  children: ReactNode;
  isLast?: boolean;
  isHeader?: boolean;
}
export interface TableFooterProps {
  children: ReactNode;
  colSpan: number;
}

// table cell
type WithChildren = {
  children: ReactNode;
  value?: never;
};

type WithValue = {
  value: string | number;
  children?: never;
};

export type TableCellHeadProps = {
  className?: string;
  onClick?: () => void;
} & (WithChildren | WithValue);

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  className?: string;
  onClick?: () => void;
  variant?: TextVariant;
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
};
