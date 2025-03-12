import { useBuildStore } from "@/providers/store-provider";
import { useState } from "react";

import { TrashIcon } from "lucide-react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";

function BarchartUiBuilder() {
  const {
    workspaceCharts,
    currentChartIndex,
    addChartItem,
    deleteChartItem,
    updateChartItem,
    updateChartConfig,
  } = useBuildStore((state) => state);

  const handleAddBar = () => {
    const newItemId = Math.random().toString(36).substring(2, 8);

    const newItem = {
      id: newItemId,
      key: `Bar ${workspaceCharts[currentChartIndex].data.length + 1}`,
      value: 0,
      color: "#B093F6",
      image: "",
      values: [],
    };

    addChartItem(newItem);
  };

  const { multipleValues, withImage, withTooltip, useAnimation } =
    workspaceCharts[currentChartIndex];

  const handleUpdateBar = (index: number, key: string, value: any) => {
    updateChartItem(index, key, value);
  };

  const handleUpdateChartConfig = (key: string, value: any) => {
    updateChartConfig(key, value);
  };

  return (
    <div className="px-1">
      <h3 className="font-semibold mb-2 ">Add Bar Chart Data</h3>

      <div className="mb-4">
        <div className="flex flex-col gap-0.5 mb-2">
          <div className="flex items-center">
            <Checkbox
              id="useMultipleValues"
              isSelected={multipleValues}
              onValueChange={(checked) =>
                handleUpdateChartConfig("multipleValues", checked === true)
              }
              className="mr-2"
            >
              {" "}
              Multiple values
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              id="withImage"
              isSelected={withImage}
              onValueChange={(checked) =>
                handleUpdateChartConfig("withImage", checked === true)
              }
              className="mr-2"
            >
              Image
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              id="withTooltip"
              isSelected={withTooltip}
              onValueChange={(checked) =>
                handleUpdateChartConfig("withTooltip", checked === true)
              }
              className="mr-2"
            >
              Tooltip
            </Checkbox>
          </div>

          <div className="flex items-center">
            <Checkbox
              id="useAnimation"
              isSelected={useAnimation}
              onValueChange={(checked) =>
                handleUpdateChartConfig("useAnimation", checked === true)
              }
              className="mr-2"
            >
              Animation
            </Checkbox>
          </div>
        </div>
      </div>

      <Button
        onPress={handleAddBar}
        className="w-full text-background rounded-md"
        color="primary"
        variant="solid"
      >
        Add Bar ({workspaceCharts[currentChartIndex].data.length})
      </Button>

      <div className="space-y-2 mt-2">
        {workspaceCharts[currentChartIndex].data.map((item, index) => {
          return (
            <Accordion key={item.id} variant="splitted">
              <AccordionItem
                aria-label={`Bar ${index + 1}`}
                title={`Bar ${index + 1}`}
                classNames={{
                  base: "-ml-2 w-[calc(100%+16px)]",
                }}
                indicator={
                  <div
                    className="ml-2 inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                }
              >
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <Input
                      type="text"
                      name="key"
                      value={item.key}
                      placeholder="Enter key"
                      onChange={(e) =>
                        handleUpdateBar(index, "key", e.target.value)
                      }
                    />
                  </div>

                  {!multipleValues ? (
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        name="value"
                        value={item.value}
                        placeholder="Enter value"
                        onChange={(e) =>
                          handleUpdateBar(
                            index,
                            "value",
                            e.target.value ? parseFloat(e.target.value) : 0
                          )
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col bg-gray-50 p-4 rounded-md">
                      <div className="flex"></div>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <label className="sr-only ">Color (optional)</label>
                    <input
                      type="color"
                      name="color"
                      value={item.color}
                      onChange={(e) =>
                        handleUpdateBar(index, "color", e.target.value)
                      }
                      className="border rounded-md h-10 w-full cursor-pointer"
                    />
                  </div>

                  {withImage && (
                    <div className="flex flex-col">
                      <label className="mb-2 text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <Input
                        type="text"
                        name="image"
                        value={item.image}
                        placeholder="Enter image URL"
                        onChange={(e) =>
                          handleUpdateBar(index, "image", e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-2">
                  <Button
                    isIconOnly
                    variant="solid"
                    color="danger"
                    onPress={() => deleteChartItem(index)}
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

export default BarchartUiBuilder;
