import { useEffect, useRef } from 'react';
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
  title = 'Selected Files',
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  maxHeight = 320,
  hideDownloadButton = false,
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

  const infinite = onLoadMore !== undefined;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!infinite) return;
    const root = scrollRef.current;
    const target = sentinelRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore?.();
        }
      },
      { root, rootMargin: '120px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [infinite, hasMore, isLoadingMore, onLoadMore, files.length]);

  if (files.length === 0) return null;

  const list = (
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
            hideDownloadButton={hideDownloadButton}
          />
        );
      })}
    </div>
  );

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
        <Text value={title} variant="t1" weight="semibold" as="h1" />
        <button
          type="button"
          onClick={clearAll}
          disabled={disabled}
          className="cursor-pointer disabled:opacity-50"
        >
          <Text value="Clear" weight="semibold" color="danger" />
        </button>
      </div>

      {infinite ? (
        <div
          ref={scrollRef}
          className="overflow-y-auto py-1"
          style={{ maxHeight }}
        >
          {list}
          {isLoadingMore && (
            <div className="flex items-center justify-center gap-2 py-3">
              <span className="border-t-success-500 size-5 animate-spin rounded-full border-2 border-gray-200" />
              <Text
                value="Loading..."
                variant="t3"
                className="text-gray-600!"
              />
            </div>
          )}
          <div ref={sentinelRef} className="h-px w-full" />
        </div>
      ) : (
        list
      )}
    </div>
  );
}

InputFilePreview.displayName = 'InputFilePreview';
