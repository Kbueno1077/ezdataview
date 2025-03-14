import { useBuildStore } from "@/providers/store-provider";
import { PaintRoller, Palette, Trash, TrashIcon, Plus } from "lucide-react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { DatePicker } from "@heroui/date-picker";
import { parseDate } from "@internationalized/date";
import { format } from "@formkit/tempo";

function LineChartBuilder() {
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
  const allowMulti =
    chartType.includes("multi") || chartType.includes("curved");

  const handleAddBar = () => {
    const newItemId = Math.random().toString(36).substring(2, 8);
    const newDate = new Date();

    const formattedDate = format(newDate, "YYYY-MM-DD");
    const newItem = {
      id: newItemId,
      date: formattedDate,
      value: 0,
      color: "",
      data: [{ date: formattedDate, value: 0 }],
    };

    addChartItem(newItem);
  };

  const handleUpdateBar = (
    index: number,
    key: string,
    value: string | number | string[] | number[]
  ) => {
    console.log("🚀 ~ LineChartBuilder ~ value:", value);
    updateChartItem(index, key, value);
  };

  const handleUpdateChartConfig = (key: string, value: boolean) => {
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
        Add {allowMulti ? "Grouped Bars" : "Line"} (
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
                  aria-label={`${allowMulti ? "Grouped Line" : "Line"} ${
                    index + 1
                  }: ${item.date}`}
                  title={`${allowMulti ? "Multiple Lines" : "Line"} ${
                    index + 1
                  }`}
                  subtitle={item.date}
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
                    {!allowMulti && (
                      <div className="flex flex-col">
                        <label htmlFor={`key-${item.id}`} className="mb-1">
                          Line Date
                        </label>

                        <div className="relative">
                          <DatePicker
                            id={`date-${item.id}`}
                            name="date"
                            value={parseDate(item.date)}
                            label="Select date"
                            onChange={(e) => {
                              console.log(e?.toString());

                              handleUpdateBar(
                                index,
                                "date",
                                e?.toString() || ""
                              );
                            }}
                            aria-label="Line date"
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}

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
                          aria-label="Line value"
                        />
                      </div>
                    )}

                    {allowMulti && (
                      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                        <legend className="text-sm font-medium px-2">
                          Multiple Values
                        </legend>
                        <div className="flex flex-col gap-2">
                          {item.data && item.data.length > 0 ? (
                            item.data.map(
                              (
                                dateValue: { date: string; value: number },
                                valueIndex: number
                              ) => (
                                <div
                                  key={valueIndex}
                                  className="flex gap-2 items-center"
                                >
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`date-${item.id}-${valueIndex}`}
                                      className="sr-only"
                                    >
                                      Date {valueIndex + 1}
                                    </label>
                                    <DatePicker
                                      id={`date-${item.id}-${valueIndex}`}
                                      name={`date-${valueIndex}`}
                                      value={parseDate(dateValue.date)}
                                      label="Select date"
                                      size="sm"
                                      onChange={(e) => {
                                        const newValues = [...item.data];
                                        newValues[valueIndex].date =
                                          e?.toString() || "";
                                        handleUpdateBar(
                                          index,
                                          "data",
                                          newValues
                                        );
                                      }}
                                      aria-label={`Date ${valueIndex + 1}`}
                                      className="w-full"
                                    />
                                  </div>
                                  <div className="flex-1">
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
                                      value={dateValue.value.toString()}
                                      placeholder={`Value ${valueIndex + 1}`}
                                      min={0}
                                      size="lg"
                                      onChange={(e) => {
                                        const newValue = e.target.value
                                          ? parseFloat(e.target.value)
                                          : 0;
                                        const nonNegativeValue = Math.max(
                                          0,
                                          newValue
                                        );
                                        const newValues = [...item.data];
                                        newValues[valueIndex].value =
                                          nonNegativeValue;
                                        handleUpdateBar(
                                          index,
                                          "data",
                                          newValues
                                        );
                                      }}
                                      className="w-full"
                                      aria-label={`Value ${valueIndex + 1}`}
                                    />
                                  </div>
                                  <Tooltip content="Remove value">
                                    <Button
                                      size="lg"
                                      variant="light"
                                      isIconOnly
                                      onPress={() => {
                                        const newValues = [...item.data];
                                        newValues.splice(valueIndex, 1);
                                        handleUpdateBar(
                                          index,
                                          "data",
                                          newValues
                                        );
                                      }}
                                      className="text-gray-500"
                                      aria-label={`Remove value ${
                                        valueIndex + 1
                                      }`}
                                    >
                                      <Trash size={18} />
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
                              const newDate = new Date();
                              const formattedDate = format(
                                newDate,
                                "YYYY-MM-DD"
                              );
                              const newValues = [
                                ...(item.data || []),
                                { date: formattedDate, value: 0 },
                              ];
                              handleUpdateBar(index, "data", newValues);
                            }}
                            className="mt-2"
                            startContent={<Plus size={14} />}
                          >
                            Add Value ({item.data?.length || 0})
                          </Button>
                        </div>
                      </fieldset>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        {allowColor && (
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`color-${item.id}`}
                              className="sr-only"
                            >
                              Line Color
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
                                aria-label="Line color"
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
                          onPress={() => handleDeleteItem(index, item.date)}
                          aria-label={`Delete ${item.date}`}
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

export default LineChartBuilder;
