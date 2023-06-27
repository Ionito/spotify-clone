"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Modal
        title="test modeal"
        description="test description"
        isOpen
        onChange={() => {}}
      >
        Modal
      </Modal>
    </>
  );
};

export default ModalProvider;
