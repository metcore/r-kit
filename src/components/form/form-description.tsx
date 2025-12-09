import { cn } from "../../lib/utils";
import type { FormDescriptionProps } from "./type";

export const FormDescription: React.FC<FormDescriptionProps> = ({
  className,
  children,
}) => {
  return <p className={cn("text-xs text-gray-600", className)}>{children}</p>;
};
