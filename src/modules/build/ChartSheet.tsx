"use client";

import { getChartTypeByName } from "@/components/resencharts-ui/utils/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useBuildStore } from "@/providers/store-provider";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { ListFilterPlus, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

function ChartSheet() {
  const { workspaceCharts, currentChartIndex, updateChartItem } = useBuildStore(
    (state) => state
  );
  const [zoomLevel, setZoomLevel] = useState(90);

  const currentChart = workspaceCharts[currentChartIndex];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 5, 100));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 5, 10));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateChartItem(currentChartIndex, "chartName", e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateChartItem(currentChartIndex, "description", e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Title for this Workspace"
          className="border-none outline-none shadow-none max-w-[250px]"
        />

        {currentChart.data.length > 0 && (
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
            <Drawer>
              <DrawerTrigger asChild>
                <Button isIconOnly size="sm">
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
                      className="border-none outline-none shadow-none"
                      value={currentChart.chartName}
                      onChange={handleTitleChange}
                    />

                    <Textarea
                      className="w-full"
                      label="Description"
                      minRows={5}
                      placeholder="Description for the Chart"
                      value={currentChart.description}
                      onChange={handleDescriptionChange}
                    />
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Button
              size="sm"
              isIconOnly
              onPress={handleZoomOut}
              disabled={zoomLevel <= 10}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>

            <Button
              size="sm"
              isIconOnly
              onPress={handleZoomIn}
              disabled={zoomLevel >= 100}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>

            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 min-w-[40px] text-center">
              {zoomLevel}%
            </span>
          </div>
        )}
      </div>

      {currentChart.data.length > 0 ? (
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "center",
            transition: "transform 0.2s ease",
          }}
        >
          <div className="flex justify-center items-center w-full px-4 py-4">
            {getChartTypeByName(currentChart.data, currentChart.chartType, {
              withTooltip: currentChart.withTooltip,
              withAnimation: currentChart.useAnimation,
              className: "mx-auto w-full h-[calc(100vh-100px)]",
            })}
          </div>
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
