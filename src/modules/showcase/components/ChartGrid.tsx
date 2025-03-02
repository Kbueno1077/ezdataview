"use client";

import React from "react";
import ChartItem from "./ChartItem";
import { Chart, ViewMode } from "../types";

interface ChartGridProps {
  data: Chart[];
  viewMode: ViewMode;
}

const ChartGrid: React.FC<ChartGridProps> = React.memo(({ data, viewMode }) => {
  const layoutClasses =
    viewMode === "list"
      ? "w-full grid grid-cols-1 gap-4"
      : "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";

  return (
    <div
      key={viewMode}
      className={`${layoutClasses} transition-all duration-300 ease-in-out`}
    >
      {data.map((chart) => (
        <ChartItem key={chart.id} chart={chart} viewMode={viewMode} />
      ))}
    </div>
  );
});

ChartGrid.displayName = "ChartGrid";

export default ChartGrid;
