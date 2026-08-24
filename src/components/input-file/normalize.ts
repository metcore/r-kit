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
  if (raw != null) {
    if (raw.includes('/')) return raw;
    const mapped = EXT_MIME[raw.toLowerCase()];
    if (mapped != null) return mapped;
  }
  return guessType(nameOrUrl);
};

const deriveNameFromUrl = (url: string): string => {
  try {
    const path = new URL(url, 'http://_').pathname;
    const last = path.split('/').filter(Boolean).pop();

    return last != null ? decodeURIComponent(last) : 'file';
  } catch {
    const clean = url.split('?')[0].split('#')[0];
    const last = clean.split('/').pop();

    return last != null && last !== '' ? last : 'file';
  }
};

const isFile = (v: unknown): v is File =>
  typeof File !== 'undefined' && v instanceof File;

const isNormalizedItem = (v: InputFileValue): v is FileItem =>
  typeof v === 'object' &&
  v !== null &&
  'preview' in v &&
  ('source' in v || 'file' in v || ('url' in v && 'id' in v));

const isRemoteInput = (v: InputFileValue): v is RemoteFile =>
  typeof v === 'object' &&
  v !== null &&
  !isFile(v) &&
  'url' in v &&
  typeof (v as RemoteFile).url === 'string';

export const normalizeEntry = (
  entry: InputFileValue,
  caches: NormalizeCaches
): FileItem | null => {
  if (isFile(entry)) {
    let id = caches.id.get(entry);
    if (id == null) {
      id = genId();
      caches.id.set(entry, id);
    }
    let preview = caches.url.get(entry);
    if (preview == null) {
      preview = URL.createObjectURL(entry);
      caches.url.set(entry, preview);
    }
    return {
      source: 'local',
      id,
      file: entry,
      preview,
      name: entry.name,
      type: coerceType(entry.type, entry.name),
      size: entry.size,
      customName: entry.name,
    };
  }

  if (isNormalizedItem(entry)) {
    const it = entry as Partial<FileItem> & {
      file?: File;
      url?: string;
      preview?: string;
      remoteId?: string | number;
    };
    const file = it.file;
    const url = it.url;
    const source = it.source ?? (file ? 'local' : 'remote');
    const name =
      it.name ?? file?.name ?? (url != null ? deriveNameFromUrl(url) : 'file');
    const type = coerceType(it.type ?? file?.type, name);
    const size = it.size ?? file?.size;
    const id = it.id ?? genId();

    if (source === 'local' && file) {
      if (caches.id.get(file) == null) caches.id.set(file, id);
      if (it.preview == null) caches.url.set(file, it.preview);
      return {
        ...(it as object),
        source: 'local',
        id,
        file,
        preview: it.preview as string,
        name,
        type,
        size,
      } as FileItem;
    }

    const resolvedUrl = url ?? (it.preview as string);
    return {
      ...(it as object),
      source: 'remote',
      id,
      remoteId: it.remoteId ?? (it.id as string | number | undefined),
      url: resolvedUrl,
      preview: resolvedUrl,
      name,
      type,
      size,
    } as FileItem;
  }

  if (isRemoteInput(entry)) {
    const name = entry.name ?? deriveNameFromUrl(entry.url);
    const id = entry.id !== undefined ? String(entry.id) : genId();
    return {
      source: 'remote',
      id,
      remoteId: entry.id,
      url: entry.url,
      preview: entry.url,
      name,
      type: coerceType(entry.type, name || entry.url),
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
): FileItem[] =>
  value
    .map((e) => normalizeEntry(e, caches))
    .filter((x): x is FileItem => x !== null);
