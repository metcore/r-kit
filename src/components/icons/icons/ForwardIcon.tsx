import React from "react";

import type { IconProps } from "../type";

const ForwardIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m20.255 13.542-5.111 4.037C13.868 18.587 12 17.671 12 16.037V12c0 .575-.248 1.15-.745 1.542L6.144 17.58C4.868 18.587 3 17.671 3 16.037V7.963c0-1.634 1.867-2.55 3.144-1.542l5.111 4.036c.497.392.745.967.745 1.542V7.963c0-1.634 1.867-2.55 3.144-1.542l5.111 4.036a1.97 1.97 0 0 1 0 3.085Z"/>
  </svg>
);

export default ForwardIcon;