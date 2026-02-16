import React from "react";

import type { IconProps } from "../type";

const LogOutIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M15.75 17v1c0 2.418-1.332 3.75-3.75 3.75H6c-2.418 0-3.75-1.332-3.75-3.75V6c0-2.418 1.332-3.75 3.75-3.75h6c2.418 0 3.75 1.332 3.75 3.75v1a.75.75 0 0 1-1.5 0V6c0-1.577-.673-2.25-2.25-2.25H6c-1.577 0-2.25.673-2.25 2.25v12c0 1.577.673 2.25 2.25 2.25h6c1.577 0 2.25-.673 2.25-2.25v-1a.75.75 0 0 1 1.5 0Zm5.942-4.713a.749.749 0 0 0-.162-.817l-3-3a.75.75 0 1 0-1.061 1.061l1.72 1.72H8a.75.75 0 0 0 0 1.5h11.189l-1.72 1.72a.75.75 0 0 0 1.06 1.061l3-3a.772.772 0 0 0 .163-.245Z"/>
  </svg>
);

export default LogOutIcon;