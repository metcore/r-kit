import React from 'react';
import { Card, CardBody } from '../card';
import type { ListItemProps, ListProps } from './type';

export function List({ children, variant = 'default' }: ListProps) {
  const validChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => Boolean(React.isValidElement(child))
  );

  return (
    <Card>
      <CardBody className="p-0">
        {React.Children.map(validChildren, (child, index) => {
          const isLast = index === validChildren.length - 1;

          return React.isValidElement<ListItemProps>(child) === true
            ? React.cloneElement(child, {
                isLast,
                index,
                variant,
              })
            : child;
        })}
      </CardBody>
    </Card>
  );
}
