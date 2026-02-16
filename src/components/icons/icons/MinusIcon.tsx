import React from "react";

import type { IconProps } from "../type";

const MinusIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Z"/>
  </svg>
);

export default MinusIcon;