import { useId } from 'react';

import { cn } from '../../lib/utils';

export interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * Logo r-kit: tiga orbit React pada rotasi 0°, 60°, dan 120° mengelilingi
 * huruf H Herca yang menempati posisi inti atom.
 */
export default function BrandMark({
  size = 28,
  className,
}: BrandMarkProps): React.ReactElement {
  const clipId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="r-kit"
      className={cn('shrink-0', className)}
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="32" height="32" rx="8" />
        </clipPath>
      </defs>

      <rect width="32" height="32" rx="8" fill="currentColor" />

      <g clipPath={`url(#${clipId})`}>
        {/* Putih transparan supaya orbit ikut warna tile apa pun. */}
        <g stroke="#fff" strokeOpacity="0.62" strokeWidth="1.15" fill="none">
          <ellipse cx="16" cy="16" rx="14.2" ry="5.35" />
          <ellipse
            cx="16"
            cy="16"
            rx="14.2"
            ry="5.35"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="14.2"
            ry="5.35"
            transform="rotate(120 16 16)"
          />
        </g>

        <g fill="#fff">
          <rect x="10.3" y="9.8" width="2.9" height="12.4" rx="1.45" />
          <rect x="18.8" y="9.8" width="2.9" height="12.4" rx="1.45" />
          <rect x="10.3" y="14.55" width="11.4" height="2.9" rx="1.45" />
        </g>
      </g>
    </svg>
  );
}
