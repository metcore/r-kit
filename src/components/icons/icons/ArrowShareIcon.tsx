import React from "react";

import type { IconProps } from "../type";

const ArrowShareIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M13 4.99c0-.894 1.094-1.329 1.709-.678l5.928 6.27a1.327 1.327 0 0 1 0 1.824l-5.928 6.27c-.615.65-1.709.215-1.709-.679v-3.505c-7.563 0-8.064 2.47-8.032 5.037.006.49-.643.652-.885.227C3.467 18.676 3 17.2 3 15.491c0-6.495 7-6.994 10-6.994V4.991Z"/>
  </svg>
);

export default ArrowShareIcon;