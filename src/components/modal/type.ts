import type { ReactNode } from "react";
import type {
  modalOverlayVariantsProps,
  ModalVariantProps,
} from "./modal-variants";

export interface ModalProps
  extends ModalVariantProps, modalOverlayVariantsProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  closable?: boolean;
  title?: string;
  description?: string;
}

export interface ModalComponentProps {
  children: ReactNode;
  className?: string;
}
