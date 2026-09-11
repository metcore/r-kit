import type { FileItem, InputFileValue, RemoteFile } from './type';

export type NormalizeCaches = {
  id: WeakMap<File, string>;
  url: WeakMap<File, string>;
};

let __counter = 0;
export const genId = (): string => {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `f_${Date.now().toString(36)}_${(__counter++).toString(36)}`;
};

const EXT_MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  mp4: 'video/mp4',
  mkv: 'video/x-matroska',
  webm: 'video/webm',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const guessType = (nameOrUrl: string): string => {
  const ext = nameOrUrl
    .split('?')[0]
    .split('#')[0]
    .split('.')
    .pop()
    ?.toLowerCase();

  return ext != null ? (EXT_MIME[ext] ?? '') : '';
};

export const coerceType = (
  raw: string | undefined,
  nameOrUrl: string
): string => {
  if (raw != null && raw !== '') {
    if (raw.includes('/')) return raw;
    const mapped = EXT_MIME[raw.toLowerCase()];
    if (mapped != null) return mapped;
  }
  return guessType(nameOrUrl);
};

const resolveType = (
  raw: string | undefined,
  name: string,
  url?: string
): string => {
  const fromName = coerceType(raw, name);
  if (fromName !== '') return fromName;
  return url != null ? guessType(url) : '';
};

export const deriveNameFromUrl = (url: string): string => {
  try {
    const path = new URL(url, 'http://_').pathname;
    const last = path.split('/').filter(Boolean).pop();

    return last != null && last !== '' ? decodeURIComponent(last) : 'file';
  } catch {
    const clean = url.split('?')[0].split('#')[0];
    const last = clean.split('/').pop();

    return last != null && last !== '' ? last : 'file';
  }
};

/** Hash deterministik (djb2) supaya entry remote tanpa `id` tetap punya id stabil antar render. */
const hashString = (input: string): string => {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
};

const isFile = (v: unknown): v is File =>
  typeof File !== 'undefined' && v instanceof File;

type LooseItem = {
  id?: string | number;
  source?: 'local' | 'remote';
  file?: unknown;
  url?: unknown;
  preview?: unknown;
  name?: unknown;
  type?: unknown;
  size?: unknown;
  remoteId?: string | number;
};

const isNormalizedItem = (v: InputFileValue): v is FileItem => {
  if (typeof v !== 'object' || v === null || isFile(v)) return false;
  const o = v as LooseItem;
  if (o.source === 'local' || o.source === 'remote') return true;
  if (isFile(o.file)) return true;
  return 'preview' in o && ('file' in o || ('url' in o && 'id' in o));
};

const isRemoteInput = (v: InputFileValue): v is RemoteFile =>
  typeof v === 'object' &&
  v !== null &&
  !isFile(v) &&
  'url' in v &&
  typeof (v as RemoteFile).url === 'string';

const ensureLocalId = (
  file: File,
  caches: NormalizeCaches,
  preferred?: string
): string => {
  if (preferred != null && preferred !== '') {
    caches.id.set(file, preferred);
    return preferred;
  }
  const cached = caches.id.get(file);
  if (cached != null) return cached;

  const id = genId();
  caches.id.set(file, id);
  return id;
};

const ensureLocalPreview = (
  file: File,
  caches: NormalizeCaches,
  preferred?: unknown
): string => {
  if (typeof preferred === 'string' && preferred !== '') return preferred;

  const cached = caches.url.get(file);
  if (cached != null) return cached;

  const url = URL.createObjectURL(file);
  caches.url.set(file, url);
  return url;
};

const asString = (v: unknown): string | undefined =>
  typeof v === 'string' && v !== '' ? v : undefined;

const asNumber = (v: unknown): number | undefined =>
  typeof v === 'number' && Number.isFinite(v) ? v : undefined;

export const normalizeEntry = (
  entry: InputFileValue,
  caches: NormalizeCaches,
  index = 0
): FileItem | null => {
  if (isFile(entry)) {
    return {
      source: 'local',
      id: ensureLocalId(entry, caches),
      file: entry,
      preview: ensureLocalPreview(entry, caches),
      name: entry.name,
      type: coerceType(entry.type, entry.name),
      size: entry.size,
      customName: entry.name,
    };
  }

  if (isNormalizedItem(entry)) {
    const it = entry as unknown as LooseItem;
    const file = isFile(it.file) ? it.file : undefined;
    const url = asString(it.url);
    const source = it.source ?? (file ? 'local' : 'remote');
    const name =
      asString(it.name) ??
      file?.name ??
      (url != null ? deriveNameFromUrl(url) : 'file');
    const type = resolveType(asString(it.type) ?? file?.type, name, url);
    const size = asNumber(it.size) ?? file?.size;

    if (source === 'local' && file) {
      const id =
        it.id != null && it.id !== ''
          ? ensureLocalId(file, caches, String(it.id))
          : ensureLocalId(file, caches);

      return {
        ...(it as object),
        source: 'local',
        id,
        file,
        preview: ensureLocalPreview(file, caches, it.preview),
        name,
        type,
        size,
        url: undefined,
        remoteId: undefined,
      } as FileItem;
    }

    const resolvedUrl = url ?? asString(it.preview);
    if (resolvedUrl == null) {
      if (typeof console !== 'undefined') {
        console.warn(
          '[InputFile] `value` entry tanpa file/url/preview diabaikan:',
          entry
        );
      }
      return null;
    }

    return {
      ...(it as object),
      source: 'remote',
      id:
        it.id != null && it.id !== ''
          ? String(it.id)
          : `r_${index}_${hashString(resolvedUrl)}`,
      remoteId: it.remoteId ?? it.id,
      url: resolvedUrl,
      preview: resolvedUrl,
      name,
      type,
      size,
      file: undefined,
    } as FileItem;
  }

  if (isRemoteInput(entry)) {
    const name = entry.name ?? deriveNameFromUrl(entry.url);
    const id =
      entry.id != null && entry.id !== ''
        ? String(entry.id)
        : `r_${index}_${hashString(entry.url)}`;

    return {
      source: 'remote',
      id,
      remoteId: entry.id,
      url: entry.url,
      preview: entry.url,
      name,
      type: resolveType(entry.type, name, entry.url),
      size: entry.size,
      customName: name,
    };
  }

  if (typeof console !== 'undefined') {
    console.warn('[InputFile] Unsupported `value` entry ignored:', entry);
  }
  return null;
};

export const normalizeValue = (
  value: InputFileValue[],
  caches: NormalizeCaches
): FileItem[] => {
  const seen = new Set<string>();
  const out: FileItem[] = [];

  value.forEach((entry, index) => {
    const item = normalizeEntry(entry, caches, index);
    if (item == null) return;

    let id = item.id;
    if (seen.has(id)) {
      let n = 2;
      while (seen.has(`${id}#${n}`)) n++;
      id = `${id}#${n}`;
      out.push({ ...item, id } as FileItem);
    } else {
      out.push(item);
    }
    seen.add(id);
  });

  return out;
};
