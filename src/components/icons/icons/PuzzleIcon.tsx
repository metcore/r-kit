import React from "react";

import type { IconProps } from "../type";

const PuzzleIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20.5 12H19a2 2 0 1 0 0 4h1.5a.5.5 0 0 1 .5.5V19a2 2 0 0 1-2 2h-3.5a.5.5 0 0 1-.5-.5V19a2 2 0 1 0-4 0v1.5a.5.5 0 0 1-.5.5H8a2 2 0 0 1-2-2v-2.5a.5.5 0 0 0-.5-.5H4a2 2 0 1 1 0-4h1.5a.5.5 0 0 0 .5-.5V9a2 2 0 0 1 2-2h2.5a.5.5 0 0 0 .5-.5V5a2 2 0 1 1 4 0v1.5a.5.5 0 0 0 .5.5H19a2 2 0 0 1 2 2v2.5a.5.5 0 0 1-.5.5Z"/>
  </svg>
);

export default PuzzleIcon;