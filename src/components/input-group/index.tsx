import * as React from 'react';
import { cn } from '../../lib/utils';

type InputGroupProps = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function InputGroup({
  leftContent,
  rightContent,
  children,
  className,
}: InputGroupProps) {
  return (
    <div
      className={cn(
        'focus-within:ring-primary-300·flex·items-stretch·overflow-hidden·rounded-lg·border·border-gray-300·bg-white·focus-within:ring-2',
        className
      )}
    >
      {leftContent != undefined && (
        <div className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
          {leftContent}
        </div>
      )}

      <div className="flex-1">{children}</div>

      {rightContent != undefined && (
        <div className="flex items-center border-l border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
          {rightContent}
        </div>
      )}
    </div>
  );
}
