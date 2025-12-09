import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CaretRightIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m15.396 13.302-5.194 4.38C9.329 18.418 8 17.794 8 16.648V7.352c0-1.146 1.33-1.77 2.202-1.034l5.194 4.38a1.706 1.706 0 0 1 0 2.604Z"/>
  </svg>
);

export default CaretRightIcon;