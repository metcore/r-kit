import React from 'react';

import type { IconProps } from '../type';

const SubscriptIcon: React.FC<IconProps> = ({
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
      d="M2.5 4.1665L10.8333 12.4998M10.8333 4.1665L2.5 12.4998M17.5 15.8332H14.1667C14.1667 14.5832 14.5333 14.1666 15.4167 13.7499C16.3 13.3332 17.5 12.7749 17.5 11.6666C17.5 11.2749 17.3583 10.8916 17.1 10.5916C16.8332 10.2895 16.4707 10.0882 16.0733 10.0215C15.6758 9.95473 15.2675 10.0265 14.9167 10.2249C14.5667 10.4249 14.3 10.7416 14.1667 11.1166"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SubscriptIcon;
