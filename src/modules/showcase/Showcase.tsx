"use client";

import React, { useCallback, useEffect, useState } from "react";
import ChartGrid from "./components/ChartGrid";
import DashboardLayout from "./components/DashboardLayout";
import ViewModeSelector from "./components/ViewModeSelector";
import { Chart, ViewMode } from "./types";

interface ShowcaseProps {
  data: Chart[];
  title?: string;
}

function Showcase({ data, title = "Charts" }: ShowcaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeDashboardPage, setActiveDashboardPage] = useState(0);
  const chartsPerPage = 6;
  const totalPages = Math.ceil(data.length / chartsPerPage);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  useEffect(() => {
    if (isMobile) {
      setViewMode("dashboard");
    }
  }, [isMobile]);

  const handleViewModeChange = useCallback(
    (mode: ViewMode) => {
      if (!isMobile) {
        setViewMode(mode);
      }
    },
    [isMobile]
  );

  const handlePageChange = useCallback((page: number) => {
    setActiveDashboardPage(page);
  }, []);

  const dashboardData = React.useMemo(() => {
    const startIdx = activeDashboardPage * chartsPerPage;
    return data.slice(startIdx, startIdx + chartsPerPage);
  }, [data, activeDashboardPage, chartsPerPage]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
          {title}
        </h1>
        {!isMobile && (
          <ViewModeSelector
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        )}
      </div>

      <div
        key={viewMode}
        className="w-full mt-5 transition-all duration-300 ease-in-out"
      >
        {viewMode === "dashboard" ? (
          <DashboardLayout
            data={dashboardData}
            activePage={activeDashboardPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          <ChartGrid data={data} viewMode={viewMode} />
        )}
      </div>
    </>
  );
}

export default Showcase;
