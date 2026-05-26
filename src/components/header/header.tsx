import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../icons';
import { Input } from '../input';

const DEFAULT_HEADER_HEIGHT = '76px';

type HeaderProps = React.ComponentProps<'header'> & {
  sticky?: boolean;
  bordered?: boolean;
  blur?: boolean;
  height?: string;
};

function Header({
  className,
  sticky = true,
  bordered = true,
  blur = true,
  style,
  children,
  height = DEFAULT_HEADER_HEIGHT,
  ...props
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      style={
        {
          '--header-height': height,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'flex h-(--header-height) w-full items-center gap-2 px-3 sm:px-4',
        bordered == true && 'border-b border-gray-200',
        sticky == true && 'sticky top-0 z-9',
        blur == true ? 'bg-white/80 backdrop-blur' : 'bg-white',
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}

function HeaderLeft({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-left"
      className={cn('flex min-w-0 items-center gap-2', className)}
      {...props}
    />
  );
}

function HeaderCenter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-center"
      className={cn(
        'flex min-w-0 flex-1 items-center justify-start gap-2',
        className
      )}
      {...props}
    />
  );
}

function HeaderRight({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-right"
      className={cn('ml-auto flex items-center gap-1 sm:gap-2', className)}
      {...props}
    />
  );
}

type HeaderTitleProps = React.ComponentProps<'h1'> & {
  subtitle?: React.ReactNode;
};

function HeaderTitle({
  className,
  children,
  subtitle,
  ...props
}: HeaderTitleProps) {
  return (
    <div className="flex min-w-0 flex-col">
      <h1
        data-slot="header-title"
        className={cn(
          'truncate text-sm font-semibold text-gray-900 sm:text-base',
          className
        )}
        {...props}
      >
        {children}
      </h1>
      {subtitle !== undefined && (
        <p className="truncate text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}

function HeaderDivider({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-divider"
      role="separator"
      aria-orientation="vertical"
      className={cn('mx-1 h-5 w-px shrink-0 bg-gray-200', className)}
      {...props}
    />
  );
}

type HeaderSearchProps = React.ComponentProps<typeof Input> & {
  containerClassName?: string;
};

function HeaderSearch({
  className,
  containerClassName,
  placeholder = 'Cari...',
  ...props
}: HeaderSearchProps) {
  return (
    <div
      data-slot="header-search"
      className={cn(
        'relative hidden w-full max-w-md items-center sm:flex',
        containerClassName
      )}
    >
      <Icon
        name="search"
        size={18}
        className="pointer-events-none absolute left-3 text-gray-500"
      />
      <Input
        placeholder={placeholder}
        aria-label="Search"
        className={cn('pl-9', className)}
        {...props}
      />
    </div>
  );
}

type HeaderActionProps = React.ComponentProps<'button'> & {
  label: string;
  badge?: number | string;
  dot?: boolean;
};

function HeaderAction({
  className,
  label,
  badge,
  dot = false,
  children,
  ...props
}: HeaderActionProps) {
  const hasBadge =
    badge !== undefined && badge !== null && badge !== 0 && badge !== '';

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-slot="header-action"
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-md text-gray-700 transition-colors',
        'hover:bg-gray-100 active:bg-gray-200',
        'focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {children}
      {hasBadge && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-semibold text-white"
        >
          {typeof badge === 'number' && badge > 99 ? '99+' : badge}
        </span>
      )}
      {!hasBadge && dot == true && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 ring-2 ring-white"
        />
      )}
    </button>
  );
}

export {
  Header,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  HeaderTitle,
  HeaderDivider,
  HeaderSearch,
  HeaderAction,
};
