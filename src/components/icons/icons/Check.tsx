import type React from "react";
import type { BaseIconProps } from "../type";

const Check: React.FC<BaseIconProps> = ({
  size = 16,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M5 13l4 4L19 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Check;
