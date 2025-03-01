import type React from "react";

import FeatureCard from "./FeatureCard";

interface FeatureGridProps {
  className?: string;
}
import {
  LuPalette,
  LuMoon,
  LuShield,
  LuMousePointer,
  LuZap,
} from "react-icons/lu";

const features = [
  {
    title: "Easy to Use",
    description:
      "Intuitive interface with drag-and-drop functionality for creating charts in minutes.",
    icon: <LuMousePointer className="text-white" />,
    gradient: "linear-gradient(135deg, #FF9966, #FF5E62)",
  },
  {
    title: "Customizable",
    description:
      "Extensive styling options to match your brand with custom colors, fonts, and layouts.",
    icon: <LuPalette className="text-white" />,
    gradient: "linear-gradient(135deg, #56CCF2, #2F80ED)",
  },
  {
    title: "Dark Mode Support",
    description:
      "Seamless switching between light and dark themes for comfortable viewing in any environment.",
    icon: <LuMoon className="text-white" />,
    gradient: "linear-gradient(135deg, #A770EF, #CF8BF3, #FDB99B)",
  },
  {
    title: "Data Security",
    description:
      "Enterprise-grade encryption and compliance with data protection regulations.",
    icon: <LuShield className="text-white" />,
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
  },
  {
    title: "Lightning Fast",
    description:
      "High-performance rendering engine delivers smooth, responsive charts even with large datasets.",
    icon: <LuZap className="text-white" />,
    gradient: "linear-gradient(135deg, #4776E6, #8E54E9)",
  },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({ className = "" }) => {
  // Define the grid layout pattern
  const gridPattern = [
    { size: "large", span: "md:col-span-2 md:row-span-2" },
    { size: "small", span: "md:col-span-1 md:row-span-1" },
    { size: "small", span: "md:col-span-1 md:row-span-1" },
    { size: "wide", span: "md:col-span-2 md:row-span-1" },
    { size: "small", span: "md:col-span-1 md:row-span-1" },
    { size: "small", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${className}`}
    >
      {features.map((feature, index) => {
        const patternIndex = index % gridPattern.length;
        const { size, span } = gridPattern[patternIndex];

        return (
          <FeatureCard
            key={feature.title || index}
            feature={feature}
            size={size as "small" | "wide" | "large"}
            className={`${span}`}
          />
        );
      })}
    </div>
  );
};

export default FeatureGrid;
