import React from "react";

import type { IconProps } from "../type";

const AngleLeftSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M14 17a.997.997 0 0 1-.707-.293l-4-4a.999.999 0 0 1 0-1.414l4-4a.999.999 0 1 1 1.414 1.414L11.414 12l3.293 3.293A.999.999 0 0 1 14 17Z"/>
  </svg>
);

export default AngleLeftSmallIcon;