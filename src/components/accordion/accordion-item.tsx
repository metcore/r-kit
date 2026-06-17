import { ListItem } from '../list';
import type { AccordionItemProps } from './type';

export function AccordionItem({
  children,
  index = 0,
  isLast,
  variant,
}: AccordionItemProps) {
  return (
    <ListItem index={index} isLast={isLast} variant={variant}>
      {children}
    </ListItem>
  );
}
