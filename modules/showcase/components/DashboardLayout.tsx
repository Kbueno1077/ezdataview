"use client";

import React from "react";
import Pagination from "./Pagination";
import { Chart } from "../types";
import ChartItem from "./ChartItem";

interface DashboardLayoutProps {
  data: Chart[];
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = React.memo(
  ({ data, activePage, totalPages, onPageChange }) => {
    return (
      <div
        key={`dashboard-page-${activePage}`}
        className="flex flex-col gap-4 transition-all duration-300 ease-in-out"
      >
        {/* Top row - 2 wide charts (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.slice(0, 2).map((chart) => (
            <ChartItem key={chart.id} chart={chart} viewMode="dashboard" />
          ))}
        </div>

        {/* Middle - 1 featured chart (spans full width) */}
        {data[2] && <ChartItem chart={data[2]} viewMode="dashboard" />}

        {/* Bottom row - 3 smaller charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.slice(3, 6).map((chart) => (
            <ChartItem key={chart.id} chart={chart} viewMode="dashboard" />
          ))}
        </div>

        {/* Pagination for dashboard */}
        <Pagination
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
);

DashboardLayout.displayName = "DashboardLayout";

export default DashboardLayout;
