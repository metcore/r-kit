import React from 'react';
import type { BaseIconProps } from '../type';

const GridSquareCircleIcon: React.FC<BaseIconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <path
      d="M8.5 14H5.5C4.5 14 4 14.5 4 15.5V18.5C4 19.5 4.5 20 5.5 20H8.5C9.5 20 10 19.5 10 18.5V15.5C10 14.5 9.5 14 8.5 14Z"
      fill="#080355"
    />
    <path
      d="M17 14C15.343 14 14 15.343 14 17C14 18.657 15.343 20 17 20C18.657 20 20 18.657 20 17C20 15.343 18.657 14 17 14Z"
      fill="#FDB022"
    />
    <path
      d="M15.5 4H18.5C19.5 4 20 4.5 20 5.5V8.5C20 9.5 19.5 10 18.5 10H15.5C14.5 10 14 9.5 14 8.5V5.5C14 4.5 14.5 4 15.5 4Z"
      fill="#080355"
    />
    <path
      d="M5.5 4H8.5C9.5 4 10 4.5 10 5.5V8.5C10 9.5 9.5 10 8.5 10H5.5C4.5 10 4 9.5 4 8.5V5.5C4 4.5 4.5 4 5.5 4Z"
      fill="#080355"
    />
  </svg>
);

export default GridSquareCircleIcon;
