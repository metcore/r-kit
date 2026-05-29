import { cn } from '../../lib/utils';
import { Text } from '../text';
import type { FormErrorMessageProps, FormErrorMessagesProps } from './type';

export const FormErrorMessages: React.FC<FormErrorMessagesProps> = ({
  messages,
  size = 'md',
  className,
}) => {
  if (messages === undefined) return null;

  const errorList = Array.isArray(messages) ? messages : [messages];

  if (errorList.length === 0) return null;

  return (
    <div className={cn('space-y-0.5', className)}>
      {errorList.map((msg, i) => (
        <FormErrorMessage key={i} size={size}>
          {msg}
        </FormErrorMessage>
      ))}
    </div>
  );
};

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
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
    <Text variant={variant} color="danger" className={cn(className)}>
      {children}
    </Text>
  );
};
