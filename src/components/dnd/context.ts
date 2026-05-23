import { createContext, useContext } from 'react';
import type { DndContextProps } from './type';

export const DndContext = createContext<DndContextProps | null>(null);

export function useDndContext() {
  const context = useContext(DndContext);

  if (context === null) {
    throw new Error('Komponen Dnd harus digunakan di dalam <DndBoard>');
  }

  return context;
}
