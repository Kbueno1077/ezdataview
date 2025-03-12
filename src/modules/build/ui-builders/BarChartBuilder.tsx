import { useBuildStore } from "@/providers/store-provider";

import { PaintRoller, Palette, TrashIcon } from "lucide-react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";

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

  const allowColor = !chartType.includes("thin");
  const allowImage = chartType.includes("image");
  const allowMulti = chartType.includes("multi");

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

                  {!allowMulti ? (
                    <div className="flex flex-col">
                      <Input
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
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col bg-gray-50 p-4 rounded-md">
                      <div className="flex"></div>
                    </div>
                  )}

                  {allowImage && (
                    <div className="flex flex-col">
                      <label className="sr-only">Image URL</label>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                          <Input
                            type="text"
                            name="image"
                            value={item.image}
                            placeholder="Enter image URL"
                            onChange={(e) =>
                              handleUpdateBar(index, "image", e.target.value)
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {allowColor && (
                    <div className="flex flex-col">
                      <label className="sr-only">Color (optional)</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          name="color"
                          value={item.color || "#000000"}
                          onChange={(e) =>
                            handleUpdateBar(index, "color", e.target.value)
                          }
                          className={`border rounded-md h-10 flex-1 ${
                            item.color
                              ? "cursor-pointer"
                              : "cursor-not-allowed opacity-50"
                          }`}
                          disabled={!item.color}
                        />

                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onPress={() =>
                            handleUpdateBar(
                              index,
                              "color",
                              item.color ? "" : "#000000"
                            )
                          }
                        >
                          {item.color ? (
                            <div>
                              <span className="sr-only">Use Default Color</span>
                              <Palette size={16} />
                            </div>
                          ) : (
                            <div>
                              <span className="sr-only">Use Custom Color</span>
                              <PaintRoller size={16} />
                            </div>
                          )}
                        </Button>
                      </div>
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

export default BarChartBuilder;
