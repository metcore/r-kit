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
  buttonLabel?: string;
  errorMessage?: string;
  maxSizeErrorMessage?: string;
  customNamePlaceholder?: string;
  maxFilesErrorMessage?: string;
  useCustomName?: boolean;
  onDownload?: (data: { src?: string; name?: string }) => void;
  uploadConfig?: UploadConfig;
  onUploadSuccess?: (results: UploadedFile[]) => void;
  onRemoveFile?: (id: string) => void;
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
}

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

export interface UploadedFile {
  id: string;
  originalName: string;
  customName?: string;
  url: string;
}
