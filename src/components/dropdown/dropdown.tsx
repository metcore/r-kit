import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../lib/utils';
import { BaseButton, type BaseButtonProps } from '../button/base-button';

export type DropdownItemProps = DropdownMenu.DropdownMenuItemProps &
  BaseButtonProps;

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
  return (
    <DropdownMenu.Trigger asChild {...props}>
      {children}
    </DropdownMenu.Trigger>
  );
}

export function DropdownContent({
  children,
  className,
  sideOffset = 15,
  portalProps,
  ...props
}: {
  children: React.ReactNode;
  portalProps?: DropdownMenu.DropdownMenuPortalProps;
} & DropdownMenu.DropdownMenuContentProps) {
  return (
    <DropdownMenu.Portal {...portalProps}>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        className={cn(
          'shadow-dropdown flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-2',
          className
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
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item asChild>
      <BaseButton
        className={cn(
          'flex flex-wrap items-center gap-2 px-2 py-2 outline-0 transition-all',
          className
        )}
        {...props}
      >
        {children}
      </BaseButton>
    </DropdownMenu.Item>
  );
}

export function DropdownPanel({
  children,
  className,
  onKeyDown,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-1 py-1', className)}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') e.stopPropagation();
        onKeyDown?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownSeparator({
  className,
  ...props
}: { className?: string } & DropdownMenu.DropdownMenuSeparatorProps) {
  return (
    <DropdownMenu.Separator
      className={cn('my-1 h-px bg-gray-200', className)}
      {...props}
    />
  );
}

export function DropdownSub({
  children,
  ...props
}: { children: React.ReactNode } & DropdownMenu.DropdownMenuSubProps) {
  return <DropdownMenu.Sub {...props}>{children}</DropdownMenu.Sub>;
}

export function DropdownSubTrigger({
  children,
  ...props
}: {
  children: React.ReactNode;
} & DropdownMenu.DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenu.SubTrigger {...props}>{children}</DropdownMenu.SubTrigger>
  );
}

export function DropdownSubContent({
  children,
  className,
  portalProps,
  ...props
}: DropdownMenu.DropdownMenuSubContentProps & {
  children: React.ReactNode;
  portalProps?: DropdownMenu.DropdownMenuPortalProps;
}) {
  return (
    <DropdownMenu.Portal {...portalProps}>
      <DropdownMenu.SubContent
        className={cn(
          'shadow-dropdown rounded-xl border border-gray-200 bg-white p-3',
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenu.SubContent>
    </DropdownMenu.Portal>
  );
}
