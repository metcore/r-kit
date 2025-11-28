import type { BaseIconProps } from "../type";

export const Ellipse: React.FC<BaseIconProps> = ({
  size = 18,
  color = "currentColor",
  ...props
}) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
  >
    <circle cx="9" cy="9" r="4" fill={color} />
  </svg>
);
