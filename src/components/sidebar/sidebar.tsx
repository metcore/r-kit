import React from "react";
import { cn } from "../../lib/utils";
import { Input } from "../input";
import { useIsMobile } from "../../hooks/use-mobile";
import { Icon } from "../icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../sheet/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import type { SidebarContextProps } from "./type";
import { SidebarContext, useSidebar } from "./contex";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "13.75rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4.125rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  const [isHovered, setIsHovered] = React.useState(false);

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

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
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      isHovered,
    ]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const handleMouseEnter = React.useCallback(() => {
    if (isMobile || state === "expanded") {
      return;
    }
    console.log("handleMouseEnter");
    setIsHovered(true);
  }, [isMobile, state, setIsHovered]);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
  }, [setIsHovered]);

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "bg-white text-gray-900 flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-white text-gray-900 w-(--sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-gray-900 hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-hovered={isHovered}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=left]:border-gray-200 group-data-[side=right]:border-l group-data-[side=right]:border-gray-200",

          "group-data-[collapsible=icon]:group-data-[hovered=true]:w-(--sidebar-width)",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="bg-white group-data-[variant=floating]:border-gray-200 flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
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
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="trigger"
      className={cn("size-7", className)}
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

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "bg-gray-50 relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
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

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="header"
      className={cn("flex gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 p-3 flex-col gap-2 overflow-auto",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

type SidebarMenuItemProps = React.ComponentProps<"li"> & {
  active?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
};

function SidebarMenuItem({
  children,
  className,
  icon,
  active,
  asChild = true,
  ...props
}: SidebarMenuItemProps) {
  const { state, isHovered } = useSidebar();
  const itemClassName = cn(
    "flex items-center gap-2 px-3 py-2.5 bg-white text-gray-800 text-sm rounded-sm transition-colors w-full",
    "hover:bg-primary-100",
    active &&
      "bg-primary-100 text-primary-1000 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-primary-1000 before:rounded-r-md"
  );

  const iconElement = icon ? (
    <span className="shrink-0">{icon}</span>
  ) : (
    <span className="shrink-0">
      <Icon name="ellipse" size={18} />
    </span>
  );

  return (
    <li
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    >
      {asChild ? (
        (() => {
          const child = React.Children.only(children);

          if (!React.isValidElement(child)) {
            throw new Error(
              "SidebarMenuItem with asChild requires a single valid React element as child"
            );
          }

          const childElement = child as React.ReactElement<{
            className?: string;
            children?: React.ReactNode;
          }>;

          return React.cloneElement(childElement, {
            className: cn(itemClassName, childElement.props.className),
            children: (
              <>
                {iconElement}
                <span
                  className={cn(
                    "flex-1",
                    state === "collapsed" && !isHovered && "hidden"
                  )}
                >
                  {childElement.props.children}
                </span>
              </>
            ),
          });
        })()
      ) : (
        <div className={itemClassName}>
          {iconElement}
          <span
            className={cn(
              "flex-1",
              state === "collapsed" && !isHovered && "hidden"
            )}
          >
            {children}
          </span>
        </div>
      )}
    </li>
  );
}

interface SidebarMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarMenuGroup({
  children,
  className,
  icon,
  label,
  active = false,
  ...props
}: SidebarMenuGroupProps) {
  const { state, isHovered } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(active);

  const triggerClassName = cn(
    "relative flex items-center gap-2 px-3 py-2.5 bg-white hover:bg-primary-100 text-gray-800 text-sm rounded-sm transition-colors w-full",
    " cursor-pointer",
    active &&
      "bg-primary-100 text-primary-1000 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-primary-1000 before:rounded-r-md"
  );

  const iconElement = icon ? (
    <span className="shrink-0">{icon}</span>
  ) : (
    <span className="shrink-0">
      <Icon name="ellipse" size={18} />
    </span>
  );

  return (
    <Collapsible
      open={isOpen && (state === "expanded" || isHovered)}
      onOpenChange={setIsOpen}
      className={cn("group/menu-group gap-y-1 flex flex-col", className)}
      {...props}
    >
      <CollapsibleTrigger className={triggerClassName}>
        {iconElement}
        <span
          className={cn(
            "flex-1 text-left",
            state === "collapsed" && !isHovered && "hidden"
          )}
        >
          {label}
        </span>
        <Icon
          name="caret-down"
          size={18}
          className={cn(
            "shrink-0 transition-transform duration-200",
            state === "collapsed" && "hidden",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-3 flex flex-col gap-1">
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
