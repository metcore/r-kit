import { cva, type VariantProps } from 'class-variance-authority';

export const tableVariants = cva(
  'w-full border-separate border-spacing-0 overflow-hidden text-left text-sm',
  {
    variants: {
      bordered: {
        true: 'border border-b-0 border-gray-300',
        false: '',
      },
      responsive: {
        true: 'max-md:block max-md:w-full max-md:!border-0 max-md:[&>tbody>tr>td]:!border-0 max-md:[&>thead>tr>th]:!border-0',
        false: '',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      },
    },
    defaultVariants: {
      bordered: false,
      rounded: 'lg',
    },
  }
);

export const tableHeadVariants = cva('', {
  variants: {
    responsive: { true: 'max-md:hidden', false: '' },
    striped: {
      true: 'bg-gray-100/80',
      false: 'bg-gray-50',
    },
  },
  defaultVariants: { responsive: false, striped: false },
});

export const tableCellHeadVariants = cva(
  'border-gray-300 px-4 py-3 font-semibold text-gray-900',
  {
    variants: {
      responsive: { true: '', false: '' },
      bordered: { true: 'border-r border-b last:border-r-0', false: '' },
    },
  }
);

export const tableBodyVariants = cva('', {
  variants: {
    responsive: {
      true: 'max-md:flex max-md:w-full max-md:flex-col max-md:gap-4',
      false: '',
    },
  },
  defaultVariants: { responsive: false },
});

export const tableRowVariants = cva('transition-colors', {
  variants: {
    role: { header: '', body: '' },
    responsive: {
      true: 'max-md:grid max-md:w-full max-md:min-w-0 max-md:grid-cols-2 max-md:gap-3 max-md:rounded-xl max-md:border max-md:border-gray-200 max-md:bg-white max-md:p-4 max-md:[&>td:last-child]:border-r-0',
      false: '',
    },
    striped: {
      true: 'even:bg-gray-50',
      false: '',
    },
    hoverable: {
      true: 'hover:bg-primary-50',
      false: '',
    },
    last: { true: '', false: '' },
  },
  defaultVariants: {
    striped: false,
    hoverable: false,
  },
});

export const tableCellVariants = cva('border-gray-300 px-4 py-3', {
  variants: {
    bordered: { true: 'border-r border-b last:border-r-0', false: '' },
    last: { true: 'border-b-0', false: '' },
    responsive: {
      true: 'px-0 py-0 max-md:min-w-0 md:border-b md:px-4 md:py-3',
      false: '',
    },
  },
  defaultVariants: { last: false, responsive: false },
});

export type TableVariantProps = VariantProps<typeof tableVariants>;
export type TableHeadVariantProps = VariantProps<typeof tableHeadVariants>;
export type TableRowVariantProps = VariantProps<typeof tableRowVariants>;
export type TableCellVariantProps = VariantProps<typeof tableCellVariants>;
