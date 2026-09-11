import type { ReactNode } from 'react';
import type { ButtonVariantProps } from '../button';
import type { UseInputFileReturn } from './use-input-file';
import type { BaseColor } from '../base/type/base-color';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface RemoteFile {
  id?: string | number;
  url: string;
  name?: string;
  size?: number;
  type?: string;
}

interface FileItemBase {
  id: string;

  label?: string;
  hint?: string;
  customName?: string;
  errorMessage?: string;

  preview: string;

  uploadStatus?: UploadStatus;
  uploadedUrl?: string;

  name: string;
  type: string;
  size?: number;
}

export interface LocalFileItem extends FileItemBase {
  source: 'local';
  file: File;
  url?: undefined;
  remoteId?: undefined;
}

export interface RemoteFileItem extends FileItemBase {
  source: 'remote';
  url: string;
  remoteId?: string | number;
  file?: undefined;
}

export type FileItem = LocalFileItem | RemoteFileItem;

export const isLocalFile = (i: FileItem): i is LocalFileItem =>
  i.source === 'local';
export const isRemoteFile = (i: FileItem): i is RemoteFileItem =>
  i.source === 'remote';

export type InputFileValue = File | RemoteFile | FileItem;

export interface InputFileProps extends PlayerProps {
  value?: InputFileValue[];
  onChange?: (files: FileItem[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // dalam bytes
  maxFiles?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'gray' | 'medium' | 'large';
  label?: string;
  hint?: string;
  buttonLabel?: string | ReactNode;
  buttonVariant?: ButtonVariantProps['variant'];
  buttonColor?: BaseColor;
  errorMessage?: string;
  maxSizeErrorMessage?: string;
  customNamePlaceholder?: string;
  maxFilesErrorMessage?: string;

  /** New, clearer name. Defaults to off; explicit `false` disables. */
  allowCustomName?: boolean;
  /** @deprecated Use `allowCustomName`. Kept for backward compatibility. */
  useCustomName?: boolean;

  onDownload?: (data: {
    /** Sumber preview: object URL untuk file lokal, URL server untuk file remote. */
    src?: string;
    name?: string;
    /** Id INTERNAL item (untuk keying), bukan id publik `UploadedFileValue.id`. */
    id?: string;
    /** URL di server kalau sudah tersedia (hasil upload atau file remote). */
    url?: string;
  }) => void;
  uploadConfig?: UploadConfig;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
  onRemoveFile?: (id: string) => void;
  onClear?: () => void;
  selectedFilesClassName?: string;
  previewMode?: PreviewMode;
  hideDownloadButton?: boolean;
}

export interface PreviewItemProps extends PlayerProps {
  data: FileItem;
  onRemove: () => void;
  onReplace: () => void;
  disabled?: boolean;
  onCustomNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelCustomName?: string;
  customNamePlaceholder?: string;
  customName?: string;
  onDownload?: (data?: {
    src?: string;
    name?: string;
    id?: string;
    url?: string;
  }) => void;
  progress?: number;
  mode?: PreviewMode;
  hideDownloadButton?: boolean;
}

export type PreviewMode = 'detailed' | 'compact';

export interface PlayerProps {
  pdfViewerProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
  audioPlayerProps?: React.AudioHTMLAttributes<HTMLAudioElement>;
  videoPlayerProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
}

export interface InputFileRef {
  clearAll: () => void;
  getFiles: () => FileItem[];
  openFilePicker: () => void;
  /** true selama masih ada file yang sedang diupload. Pakai untuk blokir submit. */
  isUploading: () => boolean;
}

export interface UploadConfig {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  fieldName?: string;
  headers?: Record<string, string>;
  extractUrl?: (response: unknown) => string;
  onError?: (fileItem: FileItem, error: string) => void;
  errorMessage?: string;
}

export interface UploadedFile<UploadedData> {
  id: string;
  originalName: string;
  customName?: string;
  uploadedData: UploadedData | null;
}

export interface InputFilePreviewProps
  extends
    PlayerProps,
    Pick<InputFileProps, 'customNamePlaceholder' | 'onDownload'> {
  inputFile: UseInputFileReturn;
  className?: string;
  mode?: PreviewMode;
  title?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  maxHeight?: number | string;
  hideDownloadButton?: boolean;
}

/* ------------------------------------------------------------------ */
/* API PUBLIK BARU — dipakai oleh <InputFile />                        */
/* ------------------------------------------------------------------ */

export type InputFileMode = 'file' | 'uploadFile';

/** Bentuk nilai untuk mode `uploadFile`. */
/** Id apa adanya dari `value` — number dari DB tetap number saat dikembalikan. */
export type UploadedFileId = string | number | null;

/** Bentuk yang DIKELUARKAN komponen. */
export interface UploadedFileValue {
  /**
   * Id HANYA berasal dari `value`. Komponen tidak pernah membuat id sendiri.
   * `null` = file baru yang belum punya id (backend yang menentukan saat disimpan).
   */
  id: UploadedFileId;
  url: string;
  original_name: string;
}

/**
 * Bentuk yang DITERIMA `value`. Sengaja longgar supaya payload API bisa dipakai
 * apa adanya: `url` wajib, sisanya opsional dan nama file dicari berurutan dari
 * `original_name` -> `name` -> `file_name` -> diturunkan dari URL.
 */
export interface UploadFileEntry {
  id?: UploadedFileId;
  url: string;
  original_name?: string | null;
  name?: string | null;
  file_name?: string | null;
}

/**
 * Entry `value` untuk mode `uploadFile`.
 * String polos = id yang sudah disiapkan lebih dulu, filenya belum ada.
 */
export type UploadFileValueInput = string | UploadFileEntry;

/** Props yang sama untuk kedua mode (visual + batasan). */
export interface InputFileCommonProps extends PlayerProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'gray' | 'medium' | 'large';
  label?: string;
  hint?: string;
  buttonLabel?: string | ReactNode;
  buttonVariant?: ButtonVariantProps['variant'];
  buttonColor?: BaseColor;
  errorMessage?: string;
  maxSizeErrorMessage?: string;
  maxFilesErrorMessage?: string;
  customNamePlaceholder?: string;
  allowCustomName?: boolean;
  onDownload?: (data: {
    /** Sumber preview: object URL untuk file lokal, URL server untuk file remote. */
    src?: string;
    name?: string;
    /** Id INTERNAL item (untuk keying), bukan id publik `UploadedFileValue.id`. */
    id?: string;
    /** URL di server kalau sudah tersedia (hasil upload atau file remote). */
    url?: string;
  }) => void;
  onRemoveFile?: (id: string) => void;
  onClear?: () => void;
  selectedFilesClassName?: string;
  previewMode?: PreviewMode;
  hideDownloadButton?: boolean;
}

export interface InputFileSingleProps extends InputFileCommonProps {
  mode?: 'file';
  multiple?: false;
  value?: File | null;
  onChange?: (value: File | null) => void;
  /** Mode `file` tidak pernah mengupload. */
  uploadConfig?: never;
}

export interface InputFileMultipleProps extends InputFileCommonProps {
  mode?: 'file';
  multiple: true;
  value?: File[] | null;
  onChange?: (value: File[]) => void;
  uploadConfig?: never;
}

export interface UploadFileSingleProps extends InputFileCommonProps {
  mode: 'uploadFile';
  multiple?: false;
  value?: UploadFileValueInput | null;
  onChange?: (value: UploadedFileValue | null) => void;
  uploadConfig: UploadConfig;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
}

export interface UploadFileMultipleProps extends InputFileCommonProps {
  mode: 'uploadFile';
  multiple: true;
  value?: UploadFileValueInput[] | null;
  onChange?: (value: UploadedFileValue[]) => void;
  uploadConfig: UploadConfig;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
}

export type InputFileTypedProps =
  | InputFileSingleProps
  | InputFileMultipleProps
  | UploadFileSingleProps
  | UploadFileMultipleProps;
