import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CursorIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m8.8 3.56 10.61 9.18c1.19 1.03.46 2.98-1.11 2.98h-4.81c-.86 0-1.67.37-2.24 1.01l-3.28 3.69C6.93 21.59 5 20.85 5 19.29V5.3c0-1.97 2.31-3.02 3.8-1.74Z"/>
  </svg>
);

export default CursorIcon;