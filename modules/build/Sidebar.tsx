"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { useBuildStore } from "../../providers/store-provider";
import { chartTypes, getChartUIBuilder } from "./utils/builder-ui";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@heroui/button";
import { Select, SelectItem, SharedSelection } from "@heroui/react";

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingChartType, setPendingChartType] = useState<string | null>(null);

  const { workspaceCharts, currentChartIndex, changeChartType } = useBuildStore(
    (state) => state
  );

  const handleChartTypeChange = (selectedKeys: SharedSelection) => {
    const newChartType = selectedKeys.currentKey as string;
    // Always show confirmation dialog when changing chart type
    setPendingChartType(newChartType);
    setConfirmDialogOpen(true);
  };

  const applyChartTypeChange = (chartType: string) => {
    changeChartType(chartType);
    setConfirmDialogOpen(false);
    setPendingChartType(null);
  };

  const currentChartType = workspaceCharts[currentChartIndex].chartType;

  return (
    <aside
      className={`w-full min-w-[380px] max-w-[512px] h-full overflow-y-auto border-l rounded-lg shadow-md bg-white dark:bg-gray-800 z-10 p-4
        lg:relative lg:translate-x-0
        fixed top-0 right-0 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chart Settings</h2>
          <Button
            variant="flat"
            size="sm"
            isIconOnly
            onPress={onClose}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="chart-type-select" className="text-sm font-medium">
              Chart Type
            </label>

            <div className="flex items-center gap-2">
              <Select
                id="chart-type-select"
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
            </div>
          </div>
        </div>

        <div>{getChartUIBuilder(currentChartType)}</div>
      </div>

      {/* Chart Type Change Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Chart Type</DialogTitle>
            <DialogDescription>
              Changing the chart type will reset all current chart data. Make
              sure to save your work before proceeding.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="flat" onPress={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={() =>
                pendingChartType && applyChartTypeChange(pendingChartType)
              }
            >
              Change Chart Type
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
