import React from "react";

import type { IconProps } from "../type";

const ShoppingBasketUserIcon: React.FC<IconProps> = ({
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
    <path fill={color} fill-rule="evenodd" d="M19.078 12H4.923a.3.3 0 0 0-.299.331L5.24 18.3c.16 1.53.75 2.7 2.99 2.7h7.56c2.2 0 2.84-1.17 2.98-2.7l.606-5.97a.3.3 0 0 0-.298-.33ZM21 9a2 2 0 0 1-2 2H5a2 2 0 0 1 0-4h1.728l2.649-4.388a.749.749 0 1 1 1.283.776L8.479 7h7.051l-2.156-3.616a.75.75 0 1 1 1.289-.767l2.614 4.384H19A2 2 0 0 1 21 9Zm-9 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.215 2.5c.433 0 .799-.365.633-.765a2.002 2.002 0 0 0-3.262-.65 2.002 2.002 0 0 0-.434.65c-.166.4.2.765.633.765h2.43Z" clip-rule="evenodd"/>
  </svg>
);

export default ShoppingBasketUserIcon;