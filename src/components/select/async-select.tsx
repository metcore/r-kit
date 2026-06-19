import { useCallback, useEffect, useRef, useState } from 'react';
import type { SelectOption, SelectProps } from './type';
import { Select } from './select';

export interface AsyncLoadParams {
  search: string;
  page: number;
  signal: AbortSignal;
}

export interface AsyncLoadResult<Extra extends object> {
  options: SelectOption<Extra>[];
  hasMore?: boolean;
}

export type LoadOptionsFn<Extra extends object> = (
  params: AsyncLoadParams
) => Promise<AsyncLoadResult<Extra>>;

interface CacheEntry<Extra extends object> {
  options: SelectOption<Extra>[];
  hasMore: boolean;
  page: number;
}

export interface UseAsyncOptionsConfig<Extra extends object> {
  loadOptions: LoadOptionsFn<Extra>;
  enabled?: boolean;
  debounceMs?: number;
  cache?: boolean;
  minSearchLength?: number;
  onError?: (error: unknown) => void;
}

export interface UseAsyncOptionsResult<Extra extends object> {
  options: SelectOption<Extra>[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  error: unknown;
  search: string;
  setSearch: (term: string) => void;
  loadMore: () => void;
  reload: () => void;
  reset: () => void;
}

export function useAsyncOptions<Extra extends object = object>({
  loadOptions,
  enabled = true,
  debounceMs = 300,
  cache = true,
  minSearchLength = 0,
  onError,
}: UseAsyncOptionsConfig<Extra>): UseAsyncOptionsResult<Extra> {
  const [options, setOptions] = useState<SelectOption<Extra>[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const loadOptionsRef = useRef(loadOptions);
  const onErrorRef = useRef(onError);
  useEffect(() => {
    loadOptionsRef.current = loadOptions;
    onErrorRef.current = onError;
  });

  const cacheRef = useRef<Map<string, CacheEntry<Extra>>>(new Map());
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const stateRef = useRef({ options, page });
  useEffect(() => {
    stateRef.current = { options, page };
  }, [options, page]);

  const fetchPage = useCallback(
    async (pageToLoad: number, term: string, append: boolean) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const reqId = ++requestIdRef.current;

      if (append) setIsLoadingMore(true);
      else setIsLoading(true);
      setError(null);

      try {
        const res = await loadOptionsRef.current({
          search: term,
          page: pageToLoad,
          signal: controller.signal,
        });

        if (reqId !== requestIdRef.current) return;

        const nextOptions = append
          ? [...stateRef.current.options, ...res.options]
          : res.options;
        const nextHasMore = res.hasMore ?? false;
        setOptions(nextOptions);
        setHasMore(nextHasMore);
        setPage(pageToLoad);

        cacheRef.current.set(term, {
          options: nextOptions,
          hasMore: nextHasMore,
          page: pageToLoad,
        });
      } catch (err) {
        if (controller.signal.aborted || reqId !== requestIdRef.current) return;
        setError(err);
        onErrorRef.current?.(err);
      } finally {
        if (reqId === requestIdRef.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!enabled) return;

    if (search.length < minSearchLength) {
      setOptions([]);
      setHasMore(false);
      setPage(0);
      return;
    }

    const cached = cache ? cacheRef.current.get(search) : undefined;
    if (cached) {
      setOptions(cached.options);
      setHasMore(cached.hasMore);
      setPage(cached.page);
      return;
    }

    const delay = search === '' ? 0 : debounceMs;
    const timer = setTimeout(() => {
      void fetchPage(0, search, false);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, enabled, cache, debounceMs, minSearchLength, fetchPage]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) return;
    void fetchPage(stateRef.current.page + 1, search, true);
  }, [isLoading, isLoadingMore, hasMore, search, fetchPage]);

  const reload = useCallback(() => {
    cacheRef.current.delete(search);
    void fetchPage(0, search, false);
  }, [search, fetchPage]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    cacheRef.current.clear();
    setOptions([]);
    setHasMore(false);
    setPage(0);
    setError(null);
    setSearch('');
  }, []);

  return {
    options,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    search,
    setSearch,
    loadMore,
    reload,
    reset,
  };
}

export interface AsyncSelectProps<Extra extends object = object> extends Omit<
  SelectProps<Extra>,
  | 'options'
  | 'onSearchOptions'
  | 'onLoadMore'
  | 'isLoadingMore'
  | 'searchOptions'
  | 'renderOptions'
> {
  loadOptions: LoadOptionsFn<Extra>;
  debounceMs?: number;
  cache?: boolean;
  loadOnMount?: boolean;
  minSearchLength?: number;
  onError?: (error: unknown) => void;
}

export function AsyncSelect<Extra extends object = object>({
  loadOptions,
  debounceMs,
  cache,
  loadOnMount = false,
  minSearchLength,
  onError,
  onOpenChange,
  ...selectProps
}: AsyncSelectProps<Extra>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { onSearch } = selectProps;

  const enabled = loadOnMount || menuOpen;

  const { options, isLoading, isLoadingMore, hasMore, setSearch, loadMore } =
    useAsyncOptions<Extra>({
      loadOptions,
      enabled,
      debounceMs,
      cache,
      minSearchLength,
      onError,
    });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setMenuOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  const handleSearch = (e: string) => {
    setSearch(e);
    onSearch?.(e);
  };

  return (
    <Select<Extra>
      {...selectProps}
      options={options}
      filterOption={false as const}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      onLoadMore={hasMore ? loadMore : undefined}
      onSearch={handleSearch}
      onOpenChange={handleOpenChange}
    />
  );
}
