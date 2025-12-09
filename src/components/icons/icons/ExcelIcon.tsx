import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ExcelIcon: React.FC<IconProps> = ({
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
    <path fill="#21A366" d="M14.39 3.14h-7a.83.83 0 0 0-.84.84v3.66h7.88l-.04-4.5Z"/>
  <path fill="#33C481" d="M20.87 3.14h-6.48v4.5h7.33V3.97a.839.839 0 0 0-.85-.83Z"/>
  <path fill="#107C41" d="M21.71 12.14h-7.32v4.51h7.32v-4.51Z"/>
  <path fill="#185C37" d="M14.39 16.65v-4.51H6.51v8.17a.83.83 0 0 0 .84.84h13.52a.84.84 0 0 0 .85-.84v-3.66h-7.33Z"/>
  <path fill="#107C41" d="M14.4 7.63H6.51v4.51h7.89V7.63Z"/>
  <path fill="#21A366" d="M21.71 7.63h-7.32v4.51h7.32V7.63Z"/>
  <path fill="#107C41" d="M11.29 7.07H2.85a.85.85 0 0 0-.85.85v8.44c0 .47.38.85.85.85h8.44c.47 0 .85-.38.85-.85V7.92a.85.85 0 0 0-.85-.85Z"/>
  <path fill="#fff" d="m4.62 14.89 1.77-2.75L4.77 9.4h1.31l.88 1.74c.067.122.124.249.17.38a3.51 3.51 0 0 1 .19-.39l1-1.74h1.2l-1.71 2.75 1.71 2.77H8.24l-1-1.93a1.17 1.17 0 0 1-.13-.25c-.033.086-.073.17-.12.25l-1.06 1.93-1.31-.02Z"/>
  </svg>
);

export default ExcelIcon;