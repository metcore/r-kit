import React from 'react';

import type { IconProps } from '../type';

const CheckCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill={color}
      d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.03 8.20001L9.35999 12.86C9.21999 13.01 9.02999 13.08 8.82999 13.08C8.63999 13.08 8.44999 13.01 8.29999 12.86L5.97 10.53C5.68 10.24 5.68 9.75997 5.97 9.46997C6.26 9.17997 6.74 9.17997 7.03 9.46997L8.82999 11.27L12.97 7.14001C13.26 6.84001 13.74 6.84001 14.03 7.14001C14.32 7.43001 14.32 7.90001 14.03 8.20001Z"
    />
  </svg>
);

export default CheckCircleIcon;
