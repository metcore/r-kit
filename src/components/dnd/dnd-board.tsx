import { useRef } from 'react';
import type { DragEvent } from 'react';
import { cn } from '../../lib/utils';
import { DndContext } from './context';
import type {
  DndBoardProps,
  DndContextProps,
  DndDragPosition,
  DndItemsRecord,
} from './type';

const DEFAULT_ACTIVE_CLASS = 'opacity-40';

const getClassList = (className: string) =>
  className.split(/\s+/).filter((classItem) => classItem.length > 0);

function moveItem<T>(
  items: DndItemsRecord<T>,
  current: DndDragPosition,
  targetContainer: string,
  targetIndex: number
) {
  const sourceItems = items[current.container];
  const targetItems = items[targetContainer];

  if (sourceItems === undefined || targetItems === undefined) return null;
  if (current.index < 0 || current.index >= sourceItems.length) return null;
  if (targetIndex < 0 || targetIndex > targetItems.length) return null;

  const newItems = { ...items };
  newItems[current.container] = [...sourceItems];
  newItems[targetContainer] =
    current.container === targetContainer
      ? newItems[current.container]
      : [...targetItems];

  const movedItem = newItems[current.container]?.splice(current.index, 1)[0];
  if (movedItem === undefined) return null;

  newItems[targetContainer]?.splice(targetIndex, 0, movedItem);

  return newItems;
}

export function DndBoard<T = unknown>({
  items,
  onItemsChange,
  children,
  className,
}: DndBoardProps<T>) {
  const itemsRef = useRef(items);
  const dragItem = useRef<DndDragPosition | null>(null);
  const dragNode = useRef<HTMLElement | null>(null);

  itemsRef.current = items;

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    container: string,
    index: number,
    activeClassName = DEFAULT_ACTIVE_CLASS
  ) => {
    dragItem.current = { container, index };
    dragNode.current = event.currentTarget;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${container}:${index}`);

    window.setTimeout(() => {
      dragNode.current?.classList.add(...getClassList(activeClassName));
    }, 0);
  };

  const handleDragEnter = (targetContainer: string, targetIndex: number) => {
    const current = dragItem.current;
    if (
      current === null ||
      (current.container === targetContainer && current.index === targetIndex)
    ) {
      return;
    }

    const newItems = moveItem(
      itemsRef.current,
      current,
      targetContainer,
      targetIndex
    );
    if (newItems === null) return;

    dragItem.current = { container: targetContainer, index: targetIndex };
    itemsRef.current = newItems;
    onItemsChange(newItems);
  };

  const handleDragEnterContainer = (targetContainer: string) => {
    const targetItems = itemsRef.current[targetContainer];
    if (targetItems === undefined || targetItems.length > 0) return;

    const current = dragItem.current;
    if (current === null || current.container === targetContainer) return;

    const newItems = moveItem(itemsRef.current, current, targetContainer, 0);
    if (newItems === null) return;

    dragItem.current = { container: targetContainer, index: 0 };
    itemsRef.current = newItems;
    onItemsChange(newItems);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnd = (activeClassName = DEFAULT_ACTIVE_CLASS) => {
    dragNode.current?.classList.remove(...getClassList(activeClassName));
    dragItem.current = null;
    dragNode.current = null;
  };

  const contextValue: DndContextProps = {
    items: items as DndItemsRecord,
    onItemsChange: onItemsChange as (newItems: DndItemsRecord) => void,
    dragItem,
    dragNode,
    handleDragStart,
    handleDragEnter,
    handleDragEnterContainer,
    handleDragOver,
    handleDragEnd,
  };

  return (
    <DndContext.Provider value={contextValue}>
      <div className={cn(className)}>{children}</div>
    </DndContext.Provider>
  );
}
