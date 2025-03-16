"use client";

import { useBuildStore } from "../../providers/store-provider";
import { Info, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { chartTypes, getChartUIBuilder } from "./utils/builder-ui";

import { Button } from "@heroui/button";
import { Select, SelectItem, SharedSelection } from "@heroui/react";

export function Sidebar() {
  const [isChartLocked, setIsChartLocked] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const { workspaceCharts, currentChartIndex, changeChartType } = useBuildStore(
    (state) => state
  );

  const handleChartTypeChange = (selectedKeys: SharedSelection) => {
    changeChartType(selectedKeys.currentKey as string);
    setIsChartLocked(true);
    setShowWarning(false);
  };

  const handleToggleLock = () => {
    const newLockedState = !isChartLocked;
    setIsChartLocked(newLockedState);
    setShowWarning(!newLockedState);
  };

  const currentChartType = workspaceCharts[currentChartIndex].chartType;

  return (
    <aside className="w-1/3 min-w-[300px] max-w-[380px] fixed right-0 top-0 overflow-x-hidden  border-l rounded-lg shadow-md bg-white dark:bg-gray-800 z-10 p-4 h-full overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="chart-type-select" className="text-sm font-medium">
              Chart Type
            </label>

            <div className="flex items-center gap-2">
              <Select
                id="chart-type-select"
                isDisabled={isChartLocked}
                selectedKeys={currentChartType}
                placeholder={currentChartType}
                onSelectionChange={handleChartTypeChange}
                aria-label="Select chart type"
                className="flex-1"
              >
                {chartTypes.map((chart) => (
                  <SelectItem key={chart.value}>{chart.title}</SelectItem>
                ))}
              </Select>

              <Button
                variant="flat"
                size="sm"
                isIconOnly
                onPress={handleToggleLock}
                aria-label={
                  isChartLocked
                    ? "Unlock chart selection"
                    : "Lock chart selection"
                }
                title={
                  isChartLocked
                    ? "Unlock chart selection"
                    : "Lock chart selection"
                }
              >
                {isChartLocked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Unlock className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {showWarning && (
            <div
              role="alert"
              className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 p-3 rounded-md flex items-start gap-2 border border-amber-200 dark:border-amber-800"
            >
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                Changing the chart type will reset all current chart data. Make
                sure to save your work before changing.
              </span>
            </div>
          )}
        </div>

        <div>{getChartUIBuilder(currentChartType)}</div>
      </div>
    </aside>
  );
}
