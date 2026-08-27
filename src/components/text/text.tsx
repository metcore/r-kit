import { cn } from '../../lib/utils';
import { TextVariants } from './text-variants';
import type { TextProps } from './type';

export function Text({
  as: TextComponent = 'p',
  align,
  color,
  numberOfLines,
  variant,
  weight,
  value,
  children,
  className,
  onClick,
  dangerouslySetInnerHTML,
}: TextProps) {
  const content = value ?? children;

  return (
    <TextComponent
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={cn(
        TextVariants({
          variant,
          weight,
          color,
          align,
          numberOfLines,
        }),
        className
      )}
      onClick={onClick}
    >
      {content}
    </TextComponent>
  );
}
