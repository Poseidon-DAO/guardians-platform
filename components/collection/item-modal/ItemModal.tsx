"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui";

export default function ItemModal({ children }: PropsWithChildren) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function handleMaximize() {
    location.reload();
  }

  return (
    <Modal
      open
      onClose={handleClose}
      onMaximize={handleMaximize}
      className="p-6"
    >
      <Modal.Header />
      <Modal.Content className="w-[60vw] h-[60vh] pt-2">
        {children}
      </Modal.Content>
    </Modal>
  );
}
