import type { DragHandleProps } from '@tiptap/extension-drag-handle-react';
import type { IconNameProps } from '../icons';
import { Editor } from '@tiptap/core';
import type { SelectOption } from '../select/type';
import type { FileItem, UploadConfig, UploadedFile } from '../input-file';

export interface TextEditorProps {
  label?: string;
  description?: string;
  hint?: string;
  required?: boolean;
  errorMessages?: string | string[];
  size?: 'sm' | 'md' | 'lg';
  height?: number;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (value: Editor) => void;
  plugins?: Plugins;

  /**
   * @deprecated Use top-level `size` & `disabled` instead
   */
  ui?: {
    className?: string;
    toolbarClassName?: string;
    dragHandleClassName?: string;
    textEditorClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
  };

  /**
   * @deprecated Use top-level `field` instead
   */
  field?: {
    label?: string;
    description?: string;
    hint?: string;
    required?: boolean;
    errorMessages?: string | string[];
  };

  /**
   * @deprecated Use top-level `value`, `placeholder` & `onChange` instead
   */
  editor?: {
    value?: string;
    placeholder?: string;
    onChange?: (value: Editor) => void;
    dragHandleProps?: Omit<DragHandleProps, 'editor'>;
    attachmentField?: AttachmentField;
  };

  /**
   * @deprecated Use top-level plugis?.toolbar instead
   */
  toolbar?: BaseToolbar;

  onDownload?: (data: { src?: string; name?: string }) => void;
}

export type BaseModal = {
  title?: string;
  labelButtonSave?: string;
  labelButtonCancel?: string;
};

export type BaseToolbar = {
  formatting?: boolean;
  alignment?: boolean;
  list?: boolean;
  insert?: boolean;
  table?: boolean;
  indent?: boolean;
  advance?: boolean;
};

export type BaseInput = {
  label?: string;
  placeholder?: string;
};

export type BaseImageDetail = {
  label?: string;
  uri?: BaseInput;
  altText?: BaseInput;
  width?: BaseInput;
  height?: BaseInput;
  objectFit?: BaseInput;
};

export type BaseInputLink = {
  label?: string;
  url?: BaseInput;
  target?: BaseInput;
};

export type BaseUploadConfig = UploadConfig & {
  maxSize?: number;
  accept?: string;
};

export type BaseUpload = {
  label?: string;
  hint?: string;
  labelButtonChooseFile?: string;
  config: BaseUploadConfig;
};

export type BaseInputFile = {
  modal?: BaseModal;
  imageDetail?: BaseImageDetail;
  link?: BaseInputLink;
  upload?: BaseUpload;
};

export type BaseInputYoutube = {
  modal?: BaseModal;
  url?: BaseInput;
  width?: BaseInput;
  height?: BaseInput;
  labelPreviewTitle?: string;
};

export type BaseInputParagraph = {
  labelParagraph?: string;
};

export type BaseInputAlignment = {
  labelLeft?: string;
  labelRight?: string;
  labelCenter?: string;
  labelJustify?: string;
};

export type BaseInputTable = {
  labelAddTable?: string;
  labelHeaderCell?: string;
  labelMergeCell?: string;
  labelNoBorder?: string;
  labelDeleteTable?: string;
  labelInsertRow?: string;
  labelDeleteRow?: string;
  labelInsertColumn?: string;
  labelDeleteColumn?: string;
};

export type Plugins = {
  showToolbar?: BaseToolbar;
  inputFile?: BaseInputFile;
  inputYoutube?: BaseInputYoutube;
  inputParagraph?: BaseInputParagraph;
  inputAlignment?: BaseInputAlignment;
  inputTable?: BaseInputTable;
  inputLink?: {
    placeholder?: string;
  };
};

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
