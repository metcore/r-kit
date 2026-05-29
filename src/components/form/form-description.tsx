import { cn } from '../../lib/utils';
import type { FormDescriptionProps } from './type';
import { Text } from '../text';

export const FormDescription: React.FC<FormDescriptionProps> = ({
  className,
  size = 'md',
  children,
}) => {
  const textVariant = {
    sm: 't4',
    md: 't3',
    lg: 't2',
  } as const;

  const variant = textVariant[size ?? 'md'];

  return (
    <Text variant={variant} className={cn('text-gray-600', className)}>
      {children}
    </Text>
  );
};
