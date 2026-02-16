import React from "react";

import type { IconProps } from "../type";

const LaptopIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20 7v7.2a.3.3 0 0 1-.3.3H4.3a.3.3 0 0 1-.3-.3V7c0-2 1-3 3-3h10c2 0 3 1 3 3Zm.7 9H3.3a.3.3 0 0 0-.3.3v.7c0 1.333.667 2 2 2h14c1.333 0 2-.667 2-2v-.7a.3.3 0 0 0-.3-.3Z"/>
  </svg>
);

export default LaptopIcon;