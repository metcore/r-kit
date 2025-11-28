import React from "react";
import type { BaseIconProps } from "../type";

const Document: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 19"
    fill="none"
    className={className}
  >
    <path
      d="M9.75 3.5V1.25L14.25 5.75H12C10.42 5.75 9.75 5.08 9.75 3.5ZM12 7.25C9.58 7.25 8.25 5.92 8.25 3.5V0.5H3C1 0.5 0 1.5 0 3.5V15.5C0 17.5 1 18.5 3 18.5H12C14 18.5 15 17.5 15 15.5V7.25H12Z"
      fill={color}
    />
  </svg>
);

export default Document;
