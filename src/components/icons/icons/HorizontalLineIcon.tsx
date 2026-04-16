import React from 'react';
import type { BaseIconProps } from '../type';

const HorizontalLineIcon: React.FC<BaseIconProps> = ({
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
    <rect x="1.66797" y="9" width="16.6667" height="2" fill={color} />
  </svg>
);

export default HorizontalLineIcon;
