import * as React from "react";
import type { BaseIconProps } from "../type";

const LayoutWeb: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 3.25H6C3.582 3.25 2.25 4.582 2.25 7v10c0 2.418 1.332 3.75 3.75 3.75h12c2.418 0 3.75-1.332 3.75-3.75V7c0-2.418-1.332-3.75-3.75-3.75zM3.75 17V7c0-1.577.673-2.25 2.25-2.25h2.25v14.5H6c-1.577 0-2.25-.673-2.25-2.25zm16.5 0c0 1.577-.673 2.25-2.25 2.25H9.75V4.75H18c1.577 0 2.25.673 2.25 2.25v10z"
        fill={color}
      />
    </svg>
  );
};

export default LayoutWeb;
