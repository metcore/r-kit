import React from "react";

import type { IconProps } from "../type";

const RefreshCcwIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M5.572 5.572A9.091 9.091 0 0 1 20.865 9.98a.91.91 0 0 1-1.773.403A7.274 7.274 0 0 0 6.857 6.857c-1.07 1.07-1.777 1.855-2.242 2.416h3.749a.91.91 0 0 1 0 1.818H2.909A.91.91 0 0 1 2 10.18V4.728a.91.91 0 1 1 1.818 0v2.687a46.069 46.069 0 0 1 1.754-1.842ZM22 19.272a.91.91 0 1 1-1.818 0v-2.687a45.966 45.966 0 0 1-1.754 1.843A9.091 9.091 0 0 1 3.135 14.02a.91.91 0 0 1 1.773-.403 7.273 7.273 0 0 0 12.235 3.526c1.07-1.07 1.777-1.855 2.242-2.416h-3.749a.91.91 0 1 1 0-1.818h5.455a.91.91 0 0 1 .909.91v5.454Z"/>
  </svg>
);

export default RefreshCcwIcon;