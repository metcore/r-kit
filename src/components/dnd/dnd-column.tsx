import { cn } from '../../lib/utils';
import { useDndContext } from './context';
import type { DndColumnProps } from './type';

export function DndColumn({
  id,
  children,
  className,
  onDragEnter,
  onDragOver,
  ...props
}: DndColumnProps) {
  const { handleDragEnterContainer, handleDragOver } = useDndContext();

  return (
    <div
      {...props}
      onDragEnter={(event) => {
        handleDragEnterContainer(id);
        onDragEnter?.(event);
      }}
      onDragOver={(event) => {
        handleDragOver(event);
        onDragOver?.(event);
      }}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
