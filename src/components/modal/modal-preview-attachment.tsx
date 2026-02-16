import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { Icon } from "../icons";
import { Text } from "../text";
import { getIconName } from "../input-file/helpers";

// pake open dan visible biar bisa mainin transisi smooth
interface ModalPreviewProps {
  onClose: () => void;
  src: string;
  name: string;
  type: string;
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
  audioProps?: React.AudioHTMLAttributes<HTMLAudioElement>;
  videoProps?: React.VideoHTMLAttributes<HTMLVideoElement>;
  open: {
    isOpen: boolean;
    isVisible: boolean;
  };
}

const ModalPreviewAttachment = ({
  onClose,
  open,
  src,
  name,
  type,
  iframeProps,
  audioProps,
  videoProps,
}: ModalPreviewProps) => {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isImage = type.startsWith("image/");
  const isMp3 = type.startsWith("audio/");
  const isVideo = type.startsWith("video/");
  const isPdf = type === "application/pdf";

  const iconName = getIconName({ fileType: type });

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 5;
  const ZOOM_STEP = 0.5;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      // Reset position if zooming out to 1 or below
      if (newZoom <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset zoom and position when modal closes
  useEffect(() => {
    if (!open.isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [open.isOpen]);

  useEffect(() => {
    document.body.style.overflow = open.isOpen ? "hidden" : "unset";
  }, [open.isOpen]);

  if (!open.isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-20")}>
      {/* overlay */}
      <div
        className={cn(
          `fixed inset-0 z-10 size-full bg-black/40 transition-all`,
          open.isVisible ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      {/* overlay end */}

      <div
        className={cn(
          "relative z-20 container mx-auto flex h-full flex-col items-center gap-6 py-10 transition-all",
          open.isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0",
        )}
      >
        {/* Header */}
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="cursor-pointer">
              <Icon name="times" color="white" />
            </button>

            <div className="flex items-center">
              {iconName && <Icon name={iconName} size={48} />}
              <Text
                value={name}
                variant="p3"
                weight="semibold"
                className="text-white!"
              />
            </div>
          </div>

          {isImage && (
            <ZoomController
              onDownload={handleDownload}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              maxZoom={MAX_ZOOM}
              minZoom={MIN_ZOOM}
              zoom={zoom}
            />
          )}
        </div>

        {isImage && (
          <>
            {/* Image Container */}
            <div
              className="scrollbar-hide relative flex size-full justify-center overflow-auto rounded-xl"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                cursor:
                  zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            >
              <img
                src={src}
                alt={name}
                draggable={false}
                className="h-full rounded-xl object-contain select-none"
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transformOrigin: "top left",
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                }}
              />
            </div>

            {/* Helper text when zoomed */}
            {zoom > 1 && (
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
                <Text
                  value="Click and drag to pan • Scroll to zoom"
                  variant="t3"
                  className="text-white/80!"
                />
              </div>
            )}
          </>
        )}

        {/* video player */}
        {isVideo && (
          <div className="flex size-full overflow-auto">
            <video
              src={src}
              controls
              className={cn(
                "h-full w-full rounded-xl object-contain",
                videoProps?.className,
              )}
              {...videoProps}
            />
          </div>
        )}

        {/* pdf viewer */}
        {isPdf && (
          <div className="flex size-full overflow-auto">
            <iframe
              src={src}
              className={cn("h-full w-full", iframeProps?.className)}
              {...iframeProps}
            />
          </div>
        )}

        {/* audio player */}
        {isMp3 && (
          <div className="flex size-full items-center justify-center overflow-auto">
            <audio
              src={src}
              controls
              className={cn("h-full w-full", audioProps?.className)}
              {...audioProps}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ZoomController = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onDownload,
  maxZoom,
  minZoom,
}: {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  maxZoom: number;
  minZoom: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button size={"icon"} onClick={onZoomIn} disabled={zoom >= maxZoom}>
        <Icon name="search-plus-fill" />
      </Button>
      <Button size={"icon"} onClick={onZoomOut} disabled={zoom <= minZoom}>
        <Icon name="search-minus-fill" />
      </Button>

      <Button color="secondary" onClick={onDownload}>
        <Icon name="download" />
        <Text
          as={"span"}
          value={"Download"}
          weight="medium"
          className="text-primary-1000!"
        />
      </Button>
    </div>
  );
};

export { ModalPreviewAttachment };
