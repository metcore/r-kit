import React from "react";

import type { IconProps } from "../type";

const CircleAndSquareIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20 11.2v6.4c0 1.32-1.08 2.4-2.4 2.4h-6.4c-1.32 0-2.4-1.08-2.4-2.4 0-.44.36-.8.8-.8 3.968 0 7.2-3.232 7.2-7.2 0-.44.36-.8.8-.8 1.32 0 2.4 1.08 2.4 2.4ZM9.6 4A5.606 5.606 0 0 0 4 9.6c0 3.088 2.512 5.6 5.6 5.6 3.088 0 5.6-2.512 5.6-5.6 0-3.088-2.512-5.6-5.6-5.6Z"/>
  </svg>
);

export default CircleAndSquareIcon;