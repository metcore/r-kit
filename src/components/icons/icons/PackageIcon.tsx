import React from "react";

import type { IconProps } from "../type";

const PackageIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20.7 10.75H3.3a.3.3 0 0 0-.3.3V18c0 2 1 3 3 3h12c2 0 3-1 3-3v-6.95a.3.3 0 0 0-.3-.3Zm-10.7 7H7a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 0 1.5Zm2.75-8.8V3.3a.3.3 0 0 1 .3-.3h3.69c2.26 0 2.51.89 2.88 2.18l1.054 3.688a.3.3 0 0 1-.288.382H13.05a.3.3 0 0 1-.3-.3Zm-9.424-.082L4.38 5.18C4.75 3.89 5 3 7.26 3h3.69a.3.3 0 0 1 .3.3v5.65a.3.3 0 0 1-.3.3H3.614a.3.3 0 0 1-.288-.382Z"/>
  </svg>
);

export default PackageIcon;