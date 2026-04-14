import React from 'react';

import type { IconProps } from '../type';

const HeadingIcon: React.FC<IconProps> = ({
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
      d="M4.9987 3.3335V16.6668M14.9987 3.3335V16.6668M6.66536 3.3335H3.33203M14.9987 10.0002L4.9987 10.0002M6.66536 16.6668H3.33203M16.6654 16.6668H13.332M16.6654 3.3335H13.332"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HeadingIcon;
