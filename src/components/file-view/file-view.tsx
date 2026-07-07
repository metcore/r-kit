import {
  useEffect,
  useMemo,
  useState,
  type FC,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { cx } from 'class-variance-authority';
import { Icon } from '../icons';
import { Divider } from '../devider/devider';
import { Text } from '../text';
import { ModalPreviewAttachment } from '../input-file';
import {
  fileViewFooterVariants,
  fileViewVariants,
  type FileViewVariant,
  type FileViewVariantProps,
} from './file-view-variant';

export type { FileViewVariant };

export type FileKind =
  | 'pdf'
  | 'image'
  | 'spreadsheet'
  | 'csv'
  | 'audio'
  | 'video'
  | 'document'
  | 'unknown';

export interface FileViewProps extends Omit<
  FileViewVariantProps,
  'interactive'
> {
  src?: string | File;
  size?: number;
  kind?: FileKind;
  onExpand?: (name: string) => void;
  name?: string;
  className?: string;
  hideDownloadButton?: boolean;
}

type FileIconName =
  | 'pdf'
  | 'image'
  | 'xls'
  | 'csv'
  | 'mp3'
  | 'mp4'
  | 'doc'
  | 'file'
  | 'file-ban';

interface PreviewState {
  isOpen: boolean;
  isVisible: boolean;
}

const EXTENSION_KIND_MAP: Record<string, FileKind> = {
  pdf: 'pdf',
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  gif: 'image',
  webp: 'image',
  svg: 'image',
  xls: 'spreadsheet',
  xlsx: 'spreadsheet',
  xsl: 'spreadsheet',
  csv: 'csv',
  mp3: 'audio',
  wav: 'audio',
  mp4: 'video',
  mov: 'video',
  webm: 'video',
  doc: 'document',
  docx: 'document',
  txt: 'document',
};

const KIND_ICON: Record<FileKind, FileIconName> = {
  pdf: 'pdf',
  image: 'image',
  spreadsheet: 'xls',
  csv: 'csv',
  audio: 'mp3',
  video: 'mp4',
  document: 'doc',
  unknown: 'file',
};

const MIME_BY_EXT: Record<string, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  txt: 'text/plain',
};

const EXT_BY_MIME: Record<string, string> = Object.entries(MIME_BY_EXT).reduce<
  Record<string, string>
>((acc, [ext, mime]) => {
  if (!(mime in acc)) acc[mime] = ext;
  return acc;
}, {});

interface DataUrlInfo {
  mime: string;
  isBase64: boolean;
  byteLength?: number;
}

function getExtension(name: string): string {
  const dotIndex = name.lastIndexOf('.');
  return dotIndex === -1 ? '' : name.slice(dotIndex + 1).toLowerCase();
}

function inferKind(name: string): FileKind {
  return EXTENSION_KIND_MAP[getExtension(name)] ?? 'unknown';
}

function kindFromMime(mime: string): FileKind | undefined {
  if (!mime) return undefined;
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('audio/')) return 'audio';
  if (mime.startsWith('video/')) return 'video';
  if (mime === 'application/pdf') return 'pdf';
  if (mime === 'text/csv') return 'csv';
  if (
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return 'spreadsheet';
  }
  if (
    mime === 'application/msword' ||
    mime ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mime === 'text/plain'
  ) {
    return 'document';
  }
  return undefined;
}

function deriveNameFromUrl(url: string): string {
  const clean = url.split('?')[0].split('#')[0];
  const last = clean.slice(clean.lastIndexOf('/') + 1);
  try {
    return decodeURIComponent(last) || url;
  } catch {
    return last || url;
  }
}

function deriveNameFromMime(mime: string): string {
  const ext = EXT_BY_MIME[mime];
  return ext != null ? `file.${ext}` : 'file';
}

function parseDataUrl(src: string): DataUrlInfo | null {
  if (!src.startsWith('data:')) return null;
  const commaIndex = src.indexOf(',');
  if (commaIndex === -1) return null;

  const header = src.slice(5, commaIndex);
  const isBase64 = /;base64/i.test(header);
  const mime = header.split(';')[0].trim().toLowerCase() || 'text/plain';

  let byteLength: number | undefined;
  if (isBase64) {
    const encodedLength = src.length - commaIndex - 1;
    const padding = src.endsWith('==') ? 2 : src.endsWith('=') ? 1 : 0;
    byteLength = Math.max(0, Math.floor((encodedLength * 3) / 4) - padding);
  }
  return { mime, isBase64, byteLength };
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 MB';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** exponent;
  const rounded =
    value >= 10 || Number.isInteger(value)
      ? Math.round(value)
      : Math.round(value * 10) / 10;

  return `${rounded} ${units[exponent]}`;
}

interface PreviewButtonProps {
  label: string;
  onOpen: () => void;
}

function PreviewButton({ label, onOpen }: PreviewButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpen();
  };
  return (
    <button
      aria-label={label}
      type="button"
      onClick={handleClick}
      className="inline-flex shrink-0 cursor-pointer items-center justify-center"
    >
      <Icon name="arrows-expand" size={15} />
    </button>
  );
}

function CorruptBadge({ small = false }: { small?: boolean }) {
  return (
    <span role="img" aria-label="File corrupt" className="inline-flex shrink-0">
      <Icon
        name="exclamation-triangle"
        className={cx('text-danger-500', small ? 'h-4 w-4' : 'h-5 w-5')}
      />
    </span>
  );
}

export const FileView: FC<FileViewProps> = ({
  src,
  size,
  kind,
  variant = 'large',
  color = 'default',
  onExpand,
  className,
  name,
  hideDownloadButton,
}) => {
  const [preview, setPreview] = useState<PreviewState>({
    isOpen: false,
    isVisible: false,
  });

  const objectUrl = useMemo(() => {
    if (typeof src === 'string' || !src) {
      return null;
    }
    return URL.createObjectURL(src);
  }, [src]);
  useEffect(() => {
    return () => {
      if (objectUrl != null) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const dataUrl = useMemo(
    () => (typeof src === 'string' ? parseDataUrl(src) : null),
    [src]
  );

  const fileName =
    typeof src !== 'string'
      ? (src?.name ?? '')
      : dataUrl
        ? deriveNameFromMime(dataUrl.mime)
        : src
          ? deriveNameFromUrl(src)
          : '';

  const resolvedUrl = typeof src === 'string' ? src : (objectUrl ?? '');

  const explicitMime =
    dataUrl?.mime ??
    (typeof src !== 'string' ? src?.type != null || undefined : undefined);
  const mimeType = explicitMime ?? MIME_BY_EXT[getExtension(fileName)] ?? '';

  const sourceSize = typeof src !== 'string' ? src?.size : undefined;
  const effectiveSize = size ?? sourceSize ?? dataUrl?.byteLength;

  const hasSource =
    typeof src === 'string' ? src.trim().length > 0 : Boolean(src);
  const isCorrupt = !hasSource || effectiveSize === 0;

  const resolvedKind =
    kind ?? kindFromMime(String(mimeType)) ?? inferKind(fileName);
  const iconName: FileIconName = isCorrupt
    ? 'file-ban'
    : KIND_ICON[resolvedKind];
  const displaySize =
    effectiveSize !== undefined ? formatFileSize(effectiveSize) : 'unknown';
  const thumbnailSrc = resolvedKind === 'image' ? resolvedUrl : undefined;
  const showThumbnail =
    !isCorrupt && resolvedKind === 'image' && Boolean(thumbnailSrc);
  const displayName = name != null ? name : fileName;

  const interactive = !isCorrupt;

  const openPreview = () => {
    if (!interactive) {
      return;
    }
    onExpand?.(fileName);
    setPreview({ isOpen: true, isVisible: false });
    requestAnimationFrame(() => {
      setPreview({ isOpen: true, isVisible: true });
    });
  };

  const closePreview = () => {
    setPreview((state) => ({ ...state, isVisible: false }));
    setTimeout(() => {
      setPreview({ isOpen: false, isVisible: false });
    }, 200);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPreview();
    }
  };

  // prettier-ignore
  const rootProps = {
    'role': interactive ? ('button' as const) : undefined,
    'tabIndex': interactive ? 0 : undefined,
    'aria-haspopup': interactive ? ('dialog' as const) : undefined,
    'aria-label': interactive ? `Preview ${fileName}` : undefined,
    'onClick': interactive ? openPreview : undefined,
    'onKeyDown': interactive ? handleKeyDown : undefined,
  };

  const renderThumbnail = () => (
    <>
      <div className="flex h-36 items-center justify-center">
        {showThumbnail ? (
          <img
            src={thumbnailSrc}
            alt={fileName}
            className="h-full w-full object-cover"
          />
        ) : (
          <Icon name={iconName} className="h-11 w-11 shrink-0" />
        )}
      </div>
      <Divider
        className={cx(
          fileViewVariants({ variant, color, interactive }),
          'border-b'
        )}
      />
    </>
  );

  const renderFooter = () => (
    <div className={fileViewFooterVariants({ color })}>
      {showThumbnail && variant == 'small' ? (
        <img
          src={thumbnailSrc}
          alt={fileName}
          className="h-10 w-10 shrink-0 rounded object-cover"
        />
      ) : (
        <div className="flex items-center">
          <Icon name={iconName} size={variant == 'small' ? 40 : 20} />
        </div>
      )}
      <div className="grid w-full grid-cols-4 items-center justify-between gap-2">
        <div className="col-span-3 min-w-0">
          <Text variant="t2" weight="semibold" className="truncate">
            {displayName}
          </Text>
          {displaySize ? (
            <Text variant="t2" weight="regular" className="truncate">
              {displaySize}
            </Text>
          ) : null}
        </div>
        <div className="flex justify-end">
          {isCorrupt ? (
            <CorruptBadge small />
          ) : (
            <PreviewButton label={`Preview ${fileName}`} onOpen={openPreview} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      {...rootProps}
      className={cx(
        fileViewVariants({ variant, color, interactive }),
        className
      )}
    >
      {variant !== 'small' ? renderThumbnail() : null}
      {renderFooter()}
      {interactive ? (
        <ModalPreviewAttachment
          open={preview}
          onClose={closePreview}
          src={resolvedUrl}
          name={fileName}
          type={String(mimeType)}
          hideDownloadButton={hideDownloadButton}
        />
      ) : null}
    </div>
  );
};

export default FileView;
