import { cn } from "../../lib/utils";
import type { FormHintProps } from "./type";

export const FormHint: React.FC<FormHintProps> = ({ className, children }) => {
  return <p className={cn("text-xs text-gray-700", className)}>{children}</p>;
};
