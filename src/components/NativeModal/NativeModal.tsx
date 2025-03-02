"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NativeModal.module.css";
import { X } from "lucide-react";
import Portal from "./Portal";

interface NativeModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
}

function NativeModal({ onClose, title, children, isOpen }: NativeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<
    "entering" | "entered" | "exiting" | "exited"
  >(isOpen ? "entering" : "exited");
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);

  useEffect(() => {
    if (modalRef.current) {
      // Default to center transform origin
      modalRef.current.style.transformOrigin = "center";
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsFullyExpanded(false); // Reset fully expanded state
      setAnimationState("entering");
      const timer = setTimeout(() => setAnimationState("entered"), 10);

      // Set fully expanded state after animation completes
      const expandTimer = setTimeout(() => setIsFullyExpanded(true), 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(expandTimer);
      };
    } else {
      setIsFullyExpanded(false); // Remove fully expanded state first
      setAnimationState("exiting");
      const timer = setTimeout(() => setAnimationState("exited"), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Don't render anything if the modal is fully exited
  if (animationState === "exited") return null;

  const modalContent = (
    <div className={`${styles.modalOverlay} ${styles[animationState]}`}>
      <div
        className={`${styles.modal} ${styles[animationState]} ${
          isFullyExpanded ? styles.fullyExpanded : ""
        }`}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );

  return <Portal>{modalContent}</Portal>;
}

export default NativeModal;
