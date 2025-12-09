import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CommentNotificationIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 12.001c0 5.001-4.03 8.001-9 8.001-1.28 0-2.49-.2-3.59-.58-1.34 1.43-3.53 1.62-4.95 1.57-.43-.01-.62-.56-.29-.84 1.09-.88 1.63-1.98 1.78-2.94C3.73 15.891 3 14.12 3 12c0-5.001 4.03-8.001 9-8.001 1.229 0 2.409.185 3.483.548.159.054.234.23.183.39a3.522 3.522 0 0 0-.05 1.971c.333 1.294 1.431 2.318 2.749 2.539.653.11 1.28.05 1.836-.163.164-.063.353.007.408.174A8 8 0 0 1 21 12.001ZM21 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
  </svg>
);

export default CommentNotificationIcon;