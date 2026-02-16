import { cva, type VariantProps } from "class-variance-authority";

export const modalVariants = cva(
  "relative w-full rounded-2xl bg-white shadow-xl focus:outline-none",
  {
    variants: {
      size: {
        sm: "max-w-[480px]",
        md: "max-w-[700px]",
        lg: "max-w-[1000px]",
        full: "mx-4 max-w-full",
      },
      state: {
        open: "animate-modal-scale-in",
        closed: "animate-modal-scale-out",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const modalOverlayVariants = cva("fixed inset-0 z-50 flex p-4", {
  variants: {
    position: {
      center: "items-center justify-center",
      top: "items-start justify-center",
      bottom: "items-end justify-center",
    },
    state: {
      open: "animate-modal-fade-in",
      closed: "animate-modal-fade-out",
    },
  },
  defaultVariants: {
    position: "center",
  },
});

export type modalOverlayVariantsProps = VariantProps<
  typeof modalOverlayVariants
>;
export type ModalVariantProps = VariantProps<typeof modalVariants>;
