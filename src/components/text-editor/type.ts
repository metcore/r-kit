import type { DragHandleProps } from '@tiptap/extension-drag-handle-react';
import type { IconNameProps } from '../icons';
import { Editor } from '@tiptap/core';
import type { SelectOption } from '../select/type';
import type { FileItem, UploadConfig, UploadedFile } from '../input-file';

export interface TextEditorProps {
  ui?: {
    className?: string;
    toolbarClassName?: string;
    dragHandleClassName?: string;
    textEditorClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  };

  field?: {
    label?: string;
    description?: string;
    hint?: string;
    required?: boolean;
    errorMessages?: string | string[];
  };

  editor?: {
    value?: string;
    placeholder?: string;
    onChange?: (value: Editor) => void;
    dragHandleProps?: Omit<DragHandleProps, 'editor'>;
    attachmentField?: AttachmentField;
  };

  toolbar?: {
    formatting?: boolean;
    alignment?: boolean;
    list?: boolean;
    insert?: boolean;
    table?: boolean;
    indent?: boolean;
    advance?: boolean;
  };

  onDownload?: (data: { src?: string; name?: string }) => void;
}

export interface ToolbarButtonProps {
  icon?: IconNameProps;
  iconSize?: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type TextAlignValue = 'left' | 'center' | 'right' | 'justify';

export type ListItemType = 'listItem' | 'taskItem';

export interface ImageForm {
  url: {
    source: string | null;
    target: SelectOption | null;
  } | null;
  image: {
    source: string;
    altText: string;
    objectFit: SelectOption;
    width: string;
    height: string;
  };
}

export interface ColorPickerButtonProps {
  id: string;
  icon: IconNameProps;
  color: string;
  disabled?: boolean;
  onChange: (color: string) => void;
}

export interface TableAction {
  icon: IconNameProps;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  requiresTable: boolean;
  active?: boolean;
  disabledByMap?: boolean;
}

export interface AttachmentField {
  multiple?: boolean;
  value?: FileItem[];
  onChange?: (files: FileItem[]) => void;
  uploadConfig?: UploadConfig;
  onUploadSuccess?: (file: UploadedFile<unknown>[]) => void;
  label: string;
  accept: string; // e.g = "pdf, png, jpg, jpeg"
  hint: string;
  maxSize?: number;
  variant?: 'medium' | 'large' | 'primary' | 'secondary' | 'gray';
  extractUploadResult: (results: UploadedFile<unknown>[]) => {
    url: string;
    altText: string;
  };
}
