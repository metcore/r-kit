import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createAxiosAdapter,
  createFetchAdapter,
  isAbortError,
  parseResponse,
} from './adapters';
import type {
  BuildUrlContext,
  Filters,
  QueryParams,
  RequestAdapter,
  RowLike,
  SortOrder,
  TableUrlState,
  UseApiTableConfig,
  UseApiTableResult,
} from './types';
import {
  normalizeUrlSync,
  readTableUrlState,
  writeTableUrlState,
} from './url-state';
import { appendQuery } from './utils';

function cancellableSleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

export function useApiTable<
  T extends RowLike = RowLike,
  F extends Record<keyof F, string> = Filters,
>(cfg: UseApiTableConfig<T, F>): UseApiTableResult<T, F> {
  const {
    url,
    pageMode = 'page',
    defaultPageSize = 10,
    searchDebounce = 350,
    params,
    extraParams,
    dataPath,
    totalPath,
    totalHeader,
    enabled = true,
    keepPreviousData = true,
    retry = 0,
    retryDelay = 500,
  } = cfg;

  const maxRetries =
    typeof retry === 'boolean' ? (retry ? 3 : 0) : Math.max(0, retry);

  const [filterKeys] = useState(() => Object.keys(cfg.defaultFilters ?? {}));
  const [urlSync] = useState(() => normalizeUrlSync(cfg.urlSync));

  const [initial] = useState<TableUrlState>(() =>
    urlSync.enabled
      ? readTableUrlState(urlSync, { pageSize: defaultPageSize, filterKeys })
      : {
          page: 1,
          pageSize: defaultPageSize,
          search: '',
          sort: { by: null, order: null },
          filters: (cfg.defaultFilters ?? {}) as Filters,
        }
  );

  const [page, setPage] = useState(initial.page);
  const [pageSize, setPageSizeRaw] = useState(initial.pageSize);
  const [searchValue, setSearchValueRaw] = useState(initial.search);
  const [debouncedSearch, setDebouncedSearch] = useState(initial.search);
  const [sort, setSort] = useState<{ by: string | null; order: SortOrder }>(
    initial.sort
  );
  const [filters, setFiltersRaw] = useState<Filters>(initial.filters);
  const [reloadToken, setReloadToken] = useState(0);

  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);
  const [lastUrl, setLastUrl] = useState('');

  const cfgRef = useRef(cfg);
  useEffect(() => {
    cfgRef.current = cfg;
  });

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (searchTimer.current != null) clearTimeout(searchTimer.current);
    },
    []
  );

  const setSearchValue = useCallback(
    (value: string) => {
      setSearchValueRaw(value);
      if (searchTimer.current != null) clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => {
        setDebouncedSearch(value);
        setPage(1);
      }, searchDebounce);
    },
    [searchDebounce]
  );

  const setPageSize = useCallback((size: number) => {
    setPageSizeRaw(size);
    setPage(1);
  }, []);

  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev.by !== key) return { by: key, order: 'asc' };
      if (prev.order === 'asc') return { by: key, order: 'desc' };
      return { by: null, order: null };
    });
    setPage(1);
  }, []);

  const setFilter = useCallback((key: keyof F & string, value: string) => {
    setFiltersRaw((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const setFilters = useCallback((next: Partial<F>) => {
    setFiltersRaw((prev) => ({ ...prev, ...(next as Filters) }));
    setPage(1);
  }, []);

  const refetch = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    if (!urlSync.enabled) return;
    writeTableUrlState(
      urlSync,
      { page, pageSize, search: debouncedSearch, sort, filters },
      { pageSize: defaultPageSize }
    );
  }, [
    urlSync,
    page,
    pageSize,
    debouncedSearch,
    sort,
    filters,
    defaultPageSize,
  ]);

  useEffect(() => {
    const { subscribe } = urlSync.adapter;
    if (!urlSync.enabled || subscribe == null) return;
    return subscribe(() => {
      const next = readTableUrlState(urlSync, {
        pageSize: defaultPageSize,
        filterKeys,
      });
      setPage(next.page);
      setPageSizeRaw(next.pageSize);
      setSearchValueRaw(next.search);
      setDebouncedSearch(next.search);
      setSort(next.sort);
      setFiltersRaw(next.filters);
    });
  }, [urlSync, defaultPageSize, filterKeys]);

  const paramsKey = JSON.stringify(params ?? {});
  const extraKey = JSON.stringify(extraParams ?? {});

  useEffect(() => {
    if (!enabled) {
      setIsFetching(false);
      return;
    }

    const c = cfgRef.current;
    const controller = new AbortController();
    let active = true;

    setIsFetching(true);
    setError(null);

    if (!keepPreviousData) {
      setData([]);
      setTotal(0);
    }

    const offset = (page - 1) * pageSize;
    const ctx: BuildUrlContext = {
      url,
      page,
      pageSize,
      offset,
      search: debouncedSearch,
      sortBy: sort.by,
      sortOrder: sort.order,
      filters,
    };

    let requestUrl: string;
    let requestParams: QueryParams;

    if (typeof c.buildUrl === 'function') {
      requestUrl = c.buildUrl(ctx);
      requestParams = {};
    } else {
      requestUrl = url;
      const p = c.params ?? {};
      const qp: QueryParams = {};

      if (pageMode === 'offset') qp[p.offset ?? 'offset'] = offset;
      else qp[p.page ?? 'page'] = page;

      qp[p.pageSize ?? 'limit'] = pageSize;

      if (debouncedSearch !== '') qp[p.search ?? 'search'] = debouncedSearch;

      if (sort.by != null && sort.order != null) {
        qp[p.sortBy ?? 'sortBy'] = sort.by;
        qp[p.sortOrder ?? 'order'] = sort.order;
      }

      Object.assign(qp, c.extraParams ?? {});

      for (const [fk, fv] of Object.entries(filters)) {
        if (fv !== '') qp[fk] = fv;
      }

      requestParams =
        c.transformParams != null ? c.transformParams(qp, ctx) : qp;
    }

    const displayUrl = appendQuery(requestUrl, requestParams);
    setLastUrl(displayUrl);
    c.onRequest?.(displayUrl);

    const adapter: RequestAdapter =
      c.adapter ??
      (c.axiosInstance != null
        ? createAxiosAdapter(c.axiosInstance)
        : createFetchAdapter(c.fetcher));

    const run = async (attempt: number): Promise<void> => {
      try {
        const res = await adapter({
          url: requestUrl,
          params: requestParams,
          headers: c.headers,
          signal: controller.signal,
        });

        if (!active) return;

        const parsed = parseResponse<T>(res, c, {
          dataPath,
          totalPath,
          totalHeader,
        });

        setData(parsed.rows);
        setTotal(parsed.total);
        setIsFetching(false);

        const pages = Math.max(1, Math.ceil(parsed.total / pageSize));
        setPage((prev) => (prev > pages ? pages : prev));

        c.onSuccess?.(parsed.rows, parsed.total);
      } catch (err: unknown) {
        if (isAbortError(err) || !active) return;

        if (attempt < maxRetries) {
          const delay = retryDelay * Math.pow(2, attempt);
          try {
            await cancellableSleep(delay, controller.signal);
          } catch {
            return;
          }
          if (!active) return;
          return run(attempt + 1);
        }

        if (!keepPreviousData) {
          setData([]);
          setTotal(0);
        }

        const finalError = err instanceof Error ? err : new Error(String(err));
        setError(finalError);
        setIsFetching(false);
        c.onError?.(finalError);
      }
    };

    void run(0);

    return () => {
      active = false;
      controller.abort();
    };
  }, [
    url,
    page,
    pageSize,
    debouncedSearch,
    sort.by,
    sort.order,
    filters,
    pageMode,
    paramsKey,
    extraKey,
    dataPath,
    totalPath,
    totalHeader,
    reloadToken,
    enabled,
    keepPreviousData,
    maxRetries,
    retryDelay,
  ]);

  const loading = isFetching && data.length === 0 && error == null;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    data,
    total,
    loading,
    isFetching,
    error,
    lastUrl,
    page,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    searchValue,
    setSearchValue,
    sort,
    toggleSort,
    filters: filters as F,
    setFilter,
    setFilters,
    refetch,
  };
}
