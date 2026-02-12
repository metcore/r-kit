import { useState } from "react";
import { cn } from "../../lib/utils";
import { FormLabel } from "../form";
import { Icon } from "../icons";
import { Input } from "../input/input";
import { Text } from "../text";
import { getIconName } from "./helpers";
import type { PreviewItemProps } from "./type";
import { ModalPreviewAttachment } from "../modal/modal-preview-attachment";

// man... i love using display flex :)

const PreviewItem = ({
  data,
  onRemove,
  onReplace,
  disabled = false,
  labelCustomName = "Attachment File",
  onCustomNameChange,
  customNamePlaceholder = "Name Attachment",
  customName,
  audioPlayerProps,
  pdfViewerProps,
  videoPlayerProps,
}: PreviewItemProps) => {
  const [previewShow, setPreviewShow] = useState({
    isOpen: false,
    isVisible: false,
  });

  const isImage = data?.file?.type.startsWith("image/");
  const isMp3 = data?.file?.type.startsWith("audio/");
  const isVideo = data?.file?.type.startsWith("video/");
  const isPdf = data?.file?.type === "application/pdf";

  const isNotViewable = !isImage && !isMp3 && !isVideo && !isPdf;

  const iconName = getIconName({ file: data.file });

  const handleOpenPreview = () => {
    setPreviewShow({
      isOpen: true,
      isVisible: false,
    });

    requestAnimationFrame(() => {
      setPreviewShow({
        isOpen: true,
        isVisible: true,
      });
    });
  };

  const handleClosePreview = () => {
    setPreviewShow((s) => ({ ...s, isVisible: false })); // animasi keluar

    setTimeout(() => {
      setPreviewShow({ isOpen: false, isVisible: false }); // baru unmount
    }, 200); // samakan dengan duration CSS
  };

  console.log({ data });

  return (
    <div className="flex flex-col gap-3">
      {!!onCustomNameChange && (
        <div className="flex w-full flex-col gap-2">
          <FormLabel>{labelCustomName}</FormLabel>
          <Input
            type="text"
            onChange={onCustomNameChange}
            placeholder={customNamePlaceholder}
            value={customName}
            className={"truncate"}
          />
        </div>
      )}

      <div
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-gray-200 p-2",
        )}
      >
        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <button
            className="cursor-pointer disabled:cursor-not-allowed"
            onClick={handleOpenPreview}
            disabled={isNotViewable}
          >
            {data.file.type.startsWith("image/") ? (
              <img
                src={data.preview}
                alt={data.file.name}
                className="size-11 rounded-md object-cover"
              />
            ) : (
              <Icon name={iconName ?? "doc"} className="size-11" />
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
              {(!!data?.hint || !!data?.errorMessage) && (
                <Text value={"•"} className="truncate text-gray-700!" />
              )}
              {data?.hint && (
                <Text value={data?.hint} className="truncate text-gray-700!" />
              )}
              {!!data?.hint && !!data?.errorMessage && (
                <Text value={"•"} className="truncate text-gray-700!" />
              )}
              {data?.errorMessage && (
                <Text value={data?.errorMessage} color="danger" />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!!data?.errorMessage && (
            <>
              {/* replace button */}
              <button
                type="button"
                onClick={onReplace}
                disabled={disabled}
                className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                title="Replace file"
              >
                <Icon name="rotate-right" className="size-4 text-gray-700" />
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

      <ModalPreviewAttachment
        type={data?.file?.type}
        name={data?.customName ?? data?.file?.name}
        src={data?.preview}
        open={previewShow}
        onClose={() => handleClosePreview()}
        audioProps={audioPlayerProps}
        videoProps={videoPlayerProps}
        iframeProps={pdfViewerProps}
      />
    </div>
  );
};

export { PreviewItem };
