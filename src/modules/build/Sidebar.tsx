"use client";

import { Toggle } from "@/components/ui/toggle";
import { useBuildStore } from "@/providers/store-provider";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { chartTypes, getChartUIBuilder } from "./utils/builder-ui";

import { Select, SelectItem, SharedSelection } from "@heroui/react";

export function Sidebar() {
  const [isChartLocked, setIsChartLocked] = useState(true);

  const { workspaceCharts, currentChartIndex, changeChartType } = useBuildStore(
    (state) => state
  );

  const handleChartTypeChange = (selectedKeys: SharedSelection) => {
    changeChartType(selectedKeys.currentKey as string);
    setIsChartLocked(true);
  };

  return (
    <div className="border-l  border-r rounded-lg shadow-md bg-white z-10 h-full p-2 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Toggle
            variant="default"
            size="sm"
            pressed={!isChartLocked}
            onPressedChange={(pressed) => setIsChartLocked(!pressed)}
            title={
              isChartLocked ? "Unlock chart selection" : "Lock chart selection"
            }
          >
            {isChartLocked ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Unlock className="h-4 w-4" />
            )}
          </Toggle>

          <Select
            isDisabled={isChartLocked}
            selectedKeys={workspaceCharts[currentChartIndex].chartType}
            placeholder={workspaceCharts[currentChartIndex].chartType}
            onSelectionChange={handleChartTypeChange}
          >
            {chartTypes.map((chart) => (
              <SelectItem key={chart.value}>{chart.title}</SelectItem>
            ))}
          </Select>
        </div>

        {!isChartLocked && (
          <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
            Warning: Changing the chart type will erase all current chart data.
          </div>
        )}

        <div>
          {getChartUIBuilder(workspaceCharts[currentChartIndex].chartType)}
        </div>
      </div>
    </div>
  );
}
