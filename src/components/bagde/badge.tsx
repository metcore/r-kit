import type { HtmlHTMLAttributes } from "react";
import { badgeVariants, type BadgeVariantProps } from "./badge-variants";
import { cn } from "../../lib/utils";

interface BadgeProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    BadgeVariantProps {
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "orange"
    | "purple"
    | "gray";
}

export const Bagde = ({ children, className, size, color }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ size, color }), className)}>
      {children}
    </div>
  );
};
