import React from "react";

import type { IconProps } from "../type";

const GridSquareIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20 5.5v3c0 1-.5 1.5-1.5 1.5h-3c-1 0-1.5-.5-1.5-1.5v-3c0-1 .5-1.5 1.5-1.5h3c1 0 1.5.5 1.5 1.5ZM8.5 4h-3C4.5 4 4 4.5 4 5.5v3c0 1 .5 1.5 1.5 1.5h3c1 0 1.5-.5 1.5-1.5v-3c0-1-.5-1.5-1.5-1.5Zm10 10h-3c-1 0-1.5.5-1.5 1.5v3c0 1 .5 1.5 1.5 1.5h3c1 0 1.5-.5 1.5-1.5v-3c0-1-.5-1.5-1.5-1.5Zm-10 0h-3c-1 0-1.5.5-1.5 1.5v3c0 1 .5 1.5 1.5 1.5h3c1 0 1.5-.5 1.5-1.5v-3c0-1-.5-1.5-1.5-1.5Z"/>
  </svg>
);

export default GridSquareIcon;