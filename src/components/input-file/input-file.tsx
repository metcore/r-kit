// dear future developer, if you're reading this, i'm sorry
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Icon } from "../icons";
import { Text } from "../text";
import { inputFileVariants } from "./input-file-variants";
import { PreviewItem } from "./preview-item";
import type { FileItem, InputFileProps, InputFileRef } from "./type";

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
      variant = "primary",
      buttonLabel = "Choose File",
      label = "Choose File",
      hint = "JPG, PNG, dan PDF (Max. 5MB)",
      errorMessage,
      maxSizeErrorMessage,
      maxFilesErrorMessage,
      customNamePlaceholder,
      useCustomName,
      pdfViewerProps,
      audioPlayerProps,
      videoPlayerProps,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const replaceInputRef = useRef<HTMLInputElement | null>(null);

    const [internalFiles, setInternalFiles] = useState<FileItem[]>([]);
    const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
    const [customNames, setCustomNames] = useState<Record<number, string>>({});
    const [isDragging, setIsDragging] = useState(false);

    const files = value ?? internalFiles;
    const setFiles = onChange ?? setInternalFiles;

    const processFiles = (selectedFiles: File[]) => {
      // Validasi maxFiles
      if (maxFiles && files.length + selectedFiles.length > maxFiles) {
        alert(maxFilesErrorMessage ?? `Maksimal ${maxFiles} file`);
        return;
      }

      // Validasi maxSize
      if (maxSize) {
        const oversized = selectedFiles.filter((file) => file.size > maxSize);
        if (oversized.length > 0) {
          alert(
            maxSizeErrorMessage ??
              `File ${oversized.map((f) => f.name).join(", ")} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`,
          );
          return;
        }
      }

      const mapped = selectedFiles.map((file) => ({
        file,
        customName: file.name,
        preview: URL.createObjectURL(file),
      }));

      setFiles([...files, ...mapped]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? []);
      processFiles(selected);

      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
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
      if (maxSize && selected.size > maxSize) {
        alert(
          maxSizeErrorMessage ??
            `File ${selected.name} melebihi ukuran maksimal ${(maxSize / 1024 / 1024).toFixed(2)} MB`,
        );
        return;
      }

      // Revoke old preview URL
      URL.revokeObjectURL(files[replaceIndex].preview);

      // Create new file item
      const newFileItem: FileItem = {
        file: selected,
        preview: URL.createObjectURL(selected),
      };

      // Replace file at index
      const newFiles = [...files];
      newFiles[replaceIndex] = newFileItem;
      setFiles(newFiles);

      // Reset
      setReplaceIndex(null);
      if (replaceInputRef.current) {
        replaceInputRef.current.value = "";
      }
    };

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      URL.revokeObjectURL(files[index].preview);
      setFiles(newFiles);
    };

    const clearAll = () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
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
      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        filteredFiles = droppedFiles.filter((file) => {
          return acceptedTypes.some((acceptedType) => {
            if (acceptedType.startsWith(".")) {
              return file.name.endsWith(acceptedType);
            }
            if (acceptedType.endsWith("/*")) {
              const baseType = acceptedType.split("/")[0];
              return file.type.startsWith(baseType + "/");
            }
            return file.type === acceptedType;
          });
        });

        if (filteredFiles.length !== droppedFiles.length) {
          alert(
            `Beberapa file tidak sesuai dengan tipe yang diizinkan: ${accept}`,
          );
        }
      }

      if (filteredFiles.length > 0) {
        processFiles(filteredFiles);
      }
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      clearAll,
      openFilePicker,
      getFiles: () =>
        files.map((f, i) => {
          const base = { ...f };

          if (useCustomName) {
            base.customName = customNames[i] ?? f.customName ?? f.file.name;
          }

          return base;
        }),
    }));

    useEffect(() => {
      return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
    }, [files]);

    const isDefault = variant === "primary" || variant === "secondary" || variant === "gray"; //prettier-ignore
    const isSized = variant === "medium" || variant === "large";

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label
            className={cn(
              inputFileVariants({ variant }),
              "group relative flex items-center gap-2 rounded-lg border px-3 py-2 transition-all",
              isDefault && "w-fit outline-2 outline-offset-1 outline-transparent", //prettier-ignore
              isSized && "w-full border-dashed border-gray-400 bg-gray-50", //prettier-ignore

              variant === "large" && !!errorMessage && "border-danger-500",
              variant === "large" && "flex-col items-center p-5!",
              variant === "large" && isDragging && "border-primary-500 bg-primary-50", //prettier-ignore
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            )}
            onDragEnter={variant === "large" ? handleDragEnter : undefined}
            onDragLeave={variant === "large" ? handleDragLeave : undefined}
            onDragOver={variant === "large" ? handleDragOver : undefined}
            onDrop={variant === "large" ? handleDrop : undefined}
          >
            {isDefault && <Icon name="upload" />}
            {isSized && (
              <Icon name="cloud-upload" size={variant === "large" ? 125 : 40} />
            )}

            <div
              className={cn(
                "flex flex-1 flex-col",
                variant === "large" && "*:text-center",
              )}
            >
              <Text
                as="h3"
                value={label}
                weight="semibold"
                className={cn(isSized && "text-gray-800!")}
              />
              {isSized && (
                <Text
                  as="p"
                  value={
                    variant === "large" && !isDragging && !hint
                      ? `Klik atau drag & drop file disini`
                      : hint
                  }
                  className="text-gray-600!"
                />
              )}
            </div>

            {errorMessage && variant === "large" && (
              <Text
                value={errorMessage}
                variant="t3"
                className="text-left"
                color="danger"
              />
            )}

            {isSized && (
              <Button onClick={() => inputRef.current?.click()}>
                <Text
                  as={"span"}
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

          {errorMessage && variant === "medium" && (
            <Text
              value={errorMessage}
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
                as={"h1"}
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
                  key={i}
                  data={item}
                  audioPlayerProps={audioPlayerProps}
                  pdfViewerProps={pdfViewerProps}
                  videoPlayerProps={videoPlayerProps}
                  onRemove={() => removeFile(i)}
                  onReplace={() => triggerReplace(i)}
                  labelCustomName={item?.label}
                  customNamePlaceholder={customNamePlaceholder}
                  onCustomNameChange={
                    useCustomName
                      ? (e) => handleChangeCustomName?.({ e, i })
                      : undefined
                  }
                  customName={
                    customNames[i] ?? item.customName ?? item.file.name
                  }
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

InputFile.displayName = "InputFile";

export { InputFile };
