import { PaintRoller, Palette, Plus, Trash, TrashIcon } from "lucide-react";
import { useBuildStore } from "../../../providers/store-provider";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
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

function BarChartBuilder() {
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
      key: `Bar ${workspaceCharts[currentChartIndex].data.length + 1}`,
      value: 0,
      color: "",
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
      <h2 className="text-lg font-semibold mb-4">Chart Builder</h2>

      <fieldset className="mb-6 border border-gray-200 dark:border-gray-700 rounded-md p-4">
        <legend className="text-sm font-medium px-2">Chart Properties</legend>

        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="withTooltip"
              isSelected={withTooltip}
              onValueChange={(checked) =>
                handleUpdateChartConfig("withTooltip", checked === true)
              }
              aria-labelledby="tooltip-label"
            />
            <label id="tooltip-label" htmlFor="withTooltip" className="ml-2">
              Show tooltips on hover
            </label>
          </div>

          <div className="flex items-center">
            <Checkbox
              id="useAnimation"
              isSelected={useAnimation}
              onValueChange={(checked) =>
                handleUpdateChartConfig("useAnimation", checked === true)
              }
              aria-labelledby="animation-label"
            />
            <label id="animation-label" htmlFor="useAnimation" className="ml-2">
              Enable animations
            </label>
          </div>
        </div>
      </fieldset>

      <Button
        onPress={handleAddBar}
        className="w-full rounded-md gap-2"
        color="primary"
        variant="solid"
        startContent={<Plus className="h-4 w-4" />}
      >
        Add {allowMulti ? "Grouped Bars" : "Bar"} (
        {workspaceCharts[currentChartIndex].data.length})
      </Button>

      <div className="space-y-2 mt-4">
        {workspaceCharts[currentChartIndex].data.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
            <p className="text-gray-500">
              No bars added yet. Click the button above to add your first bar.
            </p>
          </div>
        )}

        {workspaceCharts[currentChartIndex].data.map(
          (item: any, index: number) => {
            return (
              <Accordion key={item.id} variant="splitted">
                <AccordionItem
                  aria-label={`${allowMulti ? "Grouped Bar" : "Bar"} ${
                    index + 1
                  }: ${item.key}`}
                  title={`${allowMulti ? "Grouped Bar" : "Bar"} ${index + 1}`}
                  subtitle={item.key}
                  classNames={{
                    base: "-ml-2 w-[calc(100%+16px)] border border-gray-200 dark:border-gray-700 rounded-md",
                    title: "font-medium",
                  }}
                  indicator={
                    <div className="flex items-center gap-2">
                      {item.color && (
                        <div
                          className="inline-block w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  }
                >
                  <div className="space-y-4 -mt-4 p-2">
                    <div className="flex flex-col">
                      <label htmlFor={`key-${item.id}`} className="mb-1">
                        Bar Label
                      </label>
                      <Input
                        id={`key-${item.id}`}
                        type="text"
                        name="key"
                        value={item.key}
                        placeholder="Enter bar label"
                        onChange={(e) =>
                          handleUpdateBar(index, "key", e.target.value)
                        }
                        aria-label="Bar label"
                      />
                    </div>

                    {!allowMulti && (
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
                            handleUpdateBar(index, "value", nonNegativeValue);
                          }}
                          aria-label="Bar value"
                        />
                      </div>
                    )}

                    {allowMulti && (
                      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                        <legend className="text-sm font-medium px-2">
                          Multiple Values
                        </legend>
                        <div className="flex flex-col gap-2">
                          {item.values && item.values.length > 0 ? (
                            item.values.map(
                              (value: number, valueIndex: number) => (
                                <div
                                  key={valueIndex}
                                  className="flex gap-2 items-center"
                                >
                                  <label
                                    htmlFor={`value-${item.id}-${valueIndex}`}
                                    className="sr-only"
                                  >
                                    Value {valueIndex + 1}
                                  </label>
                                  <Input
                                    id={`value-${item.id}-${valueIndex}`}
                                    type="number"
                                    name={`value-${valueIndex}`}
                                    value={value.toString()}
                                    placeholder={`Value ${valueIndex + 1}`}
                                    min={0}
                                    onChange={(e) => {
                                      const newValue = e.target.value
                                        ? parseFloat(e.target.value)
                                        : 0;
                                      const nonNegativeValue = Math.max(
                                        0,
                                        newValue
                                      );
                                      const newValues = [...item.values];
                                      newValues[valueIndex] = nonNegativeValue;
                                      handleUpdateBar(
                                        index,
                                        "values",
                                        newValues
                                      );
                                    }}
                                    className="flex-1"
                                    aria-label={`Value ${valueIndex + 1}`}
                                  />
                                  <Tooltip content="Remove value">
                                    <Button
                                      size="sm"
                                      variant="light"
                                      isIconOnly
                                      onPress={() => {
                                        const newValues = [...item.values];
                                        newValues.splice(valueIndex, 1);
                                        handleUpdateBar(
                                          index,
                                          "values",
                                          newValues
                                        );
                                      }}
                                      className="text-gray-500"
                                      aria-label={`Remove value ${
                                        valueIndex + 1
                                      }`}
                                    >
                                      <Trash size={16} />
                                    </Button>
                                  </Tooltip>
                                </div>
                              )
                            )
                          ) : (
                            <p className="text-sm text-gray-500">
                              No values added yet
                            </p>
                          )}
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => {
                              const newValues = [...(item.values || []), 0];
                              handleUpdateBar(index, "values", newValues);
                            }}
                            className="mt-2"
                            startContent={<Plus size={14} />}
                          >
                            Add Value ({item.values?.length || 0})
                          </Button>
                        </div>
                      </fieldset>
                    )}

                    {(allowImage || allowMulti) && (
                      <div className="flex flex-col">
                        <label htmlFor={`image-${item.id}`} className="mb-1">
                          Image URL
                        </label>
                        <Input
                          id={`image-${item.id}`}
                          type="text"
                          name="image"
                          value={item.image}
                          placeholder="Enter image URL"
                          onChange={(e) =>
                            handleUpdateBar(index, "image", e.target.value)
                          }
                          aria-label="Image URL"
                        />
                        {item.image && (
                          <div className="mt-2 text-xs text-gray-500">
                            Image will be displayed on the bar
                          </div>
                        )}
                      </div>
                    )}

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
                                  handleUpdateBar(
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
                                  <Palette size={16} />
                                ) : (
                                  <PaintRoller size={16} />
                                )}
                              </Button>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      <Tooltip
                        content={`Delete ${allowMulti ? "grouped bar" : "bar"}`}
                      >
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

export default BarChartBuilder;
