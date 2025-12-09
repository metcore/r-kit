import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ServerIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 9V6c0-2-1-3-3-3H6C4 3 3 4 3 6v3c0 2 1 3 3 3-2 0-3 1-3 3v3c0 2 1 3 3 3h12c2 0 3-1 3-3v-3c0-2-1-3-3-3 2 0 3-1 3-3Zm-6.5 8.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
  </svg>
);

export default ServerIcon;