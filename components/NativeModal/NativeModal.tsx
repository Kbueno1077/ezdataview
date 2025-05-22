"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NativeModal.module.css";
import { Info, X } from "lucide-react";
import Portal from "./Portal";

interface NativeModalProps {
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
}

function NativeModal({
  onClose,
  title,
  description,
  children,
  isOpen,
}: NativeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<
    "entering" | "entered" | "exiting" | "exited"
  >(isOpen ? "entering" : "exited");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (modalRef.current) {
      // Default to center transform origin
      modalRef.current.style.transformOrigin = "center";
    }
  }, [isOpen]);

  useEffect(() => {
    const animationTimers: NodeJS.Timeout[] = [];

    if (isOpen) {
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
        });
      });
    } else {
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
        className={`${styles.modal} ${styles[animationState]} bg-background`}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className="flex gap-2">
            {description && (
              <button
                className={styles.modalClose}
                onClick={() => setShowDescription(!showDescription)}
                aria-label="Toggle description"
              >
                <Info size={24} className="text-foreground" />
              </button>
            )}
            <button className={styles.modalClose} onClick={onClose}>
              <X size={24} className="text-foreground" />
            </button>
          </div>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.modalContentInner}>
            {showDescription ? (
              <p className="text-foreground/80 text-sm">{description}</p>
            ) : (
              children
            )}
          </div>
        </div>

        <div className={styles.modalFooter}></div>
      </div>
    </div>
  );

  return <Portal>{modalContent}</Portal>;
}

export default NativeModal;
