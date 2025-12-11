import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "../button";
import { Icon } from "../icons";
import { FormField } from "../form";
import { cn } from "../../lib/utils";
import type {
  DisplayFile,
  FileInputProps,
  FilePickerProps,
  FilePreviewItemProps,
} from "./type";
import {
  convertExistingFileToDisplayFile,
  formatFileSize,
  generateFileId,
  getFileTypeConfig,
  revokeObjectURL,
} from "./utils";

const UploadIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 40 40"
    aria-hidden="true"
  >
    <path
      fill="#F1F3F9"
      stroke="#D6DCE8"
      d="M19.918 36.542c9.229 0 16.749-7.489 16.749-16.687-.032-9.228-7.52-16.717-16.749-16.717-9.26 0-16.748 7.489-16.748 16.686 0 9.229 7.489 16.718 16.748 16.718Z"
      strokeMiterlimit="10"
      strokeWidth=".621"
    />
    <path
      fill="#fff"
      stroke="#D6DCE8"
      d="M37.662 21.969c0 3.573-2.89 6.463-6.494 6.463H9.48c-4.319.093-7.768-3.356-7.768-7.52a7.46 7.46 0 0 1 7.861-7.457c3.76-11.746 20.975-10.1 22.435 2.05 3.232.404 5.655 3.139 5.655 6.463Z"
      strokeMiterlimit="10"
      strokeWidth=".621"
    />
    <path
      fill="#fff"
      d="M31.911 15.536c-.248-.03-.497-.03-.745-.03a6.54 6.54 0 0 0-3.512 1.025"
    />
    <path
      stroke="#D6DCE8"
      d="M31.911 15.536c-.248-.03-.497-.03-.745-.03a6.54 6.54 0 0 0-3.512 1.025"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth=".621"
    />
    <path
      fill="#fff"
      d="M9.571 13.455q-.56 1.677-.56 3.542c0 .497.032.963.094 1.43"
    />
    <path
      stroke="#D6DCE8"
      d="M9.571 13.455q-.56 1.677-.56 3.542c0 .497.032.963.094 1.43"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth=".621"
    />
    <path
      fill="#D6DCE8"
      stroke="#AAB2C5"
      d="M15.754 21.41a7.7 7.7 0 0 1 4.164-1.213c4.164 0 7.55 3.356 7.55 7.52s-3.386 7.52-7.55 7.52-7.55-3.356-7.55-7.52c-.063-2.641 1.304-4.94 3.386-6.308Z"
      strokeMiterlimit="10"
      strokeWidth=".621"
    />
    <path
      fill="#fff"
      stroke="#AAB2C5"
      d="M19.857 24.3c.136 0 .284.018.42.07a.74.74 0 0 1 .335.245l2.106 2.105a.987.987 0 0 1 0 1.372c-.377.377-1 .36-1.39.013l-.01-.009-.435-.423v2.685c0 .544-.45.995-.995.995s-.994-.45-.994-.995v-2.685l-.437.423c-.377.373-.997.354-1.386.009l-.007-.006-.005-.007c-.204-.203-.309-.435-.309-.685 0-.115.022-.249.073-.374a.76.76 0 0 1 .241-.32l2.107-2.105c.076-.076.184-.149.29-.202a.9.9 0 0 1 .396-.107Z"
      strokeWidth=".621"
    />
    <path
      fill="#F1F3F9"
      d="M36.946 14.014a1.274 1.274 0 1 0 0-2.548 1.274 1.274 0 0 0 0 2.548m1.864-4.972a.87.87 0 1 0 0-1.74.87.87 0 0 0 0 1.74M3.573 11.901a.87.87 0 1 0 0-1.74.87.87 0 0 0 0 1.74M1.616 31.042a1.616 1.616 0 1 0 0-3.231 1.616 1.616 0 0 0 0 3.231"
    />
  </svg>
);

const FilePicker: React.FC<FilePickerProps> = ({
  size,
  onClick,
  disabled,
  buttonColor,
}) => {
  const buttonProps = {
    onClick,
    disabled,
    className: "gap-2",
    buttonColor,
  };

  if (size === "sm") {
    return (
      <Button
        {...buttonProps}
        variant={buttonColor === "secondary" ? "outline" : "default"}
        color={buttonColor || "primary"}
        className={cn(buttonProps.className, "w-fit")}
      >
        <Icon name="upload" size={16} />
        Choose File
      </Button>
    );
  }

  if (size === "md") {
    return (
      <div className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-3">
        <UploadIcon size={40} />
        <div className="grow text-sm font-semibold text-gray-600">
          Upload File
        </div>
        <Button
          variant={buttonColor === "secondary" ? "outline" : "default"}
          color={buttonColor || "primary"}
          {...buttonProps}
        >
          Choose File
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-4">
      <UploadIcon size={124} />
      <div className="text-sm font-semibold text-gray-600">Upload File</div>
      <Button
        variant={buttonColor === "secondary" ? "outline" : "default"}
        color={buttonColor || "primary"}
        {...buttonProps}
      >
        Choose File
      </Button>
    </div>
  );
};

const FilePreviewItem: React.FC<FilePreviewItemProps> = ({
  file,
  onDelete,
  onPreview,
}) => {
  const fileTypeConfig = getFileTypeConfig(file.type);
  const isImage = file.type.startsWith("image/");

  return (
    <div className="flex cursor-pointer flex-row items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-2 transition hover:bg-gray-50">
      <div className="flex grow flex-row gap-2" onClick={onPreview}>
        {isImage && file.preview ? (
          <img
            src={file.preview}
            alt={file.name}
            className="h-11 w-11 rounded border border-gray-100 object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded bg-gray-100 text-xl">
            {fileTypeConfig.icon}
          </div>
        )}
        <div className="overflow-hidden text-left text-gray-700">
          <p
            className="max-w-full truncate text-sm font-normal"
            title={file.name}
          >
            {file.name}
          </p>
          <p className="text-xs font-light text-gray-500">
            {formatFileSize(file.size)} MB
          </p>
        </div>
      </div>

      <button
        className="cursor-pointer p-1 text-gray-500 transition hover:text-red-600"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title={`Delete ${file.name}`}
        aria-label={`Delete ${file.name}`}
      >
        ✕
      </button>
    </div>
  );
};

export const FileInput: React.FC<FileInputProps> = ({
  label,
  description,
  maxFileSize,
  accept = [],
  multiple = false,
  hint,
  size = "sm",
  errorMessages,
  className,
  onChange,
  disabled = false,
  existingFiles = [],
  onDelete,
  buttonColor = "primary",
}) => {
  const [displayFiles, setDisplayFiles] = useState<DisplayFile[]>([]);
  const [deletedUrls, setDeletedUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize existing files on mount or when existingFiles prop changes
  useEffect(() => {
    if (existingFiles.length > 0) {
      const converted = existingFiles.map(convertExistingFileToDisplayFile);
      setDisplayFiles(converted);
    }
  }, [existingFiles]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      displayFiles.forEach((file) => {
        if (!file.isExisting) {
          revokeObjectURL(file.preview);
        }
      });
    };
  }, [displayFiles]);

  /**
   * Notifies parent component of changes
   */
  const notifyChanges = useCallback(
    (files: DisplayFile[], deleted: string[]) => {
      const newFiles = files
        .filter((f) => !f.isExisting && f.file)
        .map((f) => f.file as File);

      onChange?.(newFiles, deleted);
    },
    [onChange],
  );

  /**
   * Validates file size
   */
  const validateFileSize = useCallback(
    (file: File): boolean => {
      if (!maxFileSize) return true;
      const fileSizeMB = parseFloat(formatFileSize(file.size));
      if (fileSizeMB > maxFileSize) {
        alert(
          `File "${file.name}" (${fileSizeMB} MB) exceeds maximum size of ${maxFileSize} MB`,
        );
        return false;
      }
      return true;
    },
    [maxFileSize],
  );

  /**
   * Validates file type
   */
  const validateFileType = useCallback(
    (file: File): boolean => {
      if (accept.length === 0) return true;

      const allowedMimeTypes = accept.map((type) => type.trim().toLowerCase());
      const isValid = allowedMimeTypes.includes(file.type.toLowerCase());

      if (!isValid) {
        alert(
          `File type "${file.type}" is not supported for "${file.name}". Allowed types: ${accept.join(", ")}`,
        );
      }

      return isValid;
    },
    [accept],
  );

  /**
   * Creates a DisplayFile from a File
   */
  const createDisplayFileFromFile = useCallback((file: File): DisplayFile => {
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;

    return {
      id: `new-${generateFileId()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      preview,
      isExisting: false,
      file,
    };
  }, []);

  /**
   * Processes selected files
   */
  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const filesArray = Array.from(fileList);
      const validDisplayFiles: DisplayFile[] = [];

      for (const file of filesArray) {
        if (!validateFileSize(file) || !validateFileType(file)) {
          continue;
        }

        validDisplayFiles.push(createDisplayFileFromFile(file));
      }

      if (validDisplayFiles.length === 0) return;

      let finalFiles: DisplayFile[];

      if (multiple) {
        finalFiles = [...displayFiles, ...validDisplayFiles];
      } else {
        // Cleanup old files if not multiple
        displayFiles.forEach((file) => {
          if (!file.isExisting) {
            revokeObjectURL(file.preview);
          }
        });
        finalFiles = validDisplayFiles;
      }

      setDisplayFiles(finalFiles);
      notifyChanges(finalFiles, deletedUrls);
    },
    [
      displayFiles,
      multiple,
      validateFileSize,
      validateFileType,
      createDisplayFileFromFile,
      notifyChanges,
      deletedUrls,
    ],
  );

  /**
   * Handles file input change
   */
  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(event.target.files);
      // Reset input value to allow selecting the same file again
      event.target.value = "";
    },
    [processFiles],
  );

  /**
   * Handles file deletion
   */
  const handleDeleteFile = useCallback(
    (fileId: string) => {
      const fileToDelete = displayFiles.find((f) => f.id === fileId);
      if (!fileToDelete) return;

      // Track deleted existing files
      let newDeletedUrls = deletedUrls;
      if (fileToDelete.isExisting && fileToDelete.url) {
        newDeletedUrls = [...deletedUrls, fileToDelete.url];
        setDeletedUrls(newDeletedUrls);
        onDelete?.(fileToDelete.url);
      } else if (!fileToDelete.isExisting) {
        // Cleanup blob URL for new files
        revokeObjectURL(fileToDelete.preview);
      }

      const newFiles = displayFiles.filter((f) => f.id !== fileId);
      setDisplayFiles(newFiles);
      notifyChanges(newFiles, newDeletedUrls);
    },
    [displayFiles, deletedUrls, onDelete, notifyChanges],
  );

  /**
   * Handles file preview
   */
  const handlePreviewFile = useCallback((file: DisplayFile) => {
    if (file.isExisting && file.url) {
      window.open(file.url, "_blank");
    } else if (file.preview) {
      window.open(file.preview, "_blank");
    }
  }, []);

  /**
   * Opens file picker dialog
   */
  const handleOpenFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={cn("w-full space-y-6", className)}>
      <FormField
        label={label}
        description={description}
        hint={hint}
        errorMessages={errorMessages}
      >
        <FilePicker
          size={size}
          onClick={handleOpenFilePicker}
          disabled={disabled}
          buttonColor={buttonColor}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={accept.join(",")}
          multiple={multiple}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="sr-only"
          aria-label="File input"
        />
      </FormField>

      {displayFiles.length > 0 && (
        <div
          className="flex flex-col gap-2"
          role="list"
          aria-label="Selected files"
        >
          {displayFiles.map((file) => (
            <FilePreviewItem
              key={file.id}
              file={file}
              onDelete={() => handleDeleteFile(file.id)}
              onPreview={() => handlePreviewFile(file)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
