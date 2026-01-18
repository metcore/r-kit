import React from "react";

import type { IconProps } from "../type";

const FileUserIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M14.75 6V3.75l4.5 4.5H17c-1.58 0-2.25-.67-2.25-2.25ZM20 9.75V18c0 2-1 3-3 3H8c-2 0-3-1-3-3V6c0-2 1-3 3-3h5.25v3c0 2.42 1.33 3.75 3.75 3.75h3Zm-9.65 2.4c0 1.186.965 2.15 2.15 2.15s2.15-.965 2.15-2.15S13.685 10 12.5 10s-2.15.964-2.15 2.15ZM16 18.197c0-1.34-.98-2.697-2.858-2.697H11.86C9.982 15.5 9 16.857 9 18.197v.303a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-.303Z"/>
  </svg>
);

export default FileUserIcon;