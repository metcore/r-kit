import React from "react";
import type { BaseIconProps } from "../type";

const Pdf: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 36"
    fill="none"
    className={className}
  >
    <path
      d="M0.59375 6.82812C0.59375 3.12609 3.59484 0.125 7.29688 0.125H17.2468L27.4038 10.6875V29.1719C27.4038 32.8739 24.4027 35.875 20.7007 35.875H7.29688C3.59485 35.875 0.59375 32.8739 0.59375 29.1719V6.82812Z"
      fill={`${color}`}
    />
  </svg>
);

export default Pdf;
