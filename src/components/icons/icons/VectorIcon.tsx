import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const VectorIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21.5 5.5v-1c0-1.271-.729-2-2-2h-1c-1.183 0-1.888.638-1.981 1.75H7.482C7.389 3.138 6.684 2.5 5.501 2.5h-1c-1.271 0-2 .729-2 2v1c0 1.183.638 1.888 1.75 1.981v9.037c-1.112.093-1.75.798-1.75 1.981v1c0 1.271.729 2 2 2h1c1.183 0 1.888-.638 1.981-1.75h9.037c.093 1.112.798 1.75 1.981 1.75h1c1.271 0 2-.729 2-2v-1c0-1.183-.638-1.888-1.75-1.981V7.481c1.112-.093 1.75-.798 1.75-1.981Zm-4.981 12.75H7.482c-.086-1.029-.702-1.645-1.731-1.731V7.482c1.029-.086 1.645-.702 1.731-1.731h9.037c.086 1.029.702 1.645 1.731 1.731v9.037c-1.029.086-1.645.702-1.731 1.731Z"/>
  </svg>
);

export default VectorIcon;