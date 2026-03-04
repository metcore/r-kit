import clsx from "clsx";
import { createContext, useContext, useState } from "react";
import { cn } from "../../lib/utils";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../dropdown";
import { Icon } from "../icons";
import { Input } from "../input";
import { Text } from "../text";
import { TableVariants } from "./table-variants";
import type {
  TableBodyProps,
  TableCellHeadProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableRootProps,
  TableRowProps,
} from "./type";
import { generatePages } from "./helpers";

type TableContextType = {
  variant?: TableRootProps["variant"];
};

const TableContext = createContext<TableContextType>({});

export function Table({
  children,
  variant = "basic",
  className,
}: TableRootProps) {
  return (
    <TableContext.Provider value={{ variant }}>
      <table
        className={clsx(
          className,
          (variant === "bordered" ||
            variant == "stripped" ||
            variant == "hovered" ||
            variant === "wrapped-row-bordered") &&
            "border-separate border-spacing-0",
          variant === "wrapped-row-bordered" &&
            "rounded border border-gray-300",
        )}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
}

export function TableHead({ children }: TableHeadProps) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: TableBodyProps) {
  const { variant } = useContext(TableContext);
  const isBordered = variant === "bordered";
  const isStripped = variant === "stripped";
  const isHovered = variant === "hovered";

  return (
    <tbody
      className={clsx(
        (isBordered || isStripped || isHovered) &&
          "[&>tr:last-child>td:first-child]:rounded-bl [&>tr:last-child>td:last-child]:rounded-br",
      )}
    >
      {children}
    </tbody>
  );
}

export function TableRow({ children, isLast, isHeader }: TableRowProps) {
  const { variant } = useContext(TableContext);
  const isRowBordered = variant === "row-bordered";
  const isBordered = variant === "bordered";
  const isHeaded = variant === "headed";
  const isStripped = variant === "stripped";
  const isHovered = variant === "hovered";
  const isWrapped = variant === "wrapped-row-bordered";

  return (
    <tr
      className={clsx(
        TableVariants({ tableRow: variant }),
        "[&>th:first-child]:rounded-tl [&>th:last-child]:rounded-tr",
        isRowBordered && isLast && "border-b-0!",
        (isHeaded || isWrapped) &&
          isHeader &&
          "border-b border-b-gray-300! *:bg-gray-50",
        (isBordered || isStripped || isHovered) &&
          "*:border-gray-300 [&>td:last-child]:border-r [&>th]:border-t [&>th]:border-b [&>th]:border-l [&>th:last-child]:border-r",
        isHeader && isStripped && "bg-gray-50",
        !isHeader && isHovered && "hover:bg-primary-50 transition-colors",
        !isHeader && isStripped && "even:bg-gray-50",
      )}
    >
      {children}
    </tr>
  );
}

export function TableCellHead({
  children,
  value,
  className,
  onClick,
}: TableCellHeadProps) {
  return (
    <th className={cn(className, "px-4 py-3")}>
      {value !== undefined ? (
        <button
          className={clsx(
            "flex items-center gap-2.5",
            !!onClick && "cursor-pointer",
          )}
          onClick={onClick}
        >
          <Text as={"h5"} variant="t1" weight="semibold">
            {value}
          </Text>
          <Icon name="sort-vertical" size={16} />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export function TableCell({
  value,
  onClick,
  className,
  children,
  variant: variantText = "t2",
  textClassName,
  ...props
}: TableCellProps) {
  const { variant } = useContext(TableContext);
  const isBordered = variant === "bordered";
  const isStripped = variant === "stripped";
  const isHovered = variant === "hovered";
  const isWrapped = variant === "wrapped-row-bordered";

  return (
    <td
      className={cn(
        className,
        "border-gray-300 px-4 py-3",
        (isBordered || isStripped || isHovered) && "border-b border-l",
        isWrapped && "border-b",
      )}
      onClick={onClick}
      {...props}
    >
      {value ? (
        <Text as={"span"} variant={variantText} className={textClassName}>
          {value}
        </Text>
      ) : (
        children
      )}
    </td>
  );
}

export function TableFooter({ children, colSpan = 2 }: TableFooterProps) {
  return (
    <tfoot>
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
    <div className="flex w-full items-center justify-between">
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
            <DropdownTrigger className="outline-none">
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
              className="w-19 gap-0 rounded-lg p-1 shadow-sm"
              sideOffset={8}
            >
              {perPages.map((item) => (
                <DropdownItem
                  key={item}
                  className={clsx(
                    value === item && "bg-primary-50 border-primary-300",
                    "justify-center rounded-sm! border-0",
                  )}
                  onClick={() => handleChange(item)}
                >
                  <Text value={String(item)} align="center" />
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
              if (item === "...") {
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
                <button
                  key={item}
                  onClick={() => numberOnClick?.(item)}
                  className={clsx(
                    "size-9 cursor-pointer rounded-lg",
                    active
                      ? "bg-primary-1000 hover:bg-primary-1000 *:text-white"
                      : "hover:bg-primary-50 *:text-gray-700",
                  )}
                >
                  <Text
                    as="span"
                    value={String(item)}
                    variant="t1"
                    weight="medium"
                  />
                </button>
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
