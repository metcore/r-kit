import React from 'react';
import type { BaseIconProps } from '../type';

const FloppyDiskIcon: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.1667 5.5L14.5833 2.91667C14.3333 2.66667 14 2.5 13.6667 2.5H5C3.33333 2.5 2.5 3.33333 2.5 5V15C2.5 16.6667 3.33333 17.5 5 17.5H15C16.6667 17.5 17.5 16.6667 17.5 15V6.33333C17.5 6 17.3333 5.66667 17.1667 5.5ZM7.91667 6H12.0833C12.4167 6 12.75 6.25 12.75 6.66667C12.75 7 12.5 7.33333 12.0833 7.33333H7.91667C7.58333 7.33333 7.33333 7 7.33333 6.66667C7.33333 6.33333 7.58333 6 7.91667 6ZM14.1667 16C14.1667 16.1667 14.0833 16.25 13.9167 16.25H6.08333C5.91667 16.25 5.83333 16.1667 5.83333 16V12.0833C5.83333 11.25 6.25 10.8333 7.08333 10.8333H12.9167C13.75 10.8333 14.1667 11.25 14.1667 12.0833V16Z"
      fill={color}
    />
  </svg>
);

export default FloppyDiskIcon;
