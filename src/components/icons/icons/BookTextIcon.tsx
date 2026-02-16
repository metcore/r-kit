import React from "react";

import type { IconProps } from "../type";

const BookTextIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18.5 2.25H7C4.582 2.25 3.25 3.582 3.25 6v12c0 2.243 1.507 3.75 3.75 3.75h11.5c1.24 0 2.25-1.009 2.25-2.25v-15c0-1.241-1.01-2.25-2.25-2.25Zm-9.5 4h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5Zm0 3h4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5ZM19.25 19.5a.75.75 0 0 1-.75.75H7c-2.03 0-2.25-1.574-2.25-2.25 0-.676.22-2.25 2.25-2.25h11.5c.145 0 .285-.017.422-.043.044-.008.086-.023.129-.034.066-.017.135-.029.199-.052V19.5Z"/>
  </svg>
);

export default BookTextIcon;