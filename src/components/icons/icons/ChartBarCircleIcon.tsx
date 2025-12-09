import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ChartBarCircleIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.5 13.5c0 1-.5 1.5-1.5 1.5s-1.5-.5-1.5-1.5v-3c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5v3Zm6 0c0 1-.5 1.5-1.5 1.5s-1.5-.5-1.5-1.5v-7c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5v7Z"/>
  </svg>
);

export default ChartBarCircleIcon;