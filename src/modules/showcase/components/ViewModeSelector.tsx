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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex space-x-2">
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 rounded-md transition-all cursor-pointer ${
            viewMode === "list"
              ? "bg-gray-100 text-foreground"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          title="Switch to list view"
        >
          <List size={20} />
        </button>
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 rounded-md transition-all cursor-pointer ${
            viewMode === "grid"
              ? "bg-gray-100 text-foreground"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          title="Switch to grid view"
        >
          <Grid size={20} />
        </button>
        <button
          onClick={() => onViewModeChange("dashboard")}
          className={`p-2 rounded-md transition-all cursor-pointer ${
            viewMode === "dashboard"
              ? "bg-gray-100 text-foreground"
              : "text-gray-500 hover:bg-gray-50"
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
