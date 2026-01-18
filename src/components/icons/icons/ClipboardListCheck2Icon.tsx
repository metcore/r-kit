import React from "react";

import type { IconProps } from "../type";

const ClipboardListCheck2Icon: React.FC<IconProps> = ({
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
    <path fill={color} fill-rule="evenodd" d="M8 4.5v1C8 6.5 8.5 7 9.5 7h5c1 0 1.5-.5 1.5-1.5v-1c0-1-.5-1.5-1.5-1.5h-5C8.5 3 8 3.5 8 4.5Zm12 8.916V8c0-1.742-.752-2.723-2.265-2.943a.21.21 0 0 0-.235.204v.238c0 1.82-1.18 3-3 3h-5c-1.82 0-3-1.18-3-3v-.238a.21.21 0 0 0-.235-.204C4.752 5.277 4 6.258 4 8v10c0 2 1 3 3 3h7a5.01 5.01 0 0 1-.842-4.25H11a.75.75 0 0 1 0-1.5h2.824A4.996 4.996 0 0 1 18 13c.711 0 1.387.149 2 .416ZM8 15.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0-4a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm8 0a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5h5Z" clip-rule="evenodd"/>
  <path fill={color} fill-rule="evenodd" d="M14.2 16.75a3.998 3.998 0 0 1 .895-1.5A3.989 3.989 0 0 1 18 14a3.999 3.999 0 0 1 4 4 4 4 0 1 1-7.8-1.25Zm4.698.064a.5.5 0 0 1 .708.705l-1.667 1.667a.505.505 0 0 1-.708 0l-.833-.834a.5.5 0 1 1 .707-.706l.479.48 1.314-1.313Z" clip-rule="evenodd"/>
  </svg>
);

export default ClipboardListCheck2Icon;