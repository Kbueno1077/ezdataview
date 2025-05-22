"use client";

import { PaintRoller, Palette, Plus, Trash2 } from "lucide-react";
import { useBuildStore } from "../../../providers/store-provider";
import { ChartDataItem } from "../../../stores/builder-store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format as formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import Controls from "../Controls";

function LineChartBuilder() {
  const [activeTab, setActiveTab] = useState("data");

  const {
    workspaceCharts,
    currentChartIndex,
    addChartItem,
    deleteChartItem,
    updateChartItem,
    updateChartConfig,
  } = useBuildStore((state) => state);

  const { withTooltip, useAnimation } = workspaceCharts[currentChartIndex];
  const chartType = workspaceCharts[currentChartIndex].chartType;
  const currentData = workspaceCharts[currentChartIndex].data;

  const allowColor = !chartType.includes("thin");

  // Combined state for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "item" | "date";
    index: number;
    name: string | Date;
  } | null>(null);

  const handleAddLine = () => {
    const newItemId = Math.random().toString(36).substring(2, 8);

    // Get dates from existing lines or create a default one
    let initialData = [];
    if (
      currentData.length > 0 &&
      currentData[0].data &&
      currentData[0].data.length > 0
    ) {
      // Copy dates from the first line but with 0 values
      initialData = currentData[0].data.map((item) => ({
        date: item.date,
        value: 0,
      }));
    } else {
      // Create a default date if no lines exist yet
      const newDate = new Date();
      initialData = [{ date: newDate, value: 0 }];
    }

    const newItem: ChartDataItem = {
      id: newItemId,
      data: initialData,
    };

    addChartItem(newItem);
  };

  const handleUpdateLine = (
    index: number,
    key: string,
    value:
      | string
      | number
      | string[]
      | number[]
      | { date: Date; value: number }[]
  ) => {
    updateChartItem(index, key, value);
  };

  const handleUpdateChartConfig = (key: string, value: boolean | string) => {
    updateChartConfig(key, value);
  };

  const handleDeleteItem = (index: number, itemName: string) => {
    setDeleteTarget({ type: "item", index, name: itemName });
    setDeleteDialogOpen(true);
  };

  // Function to add a new date to all lines
  const handleAddDate = () => {
    // Get the latest date from existing data
    let latestDate = new Date();
    if (
      currentData.length > 0 &&
      Array.isArray(currentData[0].data) &&
      currentData[0].data.length > 0
    ) {
      const lastDateStr =
        currentData[0].data[currentData[0].data.length - 1].date;
      const lastDate = new Date(lastDateStr);
      // Set new date to one day after the latest date
      latestDate = new Date(lastDate);
      latestDate.setDate(latestDate.getDate() + 1);
    } else {
      toast.error("No dates added yet");
      return;
    }

    currentData.forEach((item, itemIndex) => {
      const newValues = [...(item.data || []), { date: latestDate, value: 0 }];
      updateChartItem(itemIndex, "data", newValues);
    });
  };

  // Function to update date across all line series
  const handleDateChange = (newDate: Date, valueIndex: number) => {
    if (currentData.length > 0 && Array.isArray(currentData[0].data)) {
      // If all checks pass, update the date
      currentData.forEach((item, itemIndex) => {
        if (Array.isArray(item.data) && item.data[valueIndex]) {
          const newValues = [...item.data];
          const newDateObj = new Date(newDate);

          // Update the current date
          newValues[valueIndex] = {
            ...newValues[valueIndex],
            date: newDate,
          };

          // Check and update all subsequent dates that are now less than the new date
          for (let i = valueIndex + 1; i < newValues.length; i++) {
            const nextDateObj = new Date(newValues[i].date);
            if (nextDateObj < newDateObj) {
              newValues[i] = {
                ...newValues[i],
                date: newDate,
              };
            } else {
              break; // Stop once we find a date that's greater than or equal to the new date
            }
          }

          updateChartItem(itemIndex, "data", newValues);
        }
      });
    }
  };

  // Function to delete a date point from all lines
  const handleDeleteDate = (valueIndex: number) => {
    if (
      currentData.length > 0 &&
      Array.isArray(currentData[0].data) &&
      currentData[0].data[valueIndex]
    ) {
      const dateToDelete = currentData[0].data[valueIndex].date;
      setDeleteTarget({ type: "date", index: valueIndex, name: dateToDelete });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      if (deleteTarget.type === "item") {
        deleteChartItem(deleteTarget.index);
      } else if (deleteTarget.type === "date") {
        currentData.forEach((item, itemIndex) => {
          if (
            Array.isArray(item.data) &&
            item.data.length > deleteTarget.index
          ) {
            const newValues = [...item.data];
            newValues.splice(deleteTarget.index, 1);
            updateChartItem(itemIndex, "data", newValues);
          }
        });
      }
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  // Get dates from the first line to display in the shared date section
  const sharedDates =
    currentData.length > 0 && Array.isArray(currentData[0].data)
      ? currentData[0].data.map((item) => item.date)
      : [];

  // Calculate min and max dates for each date picker
  const getDateConstraints = (index: number) => {
    if (currentData.length === 0 || !Array.isArray(currentData[0].data)) {
      return { minValue: undefined, maxValue: undefined };
    }

    const dates = currentData[0].data.map((item) => new Date(item.date));

    // For min date: use the date of the previous item (if exists)
    const minDate = index > 0 ? dates[index - 1] : undefined;

    return {
      minValue: minDate ? minDate : undefined,
    };
  };

  return (
    <div className="">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="data" className="p-0 mt-0">
          <div className="py-5 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Data Points
              </Label>
              <Button
                size="sm"
                onClick={handleAddLine}
                className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Line (
                {workspaceCharts[currentChartIndex].data.length})
              </Button>
            </div>

            {/* Shared dates section */}
            <div className="">
              <Label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Shared Dates
              </Label>

              <div className="space-y-3">
                {sharedDates.length > 0 ? (
                  sharedDates.map((date, valueIndex) => (
                    <div key={valueIndex} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                              size="sm"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                formatDate(new Date(date), "MMM d, yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(selectedDate) => {
                                if (selectedDate) {
                                  handleDateChange(selectedDate, valueIndex);
                                }
                              }}
                              disabled={(date) => {
                                const constraints =
                                  getDateConstraints(valueIndex);
                                if (constraints.minValue) {
                                  return date < constraints.minValue;
                                }
                                return false;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteDate(valueIndex)}
                              aria-label={`Remove date ${valueIndex + 1}`}
                            >
                              <Trash2 />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Remove this date from all lines
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No dates added yet</p>
                )}

                <div className="flex items-center justify-end">
                  <Button
                    size="sm"
                    onClick={handleAddDate}
                    className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white mt-2"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Date (
                    {sharedDates.length})
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {workspaceCharts[currentChartIndex].data.length === 0 && (
                <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                  <p className="text-gray-500">
                    No lines added yet. Click the button above to add your first
                    line.
                  </p>
                </div>
              )}

              {workspaceCharts[currentChartIndex].data.map(
                (item: ChartDataItem, index: number) => {
                  return (
                    <Accordion
                      type="single"
                      collapsible
                      key={item.id}
                      className="-ml-2 w-[calc(100%+16px)] border border-border rounded-md"
                    >
                      <AccordionItem
                        value={item.id}
                        className="shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06)]"
                      >
                        <AccordionTrigger className="px-4 py-2 font-medium h-[60px] flex items-center justify-between text-md">
                          <div className="flex items-center">
                            <div
                              className={`w-2.5 h-8 rounded-sm mr-3 transition-all`}
                              style={{
                                backgroundColor: item.color
                                  ? item.color
                                  : "#f3f3f3",
                              }}
                            />
                            <span>
                              {item.key ? item.key : `Line ${index + 1}`}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="space-y-4 px-4">
                            <div className="p-1 py-3">
                              <Label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                Values
                              </Label>
                              <div className="flex flex-col gap-2">
                                {Array.isArray(item.data) &&
                                item.data.length > 0 ? (
                                  item.data.map((dateValue, valueIndex) => (
                                    <div
                                      key={valueIndex}
                                      className="flex gap-2 items-center"
                                    >
                                      <div className="flex-1 pl-2 bg-gray-100 dark:bg-zinc-700 p-1 rounded-md">
                                        <Label
                                          htmlFor={`date-display-${item.id}-${valueIndex}`}
                                          className="text-md mt-1 text-gray-500 mb-1 block"
                                        >
                                          {formatDate(
                                            new Date(dateValue.date),
                                            "MMM d, yyyy"
                                          )}
                                        </Label>
                                      </div>
                                      <div className="flex-1">
                                        <Label
                                          htmlFor={`value-${item.id}-${valueIndex}`}
                                          className="sr-only"
                                        >
                                          Value {valueIndex + 1}
                                        </Label>
                                        <Input
                                          id={`value-${item.id}-${valueIndex}`}
                                          type="number"
                                          name={`value-${valueIndex}`}
                                          value={dateValue.value.toString()}
                                          placeholder={`Value ${
                                            valueIndex + 1
                                          }`}
                                          min={0}
                                          step="any"
                                          onChange={(e) => {
                                            // Handle empty input or invalid input
                                            let newValue = 0;
                                            try {
                                              newValue = e.target.value
                                                ? parseFloat(e.target.value)
                                                : 0;
                                            } catch (error) {
                                              console.error(
                                                "Invalid number input:",
                                                error
                                              );
                                            }

                                            // Ensure non-negative value
                                            const nonNegativeValue = Math.max(
                                              0,
                                              newValue
                                            );

                                            if (Array.isArray(item.data)) {
                                              const newValues = [...item.data];
                                              newValues[valueIndex] = {
                                                ...newValues[valueIndex],
                                                value: nonNegativeValue,
                                              };
                                              handleUpdateLine(
                                                index,
                                                "data",
                                                newValues
                                              );
                                            }
                                          }}
                                          className="w-full"
                                          aria-label={`Value ${valueIndex + 1}`}
                                        />
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    No values added yet
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                              <div>
                                {allowColor && (
                                  <div className="flex items-center gap-2">
                                    <Label
                                      htmlFor={`color-${item.id}`}
                                      className="sr-only"
                                    >
                                      Bar Color
                                    </Label>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="relative">
                                            <input
                                              type="color"
                                              value={item.color || "#000000"}
                                              onChange={(e) =>
                                                handleUpdateLine(
                                                  index,
                                                  "color",
                                                  e.target.value
                                                )
                                              }
                                              className="sr-only"
                                              id={`color-${item.id}`}
                                            />
                                            <Label
                                              htmlFor={`color-${item.id}`}
                                              className="w-7 h-7 rounded-full cursor-pointer flex items-center justify-center overflow-hidden border border-gray-400 dark:border-gray-700"
                                              style={{
                                                backgroundColor: item.color,
                                              }}
                                            />
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {item.color || "Select a color"}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                              handleUpdateLine(
                                                index,
                                                "color",
                                                item.color ? "" : "#3b82f6"
                                              )
                                            }
                                            aria-label={
                                              item.color
                                                ? "Use default color"
                                                : "Use custom color"
                                            }
                                          >
                                            {item.color ? (
                                              <Palette className="h-3.5 w-3.5" />
                                            ) : (
                                              <PaintRoller className="h-3.5 w-3.5" />
                                            )}
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {item.color
                                            ? "Use default color"
                                            : "Use custom color"}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                )}
                              </div>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteItem(
                                          index,
                                          `Line ${index + 1}`
                                        )
                                      }
                                      aria-label={`Delete Line ${index + 1}`}
                                    >
                                      <Trash2 />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete line</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="p-0 mt-0">
          <div className="py-5 space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Chart Properties
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tooltips" className="text-sm">
                      Show tooltips on hover
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Display additional information when hovering over data
                      points
                    </p>
                  </div>
                  <Switch
                    id="tooltips"
                    checked={withTooltip}
                    onCheckedChange={(checked) =>
                      handleUpdateChartConfig("withTooltip", checked === true)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations" className="text-sm">
                      Enable animations
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Animate chart elements when data changes
                    </p>
                  </div>
                  <Switch
                    id="animations"
                    checked={useAnimation}
                    onCheckedChange={(checked) =>
                      handleUpdateChartConfig("useAnimation", checked === true)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Controls />
        </TabsContent>
      </Tabs>

      {/* Combined Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm {deleteTarget?.type === "date" ? "Date " : ""}Deletion
            </DialogTitle>
            <DialogDescription>
              {deleteTarget?.type === "item"
                ? `Are you sure you want to delete ${deleteTarget.name}? This action cannot be undone.`
                : `Are you sure you want to delete the date ${
                    deleteTarget?.name instanceof Date
                      ? formatDate(deleteTarget.name as Date, "MMM d, yyyy")
                      : deleteTarget?.name
                  } from all lines? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="hover:bg-muted hover:text-foreground"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LineChartBuilder;
