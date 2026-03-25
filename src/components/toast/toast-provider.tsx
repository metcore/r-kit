import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { ToastContext } from './toast-context';
import type { ToastProps } from './type';
import ToastItem from './toast-item';

type ToastItemType = ToastProps & {
  id: string;
};

type Position =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export function ToastProvider({
  children,
  position = 'top-right',
}: {
  children: React.ReactNode;
  position?: Position;
}) {
  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  const remove = (id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  const show = useCallback((props: ToastProps) => {
    const id = crypto.randomUUID();

    setToasts((t) => [...t, { ...props, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <div
        className={clsx(
          'fixed z-50 flex flex-col gap-3 duration-300',
          position === 'top-right' && 'top-4 right-4',
          position === 'top-left' && 'top-4 left-4',
          position === 'bottom-right' && 'right-4 bottom-4',
          position === 'bottom-left' && 'bottom-4 left-4',
          position === 'top-center' && 'top-4 left-1/2 -translate-x-1/2',
          position === 'bottom-center' && 'bottom-4 left-1/2 -translate-x-1/2'
        )}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onRemove={() => remove(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
