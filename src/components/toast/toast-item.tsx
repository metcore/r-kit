import { useEffect, useState } from "react";
import Toast from "./toast-card";
import type { ToastProps } from "./type";

export default function ToastItem({
  onRemove,
  duration = 4000,
  ...props
}: ToastProps & {
  onRemove: () => void;
  duration?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setOpen(true));

    const timer = setTimeout(() => close(), duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(onRemove, 200); // tunggu animasi selesai
  };

  return (
    <div
      className={`transition-all duration-200 ${
        open ? "translate-y-0 opacity-100" : "translate-y-2 scale-95 opacity-0"
      }`}
    >
      <Toast {...props} onClose={close} />
    </div>
  );
}
