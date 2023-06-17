"use client";

import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { X, Maximize2 } from "react-feather";

interface IProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
  onMaximize?: () => void;
  className?: string;
}

type ModalState = Omit<IProps, "open"> & { isOpen: boolean };

const ModalContext = createContext<ModalState>({
  isOpen: false,
  onClose: () => {},
  onMaximize: () => {},
});

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Error in creating the context");
  }
  return context;
};

export default function Modal({
  open,
  onClose,
  onMaximize,
  children,
  className,
}: IProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, []);

  const handleMaximize = useCallback(() => {
    onMaximize?.();
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen: open, onClose: handleClose, onMaximize: handleMaximize }}
    >
      {isOpen &&
        createPortal(
          <div className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60">
            <div
              className={[
                "bg-white dark:bg-darkPopover rounded-lg p-4 min-w-[300px]",
                className,
              ].join(" ")}
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

Modal.Header = function ModalHeader({
  children,
  className,
}: Omit<Partial<IProps>, "isOpen">) {
  const { onClose, onMaximize } = useModalContext();

  return (
    <div className={["mb-4", className].join(" ")}>
      {children || (
        <div className="flex items-center justify-end">
          <Maximize2
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={onMaximize}
          />
          <X
            width={22}
            height={22}
            className="cursor-pointer ml-4"
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
};

Modal.Content = function ModalContent({
  children,
  className,
}: Omit<Partial<IProps>, "isOpen">) {
  return <div className={className}>{children}</div>;
};

Modal.Footer = function ModalFooter({
  children,
  className,
}: Omit<Partial<IProps>, "isOpen">) {
  return <div className={["mt-4", className].join(" ")}>{children}</div>;
};
