import React from 'react';
import type { BaseIconProps } from '../type';

const DragHandleIcon: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="9.375" cy="6.375" r="2" fill={color} />
    <circle cx="15.375" cy="6.375" r="2" fill={color} />
    <circle cx="9.375" cy="12.375" r="2" fill={color} />
    <circle cx="15.375" cy="12.375" r="2" fill={color} />
    <circle cx="9.375" cy="18.375" r="2" fill={color} />
    <circle cx="15.375" cy="18.375" r="2" fill={color} />
  </svg>
);

export default DragHandleIcon;
