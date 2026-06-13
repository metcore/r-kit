import React from 'react';
import { cn } from '../../lib/utils';
import { Input } from '../input';
import { useIsMobile } from '../../hooks/use-mobile';
import { Icon } from '../icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../sheet/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';
import type { SidebarContextProps } from './type';
import { SidebarContext, useSidebar } from './contex';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '13.75rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '4.125rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const HOVER_OPEN_DELAY = 150;
const HOVER_CLOSE_DELAY = 200;

type SidebarProviderProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function readSidebarCookie(): boolean | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + SIDEBAR_COOKIE_NAME + '=([^;]+)')
  );
  if (match === null) return undefined;
  if (match[1] === 'true') return true;
  if (match[1] === 'false') return false;
  return undefined;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = Boolean(useIsMobile());
  const [openMobile, setOpenMobile] = React.useState<boolean>(false);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [internalOpen, setInternalOpen] = React.useState<boolean>(() => {
    const stored = readSidebarCookie();
    return stored ?? defaultOpen;
  });
  const open = Boolean(openProp ?? internalOpen);

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const next = typeof value === 'function' ? value(open) : value;
      if (setOpenProp !== undefined) {
        setOpenProp(next);
      } else {
        setInternalOpen(next);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((v: boolean) => !v);
    } else {
      setOpen((v: boolean) => !v);
    }
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state: 'expanded' | 'collapsed' = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      isHovered,
      setIsHovered,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar, isHovered]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

type SidebarProps = React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
};

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'icon',
  className,
  children,
  ...props
}: SidebarProps) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const openTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = React.useCallback(() => {
    if (openTimer.current != null) {
      clearTimeout(openTimer.current);
    }

    if (closeTimer.current != null) {
      clearTimeout(closeTimer.current);
    }
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  React.useEffect(() => clearTimers, [clearTimers]);

  const handleMouseEnter = React.useCallback(() => {
    if (isMobile == true || state === 'expanded' || collapsible !== 'icon')
      return;
    clearTimers();
    openTimer.current = setTimeout(() => setIsHovered(true), HOVER_OPEN_DELAY);
  }, [isMobile, state, collapsible, clearTimers, setIsHovered]);

  const handleMouseLeave = React.useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(
      () => setIsHovered(false),
      HOVER_CLOSE_DELAY
    );
  }, [clearTimers, setIsHovered]);

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'flex h-full w-(--sidebar-width) flex-col bg-white text-gray-900',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile == true) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-white p-0 text-gray-900 [&>button]:hidden"
          style={
            { '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Menampilkan sidebar mobile.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer hidden text-gray-900 md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-hovered={isHovered}
      data-slot="sidebar"
    >
      <div
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=left]:border-gray-200 group-data-[side=right]:border-l group-data-[side=right]:border-gray-200',
          'group-data-[collapsible=icon]:group-data-[hovered=true]:w-(--sidebar-width)',
          'group-data-[collapsible=icon]:group-data-[hovered=true]:shadow-lg',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-white group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-gray-200 group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const { toggleSidebar, state } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="trigger"
      aria-label="Toggle Sidebar"
      aria-expanded={state === 'expanded'}
      className={cn(
        'inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-gray-700',
        'focus-visible:ring-primary-500 hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none',
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <Icon name="layout-web" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'relative flex w-full flex-1 flex-col bg-gray-50',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return <Input data-sidebar="input" className={className} {...props} />;
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="header"
      className={cn('flex gap-2 p-2', className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-x-hidden overflow-y-auto p-3',
        'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

type SidebarMenuItemProps = React.ComponentProps<'li'> & {
  active?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
};

// Helper: render icon + label dengan label visibility yang konsisten
function MenuItemInner({
  icon,
  expanded,
  children,
}: {
  icon?: React.ReactNode;
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="shrink-0">
        {icon ?? <Icon name="ellipse" size={18} />}
      </span>
      <span
        className={cn(
          'flex-1 truncate transition-opacity duration-150',
          expanded ? 'opacity-100' : 'pointer-events-none w-0 opacity-0'
        )}
      >
        {children}
      </span>
    </>
  );
}

function SidebarMenuItem({
  children,
  className,
  icon,
  active = false,
  asChild = true,
  ...props
}: SidebarMenuItemProps) {
  const { state, isHovered } = useSidebar();
  const expanded = state === 'expanded' || isHovered;

  const itemClassName = cn(
    'flex w-full items-center gap-2 rounded-sm bg-white px-3 py-2.5 text-sm text-gray-800 transition-colors',
    'hover:bg-primary-100',
    'focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:outline-none',
    active == true &&
      'bg-primary-100 text-primary-1000 before:bg-primary-1000 before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-md'
  );

  let body: React.ReactNode;

  if (asChild == true) {
    const child = React.Children.only(children);
    if (Boolean(React.isValidElement(child)) === false) {
      throw new Error(
        'SidebarMenuItem with asChild requires a single valid React element as child'
      );
    }
    const childEl = child as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    body = React.cloneElement(childEl, {
      className: cn(itemClassName, childEl.props.className),
      children: (
        <MenuItemInner icon={icon} expanded={expanded}>
          {childEl.props.children}
        </MenuItemInner>
      ),
    });
  } else {
    body = (
      <div className={itemClassName}>
        <MenuItemInner icon={icon} expanded={expanded}>
          {children}
        </MenuItemInner>
      </div>
    );
  }

  return (
    <li
      data-sidebar="menu-item"
      data-active={active}
      aria-current={active == true ? 'page' : undefined}
      className={cn('group/menu-item relative', className)}
      {...props}
    >
      {body}
    </li>
  );
}

type SidebarMenuGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
};

function SidebarMenuGroup({
  children,
  className,
  icon,
  label,
  active = false,
  ...props
}: SidebarMenuGroupProps) {
  const { state, isHovered } = useSidebar();
  const expanded = state === 'expanded' || isHovered;
  const [isOpen, setIsOpen] = React.useState(active);

  const triggerClassName = cn(
    'relative flex w-full cursor-pointer items-center gap-2 rounded-sm bg-white px-3 py-2.5 text-sm text-gray-800 transition-colors',
    'hover:bg-primary-100',
    'focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:outline-none',
    active == true &&
      'bg-primary-100 text-primary-1000 before:bg-primary-1000 before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-md'
  );

  return (
    <Collapsible
      open={isOpen == true && expanded}
      onOpenChange={setIsOpen}
      className={cn('group/menu-group flex flex-col gap-y-1', className)}
      {...props}
    >
      <CollapsibleTrigger className={triggerClassName}>
        <span className="shrink-0">
          {icon ?? <Icon name="ellipse" size={18} />}
        </span>
        <span
          className={cn(
            'flex-1 truncate text-left transition-opacity duration-150',
            expanded == true
              ? 'opacity-100'
              : 'pointer-events-none w-0 opacity-0'
          )}
        >
          {label}
        </span>
        <Icon
          name="caret-down"
          size={18}
          className={cn(
            'shrink-0 transition-transform duration-200',
            expanded == false && 'hidden',
            isOpen == true && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-1 pl-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuGroup,
};
