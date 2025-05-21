import { PaintRoller, Palette, Plus, Trash2 } from "lucide-react";
import { useBuildStore } from "../../../providers/store-provider";
import { ChartDataItem } from "../../../stores/builder-store";

interface PieChartDataItem extends ChartDataItem {
  name?: string;
  colorFrom?: string;
  colorTo?: string;
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

function PieChartBuilder() {
  const [activeTab, setActiveTab] = useState("data");

  const {
    workspaceCharts,
    currentChartIndex,
    addChartItem,
    deleteChartItem,
    updateChartItem,
    updateChartConfig,
  } = useBuildStore((state) => state);

  const { withTooltip, useAnimation, suffix } =
    workspaceCharts[currentChartIndex];
  const chartType = workspaceCharts[currentChartIndex].chartType;

  const allowColor =
    !chartType.includes("thin") && !chartType.includes("multi");
  const allowImage = chartType.includes("image");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    index: number;
    name: string;
  } | null>(null);

  const handleAddPie = () => {
    const newItemId = Math.random().toString(36).substring(2, 8);

    const newItem = {
      id: newItemId,
      name: `Pie ${workspaceCharts[currentChartIndex].data.length + 1}`,
      value: 0,
      image: "",
      colorFrom: "",
      colorTo: "",
    };

    addChartItem(newItem);
  };

  const handleUpdatePie = (
    index: number,
    key: string,
    value: string | number | string[] | number[]
  ) => {
    updateChartItem(index, key, value);
  };

  const handleUpdateChartConfig = (key: string, value: boolean | string) => {
    updateChartConfig(key, value);
  };

  const handleDeleteItem = (index: number, itemName: string) => {
    setItemToDelete({ index, name: itemName });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteChartItem(itemToDelete.index);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
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
                onClick={handleAddPie}
                className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Piece (
                {workspaceCharts[currentChartIndex].data.length})
              </Button>
            </div>

            <div className="space-y-2 mt-4">
              {workspaceCharts[currentChartIndex].data.length === 0 && (
                <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                  <p className="text-gray-500">
                    No pieces added yet. Click the button above to add your
                    first piece.
                  </p>
                </div>
              )}

              {workspaceCharts[currentChartIndex].data.map(
                (item: PieChartDataItem, index: number) => {
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
                                backgroundColor: item.colorFrom
                                  ? item.colorFrom
                                  : "#f3f3f3",
                              }}
                            />

                            <span>{item.name || `Piece ${index + 1}`}</span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="space-y-4 px-4">
                            <div className="flex flex-row items-center w-full gap-2 mt-2">
                              <div className="flex flex-col flex-1">
                                <Label
                                  htmlFor={`name-${item.id}`}
                                  className="mb-1"
                                >
                                  Label
                                </Label>
                                <Input
                                  id={`name-${item.id}`}
                                  type="text"
                                  name="name"
                                  value={item.name}
                                  placeholder="Enter piece label"
                                  onChange={(e) =>
                                    handleUpdatePie(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  aria-label="Piece label"
                                />
                              </div>

                              <div className="flex flex-col">
                                <Label
                                  htmlFor={`value-${item.id}`}
                                  className="mb-1"
                                >
                                  Value
                                </Label>
                                <Input
                                  id={`value-${item.id}`}
                                  type="number"
                                  name="value"
                                  value={item.value}
                                  placeholder="Enter value"
                                  min={0}
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? parseFloat(e.target.value)
                                      : 0;
                                    const nonNegativeValue = Math.max(0, value);
                                    handleUpdatePie(
                                      index,
                                      "value",
                                      nonNegativeValue
                                    );
                                  }}
                                  aria-label="Piece value"
                                />
                              </div>
                            </div>

                            {allowImage && (
                              <div className="flex flex-col">
                                <Label
                                  htmlFor={`image-${item.id}`}
                                  className="mb-1"
                                >
                                  Image URL
                                </Label>
                                <Input
                                  id={`image-${item.id}`}
                                  type="text"
                                  name="image"
                                  value={item.image}
                                  placeholder="Enter image URL"
                                  onChange={(e) =>
                                    handleUpdatePie(
                                      index,
                                      "image",
                                      e.target.value
                                    )
                                  }
                                  aria-label="Image URL"
                                />
                                {item.image && (
                                  <div className="mt-2 text-xs text-gray-500">
                                    Image will be displayed on the chart
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-2">
                              <div>
                                {allowColor && (
                                  <div className="flex items-center gap-2">
                                    <Label
                                      htmlFor={`colorFrom-${item.id}`}
                                      className="sr-only"
                                    >
                                      From Color
                                    </Label>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="relative">
                                            <input
                                              type="color"
                                              value={
                                                item.colorFrom || "#000000"
                                              }
                                              onChange={(e) => {
                                                handleUpdatePie(
                                                  index,
                                                  "colorFrom",
                                                  e.target.value
                                                );
                                                handleUpdatePie(
                                                  index,
                                                  "colorTo",
                                                  e.target.value
                                                );
                                              }}
                                              className="sr-only"
                                              id={`colorFrom-${item.id}`}
                                            />
                                            <Label
                                              htmlFor={`colorFrom-${item.id}`}
                                              className="w-7 h-7 rounded-full cursor-pointer flex items-center justify-center overflow-hidden border border-gray-400 dark:border-gray-700"
                                              style={{
                                                backgroundColor: item.colorFrom,
                                              }}
                                            />
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {item.colorFrom || "Select a color"}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => {
                                              handleUpdatePie(
                                                index,
                                                "colorFrom",
                                                item.colorFrom ? "" : "#3b82f6"
                                              );
                                              handleUpdatePie(
                                                index,
                                                "colorTo",
                                                item.colorTo ? "" : "#3b82f6"
                                              );
                                            }}
                                            aria-label={
                                              item.colorFrom
                                                ? "Use default colors"
                                                : "Use custom colors"
                                            }
                                          >
                                            {item.colorFrom ? (
                                              <Palette className="h-3.5 w-3.5" />
                                            ) : (
                                              <PaintRoller className="h-3.5 w-3.5" />
                                            )}
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {item.colorFrom
                                            ? "Use default colors"
                                            : "Use custom colors"}
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
                                      size="icon"
                                      onClick={() =>
                                        handleDeleteItem(
                                          index,
                                          item.name || `Piece ${index + 1}`
                                        )
                                      }
                                    >
                                      <Trash2 />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete piece</p>
                                  </TooltipContent>
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

          <div className="flex justify-end absolute bottom-0 right-0 p-4">
            <ThemeToggle />
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

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="suffix" className="text-sm">
                      Suffix Options
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Add a suffix to the values (e.g. %)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={!suffix ? "default" : "outline"}
                      onClick={() => handleUpdateChartConfig("suffix", "")}
                      className="flex-1"
                      size="sm"
                    >
                      No Suffix
                    </Button>
                    <Button
                      variant={suffix === "%" ? "default" : "outline"}
                      onClick={() => handleUpdateChartConfig("suffix", "%")}
                      className="flex-1"
                      size="sm"
                    >
                      Use %
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {itemToDelete?.name}? This action
              cannot be undone.
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
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PieChartBuilder;
