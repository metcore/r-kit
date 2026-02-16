import React, { useEffect, useRef } from "react";
import { Icon } from "../icons";
import { cn } from "../../lib/utils";
import type { ModalComponentProps, ModalProps } from "./type";
import { modalOverlayVariants, modalVariants } from "./modal-variants";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size,
  position,
  title,
  description,
  closable = true,
}) => {
  const [isVisible, setIsVisible] = React.useState(isOpen);
  const [animationState, setAnimationState] = React.useState<"open" | "closed">(
    "open",
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const hasHeader = Boolean(title || description);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationState("open");
      document.body.style.overflow = "hidden";
      lastFocusedElement.current = document.activeElement as HTMLElement;
    } else {
      setAnimationState("closed");

      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "unset";
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible && lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !modalRef.current) return;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(
        modalRef.current!.querySelectorAll<HTMLElement>(focusableSelector),
      );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = getFocusable();
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement as HTMLElement;

      const isFocusInsideModal = modalRef.current!.contains(active);

      //  TAB pertama kali, focus masih di luar modal
      if (!isFocusInsideModal) {
        e.preventDefault();
        first.focus();
        return;
      }

      // Trap focus
      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closable) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={cn(
          modalOverlayVariants({ position, state: animationState }),
        )}
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />

        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className={cn(
            "flex max-h-[90vh] flex-col overflow-hidden",
            modalVariants({ size, state: animationState }),
          )}
        >
          {closable && !hasHeader && (
            <button
              onClick={onClose}
              className="focus:ring-primary-300 absolute top-4 right-4 cursor-pointer rounded-sm p-1 text-gray-900 opacity-70 transition hover:opacity-100 focus:ring-2 focus:outline-none"
              aria-label="Close"
            >
              <Icon name="times" size={24} />
            </button>
          )}
          {hasHeader && (
            <ModalHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col space-y-1.5">
                  {title && <ModalTitle>{title}</ModalTitle>}
                  {description && (
                    <ModalDescription>{description}</ModalDescription>
                  )}
                </div>

                {closable && (
                  <button
                    onClick={onClose}
                    className="focus:ring-primary-300 mt-0.5 shrink-0 cursor-pointer rounded-sm p-1 text-gray-900 opacity-70 transition hover:opacity-100 focus:ring-2 focus:outline-none"
                    aria-label="Close"
                  >
                    <Icon name="times" size={20} />
                  </button>
                )}
              </div>
            </ModalHeader>
          )}

          {children}
        </div>
      </div>
    </>
  );
};

export const ModalHeader: React.FC<ModalComponentProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 border-b border-gray-200 px-6 py-4",
      className,
    )}
  >
    {children}
  </div>
);

export const ModalTitle: React.FC<ModalComponentProps> = ({
  children,
  className,
}) => (
  <h2
    className={cn("text-lg leading-5 font-semibold tracking-tight", className)}
  >
    {children}
  </h2>
);

export const ModalDescription: React.FC<ModalComponentProps> = ({
  children,
  className,
}) => (
  <p className={cn("text-sm leading-6 text-gray-700", className)}>{children}</p>
);

export const ModalBody: React.FC<ModalComponentProps> = ({
  children,
  className,
}) => (
  <div
    tabIndex={-1}
    className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
  >
    {children}
  </div>
);

export const ModalFooter: React.FC<ModalComponentProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4",
      className,
    )}
  >
    {children}
  </div>
);
