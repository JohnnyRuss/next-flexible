"use client";

import React, { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ModalType {
  children: React.ReactNode;
}

const Modal: React.FC<ModalType> = ({ children }) => {
  const router = useRouter();

  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onClose = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <div ref={overlayRef} className="modal" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>

      <div
        ref={wrapperRef}
        className="modal_wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
