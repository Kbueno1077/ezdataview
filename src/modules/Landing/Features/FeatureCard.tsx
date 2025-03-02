"use client";

import type React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { IFeature } from "@/modules/landing/types";

interface Props {
  feature: IFeature;
  size: "small" | "wide" | "large";
  className?: string;
}

const containerVariants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const FeatureCard: React.FC<Props> = ({ feature, size, className }) => {
  const { title, description, icon, gradient } = feature;

  return (
    <motion.div
      className={`rounded-xl p-6 shadow-md backdrop-blur-sm bg-opacity-75 text-white hover:shadow-lg transition-all duration-300 flex flex-col ${className}`}
      style={{
        background:
          gradient ||
          "linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
        backdropFilter: "blur(12px)",
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div
        className={`flex flex-col h-full ${
          size === "large" ? "md:justify-between" : ""
        }`}
      >
        <div className={`mb-4 ${size === "large" ? "md:mb-6" : ""}`}>
          {typeof icon === "string" ? (
            <div
              className={`relative ${
                size === "large" ? "md:h-16 md:w-16" : "h-12 w-12"
              } overflow-hidden rounded-full bg-white/20 p-2`}
              style={{ width: "3rem", height: "3rem" }}
            >
              <Image
                src={icon || "/placeholder.svg"}
                alt={title}
                fill
                className="object-contain p-1"
              />
            </div>
          ) : (
            <div
              className={`flex ${
                size === "large" ? "md:h-16 md:w-16" : "h-12 w-12"
              } items-center justify-center rounded-full bg-white/20 p-2`}
              style={{ width: "3rem", height: "3rem" }}
            >
              {icon}
            </div>
          )}
        </div>

        <div className={size === "large" ? "md:mt-auto" : ""}>
          <h3
            className={`text-xl font-bold text-white ${
              size === "large" ? "md:text-2xl" : ""
            } mb-2`}
          >
            {title}
          </h3>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
