import { useIsMobile } from "../../hooks/use-mobile";
import { cn } from "../../lib/utils";

export default function GridWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "grid items-start gap-4",
        isMobile ? "grid-cols-1" : "grid-cols-2",
      )}
    >
      {children}
    </div>
  );
}
