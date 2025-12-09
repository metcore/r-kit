import { cn } from "../../lib/utils";
import type { FormLabelProps } from "./type";

export const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  required = false,
  size = "md",
  className,
  children,
}) => {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        sizeClasses[size || "md"],
        "block font-semibold text-gray-900",
        className,
      )}
    >
      {children}
      {required && <span className="text-danger-500 ml-1">*</span>}
    </label>
  );
};
