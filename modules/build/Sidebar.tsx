"use client";

import { Settings } from "lucide-react";
import { useState } from "react";
import { useBuildStore } from "../../providers/store-provider";
import {
  chartTypes,
  getChartTypeIcon,
  getChartUIBuilder,
} from "./utils/builder-ui";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  const handleChartTypeChange = (selectedChartType: string) => {
    setPendingChartType(selectedChartType);
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
      <div className="flex items-center justify-between p-2">
        <h2 className="text-xl font-semibold">Chart Settings</h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8" size="icon">
                      {getChartTypeIcon(currentChartType)}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chart Type</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent align="end" className="w-[260px]">
              {chartTypes.map((chart) => (
                <DropdownMenuItem
                  key={chart.value}
                  onClick={() => handleChartTypeChange(chart.value)}
                  className="flex justify-between items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {getChartTypeIcon(chart.value)}
                    <span>{chart.title}</span>
                  </div>
                  {currentChartType === chart.value && (
                    <Badge className="ml-2">Active</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={onClose}
                  className="lg:hidden"
                  aria-label="Close sidebar"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sidebar Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="p-2">{getChartUIBuilder(currentChartType)}</div>

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
            <Button
              variant="outline"
              color="default"
              className="hover:bg-gray-100 hover:text-foreground"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              color="primary"
              onClick={() =>
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
