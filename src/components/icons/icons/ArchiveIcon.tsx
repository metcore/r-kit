import React from 'react';
import type { BaseIconProps } from '../type';

const ArchiveIcon: React.FC<BaseIconProps> = ({
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
      d="M17.5 3.75V6.41668C17.5 6.55501 17.3883 6.66667 17.25 6.66667H2.75004C2.61171 6.66667 2.5 6.55501 2.5 6.41668V3.75C2.5 2.91667 2.91667 2.5 3.75 2.5H16.25C17.0833 2.5 17.5 2.91667 17.5 3.75ZM16.6667 8.16666V15C16.6667 16.6667 15.8333 17.5 14.1667 17.5H5.83333C4.16667 17.5 3.33333 16.6667 3.33333 15V8.16666C3.33333 8.02832 3.44504 7.91667 3.58337 7.91667H16.4166C16.555 7.91667 16.6667 8.02832 16.6667 8.16666ZM12.2917 10C12.2917 9.65833 12.0083 9.375 11.6667 9.375H8.33333C7.99167 9.375 7.70833 9.65833 7.70833 10C7.70833 10.3417 7.99167 10.625 8.33333 10.625H11.6667C12.0083 10.625 12.2917 10.3417 12.2917 10Z"
      fill={color}
    />
  </svg>
);

export default ArchiveIcon;
