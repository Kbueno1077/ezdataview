"use client";

import { motion } from "motion/react";

export function AnimatedLine({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  const strokeDashValue = 1000; // For really long lines, you might need to increase this value

  if (!active) {
    return <div className="absolute inset-0">{children}</div>;
  }

  return (
    <motion.g
      initial={{ strokeDashoffset: strokeDashValue }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        strokeDashoffset: { type: "spring", duration: 1.5, bounce: 0 },
      }}
      style={{ strokeDasharray: strokeDashValue }}
    >
      {children}
    </motion.g>
  );
}
