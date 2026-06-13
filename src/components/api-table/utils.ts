import type { QueryValue } from './types';

export function getPath(obj: unknown, path?: string): unknown {
  if (path == null) return obj;
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== 'object') return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

export function appendQuery(
  baseUrl: string,
  params: Record<string, QueryValue | null | undefined>
): string {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    usp.append(k, String(v));
  });
  const qs = usp.toString();
  if (!qs) return baseUrl;
  return baseUrl + (baseUrl.includes('?') ? '&' : '?') + qs;
}
