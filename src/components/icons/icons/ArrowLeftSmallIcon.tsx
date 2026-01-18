import React from "react";

import type { IconProps } from "../type";

const ArrowLeftSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 12a1 1 0 0 1-1 1H6.414l2.293 2.293a.999.999 0 1 1-1.414 1.414l-3.999-3.999a1 1 0 0 1 0-1.416l3.999-3.999a.999.999 0 1 1 1.414 1.414L6.414 11H20a1 1 0 0 1 1 1Z"/>
  </svg>
);

export default ArrowLeftSmallIcon;