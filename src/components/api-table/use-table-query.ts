import { useSearchParams } from 'react-router-dom';

export interface TableQueryState {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
}

export function useTableQuery(tableId: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key: string) => searchParams.get(`${tableId}_${key}`);

  const set = (key: string, value?: string | number | null) => {
    const next = new URLSearchParams(searchParams);

    const paramKey = `${tableId}_${key}`;

    if (value === undefined || value === null || value === '') {
      next.delete(paramKey);
    } else {
      next.set(paramKey, String(value));
    }

    setSearchParams(next, {
      replace: true,
    });
  };

  return {
    page: Number(get('page') ?? 1),
    pageSize: Number(get('pageSize') ?? 10),
    search: get('search') ?? '',
    sortBy: get('sortBy'),
    sortOrder: (get('sortOrder') as 'asc' | 'desc' | null) ?? null,
    setPage: (v: number) => set('page', v),
    setPageSize: (v: number) => set('pageSize', v),
    setSearch: (v: string) => set('search', v),
    setSortBy: (v: string | null) => set('sortBy', v),
    setSortOrder: (v: string | null) => set('sortOrder', v),
  };
}

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);

export function getPageItems(
  current: number,
  totalPages: number
): (number | '…')[] {
  if (totalPages <= 1) return [1];
  const delta = 1;
  const left = Math.max(2, current - delta);
  const right = Math.min(totalPages - 1, current + delta);
  const out: (number | '…')[] = [1];
  if (left > 2) out.push('…');
  for (let i = left; i <= right; i += 1) out.push(i);
  if (right < totalPages - 1) out.push('…');
  out.push(totalPages);
  return out;
}
