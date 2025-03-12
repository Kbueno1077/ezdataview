"use client";

import { getChartTypeByName } from "@/components/resencharts-ui/utils/utils";
import { Input } from "@heroui/input";
import { useBuildStore } from "@/providers/store-provider";

function ChartSheet() {
  const { workspaceCharts, currentChartIndex } = useBuildStore(
    (state) => state
  );

  const currentChart = workspaceCharts[currentChartIndex];

  const hash =
    currentChart.id +
    "-" +
    currentChart.chartType +
    "-" +
    currentChart.data.map((item) => item.color).join("-");

  return (
    <div>
      <Input
        placeholder="Title for this Workspace"
        className="border-none outline-none shadow-none max-w-[250px]"
      />

      {currentChart.data.length > 0 ? (
        <div
          className="flex justify-center items-center w-full px-4 py-4"
          key={hash}
        >
          {getChartTypeByName(currentChart.data, currentChart.chartType, {
            hash,
            withTooltip: currentChart.withTooltip,
            withAnimation: currentChart.useAnimation,
            className: "mx-auto w-full h-[calc(100vh-100px)]",
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100vh-200px)] px-4">
          <div className="text-center">
            <p className="text-lg text-gray-500 mb-2">
              No chart data available
            </p>
            <p className="text-sm text-gray-400">
              Add some data to start creating your chart
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartSheet;
