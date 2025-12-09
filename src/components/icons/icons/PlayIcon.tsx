import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const PlayIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18.66 14.386 8.586 20.553C6.58 21.78 4 20.34 4 17.994V6.005C4 3.66 6.58 2.221 8.585 3.448L18.66 9.614c1.785 1.092 1.785 3.68 0 4.772Z"/>
  </svg>
);

export default PlayIcon;