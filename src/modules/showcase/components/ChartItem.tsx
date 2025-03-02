"use client";

import React from "react";
import { NativeCharts } from "@/components/NativeModal";
import { Chart } from "../types";

interface ChartItemProps {
  chart: Chart;
}

const ChartItem: React.FC<ChartItemProps> = React.memo(({ chart }) => {
  return (
    <div className="transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
      <NativeCharts title={chart.name} chart={chart} />
    </div>
  );
});

ChartItem.displayName = "ChartItem";

export default ChartItem;
