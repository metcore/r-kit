import React from "react";

import type { IconProps } from "../type";

const CaretLeftIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path fill={color} d="m8.604 10.698 5.194-4.38C14.671 5.582 16 6.206 16 7.352v9.296c0 1.146-1.33 1.77-2.202 1.034l-5.194-4.38a1.706 1.706 0 0 1 0-2.604Z"/>
  </svg>
);

export default CaretLeftIcon;