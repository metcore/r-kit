import React from "react";

import type { IconProps } from "../type";

const ArrowDownSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m16.707 16.707-3.999 4a1 1 0 0 1-1.416 0l-3.999-4a.999.999 0 1 1 1.414-1.414L11 17.586V4a1 1 0 1 1 2 0v13.586l2.293-2.293a.999.999 0 1 1 1.414 1.414Z"/>
  </svg>
);

export default ArrowDownSmallIcon;