import React from 'react';
import type { BaseIconProps } from '../type';

const AlignJustifyIcon: React.FC<BaseIconProps> = ({
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
      d="M17.5 8.33333H2.5M17.5 15H2.5M17.5 5H2.5M17.5 11.6667H2.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AlignJustifyIcon;
