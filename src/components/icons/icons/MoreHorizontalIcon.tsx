import React from 'react';

import type { IconProps } from '../type';

const MoreHorizontalIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.02014 14C2.91614 14 2.01514 13.104 2.01514 12C2.01514 10.896 2.90513 10 4.01013 10H4.02014C5.12414 10 6.02014 10.896 6.02014 12C6.02014 13.104 5.12514 14 4.02014 14ZM14.0201 12C14.0201 10.896 13.1241 10 12.0201 10H12.0101C10.9061 10 10.0151 10.896 10.0151 12C10.0151 13.104 10.9151 14 12.0201 14C13.1251 14 14.0201 13.104 14.0201 12ZM22.0201 12C22.0201 10.896 21.1241 10 20.0201 10H20.0101C18.9061 10 18.0151 10.896 18.0151 12C18.0151 13.104 18.9151 14 20.0201 14C21.1251 14 22.0201 13.104 22.0201 12Z"
      fill={color}
    />
  </svg>
);

export default MoreHorizontalIcon;
