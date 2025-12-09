import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const StopIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M4 17V7c0-2 1-3 3-3h10c2 0 3 1 3 3v10c0 2-1 3-3 3H7c-2 0-3-1-3-3Z"/>
  </svg>
);

export default StopIcon;