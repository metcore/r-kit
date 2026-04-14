import React from 'react';

import type { IconProps } from '../type';

const LeftIndentIcon: React.FC<IconProps> = ({
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
      d="M17.5 7.7085H10M17.5 3.3335H2.5M17.5 12.2918H10M17.5 16.6668H2.5M3.56667 7.1335L6.78889 9.55016C7.03013 9.73109 7.15075 9.82156 7.19389 9.93247C7.23167 10.0296 7.23167 10.1374 7.19389 10.2345C7.15075 10.3454 7.03013 10.4359 6.78889 10.6168L3.56667 13.0335C3.22335 13.291 3.05169 13.4197 2.90801 13.4167C2.78297 13.4141 2.66571 13.3555 2.5886 13.257C2.5 13.1439 2.5 12.9293 2.5 12.5002V7.66683C2.5 7.23768 2.5 7.02311 2.5886 6.90995C2.66571 6.81148 2.78297 6.75285 2.90801 6.75025C3.05169 6.74727 3.22335 6.87601 3.56667 7.1335Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LeftIndentIcon;
