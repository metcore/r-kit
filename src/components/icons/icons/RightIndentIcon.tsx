import React from 'react';

import type { IconProps } from '../type';

const RightIndentIcon: React.FC<IconProps> = ({
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
      d="M17.5 3.3335H2.5M17.5 16.6668H2.5M10 7.7085H2.5M10 12.2918H2.5M16.4333 7.05016L13.2111 9.46683C12.9699 9.64776 12.8492 9.73823 12.8061 9.84913C12.7683 9.94628 12.7683 10.054 12.8061 10.1512C12.8492 10.2621 12.9699 10.3526 13.2111 10.5335L16.4333 12.9502C16.7766 13.2076 16.9483 13.3364 17.092 13.3334C17.217 13.3308 17.3343 13.2722 17.4114 13.1737C17.5 13.0605 17.5 12.846 17.5 12.4168V7.5835C17.5 7.15435 17.5 6.93978 17.4114 6.82662C17.3343 6.72815 17.217 6.66952 17.092 6.66692C16.9483 6.66393 16.7766 6.79268 16.4333 7.05016Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RightIndentIcon;
