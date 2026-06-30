import type { Key, ReactNode } from 'react';
import type { AxiosInstance } from 'axios';

export type SortOrder = 'asc' | 'desc' | null;
export type PageMode = 'page' | 'offset';
export type RowLike = object;
export type QueryValue = string | number | boolean;
export type QueryParams = Record<string, QueryValue>;
export type Filters = Record<string, string>;

export interface ParamMap {
  page?: string;
  offset?: string;
  pageSize?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface BuildUrlContext {
  url: string;
  page: number;
  pageSize: number;
  offset: number;
  search: string;
  sortBy: string | null;
  sortOrder: SortOrder;
  filters: Filters;
}

export interface ParsedResponse<T> {
  rows: T[];
  total: number;
}

export interface AdapterResponse {
  data: unknown;
  status: number;
  statusText: string;
  getHeader: (name: string) => string | null;
}

export interface AdapterRequest {
  url: string;
  params: QueryParams;
  headers?: Record<string, string>;
  signal: AbortSignal;
}

export type RequestAdapter = (req: AdapterRequest) => Promise<AdapterResponse>;

export type Fetcher = (
  url: string,
  options: { headers?: Record<string, string>; signal: AbortSignal }
) => Promise<Response>;

export interface UrlStateAdapter {
  get: () => URLSearchParams;
  set: (params: URLSearchParams) => void;
  subscribe?: (onChange: () => void) => () => void;
}

export interface UrlKeys {
  page: string;
  perPage: string;
  search: string;
  sortBy: string;
  sortOrder: string;
}

export interface UrlSyncOptions {
  enabled?: boolean;
  namespace?: string;
  adapter?: UrlStateAdapter;
  keys?: Partial<UrlKeys>;
}

export type UrlSync = boolean | UrlSyncOptions;

export interface TableUrlState {
  page: number;
  pageSize: number;
  search: string;
  sort: { by: string | null; order: SortOrder };
  filters: Filters;
}
export interface UseApiTableConfig<
  T extends RowLike = RowLike,
  F extends Record<keyof F, string> = Filters,
> {
  url: string;
  pageMode?: PageMode;
  defaultPageSize?: number;
  searchDebounce?: number;
  params?: ParamMap;
  extraParams?: QueryParams;
  defaultFilters?: F;
  headers?: Record<string, string>;
  dataPath?: string;
  totalPath?: string;
  totalHeader?: string;

  axiosInstance?: AxiosInstance;
  adapter?: RequestAdapter;
  fetcher?: Fetcher;

  urlSync?: UrlSync;
  enabled?: boolean;
  keepPreviousData?: boolean;
  retry?: boolean | number;
  retryDelay?: number;

  buildUrl?: (ctx: BuildUrlContext) => string;
  transformParams?: (params: QueryParams, ctx: BuildUrlContext) => QueryParams;
  transformResponse?: (
    data: unknown,
    res: AdapterResponse
  ) => ParsedResponse<T>;

  onRequest?: (url: string) => void;
  onSuccess?: (data: T[], total: number) => void;
  onError?: (error: Error) => void;
}
export interface UseApiTableResult<
  T extends RowLike = RowLike,
  F extends Record<keyof F, string> = Filters,
> {
  data: T[];
  total: number;
  loading: boolean;
  isFetching: boolean;
  error: Error | null;
  lastUrl: string;
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  sort: { by: string | null; order: SortOrder };
  toggleSort: (key: string) => void;
  filters: F;
  setFilter: (key: keyof F & string, value: string) => void;
  setFilters: (next: Partial<F>) => void;
  refetch: () => void;
}

export type HideBelow = 'sm' | 'md' | 'lg' | 'xl';

export interface ApiTableColumn<T extends RowLike = RowLike> {
  key: string;
  header?: ReactNode;
  sortable?: boolean;
  sortKey?: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (value: unknown, row: T, index: number) => ReactNode;
  className?: string;
  hideBelow?: HideBelow;
}

export interface RowOption<T extends RowLike = RowLike> {
  label: ReactNode;
  icon?: string;
  onClick: (row: T, index: number) => void;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
  variant?: 'default' | 'danger';
}

export type ResponsiveMode = 'scroll' | 'cards';
export interface RowOptionResult {
  className?: string;
}

export interface ApiTableProps<
  T extends RowLike = RowLike,
  F extends Record<keyof F, string> = Filters,
> {
  t: UseApiTableResult<T, F>;
  columns: ApiTableColumn<T>[];
  emptyText?: ReactNode;
  rowKey?: (row: T, index: number) => Key;
  onRowClick?: (row: T, index: number) => void;
  renderEmptyData?: ReactNode;
  loadingRowCount?: number;
  rowOptions?: (data: T, key: Key, index: number) => RowOptionResult;
  rowOptionsLabel?: ReactNode;
  responsive?: boolean | ResponsiveMode;
  showPagination?: boolean;
  showFooter?: boolean;
}
