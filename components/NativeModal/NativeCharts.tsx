"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getChartTypeByName } from "../rosencharts/utils/utils";
import styles from "./NativeCharts.module.css";
import NativeModal from "./NativeModal";
import { useTheme } from "@/providers/theme-provider";

interface Chart {
  id: string;
  type: string;
  data: unknown;
}

function NativeCharts({
  title,
  description,
  chart,
}: {
  title: string;
  description: string;
  chart: Chart;
}) {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headerGradient, setHeaderGradient] = useState("");

  // Generate random gradient colors on component mount
  useEffect(() => {
    // Different color sets for light and dark themes
    const lightColors = [
      "#f9fafb", // Light gray
      "#f0f9ff", // Light blue
      "#f0fdf4", // Light green
      "#fef2f2", // Light red
      "#fffbeb", // Light yellow
      "#f5f3ff", // Light purple
      "#fdf2f8", // Light pink
    ];

    const darkColors = [
      "#4b5563", // Softer dark gray
      "#3b82f6", // Softer blue
      "#10b981", // Softer green
      "#ef4444", // Softer red
      "#f59e0b", // Softer yellow
      "#8b5cf6", // Softer purple
      "#ec4899", // Softer pink
    ];

    // Choose colors based on current theme
    const colors = theme.theme === "light" ? lightColors : darkColors;
    const startColor = colors[Math.floor(Math.random() * colors.length)];
    const endColor =
      theme.theme === "light"
        ? "rgba(249, 250, 251, 0)"
        : "rgba(17, 24, 39, 0)";

    setHeaderGradient(
      `linear-gradient(to bottom, ${startColor} 0%, ${endColor} 100%)`
    );
  }, [theme.theme]);

  //@ts-expect-error - This is a workaround to get the chart type by name
  const previewChartNode = getChartTypeByName(chart.data, chart.type, {
    withTooltip: true,
    withAnimation: true,
    className: "",
  });

  const handleChartClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <NativeModal
        title={title}
        description={description}
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <div className={styles.modalChart}>{previewChartNode}</div>
      </NativeModal>

      <div
        className={`${styles.chartButton} border-2 border-zinc-100 dark:border-zinc-700 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 hover:border-zinc-200 dark:hover:border-zinc-600`}
        onClick={handleChartClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="py-3 px-4 font-semibold text-base text-foreground/80 flex items-center justify-between"
          style={{
            background: headerGradient,
          }}
        >
          {title}
          <ExternalLink
            size={10}
            className="ml-2 text-xs text-foreground/80 transition-opacity duration-200 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        <div className={styles.chartPreview}>
          {<div>{previewChartNode}</div>}
        </div>
      </div>
    </div>
  );
}

export default NativeCharts;
