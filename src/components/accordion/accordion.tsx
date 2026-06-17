import React, { useEffect, useState } from 'react';
import { List } from '../list';
import { ListItem } from '../list';
import type { AccordionItemProps, AccordionProps } from './type';

export function Accordion({
  children,
  renderHeader,
  isOpen,
  onCollapse,
  variant = 'default',
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    onCollapse?.(next);
  };

  useEffect(() => {
    setIsExpanded(isOpen ?? false);
  }, [isOpen]);

  const validChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => Boolean(React.isValidElement(child))
  );

  return (
    <div>
      <List variant={variant}>
        {renderHeader != null && (
          <button
            type="button"
            onClick={toggle}
            className="w-full cursor-pointer"
          >
            <ListItem> {renderHeader} </ListItem>
          </button>
        )}

        {isExpanded &&
          React.Children.map(validChildren, (child, index) => {
            const isLast = index === validChildren.length - 1;
            return React.isValidElement<AccordionItemProps>(child) === true
              ? React.cloneElement(child, {
                  isLast,
                  index,
                  variant,
                })
              : child;
          })}
      </List>
    </div>
  );
}
