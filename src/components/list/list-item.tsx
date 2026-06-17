import type { ListItemProps } from './type';

export function ListItem({
  children,
  onClick,
  className = '',
  isLast = false,
  active,
  index = 0,
  variant = 'striped',
}: ListItemProps) {
  const stripedBg =
    variant === 'striped' ? (index % 2 === 0 ? 'bg-white' : 'bg-gray-50') : '';

  const baseClass = [
    'block w-full text-left appearance-none p-3 rounded-t-md',
    stripedBg,
    active == true && 'bg-primary-50',
    !isLast && 'border-b border-gray-100',
    onClick &&
      'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors',
    onClick &&
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClass}>
        {children}
      </button>
    );
  }

  return <div className={baseClass}>{children}</div>;
}
