import type { ImgHTMLAttributes } from 'react';

export type ImageLoader = (args: {
  src: string;
  width: number;
  quality?: number;
}) => string;

type Base = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'srcSet' | 'loading' | 'placeholder'
> & {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  loader?: ImageLoader;
};

type Sizing =
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number };

type Placeholder =
  | { placeholder?: 'empty'; blurDataURL?: string }
  | { placeholder: 'blur'; blurDataURL: string };

export type ImageProps = Base & Sizing & Placeholder;
