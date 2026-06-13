import React from 'react';
import type { BaseIconProps } from '../type';

const FlagIcon: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M12.4998 7.08333L15.8332 11.6667H4.7915V17.4666C4.7915 17.8083 4.50817 18.0916 4.1665 18.0916C3.82484 18.0916 3.5415 17.8083 3.5415 17.4666V11.6667V5C3.5415 3.33333 4.37484 2.5 6.0415 2.5H15.8332L12.4998 7.08333Z"
      fill={color}
    />
  </svg>
);

export default FlagIcon;
