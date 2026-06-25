import type { ReactNode } from 'react';
import type { ButtonVariantProps } from '../button';
import type { UseInputFileReturn } from './use-input-file';
import type { BaseColor } from '../base/type/base-color';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface FileItem {
  id?: string;
  file: File;

  label?: string;
  hint?: string;
  customName?: string;
  errorMessage?: string;

  preview: string;

  uploadStatus?: UploadStatus;
  uploadedUrl?: string;
}

export interface InputFileProps extends PlayerProps {
  value?: FileItem[];
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
  useCustomName?: boolean;
  onDownload?: (data: { src?: string; name?: string }) => void;
  uploadConfig?: UploadConfig;
  onUploadSuccess?: (results: UploadedFile<unknown>[]) => void;
  onRemoveFile?: (id: string) => void;
  onClear?: () => void;
  selectedFilesClassName?: string;
  previewMode?: PreviewMode;
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
  onDownload?: (data?: { src?: string; name?: string }) => void;
  progress?: number;
  mode?: PreviewMode;
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
}

export interface UploadConfig {
  url: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  fieldName?: string;
  headers?: Record<string, string>;
  extractUrl?: (response: unknown) => string; // default: (res) => res.url
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
  /**
   * Called when the user scrolls near the bottom of the list. Providing this
   * enables infinite scroll: the list becomes a bounded, scrollable area and
   * more items are requested lazily instead of all at once.
   */
  onLoadMore?: () => void;
  /** Whether there are more items to load. */
  hasMore?: boolean;
  /** Whether a load-more request is currently in flight. */
  isLoadingMore?: boolean;
  /** Max height of the scroll area when infinite scroll is enabled. @default 320 */
  maxHeight?: number | string;
}
