import React from 'react';
import type { BaseIconProps } from '../type';

const Folder: React.FC<BaseIconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15.7627 5.99381C16.0611 6.41875 15.7054 6.9375 15.1862 6.9375H2.25C1.83579 6.9375 1.5 6.60171 1.5 6.1875V4.815C1.5 2.985 2.985 1.5 4.815 1.5H6.555C7.7775 1.5 8.16 1.8975 8.6475 2.55L9.6975 3.945C9.93 4.2525 9.96 4.29 10.395 4.29H12.4875C13.8409 4.29 15.0387 4.96282 15.7627 5.99381Z"
      fill={color}
    />
    <path
      d="M15.7375 8.06231C16.1508 8.0623 16.4861 8.39654 16.4875 8.80977L16.5 12.4875C16.5 14.7 14.7 16.5 12.4875 16.5H5.5125C3.3 16.5 1.5 14.7 1.5 12.4875V8.81249C1.5 8.39828 1.83578 8.06249 2.24999 8.06249L15.7375 8.06231Z"
      fill={color}
    />
  </svg>
);

export default Folder;
