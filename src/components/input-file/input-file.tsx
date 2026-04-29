// dear future developer, if you're reading this, i'm sorry
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Icon } from '../icons';
import { Text } from '../text';
import { inputFileVariants } from './input-file-variants';
import { PreviewItem } from './preview-item';
import type {
  FileItem,
  InputFileProps,
  InputFileRef,
  UploadedFile,
} from './type';

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

const InputFile = forwardRef<InputFileRef, InputFileProps>(
  (
    {
      value,
      onChange,
      multiple = false,
      accept,
      maxSize,
      maxFiles,
      disabled = false,
      variant = 'primary',
      buttonLabel = 'Choose File',
      label = 'Choose File',
      hint = 'JPG, PNG, dan PDF (Max. 5MB)',
      errorMessage,
      maxSizeErrorMessage,
      maxFilesErrorMessage,
      customNamePlaceholder,
      useCustomName,
      pdfViewerProps,
      audioPlayerProps,
      videoPlayerProps,
      onDownload,
      uploadConfig,
      onUploadSuccess,
      onRemoveFile,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const replaceInputRef = useRef<HTMLInputElement | null>(null);
    const uploadedFilesRef = useRef<UploadedFile<unknown>[]>([]);

    const [internalFiles, setInternalFiles] = useState<FileItem[]>([]);
    const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
    const [customNames, setCustomNames] = useState<Record<number, string>>({});
    const [isDragging, setIsDragging] = useState(false);
    const [internalErrorMessage, setInternalErrorMessage] = useState<string | undefined>(undefined); //prettier-ignore

    const [uploadProgress, setUploadProgress] = useState<
      Record<string, number>
    >({});

    const files = value ?? internalFiles;
    const filesRef = useRef<FileItem[]>(files);
    filesRef.current = files;

    const updateFiles = (
      updater: FileItem[] | ((prev: FileItem[]) => FileItem[])
    ) => {
      const next = typeof updater === 'function' ? updater(filesRef.current) : updater; //prettier-ignore
      filesRef.current = next;
      if (onChange) {
        onChange(next);
      } else {
        setInternalFiles(next);
      }
    };

    const processFiles = (selectedFiles: File[]) => {
      // Validasi maxFiles
      if (
        maxFiles !== undefined &&
        files.length + selectedFiles.length > maxFiles
      ) {
        setInternalErrorMessage(
          maxFilesErrorMessage ?? `Maksimal ${maxFiles} file`
        );
        return;
      }

      // Validasi maxSize
      if (maxSize !== undefined) {
        const oversized = selectedFiles.filter((file) => file.size > maxSize);
        if (oversized.length > 0) {
          setInternalErrorMessage(
            maxSizeErrorMessage ??
              `File ${oversized.map((f) => f.name).join(', ')} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`
          );
          return;
        }
      }
      setInternalErrorMessage(undefined);
      const mapped = selectedFiles.map((file) => ({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? []);
      processFiles(selected);

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const handleChangeCustomName = ({
      e,
      i,
    }: {
      e: React.ChangeEvent<HTMLInputElement>;
      i: number;
    }) => {
      if (replaceIndex !== null) return;
      const val = e.target.value;

      setCustomNames((prev) => ({
        ...prev,
        [i]: val,
      }));
    };

    const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (replaceIndex === null) return;

      const selected = e.target.files?.[0];
      if (!selected) return;

      // Validasi maxSize
      if (maxSize !== undefined && selected.size > maxSize) {
        setInternalErrorMessage(
          maxSizeErrorMessage ??
            `File ${selected.name} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`
        );
        return;
      }

      // Revoke old preview URL
      URL.revokeObjectURL(files[replaceIndex].preview);

      // Create new file item
      const newFileItem: FileItem = {
        id: crypto.randomUUID(),
        file: selected,
        customName: selected.name,
        preview: URL.createObjectURL(selected),
      };

      // Replace file at index
      const newFiles = [...files];
      newFiles[replaceIndex] = newFileItem;
      updateFiles(newFiles);
      if (uploadConfig) {
        uploadFile(newFileItem);
      }

      // Reset
      setReplaceIndex(null);
      if (replaceInputRef.current) {
        replaceInputRef.current.value = '';
      }
    };

    const clearAll = () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      updateFiles([]);
      uploadedFilesRef.current = [];
      if (inputRef.current) inputRef.current.value = '';
    };

    const removeFile = (index: number) => {
      const removed = files[index];
      URL.revokeObjectURL(removed.preview);
      updateFiles(files.filter((_, i) => i !== index));
      uploadedFilesRef.current = uploadedFilesRef.current.filter(
        (f) => f.id !== removed.id
      );

      onRemoveFile?.(removed.id!);

      setUploadProgress((prev) => {
        const next = { ...prev };
        delete next[removed.id!];
        return next;
      });
    };

    const triggerReplace = (index: number) => {
      setReplaceIndex(index);
      replaceInputRef.current?.click();
    };

    const openFilePicker = () => {
      inputRef.current?.click();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      // Only set to false if leaving the label element itself
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

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);

      // Filter by accept type if specified
      let filteredFiles = droppedFiles;
      if (accept !== undefined) {
        const acceptedTypes = accept.split(',').map((type) => type.trim());
        filteredFiles = droppedFiles.filter((file) => {
          return acceptedTypes.some((acceptedType) => {
            if (acceptedType.startsWith('.')) {
              return file.name.endsWith(acceptedType);
            }
            if (acceptedType.endsWith('/*')) {
              const baseType = acceptedType.split('/')[0];
              return file.type.startsWith(baseType + '/');
            }
            return file.type === acceptedType;
          });
        });

        if (filteredFiles.length !== droppedFiles.length) {
          setInternalErrorMessage(
            `Some files do not match the allowed types: ${accept}`
          );
        }
      }

      if (filteredFiles.length > 0) {
        processFiles(filteredFiles);
      }
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

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = event.loaded / event.total; // 0–1
          updateFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, hint: 'Uploading...' } : f
            )
          );
          setUploadProgress((prev) => ({ ...prev, [fileItem.id!]: percent }));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress((prev) => ({ ...prev, [fileItem.id!]: 1 }));

          let parsed: unknown | null = null;
          try {
            parsed = JSON.parse(xhr.responseText);
          } catch (err) {
            console.error(err);
          }

          const extractUrl = uploadConfig.extractUrl ?? defaultExtractUrl;
          const uploadedUrl = extractUrl(parsed);

          updateFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id
                ? {
                    ...f,
                    uploadStatus: 'success',
                    hint: 'Completed',
                    uploadedUrl,
                  }
                : f
            )
          );

          setTimeout(() => {
            setUploadProgress((prev) => {
              const next = { ...prev };
              delete next[fileItem.id!];
              return next;
            });
          }, 800);

          const result: UploadedFile<unknown> = {
            ...fileItem,
            id: fileItem.id!,
            originalName: fileItem.file.name,
            customName: fileItem.customName,
            uploadedData: parsed,
          };

          uploadedFilesRef.current = [...uploadedFilesRef.current, result];
          onUploadSuccess?.(uploadedFilesRef.current);
        } else {
          handleUploadError(fileItem, `Server error: ${xhr.status}`);
          uploadConfig.onError?.(fileItem, `Server error: ${xhr.status}`);
        }
      };

      xhr.onerror = () => {
        handleUploadError(
          fileItem,
          uploadConfig?.errorMessage ?? 'Failed Try Again'
        );

        uploadConfig.onError?.(
          fileItem,
          uploadConfig?.errorMessage ?? 'Failed Try Again'
        );

        setTimeout(() => {
          setUploadProgress((prev) => {
            const next = { ...prev };
            delete next[fileItem.id!];
            return next;
          });
        }, 800);
      };

      updateFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id ? { ...f, uploadStatus: 'uploading' } : f
        )
      );

      setUploadProgress((prev) => ({ ...prev, [fileItem.id!]: 0 }));

      xhr.open(method, url);
      Object.entries(headers).forEach(([key, val]) =>
        xhr.setRequestHeader(key, val)
      );
      xhr.send(formData);
    };

    const handleUploadError = (fileItem: FileItem, message: string) => {
      updateFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id
            ? {
                ...f,
                uploadStatus: 'error',
                errorMessage: message,
                hint: undefined,
              }
            : f
        )
      );
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      clearAll,
      openFilePicker,
      getFiles: () =>
        files.map((f, i) => {
          const base = { ...f };

          if (useCustomName !== undefined) {
            base.customName = customNames[i] ?? f.customName ?? f.file.name;
          }

          return base;
        }),
    }));

    useEffect(() => {
      return () => {
        files.forEach((f) => URL.revokeObjectURL(f.preview));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (errorMessage !== undefined) {
        setInternalErrorMessage(errorMessage);
      }
    }, [errorMessage]);

    const isDefault = variant === "primary" || variant === "secondary" || variant === "gray"; //prettier-ignore
    const isSized = variant === 'medium' || variant === 'large';

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label
            onDragEnter={
              variant === 'large' || variant === 'medium'
                ? handleDragEnter
                : undefined
            }
            onDragLeave={
              variant === 'large' || variant === 'medium'
                ? handleDragLeave
                : undefined
            }
            onDragOver={
              variant === 'large' || variant === 'medium'
                ? handleDragOver
                : undefined
            }
            onDrop={
              variant === 'large' || variant === 'medium'
                ? handleDrop
                : undefined
            }
            className={cn(
              inputFileVariants({ variant }),
              'group relative flex items-center gap-2 rounded-lg border px-3 py-2 transition-all',
              isDefault && "w-fit outline-2 outline-offset-1 outline-transparent", //prettier-ignore
              isSized && "w-full border-dashed border-gray-400 bg-gray-50", //prettier-ignore

              variant === 'large' && internalErrorMessage !== undefined && 'border-danger-500', //prettier-ignore
              variant === 'large' && 'flex-col items-center p-5!',
              (variant === 'large' || variant === 'medium') && isDragging && "border-primary-500 bg-primary-50", //prettier-ignore
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}
          >
            {isDefault && <Icon name="upload" />}
            {isSized && (
              <Icon name="cloud-upload" size={variant === 'large' ? 125 : 40} />
            )}

            <div
              className={cn(
                'flex flex-1 flex-col',
                variant === 'large' && '*:text-center'
              )}
            >
              <Text
                as="h3"
                value={label}
                weight="semibold"
                className={cn(isSized && 'text-gray-800!')}
              />
              {isSized && (
                <Text
                  as="p"
                  value={
                    (variant === 'large' || variant === 'medium') &&
                    !isDragging &&
                    !hint
                      ? `Klik atau drag & drop file disini`
                      : hint
                  }
                  className="text-gray-600!"
                />
              )}
            </div>

            {internalErrorMessage !== undefined && variant === 'large' && (
              <Text
                value={internalErrorMessage}
                variant="t3"
                className="text-left"
                color="danger"
              />
            )}

            {isSized && (
              <Button onClick={() => inputRef.current?.click()} type="button">
                <Text
                  as={'span'}
                  value={buttonLabel}
                  weight="semibold"
                  className="text-white!"
                />
              </Button>
            )}

            <input
              ref={inputRef}
              type="file"
              multiple={multiple}
              accept={accept}
              onChange={handleChange}
              disabled={disabled}
              className="absolute inset-0 -z-10 cursor-pointer opacity-0"
            />
          </label>

          {internalErrorMessage !== undefined && variant === 'medium' && (
            <Text
              value={internalErrorMessage}
              variant="t3"
              className="text-left"
              color="danger"
            />
          )}
        </div>

        {/* Hidden input for replace functionality */}
        <input
          ref={replaceInputRef}
          type="file"
          accept={accept}
          onChange={handleReplace}
          className="hidden"
        />

        {files.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Text
                value="Selected Files"
                variant="t1"
                weight="semibold"
                as={'h1'}
              />
              <button
                type="button"
                onClick={clearAll}
                disabled={disabled}
                className="cursor-pointer disabled:opacity-50"
              >
                <Text value="Clear" weight="semibold" color="danger" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {files.map((item, i) => (
                <PreviewItem
                  data={item}
                  disabled={disabled}
                  key={item?.id}
                  audioPlayerProps={audioPlayerProps}
                  pdfViewerProps={pdfViewerProps}
                  videoPlayerProps={videoPlayerProps}
                  onRemove={() => removeFile(i)}
                  onReplace={() => triggerReplace(i)}
                  labelCustomName={item?.label}
                  customNamePlaceholder={customNamePlaceholder}
                  progress={uploadConfig ? uploadProgress[item.id!] : undefined}
                  customName={
                    customNames[i] ?? item.customName ?? item.file.name
                  }
                  onDownload={(data) =>
                    onDownload?.({ src: data?.src, name: data?.name })
                  }
                  onCustomNameChange={
                    useCustomName !== undefined
                      ? (e) => handleChangeCustomName?.({ e, i })
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

InputFile.displayName = 'InputFile';

export { InputFile };
