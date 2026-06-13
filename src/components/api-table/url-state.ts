import type {
  Filters,
  SortOrder,
  TableUrlState,
  UrlKeys,
  UrlStateAdapter,
  UrlSync,
  UrlSyncOptions,
} from './types';

export const defaultUrlKeys: UrlKeys = {
  page: 'page',
  perPage: 'perPage',
  search: 'q',
  sortBy: 'sortBy',
  sortOrder: 'order',
};

export interface ResolvedUrlSync {
  enabled: boolean;
  namespace: string;
  keys: UrlKeys;
  adapter: UrlStateAdapter;
}

/** Default URL adapter backed by window.history (replaceState) — works in any browser SPA. */
export function createWindowUrlState(): UrlStateAdapter {
  return {
    get: () =>
      new URLSearchParams(
        typeof window === 'undefined' ? '' : window.location.search
      ),
    set: (params) => {
      if (typeof window === 'undefined') return;
      const qs = params.toString();
      const next = `${window.location.pathname}${qs === '' ? '' : `?${qs}`}${
        window.location.hash
      }`;
      window.history.replaceState(window.history.state, '', next);
    },
    subscribe: (onChange) => {
      if (typeof window === 'undefined') return () => undefined;
      window.addEventListener('popstate', onChange);
      return () => window.removeEventListener('popstate', onChange);
    },
  };
}

export function normalizeUrlSync(sync: UrlSync | undefined): ResolvedUrlSync {
  const opts: UrlSyncOptions =
    typeof sync === 'object' && sync !== null ? sync : {};
  let enabled: boolean;
  if (typeof sync === 'boolean') enabled = sync;
  else if (sync == null) enabled = false;
  else enabled = opts.enabled ?? true;

  return {
    enabled,
    namespace: opts.namespace ?? '',
    keys: { ...defaultUrlKeys, ...opts.keys },
    adapter: opts.adapter ?? createWindowUrlState(),
  };
}

function nsKey(namespace: string, key: string): string {
  return namespace === '' ? key : `${namespace}_${key}`;
}

function toPositiveInt(value: string | null, fallback: number): number {
  if (value == null) return fallback;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

/** Read table state from the URL. Unknown/invalid params fall back to defaults. */
export function readTableUrlState(
  resolved: ResolvedUrlSync,
  opts: { pageSize: number; filterKeys: string[] }
): TableUrlState {
  const { adapter, keys, namespace } = resolved;
  const sp = adapter.get();

  const page = toPositiveInt(sp.get(nsKey(namespace, keys.page)), 1);
  const pageSize = toPositiveInt(
    sp.get(nsKey(namespace, keys.perPage)),
    opts.pageSize
  );
  const search = sp.get(nsKey(namespace, keys.search)) ?? '';

  const sortByRaw = sp.get(nsKey(namespace, keys.sortBy));
  const sortOrderRaw = sp.get(nsKey(namespace, keys.sortOrder));
  const order: SortOrder =
    sortOrderRaw === 'asc' || sortOrderRaw === 'desc' ? sortOrderRaw : null;
  const by =
    sortByRaw != null && sortByRaw !== '' && order != null ? sortByRaw : null;

  const filters: Filters = {};
  for (const key of opts.filterKeys) {
    filters[key] = sp.get(nsKey(namespace, key)) ?? '';
  }

  return {
    page,
    pageSize,
    search,
    sort: { by, order: by != null ? order : null },
    filters,
  };
}

function setOrDelete(
  sp: URLSearchParams,
  key: string,
  value: string | null
): void {
  if (value == null || value === '') sp.delete(key);
  else sp.set(key, value);
}

/** Write table state to the URL, preserving other (non-table) params. Defaults are omitted. */
export function writeTableUrlState(
  resolved: ResolvedUrlSync,
  state: TableUrlState,
  opts: { pageSize: number }
): void {
  const { adapter, keys, namespace } = resolved;
  const sp = new URLSearchParams(adapter.get().toString());

  setOrDelete(
    sp,
    nsKey(namespace, keys.page),
    state.page > 1 ? String(state.page) : null
  );
  setOrDelete(
    sp,
    nsKey(namespace, keys.perPage),
    state.pageSize !== opts.pageSize ? String(state.pageSize) : null
  );
  setOrDelete(
    sp,
    nsKey(namespace, keys.search),
    state.search !== '' ? state.search : null
  );
  setOrDelete(sp, nsKey(namespace, keys.sortBy), state.sort.by);
  setOrDelete(
    sp,
    nsKey(namespace, keys.sortOrder),
    state.sort.by != null ? state.sort.order : null
  );
  for (const [key, value] of Object.entries(state.filters)) {
    setOrDelete(sp, nsKey(namespace, key), value !== '' ? value : null);
  }

  adapter.set(sp);
}
