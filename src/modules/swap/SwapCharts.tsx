"use client";

import BlendyCharts from "@/components/BlendyModal/BlendyCharts";

interface ChartData {
  id: string;
  name: string;
  type: string;
  data: Record<string, unknown>[];
}

function SwapCharts({ chartsData }: { chartsData: ChartData[] }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {chartsData.map((chart) => (
        <div
          key={chart.id}
          className="w-full bg-background border border-gray-200 rounded-lg p-4"
        >
          <BlendyCharts chart={chart} title={chart.name} />
        </div>
      ))}
    </div>
  );
}

export default SwapCharts;
