"use client";

import React from "react";
import { List, Grid, LayoutGrid } from "lucide-react";
import { ViewMode } from "../types";

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewModeSelector: React.FC<ViewModeSelectorProps> = React.memo(
  ({ viewMode, onViewModeChange }) => {
    return (
      <div className="flex rounded-md overflow-hidden">
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-3 transition-all duration-200 cursor-pointer ${
            viewMode === "list"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          title="Switch to list view"
        >
          <List size={20} />
        </button>
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-3 transition-all duration-200 cursor-pointer ${
            viewMode === "grid"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          title="Switch to grid view"
        >
          <Grid size={20} />
        </button>
        <button
          onClick={() => onViewModeChange("dashboard")}
          className={`p-3 transition-all duration-200 cursor-pointer ${
            viewMode === "dashboard"
              ? "bg-teal-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Dashboard view"
          aria-pressed={viewMode === "dashboard"}
          title="Switch to dashboard view"
        >
          <LayoutGrid size={20} />
        </button>
      </div>
    );
  }
);

ViewModeSelector.displayName = "ViewModeSelector";

export default ViewModeSelector;
