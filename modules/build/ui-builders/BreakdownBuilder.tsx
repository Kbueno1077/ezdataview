import { useBuildStore } from "../../../providers/store-provider";
import {
  ChevronLeft,
  PaintRoller,
  Palette,
  Plus,
  TrashIcon,
} from "lucide-react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

function BreakdownBuilder() {
  const {
    workspaceCharts,
    currentChartIndex,
    addChartItem,
    deleteChartItem,
    updateChartItem,
  } = useBuildStore((state) => state);

  const allowColor = true;

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    index: number;
    name: string;
  } | null>(null);

  const handleAddBar = () => {
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
      <h2 className="text-lg font-semibold mb-4">Chart Builder</h2>

      <Button
        onPress={handleAddBar}
        className="w-full rounded-md gap-2"
        color="primary"
        variant="solid"
        startContent={<Plus className="h-4 w-4" />}
      >
        Add Section ({workspaceCharts[currentChartIndex].data.length})
      </Button>

      <div className="space-y-2 mt-4">
        {workspaceCharts[currentChartIndex].data.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
            <p className="text-gray-500">
              No sections added yet. Click the button above to add your first
              bar.
            </p>
          </div>
        )}

        {workspaceCharts[currentChartIndex].data.map(
          (item: any, index: number) => {
            return (
              <Accordion key={item.id} variant="splitted">
                <AccordionItem
                  aria-label={`Section ${index + 1}: ${item.key}`}
                  title={`${item.key ? item.key : `Section ${index + 1}`}`}
                  classNames={{
                    base: "-ml-2 w-[calc(100%+16px)] border border-gray-200 dark:border-gray-700 rounded-md",
                    title: "font-medium",
                  }}
                  indicator={
                    <div className="flex items-center gap-2">
                      {item.color ? (
                        <div
                          className="inline-block w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        />
                      ) : (
                        <div className="ml-1">
                          <ChevronLeft size={18} />
                        </div>
                      )}
                    </div>
                  }
                >
                  <div className="space-y-4 -mt-4 p-2">
                    <div className="flex flex-col">
                      <label htmlFor={`key-${item.id}`} className="mb-1">
                        Label
                      </label>
                      <Input
                        id={`key-${item.id}`}
                        type="text"
                        name="key"
                        value={item.key}
                        placeholder="Enter bar label"
                        onChange={(e) =>
                          handleUpdateSection(index, "key", e.target.value)
                        }
                        aria-label="Bar label"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor={`value-${item.id}`} className="mb-1">
                        Value
                      </label>
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
                          handleUpdateSection(index, "value", nonNegativeValue);
                        }}
                        aria-label="Bar value"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        {allowColor && (
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`color-${item.id}`}
                              className="sr-only"
                            >
                              Bar Color
                            </label>
                            <Tooltip content={item.color || "Select a color"}>
                              <input
                                id={`color-${item.id}`}
                                type="color"
                                name="color"
                                value={item.color || "#000000"}
                                onChange={(e) =>
                                  handleUpdateSection(
                                    index,
                                    "color",
                                    e.target.value
                                  )
                                }
                                className="rounded-full h-8 w-8 p-1 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
                                aria-label="Bar color"
                              />
                            </Tooltip>

                            <Tooltip
                              content={
                                item.color
                                  ? "Use default color"
                                  : "Use custom color"
                              }
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                onPress={() =>
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
                                  <Palette size={16} />
                                ) : (
                                  <PaintRoller size={16} />
                                )}
                              </Button>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      <Tooltip content={`Delete section`}>
                        <Button
                          isIconOnly
                          variant="solid"
                          color="danger"
                          onPress={() => handleDeleteItem(index, item.key)}
                          aria-label={`Delete ${item.key}`}
                        >
                          <TrashIcon size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            );
          }
        )}
      </div>

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
            <Button variant="flat" onPress={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BreakdownBuilder;
