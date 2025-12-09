import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const MenuLeftIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M2 6a1 1 0 0 1 1-1h18a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Zm19 5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Zm-9 6H3a1 1 0 0 0 0 2h9a1 1 0 0 0 0-2Z"/>
  </svg>
);

export default MenuLeftIcon;