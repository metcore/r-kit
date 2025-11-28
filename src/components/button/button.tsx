import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { buttonVariants, type ButtonVariantProps } from "./button-variants";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
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

export const Button = ({
  variant,
  size,
  color,
  className,
  disabled,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, color }), className)}
      disabled={disabled}
      {...props}
    />
  );
};
