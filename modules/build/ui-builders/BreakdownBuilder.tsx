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

function BreakdownBuilder() {
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    index: number;
    name: string;
  } | null>(null);

  const handleAddSection = () => {
    const newItemId = Math.random().toString(36).substring(2, 8);

    const newItem = {
      id: newItemId,
      key: `Section ${workspaceCharts[currentChartIndex].data.length + 1}`,
      value: 0,
      color: "",
    };

    addChartItem(newItem);
  };

  const handleUpdateSection = (
    index: number,
    key: string,
    value: string | number | string[] | number[]
  ) => {
    updateChartItem(index, key, value);
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
                onClick={handleAddSection}
                className="h-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Section (
                {workspaceCharts[currentChartIndex].data.length})
              </Button>
            </div>

            <div className="space-y-2 mt-4">
              {workspaceCharts[currentChartIndex].data.length === 0 && (
                <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                  <p className="text-gray-500">
                    No sections added yet. Click the button above to add your
                    first section.
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

                            <span>{item.key || `Section ${index + 1}`}</span>
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
                                  placeholder="Enter section label"
                                  onChange={(e) =>
                                    handleUpdateSection(
                                      index,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                  aria-label="Section label"
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
                                    handleUpdateSection(
                                      index,
                                      "value",
                                      nonNegativeValue
                                    );
                                  }}
                                  aria-label="Section value"
                                />
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Label
                                    htmlFor={`color-${item.id}`}
                                    className="sr-only"
                                  >
                                    Section Color
                                  </Label>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="relative">
                                          <input
                                            type="color"
                                            value={item.color || "#000000"}
                                            onChange={(e) =>
                                              handleUpdateSection(
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
                                            handleUpdateSection(
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
                                          item.key || `Section ${index + 1}`
                                        )
                                      }
                                      aria-label={`Delete ${
                                        item.key || `Section ${index + 1}`
                                      }`}
                                    >
                                      <Trash2 />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Delete section
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

export default BreakdownBuilder;
