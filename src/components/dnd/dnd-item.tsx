import { cn } from '../../lib/utils';
import { useDndContext } from './context';
import type { DndItemProps } from './type';

const DEFAULT_ITEM_ACTIVE_CLASS = 'opacity-40 bg-gray-50 border-dashed';

export function DndItem({
  containerId,
  index,
  children,
  className,
  activeClassName = DEFAULT_ITEM_ACTIVE_CLASS,
  ...props
}: DndItemProps) {
  const { handleDragStart, handleDragEnter, handleDragEnd, handleDragOver } =
    useDndContext();

  return (
    <div
      {...props}
      draggable
      onDragStart={(event) =>
        handleDragStart(event, containerId, index, activeClassName)
      }
      onDragEnter={() => handleDragEnter(containerId, index)}
      onDragEnd={() => handleDragEnd(activeClassName)}
      onDragOver={handleDragOver}
      className={cn('cursor-grab active:cursor-grabbing', className)}
    >
      {children}
    </div>
  );
}
