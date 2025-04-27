"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getChartTypeByName } from "../rosencharts/utils/utils";
import styles from "./NativeCharts.module.css";
import NativeModal from "./NativeModal";

interface Chart {
  id: string;
  type: string;
  data: unknown;
}

function NativeCharts({ title, chart }: { title: string; chart: Chart }) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headerGradient, setHeaderGradient] = useState("");

  // Generate random gradient colors on component mount
  useEffect(() => {
    const colors = [
      "#f9fafb", // Light gray
      "#f0f9ff", // Light blue
      "#f0fdf4", // Light green
      "#fef2f2", // Light red
      "#fffbeb", // Light yellow
      "#f5f3ff", // Light purple
      "#fdf2f8", // Light pink
    ];

    const startColor = colors[Math.floor(Math.random() * colors.length)];
    const endColor = "rgba(249, 250, 251, 0)";

    setHeaderGradient(
      `linear-gradient(to bottom, ${startColor} 0%, ${endColor} 100%)`
    );
  }, []);

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
      <NativeModal title={title} isOpen={showModal} onClose={handleCloseModal}>
        <div className={styles.modalChart}>{previewChartNode}</div>
      </NativeModal>

      <div
        className={styles.chartButton}
        onClick={handleChartClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="py-3 px-4 font-semibold text-base flex items-center justify-between"
          style={{
            background: headerGradient,
          }}
        >
          {title}
          <ExternalLink
            size={10}
            className="ml-2 text-xs text-gray-600 transition-opacity duration-200 ease-in-out"
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
