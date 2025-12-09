import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ClockFastForwardIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path stroke="#484848" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m22.7 11.5-2 2-2-2m2.245 1.5A9 9 0 1 0 19 17.657M12 7v5l3 2"/>
  </svg>
);

export default ClockFastForwardIcon;