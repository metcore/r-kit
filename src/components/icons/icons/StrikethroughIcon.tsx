import React from 'react';

import type { IconProps } from '../type';

const StrikethroughIcon: React.FC<IconProps> = ({
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
      d="M5 13.3335C5 15.1744 6.49238 16.6668 8.33333 16.6668H11.6667C13.5076 16.6668 15 15.1744 15 13.3335C15 11.4925 13.5076 10.0002 11.6667 10.0002M15 6.66683C15 4.82588 13.5076 3.3335 11.6667 3.3335H8.33333C6.49238 3.3335 5 4.82588 5 6.66683M2.5 10.0002H17.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StrikethroughIcon;
