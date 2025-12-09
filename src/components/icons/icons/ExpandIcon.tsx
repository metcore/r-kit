import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ExpandIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M22 4.5V8a1 1 0 1 1-2 0V4.5c0-.449-.052-.5-.5-.5H16a1 1 0 1 1 0-2h3.5c1.542 0 2.5.958 2.5 2.5ZM8 2H4.5C2.958 2 2 2.958 2 4.5V8a1 1 0 1 0 2 0V4.5c0-.449.052-.5.5-.5H8a1 1 0 1 0 0-2Zm0 18H4.5c-.448 0-.5-.051-.5-.5V16a1 1 0 1 0-2 0v3.5c0 1.542.958 2.5 2.5 2.5H8a1 1 0 1 0 0-2Zm13-5a1 1 0 0 0-1 1v3.5c0 .449-.052.5-.5.5H16a1 1 0 1 0 0 2h3.5c1.542 0 2.5-.958 2.5-2.5V16a1 1 0 0 0-1-1Z"/>
  </svg>
);

export default ExpandIcon;