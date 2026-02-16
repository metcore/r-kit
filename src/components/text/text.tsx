import { cn } from "../../lib/utils";
import { TextVariants } from "./text-variants";
import type { TextProps } from "./type";

export function Text({
  as: TextComponent = "p",
  align,
  color,
  numberOfLines,
  variant,
  weight,
  value,
  children,
  className,
}: TextProps) {
  const content = value || children;

  return (
    <TextComponent
      className={cn(
        TextVariants({
          variant,
          weight,
          color,
          align,
          numberOfLines,
        }),
        className,
      )}
    >
      {content}
    </TextComponent>
  );
}
