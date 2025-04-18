import { useBuildStore } from "../../../providers/store-provider";
import { PaintRoller, Palette, Plus, TrashIcon } from "lucide-react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";

function PieChartBuilder() {
  const {
    workspaceCharts,
    currentChartIndex,
    addChartItem,
    deleteChartItem,
    updateChartItem,
    updateChartConfig,
  } = useBuildStore((state) => state);

  const { withTooltip, suffix } = workspaceCharts[currentChartIndex];
  const chartType = workspaceCharts[currentChartIndex].chartType;

  const allowColor =
    !chartType.includes("thin") && !chartType.includes("multi");
  const allowImage = chartType.includes("image");

  const handleAddBar = () => {
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
    if (confirm(`Are you sure you want to delete ${itemName}?`)) {
      deleteChartItem(index);
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

          <div className="flex flex-col space-y-2 ">
            <label className="text-sm font-medium">Suffix Options:</label>
            <div className="flex gap-2">
              <Button
                variant={!suffix ? "solid" : "flat"}
                color={!suffix ? "primary" : "default"}
                onPress={() => handleUpdateChartConfig("suffix", "")}
                className="flex-1"
                size="sm"
              >
                No Suffix
              </Button>
              <Button
                variant={suffix === "%" ? "solid" : "flat"}
                color={suffix === "%" ? "primary" : "default"}
                onPress={() => handleUpdateChartConfig("suffix", "%")}
                className="flex-1"
                size="sm"
              >
                Use %
              </Button>
            </div>
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
        Add Piece ({workspaceCharts[currentChartIndex].data.length})
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
                  aria-label={`Piece ${index + 1}: ${item.name}`}
                  title={`Piece ${index + 1}`}
                  subtitle={item.name}
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
                        name="name"
                        value={item.name}
                        placeholder="Enter bar label"
                        onChange={(e) =>
                          handleUpdatePie(index, "name", e.target.value)
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
                          handleUpdatePie(index, "value", nonNegativeValue);
                        }}
                        aria-label="Bar value"
                      />
                    </div>

                    {allowImage && (
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
                            handleUpdatePie(index, "image", e.target.value)
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
                              htmlFor={`colorFrom-${item.id}`}
                              className="sr-only"
                            >
                              From Color
                            </label>
                            <Tooltip
                              content={item.colorFrom || "Select from color"}
                            >
                              <input
                                id={`colorFrom-${item.id}`}
                                type="color"
                                name="colorFrom"
                                value={item.colorFrom || "#000000"}
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
                                className="rounded-full h-8 w-8 p-1 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
                                aria-label="From color"
                              />
                            </Tooltip>

                            <Tooltip
                              content={
                                item.colorFrom
                                  ? "Use default colors"
                                  : "Use custom colors"
                              }
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                onPress={() => {
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
                                  <Palette size={16} />
                                ) : (
                                  <PaintRoller size={16} />
                                )}
                              </Button>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      <Tooltip content={`Delete Piece`}>
                        <Button
                          isIconOnly
                          variant="solid"
                          color="danger"
                          onPress={() => handleDeleteItem(index, item.name)}
                          aria-label={`Delete ${item.name}`}
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
    </div>
  );
}

export default PieChartBuilder;
