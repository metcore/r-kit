import React from "react";

import type { IconProps } from "../type";

const AngleRightSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M10 17a.999.999 0 0 1-.707-1.707L12.586 12 9.293 8.707a.999.999 0 1 1 1.414-1.414l4 4a.999.999 0 0 1 0 1.414l-4 4A.997.997 0 0 1 10 17Z"/>
  </svg>
);

export default AngleRightSmallIcon;