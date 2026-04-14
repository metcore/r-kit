import React from 'react';
import type { BaseIconProps } from '../type';

const AlignLeftIcon: React.FC<BaseIconProps> = ({
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
      d="M13.3333 8.33333H2.5M16.6667 5H2.5M16.6667 11.6667H2.5M13.3333 15H2.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AlignLeftIcon;
