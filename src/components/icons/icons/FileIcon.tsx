import React from 'react';
import type { BaseIconProps } from '../type';

const FileIcon: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M14.75 6V3.75L19.25 8.25H17C15.42 8.25 14.75 7.58 14.75 6ZM17 9.75C14.58 9.75 13.25 8.42 13.25 6V3H8C6 3 5 4 5 6V18C5 20 6 21 8 21H17C19 21 20 20 20 18V9.75H17Z"
      fill={color}
    />
  </svg>
);

export default FileIcon;
