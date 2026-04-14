import React from 'react';
import type { BaseIconProps } from '../type';

const AlignCenterIcon: React.FC<BaseIconProps> = ({
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
      d="M15 8.33333H5M17.5 5H2.5M17.5 11.6667H2.5M15 15H5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AlignCenterIcon;
