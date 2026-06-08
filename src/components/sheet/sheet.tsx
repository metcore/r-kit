'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import { cn } from '../../lib/utils';
import type { SheetProps } from './type';
export type SheetSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

const sheetSizeClasses: Record<SheetSize, string> = {
  sm: 'w-1/4 sm:max-w-sm',
  md: 'w-1/3 sm:max-w-md',
  lg: 'w-1/2 sm:max-w-lg',
  xl: 'w-2/3 sm:max-w-xl',
  full: 'w-full',
};
const SHEET_URL_EVENT = '__sheet_url_change__';

function readParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

function useUrlSearchParams() {
  const [params, setParams] = React.useState<URLSearchParams>(readParams);

  React.useEffect(() => {
    const sync = () => setParams(readParams());
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener(SHEET_URL_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(SHEET_URL_EVENT, sync);
    };
  }, []);

  const setSearchParams = React.useCallback(
    (
      updater: (prev: URLSearchParams) => URLSearchParams,
      options?: { replace?: boolean }
    ) => {
      const next = updater(readParams());
      const query = next.toString();
      const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;

      if (options?.replace == true) {
        window.history.replaceState(window.history.state, '', url);
      } else {
        window.history.pushState(window.history.state, '', url);
      }
      // Notify Sheet lain & re-render diri sendiri
      window.dispatchEvent(new Event(SHEET_URL_EVENT));
    },
    []
  );

  return [params, setSearchParams] as const;
}

function Sheet({
  id,
  urlReplace = false,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: SheetProps) {
  const [searchParams, setSearchParams] = useUrlSearchParams();

  const isControlled = openProp !== undefined;
  const isUrlSynced = id !== undefined && !isControlled;
  const urlParam = id !== undefined ? `sheet-${id}` : undefined;

  const open = isControlled
    ? openProp
    : isUrlSynced && urlParam !== undefined
      ? searchParams.has(urlParam)
      : undefined;

  const handleOpenChange = (next: boolean) => {
    if (isUrlSynced && urlParam !== undefined) {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next) p.set(urlParam, '1');
          else p.delete(urlParam);
          return p;
        },
        { replace: urlReplace }
      );
    }
    onOpenChange?.(next);
  };

  const stateProps =
    isControlled || isUrlSynced
      ? { open, onOpenChange: handleOpenChange }
      : { defaultOpen, onOpenChange: handleOpenChange };

  return <SheetPrimitive.Root data-slot="sheet" {...stateProps} {...props} />;
}

export function useSheetHref(id: string): string {
  const [searchParams] = useUrlSearchParams();
  const params = new URLSearchParams(searchParams);
  params.set(`sheet-${id}`, '1');
  return `?${params.toString()}`;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  size = 'md',
  onInteractOutside,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: SheetSide;
  size?: SheetSize;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        onInteractOutside={(event) => {
          const target = event.target as Element | null;
          if (target?.closest('[data-select-menu]')) {
            event.preventDefault();
          }
          onInteractOutside?.(event);
        }}
        className={cn(
          'fixed z-50 flex flex-col gap-4 border-gray-200 bg-white shadow-lg transition ease-in-out',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            cn(
              'inset-y-0 right-0 h-full border-l',
              'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
              sheetSizeClasses[size]
            ),
          side === 'left' &&
            cn(
              'inset-y-0 left-0 h-full border-r',
              'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
              sheetSizeClasses[size]
            ),
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

// SheetBody adalah container konten biasa — bukan Dialog.Description.
// Dialog.Description merender <p>, jadi menaruh <div>/<Select>/<Button> di
// dalamnya = HTML invalid (p tidak boleh membungkus block element) dan
// browser akan memecah strukturnya.
function SheetBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-body"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetBody,
};
