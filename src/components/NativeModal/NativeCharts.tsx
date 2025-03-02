"use client";

import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { getChartTypeByName } from "../resencharts-ui/utils/utils";
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
  const chartRef = useRef<HTMLDivElement>(null);
  const modalChartRef = useRef<HTMLDivElement>(null);

  const previewChartNode = getChartTypeByName(chart.data, chart.type, {
    withTooltip: true,
    active: true,
    className: "",
  });

  const handleChartClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <NativeModal title={title} isOpen={showModal} onClose={handleCloseModal}>
        <div ref={modalChartRef} className={styles.modalChart}>
          {previewChartNode}
        </div>
      </NativeModal>

      <div
        className={styles.chartButton}
        onClick={handleChartClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={chartRef}
      >
        <div className="py-3 px-4 font-semibold text-base bg-background border-b border-gray-200 flex items-center justify-between">
          {title}
          <ExternalLink
            size={10}
            className="ml-2 text-xs text-gray-600  transition-opacity duration-200 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        <div className={styles.chartPreview}>
          <div className="w-full h-full">{previewChartNode}</div>
        </div>
      </div>
    </div>
  );
}

export default NativeCharts;
