import React from "react";
import type { BaseIconProps } from "../type";

export const Cursor: React.FC<BaseIconProps> = ({
  size = 18,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M6.59999 2.66977L14.5575 9.55477C15.45 10.3273 14.9025 11.7898 13.725 11.7898H10.1175C9.47249 11.7898 8.865 12.0673 8.4375 12.5473L5.97748 15.3148C5.19748 16.1923 3.75 15.6373 3.75 14.4673V3.97477C3.75 2.49727 5.48249 1.70977 6.59999 2.66977V2.66977Z"
        fill={color}
      />
    </svg>
  );
};
