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
  } = cfg;

  // Filter keys + URL-sync config are fixed for the lifetime of the hook.
  const [filterKeys] = useState(() => Object.keys(cfg.defaultFilters ?? {}));
  const [urlSync] = useState(() => normalizeUrlSync(cfg.urlSync));

  // Seed initial state from the URL when sync is on, so the first fetch matches the link.
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUrl, setLastUrl] = useState('');

  const cfgRef = useRef(cfg);
  useEffect(() => {
    cfgRef.current = cfg;
  });

  // Debounce search inside the setter so URL/back-forward updates never reset the page.
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

  const refetch = useCallback(() => setReloadToken((token) => token + 1), []);

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
    const subscribe = urlSync.adapter.subscribe;
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
    const c = cfgRef.current;
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError(null);

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

    const run = async (): Promise<void> => {
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
        const pages = Math.max(1, Math.ceil(parsed.total / pageSize));
        setPage((prev) => (prev > pages ? pages : prev));
      } catch (err: unknown) {
        if (isAbortError(err) || !active) return;
        setData([]);
        setTotal(0);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (active) setLoading(false);
      }
    };

    void run();

    return () => {
      active = false;
      controller.abort();
    };
    // params/extraParams tracked via serialised keys; the rest comes from cfgRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    data,
    total,
    loading,
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
