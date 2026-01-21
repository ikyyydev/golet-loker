"use client";

import { useEffect, useState } from "react";

import { Modal } from "../modal";
import { Separator } from "@/components/ui/separator";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description || ""}
      onClose={onClose}
      isOpen={isOpen}
    >
      <Separator className="mb-5" />
      <div>{children}</div>
    </Modal>
  );
};
