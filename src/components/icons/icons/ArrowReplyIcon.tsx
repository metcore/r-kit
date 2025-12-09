import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ArrowReplyIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M11 8.496c3 0 10 .5 10 6.994 0 1.708-.468 3.183-1.083 4.265-.242.425-.891.263-.885-.227.033-2.567-.469-5.037-8.032-5.037v3.505c0 .895-1.094 1.33-1.709.68l-5.928-6.271a1.327 1.327 0 0 1 0-1.824l5.928-6.27C9.906 3.661 11 4.096 11 4.99v3.506Z"/>
  </svg>
);

export default ArrowReplyIcon;