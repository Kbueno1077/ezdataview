import type React from "react";

import { Moon, MousePointer, Palette, Shield, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface FeatureGridProps {
  className?: string;
}

const features = [
  {
    id: 1,
    title: "Easy to Use",
    description:
      "Intuitive interface with drag-and-drop functionality for creating charts in minutes.",
    icon: <MousePointer className="text-white" />,
    gradient: "linear-gradient(135deg, #FF9966, #FF5E62)",
  },
  {
    id: 2,
    title: "Customizable",
    description:
      "Extensive styling options to match your brand with custom colors, fonts, and layouts.",
    icon: <Palette className="text-white" />,
    gradient: "linear-gradient(135deg, #56CCF2, #2F80ED)",
  },
  {
    id: 3,
    title: "Dark Mode Support",
    description:
      "Seamless switching between light and dark themes for comfortable viewing in any environment.",
    icon: <Moon className="text-white" />,
    gradient: "linear-gradient(135deg, #A770EF, #CF8BF3, #FDB99B)",
  },
  {
    id: 4,
    title: "Data Security",
    description:
      "Enterprise-grade encryption and compliance with data protection regulations.",
    icon: <Shield className="text-white" />,
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
  },
  {
    id: 5,
    title: "Lightning Fast",
    description:
      "High-performance rendering engine delivers smooth, responsive charts even with large datasets.",
    icon: <Zap className="text-white" />,
    gradient: "linear-gradient(135deg, #4776E6, #8E54E9)",
  },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({ className = "" }) => {
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
            key={feature.id}
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
