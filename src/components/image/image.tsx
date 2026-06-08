import {
  useState,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactElement,
} from 'react';
import type { ImageProps, ImageLoader } from './type';
import { Modal, ModalBody } from '../modal';
import { Text } from '../text';

const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];
const ALL_SIZES = [...IMAGE_SIZES, ...DEVICE_SIZES];

const passthroughLoader: ImageLoader = ({ src }) => src;

function resolveWidths({
  width,
  sizes,
}: {
  width?: number;
  sizes?: string;
}): number[] {
  if (sizes != undefined) return ALL_SIZES;
  if (typeof width !== 'number') return DEVICE_SIZES;
  const x1 = ALL_SIZES.find((w) => w >= width) ?? width;
  const x2 = ALL_SIZES.find((w) => w >= width * 2) ?? width * 2;
  return [...new Set([x1, x2])];
}

function buildSrcSet(
  loader: ImageLoader,
  src: string,
  widths: number[],
  quality?: number
): string {
  return widths
    .map((w) => `${loader({ src, width: w, quality })} ${w}w`)
    .join(', ');
}

function Image({
  src,
  alt = '',
  width,
  height,
  fill = false,
  sizes,
  quality = 75,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  loader = passthroughLoader,
  className,
  style,
  onLoad,
  ...rest
}: ImageProps): ReactElement {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const widths = resolveWidths({ width, sizes });
  const srcSet = buildSrcSet(loader, src, widths, quality);
  const mainSrc = loader({
    src,
    width: width ?? widths[widths.length - 1],
    quality,
  });

  useEffect(() => {
    if (ref.current?.complete !== undefined) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!priority || !mainSrc) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = mainSrc;
    if (srcSet != undefined) link.setAttribute('imagesrcset', srcSet);
    if (sizes != undefined) link.setAttribute('imagesizes', sizes);
    document.head.appendChild(link);
    return () => link.remove();
  }, [priority, mainSrc, srcSet, sizes]);

  const showBlur =
    placeholder === 'blur' && blurDataURL != undefined && !loaded;

  const layoutStyle: CSSProperties = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    : { width: '100%', height: 'auto' };

  const blurStyle: CSSProperties | undefined = showBlur
    ? {
        backgroundImage: `url("${blurDataURL}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px)',
      }
    : undefined;

  return (
    <>
      <img
        ref={ref}
        src={mainSrc}
        srcSet={srcSet}
        sizes={sizes ?? (fill ? '100vw' : undefined)}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={className}
        style={{
          ...layoutStyle,
          ...blurStyle,
          transition: 'filter 300ms ease',
          ...style,
        }}
        {...rest}
      />
      <Modal isOpen={false}>
        <ModalBody>
          <Text>Belom</Text>
        </ModalBody>
      </Modal>
    </>
  );
}

export const cloudinaryLoader: ImageLoader = ({ src, width, quality = 0 }) => {
  const t = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`].join(
    ','
  );
  return `https://res.cloudinary.com/<YOUR_CLOUD_NAME>/image/upload/${t}/${src}`;
};

export const imgixLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(`https://<YOUR_SUBDOMAIN>.imgix.net${src}`);
  url.searchParams.set('auto', 'format,compress');
  url.searchParams.set('w', String(width));
  if (quality != undefined) url.searchParams.set('q', String(quality));
  return url.toString();
};

export const selfHostedLoader: ImageLoader = ({ src, width, quality = 0 }) => {
  const p = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality || 75),
  });
  return `/api/image?${p.toString()}`;
};

export { Image };
