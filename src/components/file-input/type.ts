import type { ButtonVariantProps } from "../button";

export type FileInputSize = "sm" | "md" | "lg";

export interface ExistingFile {
  url: string;
  name: string;
  size?: number; // in bytes, optional for existing files
  type?: string; // MIME type, optional for existing files
}

export interface FileInputProps {
  label?: string;
  description?: string;
  maxFileSize?: number; // in MB
  accept?: string[];
  multiple?: boolean;
  hint?: string;
  size?: FileInputSize;
  onChange?: (files: File[], deletedUrls: string[]) => void;
  errorMessages?: string | string[];
  className?: string;
  disabled?: boolean;
  buttonColor?: ButtonVariantProps["color"];
  existingFiles?: ExistingFile[]; // For edit/update mode
  onDelete?: (url: string) => void;
}

export interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

export interface DisplayFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
  isExisting: boolean;
  url?: string;
  file?: File;
}

export interface FilePickerProps {
  size: FileInputSize;
  onClick: () => void;
  disabled?: boolean;
  buttonColor: ButtonVariantProps["color"];
}

export interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

export interface FilePreviewItemProps {
  file: DisplayFile;
  onDelete: () => void;
  onPreview: () => void;
}
