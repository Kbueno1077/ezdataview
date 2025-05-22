import { Home, PaintRoller, Palette, Plus, Trash2 } from "lucide-react";
import { useBuildStore } from "../../../providers/store-provider";

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
import { useRouter } from "next/navigation";
import { Controls } from "@/components/Controls";

function BarChartBuilder() {
  const [activeTab, setActiveTab] = useState("data");
  const router = useRouter();

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

  const allowColor =
    !chartType.includes("thin") && !chartType.includes("multi");
  const allowImage = chartType.includes("image");
  const allowMulti = chartType.includes("multi");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    index: number;
    name: string;
  } | null>(null);

  const handleAddBar = () => {
    const newItemId = Math.random().toString(36).substring(2, 8);

    const newItem = {
      id: newItemId,
      key: `Bar ${workspaceCharts[currentChartIndex].data.length + 1}`,
      value: 0,
      color: "",
      multipleColors: [],
      image: "",
      values: [],
    };

    addChartItem(newItem);
  };

  const handleUpdateBar = (
    index: number,
    key: string,
    value: string | number | string[] | number[]
  ) => {
    updateChartItem(index, key, value);
  };

  const handleUpdateMultipleColors = (
    index: number,
    valueIndex: number,
    value: string
  ) => {
    const multipleColors =
      workspaceCharts[currentChartIndex].data[index].multipleColors || [];
    const newMultipleColors = [...multipleColors];
    newMultipleColors[valueIndex] = value;

    // Update all bars to have the same colors for consistent grouping
    workspaceCharts[currentChartIndex].data.forEach((item, itemIndex) => {
      const itemColors = item.multipleColors || [];
      const updatedColors = [...itemColors];
      updatedColors[valueIndex] = value;
      updateChartItem(itemIndex, "multipleColors", updatedColors);
    });
  };

  const handleUpdateChartConfig = (key: string, value: boolean) => {
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
                onClick={handleAddBar}
                className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add
                {allowMulti ? " Grouped Bars" : " Bar"} (
                {workspaceCharts[currentChartIndex].data.length})
              </Button>
            </div>

            <div className="space-y-2 mt-4">
              {workspaceCharts[currentChartIndex].data.length === 0 && (
                <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                  <p className="text-gray-500">
                    No bars added yet. Click the button above to add your first
                    bar.
                  </p>
                </div>
              )}
              {workspaceCharts[currentChartIndex].data.map(
                (item, index: number) => {
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
                              {item.key
                                ? item.key
                                : allowMulti
                                ? `Grouped Bar ${index + 1}`
                                : `Bar ${index + 1}`}
                            </span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="space-y-4 px-4">
                            <div className="flex flex-row items-center w-full gap-2 mt-2">
                              <div className="flex flex-col flex-1">
                                <Label
                                  htmlFor={`key-${item.id}`}
                                  className="mb-1"
                                >
                                  Label
                                </Label>
                                <Input
                                  id={`key-${item.id}`}
                                  type="text"
                                  name="key"
                                  value={item.key}
                                  placeholder="Enter bar label"
                                  onChange={(e) =>
                                    handleUpdateBar(
                                      index,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                  aria-label="Bar label"
                                />
                              </div>

                              {!allowMulti && (
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
                                      const nonNegativeValue = Math.max(
                                        0,
                                        value
                                      );
                                      handleUpdateBar(
                                        index,
                                        "value",
                                        nonNegativeValue
                                      );
                                    }}
                                    aria-label="Bar value"
                                  />
                                </div>
                              )}
                            </div>

                            {allowMulti && (
                              <div className="flex flex-col">
                                <div className="flex items-center justify-between py-2">
                                  <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Multiple Values
                                  </Label>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                                    onClick={() => {
                                      const newValues = [
                                        ...(item.values || []),
                                        0,
                                      ];
                                      handleUpdateBar(
                                        index,
                                        "values",
                                        newValues
                                      );
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" /> Add Value
                                    ({item.values?.length || 0})
                                  </Button>
                                </div>

                                <div className="space-y-2">
                                  {item.values &&
                                    item.values.length > 0 &&
                                    item.values.map(
                                      (value: number, valueIndex: number) => (
                                        <div
                                          key={valueIndex}
                                          className="flex gap-2 items-center"
                                        >
                                          <input
                                            type="color"
                                            value={
                                              item.multipleColors?.[
                                                valueIndex
                                              ] || "#000000"
                                            }
                                            onChange={(e) =>
                                              handleUpdateMultipleColors(
                                                index,
                                                valueIndex,
                                                e.target.value
                                              )
                                            }
                                            className="sr-only"
                                            id={`color-${item.id}-${valueIndex}`}
                                          />

                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Label
                                                  htmlFor={`color-${item.id}-${valueIndex}`}
                                                  className="w-7 h-7 rounded-full cursor-pointer flex items-center justify-center overflow-hidden border border-gray-400 dark:border-gray-700"
                                                  style={{
                                                    backgroundColor:
                                                      item.multipleColors?.[
                                                        valueIndex
                                                      ] || "#000000",
                                                  }}
                                                />
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                {item.multipleColors?.[
                                                  valueIndex
                                                ] || "Select a color"}
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>

                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="icon"
                                                  variant="ghost"
                                                  onClick={() => {
                                                    const multipleColors = [
                                                      ...(item.multipleColors ||
                                                        []),
                                                    ];
                                                    if (
                                                      multipleColors[valueIndex]
                                                    ) {
                                                      multipleColors[
                                                        valueIndex
                                                      ] = "";
                                                    } else {
                                                      multipleColors[
                                                        valueIndex
                                                      ] = "#3b82f6";
                                                    }
                                                    handleUpdateBar(
                                                      index,
                                                      "multipleColors",
                                                      multipleColors
                                                    );
                                                  }}
                                                  aria-label={
                                                    item.multipleColors?.[
                                                      valueIndex
                                                    ]
                                                      ? "Use default color"
                                                      : "Use custom color"
                                                  }
                                                  className="h-7 w-7"
                                                >
                                                  {item.multipleColors?.[
                                                    valueIndex
                                                  ] ? (
                                                    <Palette className="h-3.5 w-3.5" />
                                                  ) : (
                                                    <PaintRoller className="h-3.5 w-3.5" />
                                                  )}
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                {item.multipleColors?.[
                                                  valueIndex
                                                ]
                                                  ? "Use default color"
                                                  : "Use custom color"}
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>

                                          <Input
                                            id={`value-${item.id}-${valueIndex}`}
                                            type="number"
                                            value={value.toString()}
                                            placeholder={`Value ${
                                              valueIndex + 1
                                            }`}
                                            min={0}
                                            onChange={(e) => {
                                              const newValue = e.target.value
                                                ? parseFloat(e.target.value)
                                                : 0;
                                              const nonNegativeValue = Math.max(
                                                0,
                                                newValue
                                              );
                                              const newValues = [
                                                ...(item.values || []),
                                              ];
                                              newValues[valueIndex] =
                                                nonNegativeValue;
                                              handleUpdateBar(
                                                index,
                                                "values",
                                                newValues
                                              );
                                            }}
                                            className="flex-1"
                                            aria-label={`Value ${
                                              valueIndex + 1
                                            }`}
                                          />

                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="icon"
                                                  className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                                  variant="ghost"
                                                  onClick={() => {
                                                    const newValues = [
                                                      ...(item.values || []),
                                                    ];
                                                    newValues.splice(
                                                      valueIndex,
                                                      1
                                                    );
                                                    handleUpdateBar(
                                                      index,
                                                      "values",
                                                      newValues
                                                    );
                                                  }}
                                                  aria-label="Remove value"
                                                >
                                                  <Trash2 />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                Remove value
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            )}

                            {(allowImage || allowMulti) && (
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
                                    handleUpdateBar(
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

                            <div className="flex justify-between items-center pt-2 ">
                              <div>
                                {allowColor && (
                                  <div className="flex items-center gap-2">
                                    <Label
                                      htmlFor={`color-${item.id}`}
                                      className="sr-only"
                                    >
                                      Bar Color
                                    </Label>

                                    <div className="relative">
                                      <input
                                        type="color"
                                        value={item.color || "#000000"}
                                        onChange={(e) =>
                                          handleUpdateBar(
                                            index,
                                            "color",
                                            e.target.value
                                          )
                                        }
                                        className="sr-only"
                                        id={`color-${item.id}`}
                                      />

                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Label
                                              htmlFor={`color-${item.id}`}
                                              className="w-7 h-7 rounded-full cursor-pointer flex items-center justify-center overflow-hidden border border-gray-400 dark:border-gray-700"
                                              style={{
                                                backgroundColor: item.color,
                                              }}
                                            />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            {item.color || "Select a color"}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                              handleUpdateBar(
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
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        handleDeleteItem(index, item.key || "")
                                      }
                                      className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                                      aria-label={`Delete ${item.key || ""}`}
                                    >
                                      <Trash2 />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Delete {item.key}
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

          <div className="flex w-full justify-end absolute bottom-0 left-0 p-4">
            <Controls>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="h-8 w-8 rounded-full transition-colors text-muted-foreground hover:bg-muted hover:text-muted-foreground dark:hover:bg-zinc-600"
                aria-label="Go to home"
              >
                <Home />
              </Button>
            </Controls>
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

export default BarChartBuilder;
