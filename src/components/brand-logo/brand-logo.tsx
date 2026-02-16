import { cn } from "../../lib/utils";
import { Text } from "../text";

interface Props {
  className?: string;
  brandLogo: string;
  name?: string;
}

export function BrandLogo({ brandLogo, className, name }: Props) {
  return (
    <div
      className={cn(
        "flex -translate-y-0.5 flex-row items-center gap-2",
        className,
      )}
    >
      <img src={brandLogo} alt={name ?? "logo"} className="size-8" />
      {!!name && <Text value={name} variant="t1" weight="semibold" />}
    </div>
  );
}
