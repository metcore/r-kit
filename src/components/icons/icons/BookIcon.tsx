import React from 'react';
import type { BaseIconProps } from '../type';

const BookIcon: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
}) => (
  <svg
    width={size}
    height={size + 1}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.4375 0H9.5625V5.8125L8.0625 4.95529L6.5625 5.8125V0H2.8125C0.999 0 0 0.999 0 2.8125V11.8125C0 13.4948 1.13025 14.625 2.8125 14.625H11.4375C12.3675 14.625 13.125 13.8683 13.125 12.9375V8.4375V1.6875C13.125 0.75675 12.3675 0 11.4375 0ZM12 12.9375C12 13.248 11.7472 13.5 11.4375 13.5H2.8125C1.29 13.5 1.125 12.3195 1.125 11.8125C1.125 11.3055 1.29 10.125 2.8125 10.125H11.4375C11.5462 10.125 11.6513 10.1123 11.7541 10.0928C11.7871 10.0868 11.8185 10.0755 11.8508 10.0672C11.9003 10.0545 11.952 10.0455 12 10.0282V12.9375Z"
      fill={color}
    />
  </svg>
);

export default BookIcon;
