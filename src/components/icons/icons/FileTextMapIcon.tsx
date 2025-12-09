import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const FileTextMapIcon: React.FC<IconProps> = ({
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
    <path fill={color} fill-rule="evenodd" d="M17 8.25h2.25l-4.5-4.5V6c0 1.58.67 2.25 2.25 2.25Zm3 5.01V9.75h-3c-2.42 0-3.75-1.33-3.75-3.75V3H8C6 3 5 4 5 6v12c0 2 1 3 3 3h7.524l-.15-.158C14.634 20.037 14 18.96 14 17.579 14 15.074 15.997 13 18.5 13c.527 0 1.032.092 1.5.26Zm-7 1.99a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5h4Zm3-4a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5h7Z" clip-rule="evenodd"/>
  <path fill={color} d="M22 17.579c0 2.098-1.906 3.386-3.168 4.237l-.218.149a.203.203 0 0 1-.228 0l-.218-.149C16.906 20.965 15 19.677 15 17.58c0-1.975 1.57-3.58 3.5-3.58s3.5 1.605 3.5 3.579Z"/>
  </svg>
);

export default FileTextMapIcon;