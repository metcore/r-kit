import clsx from 'clsx';
import { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '../dropdown';
import { Icon } from '../icons';
import { Input } from '../input';
import { Text } from '../text';
import {
  tableBodyVariants,
  tableCellHeadVariants,
  tableCellVariants,
  tableHeadVariants,
  tableRowVariants,
  tableVariants,
} from './table-variants';
import type {
  TableBodyProps,
  TableCellHeadProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableRootProps,
  TableRowProps,
} from './type';
import { generatePages } from './helpers';

type TableContextType = {
  bordered?: boolean;
  striped?: boolean;
  responsive?: boolean;
  hoverable?: boolean;
};

type TableRowContextType = {
  isLast?: boolean;
};

const TableContext = createContext<TableContextType>({});
const TableRowContext = createContext<TableRowContextType>({});

export function Table({
  children,
  responsive,
  className,
  bordered,
  striped,
  hoverable,
}: TableRootProps) {
  return (
    <TableContext.Provider value={{ bordered, responsive, striped, hoverable }}>
      <table
        className={clsx(
          tableVariants({ bordered, responsive: responsive }),
          className
        )}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
}

export function TableHead({ children, className }: TableHeadProps) {
  const { responsive } = useContext(TableContext);
  return (
    <thead
      className={cn(
        tableHeadVariants({ responsive: responsive === true }),
        className
      )}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableBodyProps) {
  const { responsive } = useContext(TableContext);
  return (
    <tbody
      className={clsx(
        tableBodyVariants({ responsive: responsive === true }),
        className
      )}
    >
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  isLast,
  isHeader,
  className,
  onClick,
}: TableRowProps) {
  const { hoverable, striped, responsive } = useContext(TableContext);
  const role = isHeader != null ? 'header' : 'body';

  return (
    <TableRowContext.Provider value={{ isLast }}>
      <tr
        onClick={onClick}
        className={clsx(
          tableRowVariants({
            role,
            last: Boolean(isLast),
            responsive: responsive === true,
            striped: striped,
            hoverable: hoverable,
          }),
          className
        )}
      >
        {children}
      </tr>
    </TableRowContext.Provider>
  );
}

export function TableCellHead({
  children,
  value,
  className,
  onClick,
}: TableCellHeadProps) {
  const { bordered, responsive } = useContext(TableContext);
  return (
    <th
      className={cn(
        tableCellHeadVariants({
          responsive: responsive === true,
          bordered: bordered,
        }),
        className
      )}
    >
      {value !== undefined ? (
        <button
          className={clsx(
            'flex items-center gap-2.5',
            !!onClick && 'cursor-pointer'
          )}
          onClick={onClick}
          type="button"
        >
          <Text as={'h5'} variant="t1" weight="semibold">
            {value}
          </Text>
          <Icon name="sort-vertical" size={16} className="shrink-0" />
        </button>
      ) : (
        <div className="cursor-pointer" onClick={onClick}>
          {children}
        </div>
      )}
    </th>
  );
}

export function TableCell({
  value,
  onClick,
  className,
  children,
  textClassName,
  ...props
}: TableCellProps) {
  const { bordered, responsive } = useContext(TableContext);
  const { isLast } = useContext(TableRowContext);

  const content =
    value !== undefined ? (
      <Text as={'span'} variant="t2" className={cn(textClassName)}>
        {value}
      </Text>
    ) : (
      children
    );

  return (
    <td
      className={cn(
        tableCellVariants({
          last: isLast === true,
          responsive: responsive === true,
          bordered: bordered,
        }),
        className
      )}
      onClick={onClick}
      {...props}
    >
      {responsive === true ? (
        <div className="max-md:flex max-md:min-w-0 max-md:flex-1 max-md:flex-col max-md:gap-0.5">
          {content}
        </div>
      ) : (
        content
      )}
    </td>
  );
}

export function TableFooter({
  children,
  colSpan = 2,
  className,
}: TableFooterProps) {
  return (
    <tfoot className={className}>
      <tr className="border-b-0">
        <td colSpan={colSpan} className="px-4 py-3">
          {children}
        </td>
      </tr>
    </tfoot>
  );
}

export function TablePagination({
  perPages = [10, 20, 100],
  currentPage,
  totalPage,
  selectedPerpage,
  defaultPerpage = 10,
  onChangePerpage,

  showNumber = true,
  showController = true,
  numberOnClick,
  nextOnClick,
  prevOnClick,

  wrapperClassName,
  setNumberLink,

  dropdownContentClassName,
  dropdownTriggerClassName,
  dropdownItemClassName,
}: TablePaginationProps) {
  const isControlled = selectedPerpage !== undefined;

  const [internalPerpage, setInternalPerpage] =
    useState<number>(defaultPerpage);

  const value = isControlled ? selectedPerpage : internalPerpage;

  const handleChange = (val: number) => {
    if (!isControlled) {
      setInternalPerpage(val);
    }
    onChangePerpage?.(val);
  };

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-between md:flex-nowrap',
        wrapperClassName
      )}
    >
      {showController && (
        <div className="flex items-center gap-3">
          <Text
            as="h5"
            value="Showing"
            variant="t1"
            weight="medium"
            className="text-gray-700"
          />

          <Dropdown>
            <DropdownTrigger
              className={clsx('outline-none', dropdownTriggerClassName)}
            >
              <Input
                readOnly
                mergedAddon
                className="w-19 cursor-pointer"
                value={value}
                rightAddonClassName="pl-0! pr-1!"
                rightAddon={
                  <Icon
                    name="angle-down-small"
                    className="text-gray-900"
                    size={20}
                  />
                }
              />
            </DropdownTrigger>

            <DropdownContent
              className={clsx(
                'w-19 gap-0 rounded-lg p-1',
                dropdownContentClassName
              )}
              sideOffset={8}
            >
              {perPages.map((item) => (
                <DropdownItem
                  key={item}
                  className={clsx(
                    value === item && 'bg-primary-50 border-primary-300',
                    'justify-center rounded-sm! border-0',
                    dropdownItemClassName
                  )}
                  onClick={() => handleChange(item)}
                >
                  <Text
                    value={String(item)}
                    align="center"
                    className="cursor-pointer"
                  />
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          {currentPage && totalPage && (
            <Text
              as="h5"
              value={`Page ${currentPage} of ${totalPage}`}
              variant="t1"
              weight="medium"
              className="text-gray-700"
            />
          )}
        </div>
      )}

      {showNumber && totalPage > 0 && (
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            className="cursor-pointer disabled:opacity-40"
            onClick={() => prevOnClick?.()}
          >
            <Icon name="angles-left-small" size={20} />
          </button>

          <div className="flex gap-1">
            {generatePages(currentPage, totalPage).map((item, index) => {
              if (item === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex size-9 items-center justify-center text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              const active = currentPage === item;

              return (
                <a
                  key={item}
                  href={
                    setNumberLink !== undefined
                      ? setNumberLink?.(`?page=${item}`, item)
                      : `?page=${item}`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    numberOnClick?.(item);
                  }}
                  className={clsx(
                    'grid size-9 cursor-pointer place-items-center rounded-lg',
                    active
                      ? 'bg-primary-1000 hover:bg-primary-1000 *:text-white'
                      : 'hover:bg-primary-50 *:text-gray-700'
                  )}
                >
                  <Text
                    as="span"
                    value={String(item)}
                    variant="t1"
                    weight="medium"
                  />
                </a>
              );
            })}
          </div>

          <button
            disabled={currentPage >= totalPage}
            className="cursor-pointer disabled:opacity-40"
            onClick={() => nextOnClick?.()}
          >
            <Icon name="angles-right-small" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
