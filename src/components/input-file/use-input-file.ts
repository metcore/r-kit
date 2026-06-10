import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import type { FileItem, InputFileProps, UploadedFile } from './type';

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
  | 'disabled'
  | 'uploadConfig'
  | 'onUploadSuccess'
  | 'onRemoveFile'
  | 'onClear'
  | 'errorMessage'
  | 'maxSizeErrorMessage'
  | 'maxFilesErrorMessage'
  | 'useCustomName'
>;

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

export function useInputFile(opts: UseInputFileOptions = {}) {
  const {
    value,
    onChange,
    accept,
    maxSize,
    maxFiles,
    disabled = false,
    uploadConfig,
    onUploadSuccess,
    onRemoveFile,
    onClear,
    errorMessage,
    maxSizeErrorMessage,
    maxFilesErrorMessage,
    useCustomName,
  } = opts;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const uploadedFilesRef = useRef<UploadedFile<unknown>[]>([]);

  const [internalFiles, setInternalFiles] = useState<FileItem[]>([]);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
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

  const customNameEnabled = useCustomName !== undefined;

  const files = value ?? internalFiles;
  const filesRef = useRef<FileItem[]>(files);
  filesRef.current = files;

  const updateFiles = (
    updater: FileItem[] | ((prev: FileItem[]) => FileItem[])
  ) => {
    const next =
      typeof updater === 'function' ? updater(filesRef.current) : updater;
    filesRef.current = next;
    if (onChange) {
      onChange(next);
    } else {
      setInternalFiles(next);
    }
  };

  const patchUploadState = (id: string, patch: FileUploadState) =>
    setUploadState((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const dropKey = <T>(rec: Record<string, T>, id: string) => {
    const next = { ...rec };
    delete next[id];
    return next;
  };

  const uploadFile = (fileItem: FileItem) => {
    if (!uploadConfig) return;

    const {
      url,
      method = 'POST',
      fieldName = 'file',
      headers = {},
    } = uploadConfig;

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append(fieldName, fileItem.file);

    patchUploadState(fileItem.id!, {
      uploadStatus: 'uploading',
      errorMessage: undefined,
      hint: undefined,
    });
    setUploadProgress((prev) => ({ ...prev, [fileItem.id!]: 0 }));

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = event.loaded / event.total; // 0–1
        patchUploadState(fileItem.id!, { hint: 'Uploading...' });
        setUploadProgress((prev) => ({ ...prev, [fileItem.id!]: percent }));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress((prev) => ({ ...prev, [fileItem.id!]: 1 }));

        let parsed: unknown = null;
        try {
          parsed = JSON.parse(xhr.responseText);
        } catch (err) {
          console.error(err);
        }

        const extractUrl = uploadConfig.extractUrl ?? defaultExtractUrl;
        const uploadedUrl = extractUrl(parsed);

        patchUploadState(fileItem.id!, {
          uploadStatus: 'success',
          hint: 'Completed',
          uploadedUrl,
        });

        setTimeout(() => {
          setUploadProgress((prev) => dropKey(prev, fileItem.id!));
        }, 800);

        const result: UploadedFile<unknown> = {
          id: fileItem.id!,
          originalName: fileItem.file.name,
          customName: fileItem.customName,
          uploadedData: parsed,
        };

        uploadedFilesRef.current = [
          ...uploadedFilesRef.current.filter((f) => f.id !== result.id),
          result,
        ];
        onUploadSuccess?.(uploadedFilesRef.current);
      } else {
        handleUploadError(fileItem, `Server error: ${xhr.status}`);
        uploadConfig.onError?.(fileItem, `Server error: ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      const message = uploadConfig.errorMessage ?? 'Failed Try Again';
      handleUploadError(fileItem, message);
      uploadConfig.onError?.(fileItem, message);
      setTimeout(() => {
        setUploadProgress((prev) => dropKey(prev, fileItem.id!));
      }, 800);
    };

    xhr.open(method, url);
    Object.entries(headers).forEach(([key, val]) =>
      xhr.setRequestHeader(key, val)
    );
    xhr.send(formData);
  };

  const handleUploadError = (fileItem: FileItem, message: string) => {
    patchUploadState(fileItem.id!, {
      uploadStatus: 'error',
      errorMessage: message,
      hint: undefined,
    });
  };

  const processFiles = (selectedFiles: File[]) => {
    if (
      maxFiles !== undefined &&
      files.length + selectedFiles.length > maxFiles
    ) {
      setInternalError(maxFilesErrorMessage ?? `Maksimal ${maxFiles} file`);
      return;
    }

    if (maxSize !== undefined) {
      const oversized = selectedFiles.filter((file) => file.size > maxSize);
      if (oversized.length > 0) {
        setInternalError(
          maxSizeErrorMessage ??
            `File ${oversized.map((f) => f.name).join(', ')} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`
        );
        return;
      }
    }

    setInternalError(undefined);

    const mapped: FileItem[] = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      customName: file.name,
      preview: URL.createObjectURL(file),
    }));

    updateFiles([...files, ...mapped]);

    if (uploadConfig) {
      mapped.forEach((fileItem) => uploadFile(fileItem));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    processFiles(selected);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleReplace = (e: ChangeEvent<HTMLInputElement>) => {
    if (replaceIndex === null) return;

    const selected = e.target.files?.[0];
    if (!selected) {
      setReplaceIndex(null);
      return;
    }

    if (maxSize !== undefined && selected.size > maxSize) {
      setInternalError(
        maxSizeErrorMessage ??
          `File ${selected.name} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`
      );
      setReplaceIndex(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
      return;
    }

    const target = files[replaceIndex];
    if (!target) {
      setReplaceIndex(null);
      return;
    }

    URL.revokeObjectURL(target.preview);

    const newFileItem: FileItem = {
      ...target,
      file: selected,
      customName: selected.name,
      preview: URL.createObjectURL(selected),
      uploadStatus: undefined,
      uploadedUrl: undefined,
      errorMessage: undefined,
      hint: undefined,
    };

    const newFiles = [...files];
    newFiles[replaceIndex] = newFileItem;
    updateFiles(newFiles);

    setUploadState((prev) => dropKey(prev, newFileItem.id!));
    setUploadProgress((prev) => dropKey(prev, newFileItem.id!));
    uploadedFilesRef.current = uploadedFilesRef.current.filter(
      (f) => f.id !== newFileItem.id
    );

    if (uploadConfig) uploadFile(newFileItem);

    setReplaceIndex(null);
    if (replaceInputRef.current) replaceInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    const removed = files[index];
    if (!removed) return;

    URL.revokeObjectURL(removed.preview);
    updateFiles(files.filter((_, i) => i !== index));

    uploadedFilesRef.current = uploadedFilesRef.current.filter(
      (f) => f.id !== removed.id
    );
    onRemoveFile?.(removed.id!);

    setUploadProgress((prev) => dropKey(prev, removed.id!));
    setUploadState((prev) => dropKey(prev, removed.id!));
    setCustomNames((prev) => dropKey(prev, removed.id!));
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    updateFiles([]);
    onClear?.();
    uploadedFilesRef.current = [];
    setUploadProgress({});
    setUploadState({});
    setCustomNames({});
    if (inputRef.current) inputRef.current.value = '';
  };

  const triggerReplace = (index: number) => {
    setReplaceIndex(index);
    replaceInputRef.current?.click();
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const setCustomName = (id: string, valueName: string) => {
    if (replaceIndex !== null) return;
    setCustomNames((prev) => ({ ...prev, [id]: valueName }));
  };

  const getFiles = (): FileItem[] =>
    files.map((f) => {
      if (customNameEnabled) {
        return {
          ...f,
          customName: customNames[f.id!] ?? f.customName ?? f.file.name,
        };
      }
      return { ...f };
    });

  // ---- drag & drop ----
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
    let filteredFiles = droppedFiles;

    if (accept !== undefined) {
      const acceptedTypes = accept
        .split(',')
        .map((t) => t.trim().toLowerCase());
      filteredFiles = droppedFiles.filter((file) =>
        acceptedTypes.some((acceptedType) => {
          if (acceptedType.startsWith('.')) {
            return file.name.toLowerCase().endsWith(acceptedType);
          }
          if (acceptedType.endsWith('/*')) {
            const baseType = acceptedType.split('/')[0];
            return file.type.toLowerCase().startsWith(baseType + '/');
          }
          return file.type.toLowerCase() === acceptedType;
        })
      );

      if (filteredFiles.length !== droppedFiles.length) {
        setInternalError(
          `Some files do not match the allowed types: ${accept}`
        );
        if (filteredFiles.length === 0) return;
      }
    }

    processFiles(filteredFiles);
  };

  useEffect(() => {
    return () => {
      filesRef.current.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, []);

  useEffect(() => {
    if (errorMessage !== undefined) setInternalError(errorMessage);
  }, [errorMessage]);

  return {
    files,
    errorMessage: internalError,
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
