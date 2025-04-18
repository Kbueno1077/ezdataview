"use client";

import { PaintRoller, Palette, Plus, Trash, TrashIcon } from "lucide-react";
import { useBuildStore } from "../../../providers/store-provider";
import { ChartDataItem } from "../../../stores/builder-store";

import { format } from "@formkit/tempo";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { parseDate } from "@internationalized/date";

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
  const currentData = workspaceCharts[currentChartIndex].data;

  const allowColor = !chartType.includes("thin");

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
      const formattedDate = format(newDate, "YYYY-MM-DD");
      initialData = [{ date: formattedDate, value: 0 }];
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
      | { date: string; value: number }[]
  ) => {
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
    }

    const formattedDate = format(latestDate, "YYYY-MM-DD");

    currentData.forEach((item, itemIndex) => {
      const newValues = [
        ...(item.data || []),
        { date: formattedDate, value: 0 },
      ];
      updateChartItem(itemIndex, "data", newValues);
    });
  };

  // Function to update date across all line series
  const handleDateChange = (newDate: string, valueIndex: number) => {
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
      confirm(`Are you sure you want to delete this date point from all lines?`)
    ) {
      currentData.forEach((item, itemIndex) => {
        if (Array.isArray(item.data) && item.data.length > valueIndex) {
          const newValues = [...item.data];
          newValues.splice(valueIndex, 1);
          updateChartItem(itemIndex, "data", newValues);
        }
      });
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
      minValue: minDate ? parseDate(format(minDate, "YYYY-MM-DD")) : undefined,
    };
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

      {/* Shared dates section */}
      <fieldset className="mb-6 border border-gray-200 dark:border-gray-700 rounded-md p-4">
        <legend className="text-sm font-medium px-2">Shared Dates</legend>

        <div className="space-y-3">
          {sharedDates.length > 0 ? (
            sharedDates.map((date, valueIndex) => (
              <div key={valueIndex} className="flex gap-2 items-center">
                <div className="flex-1">
                  <DatePicker
                    id={`shared-date-${valueIndex}`}
                    name={`shared-date-${valueIndex}`}
                    value={parseDate(date)}
                    label="Select date"
                    size="sm"
                    onChange={(e) => {
                      const formattedDate = format(
                        e?.toString() || "",
                        "YYYY-MM-DD"
                      );
                      handleDateChange(formattedDate, valueIndex);
                    }}
                    aria-label={`Date ${valueIndex + 1}`}
                    className="w-full"
                    {...getDateConstraints(valueIndex)}
                  />
                </div>
                <Tooltip content="Remove this date from all lines">
                  <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={() => handleDeleteDate(valueIndex)}
                    className="text-gray-500"
                    aria-label={`Remove date ${valueIndex + 1}`}
                  >
                    <Trash size={16} />
                  </Button>
                </Tooltip>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No dates added yet</p>
          )}

          <Button
            size="sm"
            variant="flat"
            onPress={handleAddDate}
            className="mt-2 w-full"
            startContent={<Plus size={14} />}
          >
            Add Date ({sharedDates.length})
          </Button>
        </div>
      </fieldset>

      <Button
        onPress={handleAddLine}
        className="w-full rounded-md gap-2"
        color="primary"
        variant="solid"
        startContent={<Plus className="h-4 w-4" />}
      >
        Add Line ({workspaceCharts[currentChartIndex].data.length})
      </Button>

      <div className="space-y-2 mt-4">
        {workspaceCharts[currentChartIndex].data.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
            <p className="text-gray-500">
              No lines added yet. Click the button above to add your first line.
            </p>
          </div>
        )}

        {workspaceCharts[currentChartIndex].data.map(
          (item: ChartDataItem, index: number) => {
            return (
              <Accordion key={item.id} variant="splitted">
                <AccordionItem
                  aria-label={`"Line"} ${index + 1}`}
                  title={`Line ${index + 1}`}
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
                    <fieldset className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                      <legend className="text-sm font-medium px-2">
                        Values
                      </legend>
                      <div className="flex flex-col gap-2">
                        {Array.isArray(item.data) && item.data.length > 0 ? (
                          item.data.map((dateValue, valueIndex) => (
                            <div
                              key={valueIndex}
                              className="flex gap-2 items-center"
                            >
                              <div className="flex-1">
                                <label
                                  htmlFor={`date-display-${item.id}-${valueIndex}`}
                                  className="text-sm text-gray-500 mb-1 block"
                                >
                                  {dateValue.date}
                                </label>
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
                                  step="any"
                                  size="lg"
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
                    </fieldset>

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
                                  handleUpdateLine(
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
                                  <Palette size={16} />
                                ) : (
                                  <PaintRoller size={16} />
                                )}
                              </Button>
                            </Tooltip>
                          </div>
                        )}
                      </div>

                      <Tooltip content={`Delete line`}>
                        <Button
                          isIconOnly
                          variant="solid"
                          color="danger"
                          onPress={() =>
                            handleDeleteItem(index, `Line ${index + 1}`)
                          }
                          aria-label={`Delete Line ${index + 1}`}
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
