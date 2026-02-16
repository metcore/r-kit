import React from "react";

import type { IconProps } from "../type";

const AdjustIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M8 8c0 1.3-.84 2.4-2 2.82V21c0 .55-.45 1-1 1s-1-.45-1-1V10.82C2.84 10.4 2 9.3 2 8c0-1.3.84-2.4 2-2.82V3c0-.55.45-1 1-1s1 .45 1 1v2.18C7.16 5.6 8 6.7 8 8Zm7 8c0 1.3-.84 2.4-2 2.82V21c0 .55-.45 1-1 1s-1-.45-1-1v-2.18C9.84 18.4 9 17.3 9 16c0-1.3.84-2.4 2-2.82V3c0-.55.45-1 1-1s1 .45 1 1v10.18c1.16.42 2 1.52 2 2.82Zm7-8c0 1.3-.84 2.4-2 2.82V21c0 .55-.45 1-1 1s-1-.45-1-1V10.82C16.84 10.4 16 9.3 16 8c0-1.3.84-2.4 2-2.82V3c0-.55.45-1 1-1s1 .45 1 1v2.18c1.16.42 2 1.52 2 2.82Z"/>
  </svg>
);

export default AdjustIcon;