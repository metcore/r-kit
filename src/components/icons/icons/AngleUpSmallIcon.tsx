import React from "react";

import type { IconProps } from "../type";

const AngleUpSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M16 15a.997.997 0 0 1-.707-.293L12 11.414l-3.293 3.293a.999.999 0 1 1-1.414-1.414l4-4a.999.999 0 0 1 1.414 0l4 4A.999.999 0 0 1 16 15Z"/>
  </svg>
);

export default AngleUpSmallIcon;