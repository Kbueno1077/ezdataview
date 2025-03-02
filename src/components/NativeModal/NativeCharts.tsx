"use client";

import { useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
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

  const previewChartNode = getChartTypeByName(chart.data, chart.type, true); // Enable tooltips in preview

  const handleChartClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
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
        <div className={styles.chartHeader}>
          {title}
          <FaExternalLinkAlt
            size={10}
            className={styles.expandIcon}
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
        <div className={styles.chartPreview}>{previewChartNode}</div>
      </div>
    </div>
  );
}

export default NativeCharts;
