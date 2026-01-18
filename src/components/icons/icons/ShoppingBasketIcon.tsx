import React from "react";

import type { IconProps } from "../type";

const ShoppingBasketIcon: React.FC<IconProps> = ({
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
    <path fill={color} fill-rule="evenodd" d="M21 9a2 2 0 0 1-2 2H5a2 2 0 0 1 0-4h1.728l2.649-4.388a.749.749 0 1 1 1.283.776L8.479 7h7.051l-2.156-3.616a.75.75 0 1 1 1.289-.767l2.614 4.384H19A2 2 0 0 1 21 9Zm-1.624 3.33-.606 5.97c-.14 1.53-.78 2.7-2.98 2.7H8.23c-2.24 0-2.83-1.17-2.99-2.7l-.616-5.969A.3.3 0 0 1 4.922 12h14.155a.3.3 0 0 1 .299.33ZM10.77 14.5a.749.749 0 1 0-1.5 0v3a.749.749 0 1 0 1.5 0v-3Zm4 0a.749.749 0 1 0-1.5 0v3a.749.749 0 1 0 1.5 0v-3Z" clip-rule="evenodd"/>
  </svg>
);

export default ShoppingBasketIcon;