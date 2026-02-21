import React from "react";
import clsx from "clsx";
import { kbdVariants } from "./kbd-variants";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  color?: "neutral" | "primary" | "success" | "danger" | "info" | "warning";
}

export function Kbd({ size, variant, color, className, ...props }: KbdProps) {
  return (
    <kbd
      className={clsx(kbdVariants({ size, variant, color }), className)}
      {...props}
    />
  );
}
