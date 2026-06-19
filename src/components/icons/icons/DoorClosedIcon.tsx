import React from 'react';
import type { BaseIconProps } from '../type';

const DoorClosedIcon: React.FC<BaseIconProps> = ({
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
      d="M16.6663 16.875H15.4163V3.75C15.4163 3.05833 14.858 2.5 14.1663 2.5H5.83301C5.14134 2.5 4.58301 3.05833 4.58301 3.75V16.875H3.33301C2.98801 16.875 2.70801 17.155 2.70801 17.5C2.70801 17.845 2.98801 18.125 3.33301 18.125H16.6663C17.0113 18.125 17.2913 17.845 17.2913 17.5C17.2913 17.155 17.0113 16.875 16.6663 16.875ZM12.508 9.16667H12.5164C12.9747 9.16667 13.3497 9.54167 13.3497 10C13.3497 10.4583 12.9747 10.8333 12.5164 10.8333C12.058 10.8333 11.683 10.4583 11.683 10C11.683 9.54167 12.0497 9.16667 12.508 9.16667Z"
      fill={color}
    />
  </svg>
);

export default DoorClosedIcon;
