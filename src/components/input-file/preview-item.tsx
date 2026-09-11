import { useEffect, useRef, useState } from 'react';
import { FormLabel } from '../form';
import { Icon } from '../icons';
import { Input } from '../input/input';
import { ModalPreviewAttachment } from '../modal/modal-preview-attachment';
import ProgressBar from '../progress-bar/progress-bar';
import { Text } from '../text';
import { getIconName } from './helpers';
import type { PreviewItemProps } from './type';
import clsx from 'clsx';

const PreviewItem = ({
  data,
  onRemove,
  onReplace,
  disabled = false,
  mode = 'detailed',
  labelCustomName = 'Attachment File',
  onCustomNameChange,
  customNamePlaceholder = 'Name Attachment',
  customName,
  audioPlayerProps,
  pdfViewerProps,
  videoPlayerProps,
  onDownload,
  progress,
  hideDownloadButton = false,
}: PreviewItemProps) => {
  const [previewShow, setPreviewShow] = useState({
    isOpen: false,
    isVisible: false,
  });
  const [imageFailed, setImageFailed] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read normalized fields (works for BOTH local File items and remote items).
  // For a local file these resolve exactly as before; for a remote file there is
  // no `data.file`, so reading `data.file.*` here would crash.
  const isImage = data.type?.startsWith('image/') === true;
  const isMp3 = data.type?.startsWith('audio/') === true;
  const isVideo = data.type?.startsWith('video/') === true;
  const isPdf = data.type === 'application/pdf';

  const isNotViewable = !isImage && !isMp3 && !isVideo && !isPdf;
  const showImage = isImage && !imageFailed && Boolean(data.preview);

  const iconName = getIconName({ fileType: data.type, fileName: data.name });

  useEffect(() => {
    setImageFailed(false);
  }, [data.preview]);

  useEffect(
    () => () => {
      if (closeTimerRef.current != null) clearTimeout(closeTimerRef.current);
    },
    []
  );

  const handleOpenPreview = () => {
    if (closeTimerRef.current != null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setPreviewShow({ isOpen: true, isVisible: false });
    requestAnimationFrame(() => {
      setPreviewShow({ isOpen: true, isVisible: true });
    });
  };

  const handleClosePreview = () => {
    setPreviewShow((s) => ({ ...s, isVisible: false }));
    if (closeTimerRef.current != null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setPreviewShow({ isOpen: false, isVisible: false });
    }, 200);
  };

  return (
    <>
      {mode === 'compact' ? (
        <div className="relative w-fit">
          <div
            className={clsx(
              'relative flex size-15 items-center justify-center overflow-hidden rounded-lg border bg-gray-50',
              data?.uploadStatus === 'error' ? 'border' : 'border-gray-200'
            )}
          >
            {showImage ? (
              <img
                src={data.preview}
                alt={data.name}
                className="size-full object-cover"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <Icon name={iconName ?? 'doc'} className="size-10" />
            )}

            {data?.uploadStatus === 'error' ? (
              <button
                type="button"
                onClick={onReplace}
                disabled={disabled}
                title="Replace file"
                aria-label={`Replace ${data.name}`}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-colors hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon name="rotate-right" className="size-6 text-white" />
              </button>
            ) : data?.uploadStatus === 'uploading' ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                <span className="border-t-success-500 gray-3 size-6 animate-spin rounded-full border-2" />
              </div>
            ) : (
              !isNotViewable && (
                <button
                  type="button"
                  onClick={handleOpenPreview}
                  title="Preview"
                  aria-label={`Preview ${data.name}`}
                  className="absolute inset-0 cursor-pointer"
                />
              )
            )}
          </div>

          <button
            type="button"
            onClick={onRemove}
            disabled={disabled}
            title="Remove file"
            aria-label={`Remove ${data.name}`}
            className={clsx(
              'absolute -top-1 -right-1 z-10 flex size-6 items-center justify-center rounded-full text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50',
              data?.uploadStatus === 'error' ? 'bg-danger-500' : 'bg-gray-900'
            )}
          >
            <Icon name="times" className="size-3" />
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {!!onCustomNameChange && (
            <div className="flex w-full flex-col gap-2">
              <FormLabel>{labelCustomName}</FormLabel>
              <Input
                type="text"
                onChange={onCustomNameChange}
                placeholder={customNamePlaceholder}
                value={customName ?? ''}
                className={'truncate'}
              />
            </div>
          )}

          <div className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 p-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <button
                  type="button"
                  className="cursor-pointer disabled:cursor-not-allowed"
                  onClick={handleOpenPreview}
                  disabled={isNotViewable}
                  title={isNotViewable ? undefined : 'Preview'}
                  aria-label={`Preview ${data.name}`}
                >
                  {showImage ? (
                    <img
                      src={data.preview}
                      alt={data.name}
                      className="size-11 rounded-md object-cover"
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    <Icon name={iconName ?? 'doc'} className="size-11" />
                  )}
                </button>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <Text
                    as="h3"
                    value={data.name}
                    variant="t1"
                    weight="semibold"
                    className="truncate"
                  />
                  <div className="flex flex-wrap items-center gap-1">
                    {data.size !== undefined && (
                      <Text
                        value={`${(data.size / 1024 / 1024).toFixed(2)} MB`}
                        className="truncate text-gray-700!"
                      />
                    )}
                    {data.size !== undefined &&
                      (Boolean(data?.hint) || Boolean(data?.errorMessage)) && (
                        <Text value={'•'} className="truncate text-gray-700!" />
                      )}
                    {Boolean(data?.hint) && (
                      <Text
                        value={data?.hint ?? ''}
                        className={clsx(
                          'truncate text-gray-700 transition-colors',
                          data?.uploadStatus === 'success' &&
                            'text-success-500!',
                          data?.uploadStatus === 'error' && 'text-danger-500!'
                        )}
                      />
                    )}
                    {Boolean(data?.hint) && Boolean(data?.errorMessage) && (
                      <Text value={'•'} className="truncate text-gray-700!" />
                    )}
                    {Boolean(data?.errorMessage) && (
                      <Text value={data?.errorMessage ?? ''} color="danger" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {Boolean(data?.errorMessage) && (
                  <>
                    <button
                      type="button"
                      onClick={onReplace}
                      disabled={disabled}
                      className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                      title="Replace file"
                      aria-label={`Replace ${data.name}`}
                    >
                      <Icon
                        name="rotate-right"
                        className="size-4 text-gray-700"
                      />
                    </button>
                    <Icon
                      name="exclamation-triangle"
                      className="text-danger-500 size-4"
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={disabled}
                  className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  title="Remove file"
                  aria-label={`Remove ${data.name}`}
                >
                  <Icon name="times" className="size-4 text-gray-700" />
                </button>
              </div>
            </div>

            {progress !== undefined && (
              <div className="flex flex-1 items-center gap-2">
                <ProgressBar
                  color="success"
                  value={Number((progress * 100).toFixed(0))}
                  className="flex-1"
                />
                <Text
                  value={`${(progress * 100).toFixed(0)}%`}
                  variant="t3"
                  weight="medium"
                  className="text-gray-900"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Di-mount hanya saat dibutuhkan: sebelumnya tiap file selalu mem-mount modal
          (termasuk iframe/audio/video) walau tidak pernah dibuka. */}
      {previewShow.isOpen && (
        <ModalPreviewAttachment
          type={data.type}
          name={data?.customName ?? data.name}
          src={data?.preview}
          open={previewShow}
          onDownload={() =>
            onDownload?.({
              src: data?.preview,
              name: data.name,
              id: data.id,
              url:
                data.uploadedUrl ??
                (data.source === 'remote' ? data.url : undefined),
            })
          }
          onClose={() => handleClosePreview()}
          audioProps={audioPlayerProps}
          videoProps={videoPlayerProps}
          iframeProps={pdfViewerProps}
          hideDownloadButton={hideDownloadButton}
        />
      )}
    </>
  );
};

export { PreviewItem };
