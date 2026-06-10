import clsx from 'clsx';
import { Text } from '../text';
import { PreviewItem } from './preview-item';
import type { FileItem, InputFilePreviewProps } from './type';

export function InputFilePreview({
  inputFile,
  className,
  customNamePlaceholder,
  pdfViewerProps,
  audioPlayerProps,
  videoPlayerProps,
  onDownload,
  mode,
}: InputFilePreviewProps) {
  const {
    files,
    disabled,
    accept,
    uploadProgress,
    uploadState,
    customNames,
    customNameEnabled,
    removeFile,
    triggerReplace,
    clearAll,
    setCustomName,
    handleReplace,
    replaceInputRef,
  } = inputFile;

  if (files.length === 0) return null;

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <input
        ref={replaceInputRef}
        type="file"
        accept={accept}
        onChange={handleReplace}
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <Text value="Selected Files" variant="t1" weight="semibold" as="h1" />
        <button
          type="button"
          onClick={clearAll}
          disabled={disabled}
          className="cursor-pointer disabled:opacity-50"
        >
          <Text value="Clear" weight="semibold" color="danger" />
        </button>
      </div>

      <div
        className={`flex ${mode == 'compact' ? 'flex-wrap' : 'flex-col'} gap-3`}
      >
        {files.map((item, i) => {
          const data: FileItem = { ...item, ...(uploadState[item.id!] ?? {}) };
          return (
            <PreviewItem
              key={item.id}
              data={data}
              mode={mode}
              disabled={disabled}
              audioPlayerProps={audioPlayerProps}
              pdfViewerProps={pdfViewerProps}
              videoPlayerProps={videoPlayerProps}
              onRemove={() => removeFile(i)}
              onReplace={() => triggerReplace(i)}
              labelCustomName={item?.label}
              customNamePlaceholder={customNamePlaceholder}
              progress={uploadProgress[item.id!]}
              customName={
                customNames[item.id!] ?? item.customName ?? item.file.name
              }
              onDownload={(d) => onDownload?.({ src: d?.src, name: d?.name })}
              onCustomNameChange={
                customNameEnabled
                  ? (e) => setCustomName(item.id!, e.target.value)
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

InputFilePreview.displayName = 'InputFilePreview';
