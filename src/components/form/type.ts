export type FormSizeType = "sm" | "md" | "lg" | null;

export interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  size?: FormSizeType;
  className?: string;
  children: React.ReactNode;
}

export interface FormDescriptionProps {
  size?: FormSizeType;
  className?: string;
  children: React.ReactNode;
}

export interface FormHintProps {
  size?: FormSizeType;
  className?: string;
  children: React.ReactNode;
}

export interface FormErrorMessagesProps {
  messages?: string | string[];
  size?: FormSizeType;
  className?: string;
}

export interface FormErrorMessageProps {
  size?: FormSizeType;
  className?: string;
  children: React.ReactNode;
}

export interface FormFieldProps {
  label?: string;
  description?: string;
  hint?: string;
  errorMessages?: string | string[];
  required?: boolean;
  size?: FormSizeType;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}
