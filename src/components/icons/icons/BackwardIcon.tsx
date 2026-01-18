import React from "react";

import type { IconProps } from "../type";

const BackwardIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 7.963v8.074c0 1.634-1.868 2.55-3.144 1.542l-5.111-4.037A1.954 1.954 0 0 1 12 12.02v4.018c0 1.634-1.868 2.55-3.144 1.542l-5.111-4.037a1.97 1.97 0 0 1 0-3.085l5.111-4.036C10.132 5.413 12 6.33 12 7.963v4.018a1.954 1.954 0 0 1 .745-1.524l5.111-4.036C19.133 5.413 21 6.329 21 7.963Z"/>
  </svg>
);

export default BackwardIcon;