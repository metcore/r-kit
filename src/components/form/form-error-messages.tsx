import { cn } from "../../lib/utils";
import type { FormErrorMessageProps, FormErrorMessagesProps } from "./type";

export const FormErrorMessages: React.FC<FormErrorMessagesProps> = ({
  messages,
  size = "md",
  className,
}) => {
  if (!messages) return null;

  const errorList = Array.isArray(messages) ? messages : [messages];

  if (errorList.length === 0) return null;

  return (
    <div className={cn("space-y-0.5", className)}>
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
  children,
}) => {
  return <p className={cn("text-danger-500 text-xs", className)}>{children}</p>;
};
