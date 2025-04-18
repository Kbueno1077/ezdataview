"use client";

import React from "react";
import { NativeCharts } from "../../../components/NativeModal";
import { Chart, ViewMode } from "../types";
import styles from "@/components/NativeModal/NativeCharts.module.css";

interface ChartItemProps {
  chart: Chart;
  viewMode?: ViewMode;
}

const ChartItem: React.FC<ChartItemProps> = React.memo(({ chart }) => {
  const isCircularChart =
    chart.type.toLowerCase().includes("pie") ||
    chart.type.toLowerCase().includes("donut") ||
    chart.type.toLowerCase().includes("half") ||
    chart.type.toLowerCase().includes("fillable");

  return (
    <div
      className={`transition-all duration-300 ease-in-out transform hover:scale-[1.01] ${
        isCircularChart ? styles.listView : ""
      }`}
    >
      <NativeCharts title={chart.name} chart={chart} />
    </div>
  );
});

ChartItem.displayName = "ChartItem";

export default ChartItem;
