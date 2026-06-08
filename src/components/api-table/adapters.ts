import type { AxiosInstance } from 'axios';
import type {
  AdapterResponse,
  Fetcher,
  ParsedResponse,
  RequestAdapter,
  RowLike,
  UseApiTableConfig,
} from './types';
import { appendQuery, getPath } from './utils';

export function createFetchAdapter(fetcher?: Fetcher): RequestAdapter {
  const doFetch: Fetcher = fetcher ?? ((u, o) => fetch(u, o));
  return async ({ url, params, headers, signal }) => {
    const finalUrl = appendQuery(url, params);
    const res = await doFetch(finalUrl, { headers, signal });
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`.trim());
    }
    const data: unknown = await res.json();
    return {
      data,
      status: res.status,
      statusText: res.statusText,
      getHeader: (name) => res.headers.get(name),
    };
  };
}

function readAxiosHeader(headers: unknown, name: string): string | null {
  if (headers == null || typeof headers !== 'object') return null;
  const bag = headers as {
    get?: (n: string) => unknown;
  } & Record<string, unknown>;
  if (typeof bag.get === 'function') {
    const value = bag.get(name);
    return value == null ? null : String(value);
  }
  const value = bag[name] ?? bag[name.toLowerCase()];
  return value == null ? null : String(value);
}

export function createAxiosAdapter(instance: AxiosInstance): RequestAdapter {
  return async ({ url, params, headers, signal }) => {
    const res = await instance.get<unknown>(url, { params, headers, signal });
    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      getHeader: (name) => readAxiosHeader(res.headers, name),
    };
  };
}

export function isAbortError(err: unknown): boolean {
  if (typeof err !== 'object' || err === null) return false;
  const e = err as { name?: string; code?: string };
  return (
    e.name === 'AbortError' ||
    e.name === 'CanceledError' ||
    e.code === 'ERR_CANCELED'
  );
}

export function parseResponse<T extends RowLike>(
  res: AdapterResponse,
  cfg: UseApiTableConfig<T>,
  paths: { dataPath?: string; totalPath?: string; totalHeader?: string }
): ParsedResponse<T> {
  if (cfg.transformResponse != null) {
    const out = cfg.transformResponse(res.data, res);
    return {
      rows: out.rows,
      total: Number.isFinite(out.total) ? out.total : 0,
    };
  }

  const json = res.data;
  const obj: Record<string, unknown> =
    typeof json === 'object' && json !== null
      ? (json as Record<string, unknown>)
      : {};

  let rawRows: unknown;
  if (paths.dataPath != null) {
    rawRows = getPath(json, paths.dataPath);
  } else if (Array.isArray(json)) {
    rawRows = json;
  } else {
    rawRows = obj.data ?? obj.results ?? obj.items;
  }
  const rows: T[] = Array.isArray(rawRows) ? (rawRows as T[]) : [];

  let totalCount: number | undefined;
  if (paths.totalHeader != null) {
    const headerValue = res.getHeader(paths.totalHeader);
    if (headerValue != null) totalCount = Number(headerValue);
  }
  if (totalCount == null) {
    const rawTotal: unknown =
      paths.totalPath != null
        ? getPath(json, paths.totalPath)
        : (obj.total ?? obj.totalCount ?? obj.count ?? rows.length);
    totalCount = Number(rawTotal);
  }

  return { rows, total: Number.isFinite(totalCount) ? totalCount : 0 };
}
