import React from "react";

import type { IconProps } from "../type";

const HashtagIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 7.5h-3.344l.814-3.258a1 1 0 1 0-1.941-.485l-.936 3.742h-4.938l.814-3.258a1 1 0 1 0-1.941-.485l-.936 3.742H5a1 1 0 0 0 0 2h3.094l-1.25 5H3a1 1 0 0 0 0 2h3.344l-.814 3.258a1 1 0 1 0 1.941.485l.936-3.742h4.938l-.814 3.258a1 1 0 1 0 1.941.485l.936-3.742H19a1 1 0 0 0 0-2h-3.094l1.25-5H21a1 1 0 0 0 0-2Zm-7.156 7H8.906l1.25-5h4.938l-1.25 5Z"/>
  </svg>
);

export default HashtagIcon;