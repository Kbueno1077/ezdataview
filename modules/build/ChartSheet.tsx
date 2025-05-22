// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  ListFilterPlus,
  Plus,
  SendHorizonal,
  Settings,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";
import { getChartTypeByName } from "../../components/rosencharts/utils/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { useBuildStore } from "../../providers/store-provider";
import { usePathname, useRouter } from "next/navigation";

function ChartSheet({ openSidebar }: { openSidebar: () => void }) {
  const {
    workspaceCharts,
    currentChartIndex,
    moveToPreviousChartIndex,
    moveToNextChartIndex,
    removeChart,
    updateChartConfig,
  } = useBuildStore((state) => state);
  const [zoomLevel, setZoomLevel] = useState(90);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentChart = workspaceCharts[currentChartIndex];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 5, 100));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 5, 10));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateChartConfig("chartName", e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateChartConfig("description", e.target.value);
  };

  const handlePreview = () => {
    router.push(`/preview/${pathname.split("/")[2]}`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Title for this workspace"
          className="border-none outline-none shadow-none bg-gray-100 dark:bg-zinc-700 max-w-[250px] h-[40px]"
        />

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-700 rounded-lg p-1.5 shadow-sm ">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost">
                <ListFilterPlus className="h-4 w-4" />
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  Want to add some information to the chart?
                </DrawerTitle>
                <DrawerDescription className="flex flex-col justify-center items-center gap-4 mt-2">
                  <Input
                    placeholder="Name for the Chart"
                    className="w-full"
                    value={currentChart.chartName}
                    onChange={handleTitleChange}
                  />

                  <Textarea
                    className="w-full"
                    label="Description"
                    rows={5}
                    placeholder="Description for the Chart"
                    value={currentChart.description}
                    onChange={handleDescriptionChange}
                  />
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter></DrawerFooter>
            </DrawerContent>
          </Drawer>

          {currentChart.data.length > 0 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 10}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 100}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>

              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 min-w-[40px] text-center">
                {zoomLevel}%
              </span>

              <Button
                variant="ghost"
                aria-label="Preview chart"
                className="group relative flex items-center gap-2 overflow-hidden"
                onClick={handlePreview}
              >
                <span className="w-0 overflow-hidden transition-all duration-200 group-hover:w-16 origin-left">
                  Preview
                </span>

                <SendHorizonal className="h-4 w-4 flex-shrink-0" />
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={openSidebar}
            className="lg:hidden"
            aria-label="Open chart settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {currentChart.data.length > 0 ? (
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "center",
            transition: "transform 0.2s ease",
          }}
        >
          <div className="flex justify-center items-center w-full px-4 py-4 h-[calc(100vh-100px)] max-h-[calc(100vh-100px)]">
            {getChartTypeByName(currentChart.data, currentChart.chartType, {
              withTooltip: currentChart.withTooltip,
              withAnimation: currentChart.useAnimation,
              className:
                "mx-auto w-full h-[calc(100vh-200px)] max-h-[calc(100vh-100px)]",
              suffix: currentChart.suffix,
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100vh-100px)] px-4">
          <div className="text-center">
            <p className="text-lg text-foreground/40 mb-2">
              No chart data available
            </p>
            <p className="text-sm text-foreground/40">
              Add some data to start creating your chart
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          {workspaceCharts.length > 1 && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDeleteDialogOpen(true)}
              className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ml-auto"
              aria-label="Delete chart"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={moveToPreviousChartIndex}
            disabled={currentChartIndex === 0}
            className="hover:bg-gray-200 dark:hover:bg-zinc-600"
            aria-label="Previous chart"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Chart {currentChartIndex + 1} of {workspaceCharts.length}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={moveToNextChartIndex}
            className="hover:bg-gray-200 dark:hover:bg-zinc-600"
            aria-label={
              currentChartIndex === workspaceCharts.length - 1
                ? "Add new chart"
                : "Next chart"
            }
          >
            {currentChartIndex === workspaceCharts.length - 1 ? (
              <Plus className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Delete Chart Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chart</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chart? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="hover:bg-muted hover:text-foreground"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                removeChart(currentChartIndex);
                setDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChartSheet;
