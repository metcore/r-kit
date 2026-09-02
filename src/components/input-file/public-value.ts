import { deriveNameFromUrl } from './normalize';
import { isLocalFile, isRemoteFile } from './type';
import type {
  FileItem,
  InputFileMode,
  InputFileValue,
  RemoteFile,
  UploadFileEntry,
  UploadFileValueInput,
  UploadedFileId,
  UploadedFileValue,
} from './type';
import type { FileUploadState } from './use-input-file';

/** Semua bentuk `value` publik yang mungkin, tanpa `any`. */
export type PublicInputFileValue =
  | File
  | File[]
  | UploadFileValueInput
  | UploadFileValueInput[]
  | null
  | undefined;

/** internal id -> id publik apa adanya dari `value` (bisa number, bisa null). */
export type PublicIdMap = Map<string, UploadedFileId>;

export const isFileInstance = (v: unknown): v is File =>
  typeof File !== 'undefined' && v instanceof File;

const isValidPublicId = (v: unknown): v is UploadedFileId =>
  v == null || typeof v === 'string' || typeof v === 'number';

/**
 * Entry dianggap bisa ditampilkan kalau punya `url`. Id dan nama boleh tidak ada.
 * Longgar di sisi masuk supaya payload API bisa dipakai apa adanya; ketat di sisi
 * keluar (selalu `{ id, url, original_name }`).
 */
export const isUploadFileEntry = (v: unknown): v is UploadFileEntry => {
  if (typeof v !== 'object' || v === null || isFileInstance(v)) return false;
  const o = v as UploadFileEntry;
  return typeof o.url === 'string' && o.url !== '';
};

/** @deprecated pakai `isUploadFileEntry`. */
export const isUploadedFileValue = isUploadFileEntry;

const firstString = (...values: unknown[]): string | undefined => {
  for (const value of values) {
    if (typeof value === 'string' && value !== '') return value;
  }
  return undefined;
};

const resolveDisplayName = (entry: UploadFileEntry): string =>
  firstString(entry.original_name, entry.name, entry.file_name) ??
  deriveNameFromUrl(entry.url);

const publicIdOfEntry = (entry: UploadFileEntry): UploadedFileId => {
  if (!isValidPublicId(entry.id)) {
    if (typeof console !== 'undefined') {
      console.warn(
        '[InputFile] `id` pada value harus string, number, atau null. Diabaikan:',
        entry.id
      );
    }
    return null;
  }
  return entry.id ?? null;
};

const internalIdOfEntry = (entry: UploadFileEntry, index: number): string => {
  const id = publicIdOfEntry(entry);
  return id == null || id === ''
    ? `__no_id__:${index}:${entry.url}`
    : String(id);
};

const asEntries = (
  multiple: boolean,
  value: PublicInputFileValue
): unknown[] => {
  if (value == null) return [];
  if (multiple) return Array.isArray(value) ? value : [];
  return Array.isArray(value) ? value.slice(0, 1) : [value];
};

export const toInternalValue = (
  mode: InputFileMode,
  multiple: boolean,
  value: PublicInputFileValue
): InputFileValue[] => {
  const entries = asEntries(multiple, value);

  if (mode === 'file') {
    return entries.filter(isFileInstance);
  }

  const out: RemoteFile[] = [];
  entries.forEach((entry, index) => {
    if (typeof entry === 'string') return;

    if (!isUploadFileEntry(entry)) {
      if (typeof console !== 'undefined') {
        console.warn(
          '[InputFile] Entry `value` tanpa `url` yang valid diabaikan:',
          entry
        );
      }
      return;
    }

    out.push({
      id: internalIdOfEntry(entry, index),
      url: entry.url,
      name: resolveDisplayName(entry),
    });
  });
  return out;
};

export const reservedIdsFrom = (
  mode: InputFileMode,
  multiple: boolean,
  value: PublicInputFileValue
): Exclude<UploadedFileId, null>[] => {
  if (mode !== 'uploadFile') return [];
  const entries = asEntries(multiple, value);

  if (!multiple) {
    const entry = entries[0];
    if (typeof entry === 'string' && entry !== '') return [entry];
    if (isUploadFileEntry(entry)) {
      const id = publicIdOfEntry(entry);
      if (id != null && id !== '') return [id];
    }
    return [];
  }

  return entries.filter(
    (entry): entry is string => typeof entry === 'string' && entry !== ''
  );
};

export const publicIdMapFrom = (
  mode: InputFileMode,
  multiple: boolean,
  value: PublicInputFileValue
): PublicIdMap => {
  const map: PublicIdMap = new Map();
  if (mode !== 'uploadFile') return map;

  asEntries(multiple, value).forEach((entry, index) => {
    if (typeof entry === 'string' || !isUploadFileEntry(entry)) return;
    map.set(internalIdOfEntry(entry, index), publicIdOfEntry(entry));
  });
  return map;
};

export const toFileValue = (items: FileItem[]): File[] =>
  items.filter(isLocalFile).map((item) => item.file);

export const toUploadedValue = (
  items: FileItem[],
  uploadState: Record<string, FileUploadState>,
  reservedIds: Exclude<UploadedFileId, null>[],
  publicIds: PublicIdMap
): UploadedFileValue[] => {
  const out: UploadedFileValue[] = [];
  let newFileIndex = 0;

  items.forEach((item) => {
    const isNew = isLocalFile(item) && !publicIds.has(item.id);

    let id: UploadedFileId;
    if (isNew) {
      id = reservedIds[newFileIndex] ?? null;
      newFileIndex += 1;
    } else {
      id = publicIds.get(item.id) ?? null;
    }

    const url = isRemoteFile(item)
      ? item.url
      : (uploadState[item.id]?.uploadedUrl ?? '');
    if (url === '') return;

    out.push({ id, url, original_name: item.name });
  });

  return out;
};

/* ------------------------------------------------------------------ */
/* Tanda tangan untuk perbandingan tanpa deep-equal manual             */
/* ------------------------------------------------------------------ */

export const signatureOfUploaded = (list: UploadedFileValue[]): string =>
  list.map((v) => `${v.id ?? ''}|${v.url}|${v.original_name}`).join('~');

export const signatureOfFiles = (list: File[]): string =>
  list.map((f) => `${f.name}|${f.size}|${f.lastModified}`).join('~');

/** Deteksi "value dari luar berubah" — termasuk id cadangan berupa string. */
export const signatureOfIncoming = (
  mode: InputFileMode,
  multiple: boolean,
  value: PublicInputFileValue
): string => {
  const entries = asEntries(multiple, value);
  if (mode === 'file') return signatureOfFiles(entries.filter(isFileInstance));

  return entries
    .map((entry) => {
      if (typeof entry === 'string') return `reserved:${entry}`;
      if (isUploadFileEntry(entry)) {
        const id = publicIdOfEntry(entry) ?? '';
        return `${id}|${entry.url}|${resolveDisplayName(entry)}`;
      }
      return '?';
    })
    .join('~');
};

export const signatureOfSeededItems = (
  mode: InputFileMode,
  multiple: boolean,
  value: PublicInputFileValue
): string => {
  const entries = asEntries(multiple, value);
  if (mode === 'file') return signatureOfFiles(entries.filter(isFileInstance));

  const seeded: UploadedFileValue[] = [];
  entries.forEach((entry) => {
    if (typeof entry === 'string' || !isUploadFileEntry(entry)) return;
    seeded.push({
      id: publicIdOfEntry(entry),
      url: entry.url,
      original_name: resolveDisplayName(entry),
    });
  });
  return signatureOfUploaded(seeded);
};
