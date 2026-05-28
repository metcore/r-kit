import type { DragEvent, HTMLAttributes, RefObject, ReactNode } from 'react';

export type DndItemsRecord<T = unknown> = Record<string, T[]>;

export interface DndDragPosition {
  container: string;
  index: number;
}

export interface DndContextProps<T = unknown> {
  items: DndItemsRecord<T>;
  onItemsChange: (items: DndItemsRecord<T>) => void;
  dragItem: RefObject<DndDragPosition | null>;
  dragNode: RefObject<HTMLElement | null>;
  handleDragStart: (
    event: DragEvent<HTMLDivElement>,
    container: string,
    index: number,
    activeClassName?: string
  ) => void;
  handleDragEnter: (targetContainer: string, targetIndex: number) => void;
  handleDragEnterContainer: (targetContainer: string) => void;
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (activeClassName?: string) => void;
}

export interface DndBoardProps<T = unknown> {
  items: DndItemsRecord<T>;
  onItemsChange: (newItems: DndItemsRecord<T>) => void;
  children: ReactNode;
  className?: string;
}

export interface DndColumnProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'id'
> {
  id: string;
}

export interface DndItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'draggable' | 'onDragStart' | 'onDragEnter' | 'onDragEnd' | 'onDragOver'
> {
  containerId: string;
  index: number;
  activeClassName?: string;
}
