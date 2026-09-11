import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { isLocalFile } from './type';
import type {
  FileItem,
  InputFileProps,
  InputFileValue,
  UploadedFile,
} from './type';
import {
  coerceType,
  genId,
  normalizeEntry,
  normalizeValue,
  type NormalizeCaches,
} from './normalize';

export type FileUploadState = Pick<
  FileItem,
  'uploadStatus' | 'hint' | 'errorMessage' | 'uploadedUrl'
>;
export type UseInputFileOptions = Pick<
  InputFileProps,
  | 'value'
  | 'onChange'
  | 'accept'
  | 'maxSize'
  | 'maxFiles'
  | 'multiple'
  | 'disabled'
  | 'uploadConfig'
  | 'onUploadSuccess'
  | 'onRemoveFile'
  | 'onClear'
  | 'errorMessage'
  | 'maxSizeErrorMessage'
  | 'maxFilesErrorMessage'
  | 'useCustomName'
  | 'allowCustomName'
>;

/**
 * Saat `multiple === false`, pilihan/drop baru MENGGANTI file yang ada
 * (sama seperti perilaku native `<input type="file">`).
 * Set ke `false` kalau mau perilaku lama (menumpuk terus).
 */
const SINGLE_SELECTION_REPLACES = true;

const defaultExtractUrl = (res: unknown): string => {
  if (
    res !== null &&
    typeof res === 'object' &&
    'url' in res &&
    typeof (res as Record<string, unknown>).url === 'string'
  ) {
    return (res as Record<string, unknown>).url as string;
  }
  return '';
};

const matchesAccept = (file: File, accept: string): boolean => {
  const rules = accept
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t !== '');

  if (rules.length === 0) return true;

  return rules.some((rule) => {
    if (rule === '*' || rule === '*/*' || rule === '.*') return true;
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule);
    if (rule.endsWith('/*')) {
      const baseType = rule.slice(0, -2);
      return file.type.toLowerCase().startsWith(`${baseType}/`);
    }
    return file.type.toLowerCase() === rule;
  });
};

export function useInputFile(opts: UseInputFileOptions = {}) {
  const {
    value,
    onChange,
    accept,
    maxSize,
    maxFiles,
    multiple,
    disabled = false,
    uploadConfig,
    onUploadSuccess,
    onRemoveFile,
    onClear,
    errorMessage,
    maxSizeErrorMessage,
    maxFilesErrorMessage,
    useCustomName,
    allowCustomName,
  } = opts;

  // `multiple` sengaja tri-state: undefined = tidak dibatasi (dipakai hook standalone),
  // false = benar-benar single file.
  const allowMultiple = multiple !== false;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedFilesRef = useRef<UploadedFile<unknown>[]>([]);
  const xhrRef = useRef<Map<string, XMLHttpRequest>>(new Map());
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const pendingReplaceIdRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  const cachesRef = useRef<NormalizeCaches>({
    id: new WeakMap<File, string>(),
    url: new WeakMap<File, string>(),
  });
  const caches = cachesRef.current;

  const [internalFiles, setInternalFiles] = useState<FileItem[]>(() =>
    value ? normalizeValue(value as InputFileValue[], cachesRef.current) : []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [internalError, setInternalError] = useState<string | undefined>(
    undefined
  );

  const [customNames, setCustomNames] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploadState, setUploadState] = useState<
    Record<string, FileUploadState>
  >({});

  const customNamesRef = useRef<Record<string, string>>(customNames);
  customNamesRef.current = customNames;

  const customNameEnabled = (allowCustomName ?? useCustomName) === true;

  const normalizedFromValue = useMemo<FileItem[] | null>(
    () => (value ? normalizeValue(value as InputFileValue[], caches) : null),
    [value, caches]
  );

  const controlled = value != null && typeof onChange === 'function';
  const files = controlled
    ? (normalizedFromValue ?? internalFiles)
    : internalFiles;

  const filesRef = useRef<FileItem[]>(files);
  filesRef.current = files;

  const valueSignature = useMemo<string | null>(
    () =>
      normalizedFromValue == null
        ? null
        : normalizedFromValue
            .map((f) => `${f.id}|${f.name}|${f.size ?? ''}|${f.preview}`)
            .join('~'),
    [normalizedFromValue]
  );
  const appliedSignatureRef = useRef<string | null>(valueSignature);

  useEffect(() => {
    if (controlled || valueSignature === null) return;
    if (appliedSignatureRef.current === valueSignature) return;
    appliedSignatureRef.current = valueSignature;
    setInternalFiles(normalizedFromValue ?? []);
  }, [controlled, valueSignature, normalizedFromValue]);

  const updateFiles = (
    updater: FileItem[] | ((prev: FileItem[]) => FileItem[])
  ) => {
    const next =
      typeof updater === 'function' ? updater(filesRef.current) : updater;
    filesRef.current = next;
    if (!controlled) setInternalFiles(next);
    onChange?.(next);
  };

  const revokeLocal = (item: FileItem) => {
    if (!isLocalFile(item)) return;
    const url = caches.url.get(item.file);
    if (url != null) {
      URL.revokeObjectURL(url);
      caches.url.delete(item.file);
    }
  };

  const schedule = (fn: () => void, ms: number) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      if (mountedRef.current) fn();
    }, ms);
    timersRef.current.add(timer);
  };

  const abortUpload = (id: string) => {
    const xhr = xhrRef.current.get(id);
    if (!xhr) return;
    xhrRef.current.delete(id);
    xhr.upload.onprogress = null;
    xhr.onload = null;
    xhr.onerror = null;
    xhr.onabort = null;
    xhr.ontimeout = null;
    try {
      xhr.abort();
    } catch {
      /* noop */
    }
  };

  const patchUploadState = (id: string, patch: FileUploadState) =>
    setUploadState((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const dropKey = <T>(rec: Record<string, T>, id: string) => {
    if (!(id in rec)) return rec;
    const next = { ...rec };
    delete next[id];
    return next;
  };

  const handleUploadError = (fileItem: FileItem, message: string) => {
    patchUploadState(fileItem.id, {
      uploadStatus: 'error',
      errorMessage: message,
      hint: undefined,
    });
  };

  const uploadFile = (fileItem: FileItem) => {
    if (!uploadConfig) return;
    if (!isLocalFile(fileItem)) return;

    const id = fileItem.id;
    abortUpload(id);

    const {
      url,
      method = 'POST',
      fieldName = 'file',
      headers = {},
    } = uploadConfig;

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append(fieldName, fileItem.file);

    xhrRef.current.set(id, xhr);
    const isStale = () => xhrRef.current.get(id) !== xhr;

    patchUploadState(id, {
      uploadStatus: 'uploading',
      errorMessage: undefined,
      hint: undefined,
    });
    setUploadProgress((prev) => ({ ...prev, [id]: 0 }));

    xhr.upload.onprogress = (event) => {
      if (isStale() || !event.lengthComputable) return;
      patchUploadState(id, { hint: 'Uploading...' });
      setUploadProgress((prev) => ({
        ...prev,
        [id]: event.loaded / event.total, // 0–1
      }));
    };

    const fail = (message: string) => {
      xhrRef.current.delete(id);
      handleUploadError(fileItem, message);
      schedule(() => setUploadProgress((prev) => dropKey(prev, id)), 800);
      uploadConfig.onError?.(fileItem, message);
    };

    xhr.onload = () => {
      if (isStale()) return;

      if (xhr.status < 200 || xhr.status >= 300) {
        fail(`Server error: ${xhr.status}`);
        return;
      }

      xhrRef.current.delete(id);
      setUploadProgress((prev) => ({ ...prev, [id]: 1 }));

      let parsed: unknown = null;
      try {
        parsed = JSON.parse(xhr.responseText);
      } catch {
        parsed = xhr.responseText !== '' ? xhr.responseText : null;
      }

      const extractUrl = uploadConfig.extractUrl ?? defaultExtractUrl;
      let uploadedUrl = '';
      try {
        uploadedUrl = extractUrl(parsed) ?? '';
      } catch {
        uploadedUrl = '';
      }

      patchUploadState(id, {
        uploadStatus: 'success',
        hint: 'Completed',
        uploadedUrl,
      });
      schedule(() => setUploadProgress((prev) => dropKey(prev, id)), 800);

      // File yang sudah dihapus/diganti tidak boleh masuk hasil upload.
      const current = filesRef.current.find((f) => f.id === id);
      if (!current) return;

      const result: UploadedFile<unknown> = {
        id,
        originalName: fileItem.file.name,
        customName:
          customNamesRef.current[id] ??
          current.customName ??
          fileItem.customName,
        uploadedData: parsed,
      };

      uploadedFilesRef.current = [
        ...uploadedFilesRef.current.filter((f) => f.id !== result.id),
        result,
      ];
      onUploadSuccess?.(uploadedFilesRef.current);
    };

    xhr.onerror = () => {
      if (isStale()) return;
      fail(uploadConfig.errorMessage ?? 'Failed Try Again');
    };

    xhr.ontimeout = () => {
      if (isStale()) return;
      fail(uploadConfig.errorMessage ?? 'Failed Try Again');
    };

    xhr.onabort = () => {
      xhrRef.current.delete(id);
    };

    xhr.open(method, url);
    Object.entries(headers).forEach(([key, val]) =>
      xhr.setRequestHeader(key, val)
    );
    xhr.send(formData);
  };

  const processFiles = (selectedFiles: File[], pendingError?: string) => {
    if (disabled) return;

    const incoming = allowMultiple ? selectedFiles : selectedFiles.slice(0, 1);
    if (incoming.length === 0) {
      setInternalError(pendingError);
      return;
    }

    const replaceExisting = !allowMultiple && SINGLE_SELECTION_REPLACES;
    const base = replaceExisting ? [] : filesRef.current;

    if (maxFiles !== undefined && base.length + incoming.length > maxFiles) {
      setInternalError(maxFilesErrorMessage ?? `Maksimal ${maxFiles} file`);
      return;
    }

    if (maxSize !== undefined) {
      const oversized = incoming.filter((file) => file.size > maxSize);
      if (oversized.length > 0) {
        setInternalError(
          maxSizeErrorMessage ??
            `File ${oversized.map((f) => f.name).join(', ')} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`
        );
        return;
      }
    }

    setInternalError(pendingError);

    if (replaceExisting) {
      filesRef.current.forEach((item) => {
        abortUpload(item.id);
        revokeLocal(item);
      });
    }

    const mapped: FileItem[] = incoming.map((file) => {
      const id = genId();
      const preview = URL.createObjectURL(file);
      caches.id.set(file, id);
      caches.url.set(file, preview);
      return {
        source: 'local',
        id,
        file,
        customName: file.name,
        preview,
        name: file.name,
        type: coerceType(file.type, file.name),
        size: file.size,
      };
    });

    updateFiles([...base, ...mapped]);

    if (replaceExisting) {
      uploadedFilesRef.current = [];
      setUploadProgress({});
      setUploadState({});
      setCustomNames({});
    }

    if (uploadConfig) {
      mapped.forEach((fileItem) => uploadFile(fileItem));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selected = Array.from(input.files ?? []);
    input.value = ''; // supaya file yang sama bisa dipilih lagi
    processFiles(selected);
  };

  const handleReplace = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selected = input.files?.[0];
    input.value = '';

    const targetId = pendingReplaceIdRef.current;
    pendingReplaceIdRef.current = null;
    if (!selected || targetId == null) return;

    const index = filesRef.current.findIndex((f) => f.id === targetId);
    if (index === -1) return;
    const target = filesRef.current[index];

    if (maxSize !== undefined && selected.size > maxSize) {
      setInternalError(
        maxSizeErrorMessage ??
          `File ${selected.name} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`
      );
      return;
    }

    abortUpload(target.id);
    revokeLocal(target);

    const base = normalizeEntry(selected, caches);
    if (base == null) return;

    const newFileItem: FileItem = {
      ...base,
      id: target.id,
      label: target.label,
      customName: selected.name,
      uploadStatus: undefined,
      uploadedUrl: undefined,
      errorMessage: undefined,
      hint: undefined,
    };
    caches.id.set(selected, target.id);

    const newFiles = [...filesRef.current];
    newFiles[index] = newFileItem;
    updateFiles(newFiles);

    setUploadState((prev) => dropKey(prev, target.id));
    setUploadProgress((prev) => dropKey(prev, target.id));
    uploadedFilesRef.current = uploadedFilesRef.current.filter(
      (f) => f.id !== target.id
    );

    if (uploadConfig) uploadFile(newFileItem);
  };

  const removeFile = (index: number) => {
    const removed = filesRef.current[index];
    if (!removed) return;

    abortUpload(removed.id);
    revokeLocal(removed);
    updateFiles(filesRef.current.filter((_, i) => i !== index));

    uploadedFilesRef.current = uploadedFilesRef.current.filter(
      (f) => f.id !== removed.id
    );
    onRemoveFile?.(removed.id);

    setUploadProgress((prev) => dropKey(prev, removed.id));
    setUploadState((prev) => dropKey(prev, removed.id));
    setCustomNames((prev) => dropKey(prev, removed.id));
    setInternalError(undefined);
  };

  const clearAll = () => {
    filesRef.current.forEach((f) => {
      abortUpload(f.id);
      revokeLocal(f);
    });
    updateFiles([]);
    onClear?.();
    uploadedFilesRef.current = [];
    setUploadProgress({});
    setUploadState({});
    setCustomNames({});
    setInternalError(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  const triggerReplace = (index: number) => {
    if (disabled) return;
    const target = filesRef.current[index];
    if (!target) return;
    pendingReplaceIdRef.current = target.id;
    replaceInputRef.current?.click();
  };

  const openFilePicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const setCustomName = (id: string, valueName: string) => {
    setCustomNames((prev) => ({ ...prev, [id]: valueName }));
  };

  const getFiles = (): FileItem[] =>
    filesRef.current.map((f) => {
      const merged = { ...f, ...(uploadState[f.id] ?? {}) } as FileItem;
      if (customNameEnabled) {
        merged.customName = customNames[f.id] ?? f.customName ?? f.name;
      }
      return merged;
    });

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (
      x <= rect.left ||
      x >= rect.right ||
      y <= rect.top ||
      y >= rect.bottom
    ) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;

    let filteredFiles = droppedFiles;
    let typeError: string | undefined;

    if (accept !== undefined && accept.trim() !== '') {
      filteredFiles = droppedFiles.filter((file) =>
        matchesAccept(file, accept)
      );

      if (filteredFiles.length !== droppedFiles.length) {
        typeError = `Some files do not match the allowed types: ${accept}`;
        if (filteredFiles.length === 0) {
          setInternalError(typeError);
          return;
        }
      }
    }

    // typeError diteruskan supaya tidak langsung ditimpa `setInternalError(undefined)`.
    processFiles(filteredFiles, typeError);
  };

  const prevFilesRef = useRef<FileItem[]>([]);
  useEffect(() => {
    const prev = prevFilesRef.current;
    prevFilesRef.current = files;

    const currentIds = new Set(files.map((f) => f.id));
    prev.forEach((f) => {
      if (!isLocalFile(f) || currentIds.has(f.id)) return;
      const u = caches.url.get(f.file);
      if (u != null) {
        URL.revokeObjectURL(u);
        caches.url.delete(f.file);
      }
    });
  }, [files, caches]);

  useEffect(() => {
    mountedRef.current = true;
    const cache = caches;
    const xhrs = xhrRef.current;
    const timers = timersRef.current;

    return () => {
      mountedRef.current = false;

      timers.forEach((t) => clearTimeout(t));
      timers.clear();

      xhrs.forEach((xhr) => {
        xhr.upload.onprogress = null;
        xhr.onload = null;
        xhr.onerror = null;
        xhr.onabort = null;
        xhr.ontimeout = null;
        try {
          xhr.abort();
        } catch {
          /* noop */
        }
      });
      xhrs.clear();

      // Hapus juga dari cache: kalau komponen di-mount ulang (StrictMode),
      // preview harus dibuat baru, bukan memakai object URL yang sudah di-revoke.
      filesRef.current.forEach((f) => {
        if (!isLocalFile(f)) return;
        const u = cache.url.get(f.file);
        if (u != null) {
          URL.revokeObjectURL(u);
          cache.url.delete(f.file);
        }
      });
    };
  }, [caches]);

  return {
    files,
    // Error internal (maxSize/maxFiles/tipe file) menang: itu akibat langsung aksi
    // terakhir user dan selalu dibersihkan oleh aksi berikutnya. Error dari props
    // (mis. react-hook-form) dipakai saat tidak ada error internal.
    errorMessage: internalError ?? errorMessage,
    isDragging,
    uploadProgress,
    uploadState,
    customNames,
    customNameEnabled,
    disabled,
    accept,
    inputRef,
    replaceInputRef,
    openFilePicker,
    clearAll,
    removeFile,
    triggerReplace,
    setCustomName,
    getFiles,
    handleChange,
    handleReplace,
    getDragHandlers: () => ({
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    }),
  };
}

export type UseInputFileReturn = ReturnType<typeof useInputFile>;
