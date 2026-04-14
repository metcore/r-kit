import React from 'react';
import type { BaseIconProps } from '../type';

const AlignRightIcon: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.83463 8.33333H16.668M2.5013 5H16.668M2.5013 11.6667H16.668M5.83463 15H16.668"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AlignRightIcon;
