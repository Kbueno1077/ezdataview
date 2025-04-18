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
    const animationTimers: NodeJS.Timeout[] = [];

    if (isOpen) {
      // Reset fully expanded state
      setIsFullyExpanded(false);

      // Use requestAnimationFrame for more reliable animation timing
      requestAnimationFrame(() => {
        setAnimationState("entering");

        // Use requestAnimationFrame for the next state to ensure browser has processed the first change
        requestAnimationFrame(() => {
          // Small delay to ensure CSS transitions work properly
          const enteredTimer = setTimeout(
            () => setAnimationState("entered"),
            20
          );
          animationTimers.push(enteredTimer);

          // Set fully expanded state after animation completes with a slightly longer timeout
          const expandTimer = setTimeout(() => setIsFullyExpanded(true), 550);
          animationTimers.push(expandTimer);
        });
      });
    } else {
      // Remove fully expanded state first
      setIsFullyExpanded(false);

      // Immediately start exiting animation
      setAnimationState("exiting");

      // Set to exited after animation completes
      const exitTimer = setTimeout(() => setAnimationState("exited"), 100);
      animationTimers.push(exitTimer);
    }

    // Cleanup function to clear all timers
    return () => {
      animationTimers.forEach((timer) => clearTimeout(timer));
    };
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
        className={`${styles.modal} ${styles[animationState]}`}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>

        <div className={styles.modalFooter}></div>
      </div>
    </div>
  );

  return <Portal>{modalContent}</Portal>;
}

export default NativeModal;
