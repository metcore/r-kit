import * as React from "react";
import type { BaseIconProps } from "../type";

const CaretDown: React.FC<BaseIconProps> = ({ size = 18, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.023 11.547L4.738 7.651C4.186 6.997 4.654 6 5.514 6h6.972c.86 0 1.327.997.775 1.651l-3.285 3.896a1.28 1.28 0 01-1.953 0z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CaretDown;
