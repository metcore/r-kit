import { useState } from 'react';
import { FormLabel } from '../form';
import { Icon } from '../icons';
import { Input } from '../input/input';
import { ModalPreviewAttachment } from '../modal/modal-preview-attachment';
import ProgressBar from '../progress-bar/progress-bar';
import { Text } from '../text';
import { getIconName } from './helpers';
import type { PreviewItemProps } from './type';
import clsx from 'clsx';

// man... i love using display flex :)

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
}: PreviewItemProps) => {
  const [previewShow, setPreviewShow] = useState({
    isOpen: false,
    isVisible: false,
  });

  const isImage = data?.file?.type?.startsWith('image/');
  const isMp3 = data?.file?.type?.startsWith('audio/');
  const isVideo = data?.file?.type?.startsWith('video/');
  const isPdf = data?.file?.type === 'application/pdf';

  const isNotViewable = !isImage && !isMp3 && !isVideo && !isPdf;

  const iconName = getIconName({ file: data.file });

  const handleOpenPreview = () => {
    setPreviewShow({ isOpen: true, isVisible: false });
    requestAnimationFrame(() => {
      setPreviewShow({ isOpen: true, isVisible: true });
    });
  };

  const handleClosePreview = () => {
    setPreviewShow((s) => ({ ...s, isVisible: false }));
    setTimeout(() => {
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
              data?.uploadStatus === 'error'
                ? 'text-grat-200 border-1'
                : 'border-gray-200'
            )}
          >
            {isImage ? (
              <img
                src={data.preview}
                alt={data.file.name}
                className="size-full object-cover"
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
                value={customName}
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
                >
                  {data.file.type.startsWith('image/') ? (
                    <img
                      src={data.preview}
                      alt={data.file.name}
                      className="size-11 rounded-md object-cover"
                    />
                  ) : (
                    <Icon name={iconName ?? 'doc'} className="size-11" />
                  )}
                </button>
                <div className="flex flex-1 flex-col overflow-hidden">
                  <Text
                    as="h3"
                    value={data.file.name}
                    variant="t1"
                    weight="semibold"
                    className="truncate"
                  />
                  <div className="flex flex-wrap items-center gap-1">
                    <Text
                      value={`${(data.file.size / 1024 / 1024).toFixed(2)} MB`}
                      className="truncate text-gray-700!"
                    />
                    {(Boolean(data?.hint) || Boolean(data?.errorMessage)) && (
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

      <ModalPreviewAttachment
        type={data?.file?.type}
        name={data?.customName ?? data?.file?.name}
        src={data?.preview}
        open={previewShow}
        onDownload={() =>
          onDownload?.({ src: data?.preview, name: data?.file?.name })
        }
        onClose={() => handleClosePreview()}
        audioProps={audioPlayerProps}
        videoProps={videoPlayerProps}
        iframeProps={pdfViewerProps}
      />
    </>
  );
};

export { PreviewItem };
