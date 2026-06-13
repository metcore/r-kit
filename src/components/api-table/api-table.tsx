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
import type { ApiTableProps, Filters, RowLike } from './types';
import { getPath } from './utils';

function defaultRowKey(row: RowLike, index: number): Key {
  const rowId = (row as { id?: Key }).id;
  return rowId ?? index;
}

export const ApiTable = <
  T extends RowLike = RowLike,
  F extends Filters = Filters,
>({
  t,
  columns,
  emptyText = 'No data found.',
  rowKey,
  onRowClick,
  renderEmptyData,
}: ApiTableProps<T, F>): ReactElement => {
  const colCount = columns.length;
  const firstLoad = t.loading && t.data.length === 0 && t.error == null;

  const alignCls: Record<'left' | 'center' | 'right', string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div>
      <Table className="w-full table-auto" variant="wrapped-row-bordered">
        <TableHead>
          <TableRow isHeader>
            {columns.map((col) => {
              const sortKey = col.sortKey ?? col.key;
              const isActive = col.sortable === true && t.sort.by === sortKey;
              const alignClass =
                col.align != null ? alignCls[col.align] : 'text-left';
              return (
                <TableCellHead
                  key={col.key}
                  className={alignClass}
                  sortable={col.sortable}
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
                      <Icon name="sort-vertical" size={16} />
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

          {firstLoad &&
            Array.from({ length: Math.min(t.pageSize, 8) }).map((_, ri) => (
              <TableRow key={`sk-${ri}`}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <div className="h-3.5 w-32 animate-pulse rounded bg-slate-100" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
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

          {t.error == null &&
            t.data.map((row, ri) => (
              <TableRow
                key={rowKey != null ? rowKey(row, ri) : defaultRowKey(row, ri)}
                onClick={
                  onRowClick != null ? () => onRowClick(row, ri) : undefined
                }
                className={onRowClick != null ? 'cursor-pointer' : undefined}
              >
                {columns.map((col) => {
                  const value = getPath(row, col.key);
                  const alignClass =
                    col.align != null ? alignCls[col.align] : 'text-left';
                  return (
                    <TableCell
                      key={col.key}
                      className={`${alignClass} ${col.className ?? ''}`.trim()}
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
            ))}
        </TableBody>

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
      </Table>
    </div>
  );
};
