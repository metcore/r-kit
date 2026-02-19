import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/utils";

export function Dropdown({
  children,
  ...props
}: { children: React.ReactNode } & DropdownMenu.DropdownMenuProps) {
  return <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>;
}

export function DropdownTrigger({
  children,
  ...props
}: { children: React.ReactNode } & DropdownMenu.DropdownMenuTriggerProps) {
  return <DropdownMenu.Trigger {...props}>{children}</DropdownMenu.Trigger>;
}

export function DropdownContent({
  children,
  className,
  portalProps,
  ...props
}: {
  children: React.ReactNode;
  portalProps?: DropdownMenu.DropdownMenuPortalProps;
} & DropdownMenu.DropdownMenuContentProps) {
  return (
    <DropdownMenu.Portal {...portalProps}>
      <DropdownMenu.Content
        sideOffset={props.sideOffset || 15}
        className={cn(
          "shadow-dropdown flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-3",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

export function DropdownItem({
  children,
  className,
  ...props
}: { children: React.ReactNode } & DropdownMenu.DropdownMenuItemProps) {
  return (
    <DropdownMenu.Item
      className={cn(
        "hover:bg-primary-50 hover:border-primary-300 flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 outline-0 transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
}
