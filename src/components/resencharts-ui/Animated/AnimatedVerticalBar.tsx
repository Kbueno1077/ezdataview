"use client";

import { motion } from "motion/react";

export function AnimatedVerticalBar({
  index = 0,
  children,
  active = true,
}: {
  index?: number;
  children: React.ReactNode;
  active?: boolean;
}) {
  if (!active) {
    return <div className="absolute inset-0">{children}</div>;
  }

  return (
    <motion.div
      initial={{ transform: "translateY(150%)" }}
      animate={{ transform: "translateY(0)" }}
      className="absolute inset-0"
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.075, // Staggered delay effect
      }}
    >
      {children}
    </motion.div>
  );
}
