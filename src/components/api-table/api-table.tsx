import { type Key, type ReactElement } from 'react';
import { Icon } from '../icons';
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '../table';
import { Text } from '../text';
import type { ApiTableProps, Filters, HideBelow, RowLike } from './types';
import { getPath } from './utils';
import { cn } from '../../lib/utils';
import { Card, CardBody } from '../card';

function defaultRowKey(row: RowLike, index: number): Key {
  const rowId = (row as { id?: Key }).id;
  return rowId ?? index;
}

const hideBelowCls: Record<HideBelow, string> = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
  lg: 'hidden lg:table-cell',
  xl: 'hidden xl:table-cell',
};

const alignCls = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const ApiTable = <
  T extends RowLike = RowLike,
  F extends Record<keyof F, string> = Filters,
>({
  t,
  columns,
  emptyText = 'No data found.',
  rowKey,
  onRowClick,
  renderEmptyData,
  loadingRowCount,
  responsive = 'scroll',
  rowOptions,
  showPagination,
}: ApiTableProps<T, F>): ReactElement => {
  const colCount = columns.length;
  const skeletonCount = loadingRowCount ?? Math.min(t.pageSize, 8);

  const showRefetchBadge = t.isFetching && !t.loading;

  const respMode =
    responsive === true
      ? 'scroll'
      : responsive === false
        ? undefined
        : responsive;

  const ariaSortValue = (key: string): 'ascending' | 'descending' | 'none' => {
    if (t.sort.by !== key) return 'none';
    return t.sort.order === 'asc' ? 'ascending' : 'descending';
  };

  const tableMarkup = (
    <div className="relative">
      {showRefetchBadge && (
        <div
          aria-label="Loading"
          role="status"
          className="pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1"
        >
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
          <span className="text-xs text-slate-500">Loading…</span>
        </div>
      )}

      <Table
        className="w-full table-auto"
        variant="wrapped-row-bordered"
        aria-busy={t.isFetching}
      >
        <TableHead>
          <TableRow isHeader>
            {columns.map((col) => {
              const sortKey = col.sortKey ?? col.key;
              const isActive = col.sortable === true && t.sort.by === sortKey;
              const alignClass =
                col.align != null ? alignCls[col.align] : 'text-left';
              const hideClass =
                col.hideBelow != null ? hideBelowCls[col.hideBelow] : '';

              return (
                <TableCellHead
                  key={col.key}
                  className={[alignClass, hideClass].filter(Boolean).join(' ')}
                  sortable={col.sortable}
                  aria-sort={
                    col.sortable === true ? ariaSortValue(sortKey) : undefined
                  }
                  onClick={
                    col.sortable === true
                      ? () => t.toggleSort(sortKey)
                      : undefined
                  }
                >
                  {col.sortable === true ? (
                    <div
                      className={`flex flex-wrap items-center gap-1 ${
                        isActive ? 'text-gray-900' : 'text-gray-800'
                      }`}
                    >
                      <Text as="h5" variant="t1" weight="semibold">
                        {col.header != null ? col.header : col.key}
                      </Text>
                      <Icon
                        name={
                          t.sort.by === sortKey
                            ? t.sort.order === 'asc'
                              ? 'arrow-up'
                              : 'arrow-down'
                            : 'sort-vertical'
                        }
                        size={16}
                      />
                    </div>
                  ) : (
                    <Text as="h5" variant="t1" weight="semibold">
                      {col.header}
                    </Text>
                  )}
                </TableCellHead>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {t.loading &&
            Array.from({ length: skeletonCount }).map((_, ri) => (
              <TableRow key={`sk-${ri}`} aria-hidden="true">
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={col.hideBelow ? hideBelowCls[col.hideBelow] : ''}
                  >
                    <div className="h-3.5 w-32 animate-pulse rounded bg-slate-100" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {t.error != null && (
            <TableRow>
              <TableCell colSpan={colCount}>
                <div className="mx-auto flex max-w-sm flex-col items-center gap-1 py-8 text-center">
                  <Icon name="info-circle-fill" />
                  <p className="text-sm font-medium text-slate-700">
                    Failed to load data
                  </p>
                  <p className="text-xs text-slate-500">{t.error.message}</p>
                  <button
                    type="button"
                    onClick={t.refetch}
                    className="mt-3 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700 active:scale-95"
                  >
                    Try again
                  </button>
                </div>
              </TableCell>
            </TableRow>
          )}

          {!t.loading &&
            t.error == null &&
            t.data.length === 0 &&
            (renderEmptyData !== undefined ? (
              renderEmptyData
            ) : (
              <TableRow>
                <TableCell colSpan={colCount} className="px-4 py-12">
                  <div className="flex flex-col items-center gap-1 text-center text-slate-400">
                    <Icon name="file-list-search" size={50} />
                    <p className="text-sm">{emptyText}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {!t.loading &&
            t.data.map((row, ri) => {
              const resolvedKey =
                rowKey != null ? rowKey(row, ri) : defaultRowKey(row, ri);
              const rowOpts = rowOptions?.(row, resolvedKey, ri);

              return (
                <TableRow
                  key={resolvedKey}
                  onClick={
                    onRowClick != null ? () => onRowClick(row, ri) : undefined
                  }
                  className={cn(
                    onRowClick != null ? 'cursor-pointer' : undefined,
                    rowOpts?.className
                  )}
                >
                  {columns.map((col) => {
                    const value = getPath(row, col.key);
                    const alignClass =
                      col.align != null ? alignCls[col.align] : 'text-left';
                    const hideClass = col.hideBelow
                      ? hideBelowCls[col.hideBelow]
                      : '';
                    return (
                      <TableCell
                        key={col.key}
                        className={[alignClass, hideClass, col.className ?? '']
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {col.render != null ? (
                          col.render(value, row, ri)
                        ) : value == null || value === '' ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          String(value)
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>

        {showPagination == true && (
          <TableFooter colSpan={colCount}>
            <TablePagination
              currentPage={t.page}
              totalPage={t.totalPages}
              selectedPerpage={t.pageSize}
              onChangePerpage={(val) => t.setPageSize(val)}
              numberOnClick={(p) => t.setPage(p)}
              prevOnClick={() => t.setPage(Math.max(t.page - 1, 1))}
              nextOnClick={() => t.setPage(Math.min(t.page + 1, t.totalPages))}
            />
          </TableFooter>
        )}
      </Table>
    </div>
  );

  const cardsMarkup = (
    <div className="space-y-3 md:hidden">
      {t.loading &&
        Array.from({ length: skeletonCount }).map((_, ri) => (
          <div
            key={`csk-${ri}`}
            className="rounded-lg border border-slate-100 bg-white p-4"
            aria-hidden="true"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex items-center justify-between py-1.5"
              >
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ))}

      {!t.loading && t.error == null && t.data.length === 0 && (
        <div className="flex flex-col items-center gap-1 py-10 text-center text-slate-400">
          <Icon name="file-list-search" size={40} />
          <p className="text-sm">{emptyText}</p>
        </div>
      )}

      {!t.loading &&
        t.data.map((row, ri) => {
          const resolvedKey =
            rowKey != null ? rowKey(row, ri) : defaultRowKey(row, ri);
          const rowOpts = rowOptions?.(row, resolvedKey, ri);
          return (
            <Card
              key={resolvedKey}
              className={cn(
                onRowClick != null ? 'cursor-pointer' : undefined,
                rowOpts?.className
              )}
              onClick={
                onRowClick != null ? () => onRowClick(row, ri) : undefined
              }
            >
              <CardBody>
                {columns.map((col) => {
                  const value = getPath(row, col.key);
                  return (
                    <div
                      key={col.key}
                      className="flex items-start justify-between border-b border-slate-50 py-1.5 last:border-0"
                    >
                      <span className="text-xs font-medium text-slate-500">
                        {col.header ?? col.key}
                      </span>
                      <span className="ml-4 text-right text-sm text-slate-800">
                        {col.render != null ? (
                          col.render(value, row, ri)
                        ) : value == null || value === '' ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          String(value)
                        )}
                      </span>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          );
        })}
    </div>
  );

  if (respMode === 'cards') {
    return (
      <>
        {cardsMarkup}
        <div className="hidden md:block">{tableMarkup}</div>
      </>
    ) as ReactElement;
  }

  if (respMode === 'scroll') {
    return <div className="overflow-x-auto">{tableMarkup}</div>;
  }

  return tableMarkup;
};
