import React from "react";
import type { BaseIconProps } from "../type";

export const CircleAndSquare: React.FC<BaseIconProps> = ({
  size = 18,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M15 8.4V13.2C15 14.19 14.19 15 13.2 15H8.4C7.41 15 6.6 14.19 6.6 13.2C6.6 12.87 6.87 12.6 7.2 12.6C10.176 12.6 12.6 10.176 12.6 7.2C12.6 6.87 12.87 6.6 13.2 6.6C14.19 6.6 15 7.41 15 8.4ZM7.2 3C4.884 3 3 4.884 3 7.2C3 9.516 4.884 11.4 7.2 11.4C9.516 11.4 11.4 9.516 11.4 7.2C11.4 4.884 9.516 3 7.2 3Z"
        fill={color}
      />
    </svg>
  );
};
