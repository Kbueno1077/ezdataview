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
      <div className="flex items-center bg-background/80 backdrop-blur-sm rounded-lg p-1 shadow-sm border border-border dark:border-zinc-700">
        <button
          onClick={() => onViewModeChange("list")}
          className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
            viewMode === "list"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
              : "text-foreground hover:bg-muted hover:text-blue-500 dark:hover:text-blue-400"
          }`}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          title="Switch to list view"
        >
          <List size={18} className="mr-1.5" />
          <span>List</span>
        </button>
        <button
          onClick={() => onViewModeChange("grid")}
          className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 mx-1 ${
            viewMode === "grid"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
              : "text-foreground hover:bg-muted hover:text-purple-500 dark:hover:text-purple-400"
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          title="Switch to grid view"
        >
          <Grid size={18} className="mr-1.5" />
          <span>Grid</span>
        </button>
        <button
          onClick={() => onViewModeChange("dashboard")}
          className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
            viewMode === "dashboard"
              ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md"
              : "text-foreground hover:bg-muted hover:text-teal-500 dark:hover:text-teal-400"
          }`}
          aria-label="Dashboard view"
          aria-pressed={viewMode === "dashboard"}
          title="Switch to dashboard view"
        >
          <LayoutGrid size={18} className="mr-1.5" />
          <span>Dashboard</span>
        </button>
      </div>
    );
  }
);

ViewModeSelector.displayName = "ViewModeSelector";

export default ViewModeSelector;
