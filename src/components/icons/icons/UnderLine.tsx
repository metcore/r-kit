import React from "react";
import type { BaseIconProps } from "../type";

const UnderLine: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 17"
    fill="none"
    className={className}
  >
    <path
      d="M12.9999 1.41016V7.24349C12.9999 10.0049 10.7613 12.2435 7.99992 12.2435C5.23849 12.2435 2.99992 10.0049 2.99992 7.24349V1.41016M1.33325 15.5768H14.6666"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export default UnderLine;
