"use client";

import { NativeCharts } from "@/components/NativeModal";
import React, { useState } from "react";
import { BsGrid3X3GapFill, BsListUl, BsGrid } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Chart {
  id: string;
  name: string;
  type: string;
  data: unknown;
}

type ViewMode = "list" | "grid" | "dashboard";

function Showcase({
  data,
  title = "Charts",
}: {
  data: Chart[];
  title?: string;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeDashboardPage, setActiveDashboardPage] = useState(0);
  const chartsPerPage = 6;
  const totalPages = Math.ceil(data.length / chartsPerPage);

  const getLayoutClasses = () => {
    switch (viewMode) {
      case "list":
        return "w-full grid grid-cols-1 gap-4 mt-5";
      case "grid":
        return "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5";
      case "dashboard":
        return "w-full mt-5";
      default:
        return "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5";
    }
  };

  const renderDashboardLayout = () => {
    const startIdx = activeDashboardPage * chartsPerPage;
    const pageData = data.slice(startIdx, startIdx + chartsPerPage);

    return (
      <div className="flex flex-col gap-4">
        {/* Top row - 2 wide charts (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pageData.slice(0, 2).map((chart) => (
            <div key={chart.id}>
              <NativeCharts title={chart.name} chart={chart} />
            </div>
          ))}
        </div>

        {/* Middle - 1 featured chart (spans full width) */}
        {pageData[2] && (
          <div>
            <NativeCharts title={pageData[2].name} chart={pageData[2]} />
          </div>
        )}

        {/* Bottom row - 3 smaller charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pageData.slice(3, 6).map((chart) => (
            <div key={chart.id}>
              <NativeCharts title={chart.name} chart={chart} />
            </div>
          ))}
        </div>

        {/* Pagination for dashboard */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-1 bg-white rounded-full shadow-sm p-1">
              <button
                onClick={() =>
                  setActiveDashboardPage((prev) => Math.max(0, prev - 1))
                }
                disabled={activeDashboardPage === 0}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-50"
                aria-label="Previous page"
              >
                <FaChevronLeft className="text-gray-500" size={12} />
              </button>

              {totalPages <= 5 ? (
                // Show all page numbers if 5 or fewer
                Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDashboardPage(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeDashboardPage === idx
                        ? "bg-gray-100 text-foreground font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label={`Page ${idx + 1}`}
                    aria-current={
                      activeDashboardPage === idx ? "page" : undefined
                    }
                  >
                    {idx + 1}
                  </button>
                ))
              ) : (
                // Show limited page numbers with ellipsis for more than 5 pages
                <>
                  {/* First page */}
                  <button
                    onClick={() => setActiveDashboardPage(0)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeDashboardPage === 0
                        ? "bg-gray-100 text-foreground font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="Page 1"
                    aria-current={
                      activeDashboardPage === 0 ? "page" : undefined
                    }
                  >
                    1
                  </button>

                  {/* Ellipsis or page numbers */}
                  {activeDashboardPage > 1 &&
                    (activeDashboardPage === 2 ? (
                      <button
                        onClick={() => setActiveDashboardPage(1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all text-gray-500 hover:bg-gray-50"
                        aria-label="Page 2"
                      >
                        2
                      </button>
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                        ...
                      </span>
                    ))}

                  {/* Current page (if not first or last) */}
                  {activeDashboardPage !== 0 &&
                    activeDashboardPage !== totalPages - 1 && (
                      <button
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-foreground font-medium"
                        aria-label={`Page ${activeDashboardPage + 1}`}
                        aria-current="page"
                      >
                        {activeDashboardPage + 1}
                      </button>
                    )}

                  {/* Ellipsis or page numbers */}
                  {activeDashboardPage < totalPages - 2 &&
                    (activeDashboardPage === totalPages - 3 ? (
                      <button
                        onClick={() => setActiveDashboardPage(totalPages - 2)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all text-gray-500 hover:bg-gray-50"
                        aria-label={`Page ${totalPages - 1}`}
                      >
                        {totalPages - 1}
                      </button>
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                        ...
                      </span>
                    ))}

                  {/* Last page */}
                  <button
                    onClick={() => setActiveDashboardPage(totalPages - 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeDashboardPage === totalPages - 1
                        ? "bg-gray-100 text-foreground font-medium"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label={`Page ${totalPages}`}
                    aria-current={
                      activeDashboardPage === totalPages - 1
                        ? "page"
                        : undefined
                    }
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setActiveDashboardPage((prev) =>
                    Math.min(totalPages - 1, prev + 1)
                  )
                }
                disabled={activeDashboardPage === totalPages - 1}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-50"
                aria-label="Next page"
              >
                <FaChevronRight className="text-gray-500" size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">
          {title}
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex space-x-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-gray-100 text-foreground"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            title="Switch to list view"
          >
            <BsListUl size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-gray-100 text-foreground"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            title="Switch to grid view"
          >
            <BsGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("dashboard")}
            className={`p-2 rounded-md transition-all cursor-pointer ${
              viewMode === "dashboard"
                ? "bg-gray-100 text-foreground"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            aria-label="Dashboard view"
            aria-pressed={viewMode === "dashboard"}
            title="Switch to dashboard view"
          >
            <BsGrid3X3GapFill size={20} />
          </button>
        </div>
      </div>

      <div className={getLayoutClasses()}>
        {viewMode === "dashboard"
          ? renderDashboardLayout()
          : data.map((chart) => (
              <div key={chart.id} className="transition-all duration-300 ">
                <NativeCharts title={chart.name} chart={chart} />
              </div>
            ))}
      </div>
    </>
  );
}

export default Showcase;
