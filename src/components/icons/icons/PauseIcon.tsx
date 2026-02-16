import React from "react";

import type { IconProps } from "../type";

const PauseIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M5 19.5v-15C5 3.5 5.5 3 6.5 3h2c1 0 1.5.5 1.5 1.5v15c0 1-.5 1.5-1.5 1.5h-2c-1 0-1.5-.5-1.5-1.5ZM15.5 21h2c1 0 1.5-.5 1.5-1.5v-15c0-1-.5-1.5-1.5-1.5h-2c-1 0-1.5.5-1.5 1.5v15c0 1 .5 1.5 1.5 1.5Z"/>
  </svg>
);

export default PauseIcon;