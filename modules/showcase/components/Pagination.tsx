"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-1 rounded-lg bg-background/80 backdrop-blur-sm p-1 shadow-sm border border-border dark:border-zinc-700">
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} className="mr-1.5" />
            <span>Previous</span>
          </button>

          {totalPages <= 5 ? (
            // Show all page numbers if 5 or fewer
            Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx)}
                className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  currentPage === idx
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label={`Page ${idx + 1}`}
                aria-current={currentPage === idx ? "page" : undefined}
              >
                {idx + 1}
              </button>
            ))
          ) : (
            // Show limited page numbers with ellipsis for more than 5 pages
            <>
              {/* First page */}
              <button
                onClick={() => onPageChange(0)}
                className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  currentPage === 0
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label="Page 1"
                aria-current={currentPage === 0 ? "page" : undefined}
              >
                1
              </button>

              {/* Ellipsis or page numbers */}
              {currentPage > 1 &&
                (currentPage === 2 ? (
                  <button
                    onClick={() => onPageChange(1)}
                    className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Page 2"
                  >
                    2
                  </button>
                ) : (
                  <span className="flex items-center justify-center px-3 py-2 text-sm text-muted-foreground select-none">
                    •••
                  </span>
                ))}

              {/* Current page (if not first or last) */}
              {currentPage !== 0 && currentPage !== totalPages - 1 && (
                <button
                  className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  aria-label={`Page ${currentPage + 1}`}
                  aria-current="page"
                >
                  {currentPage + 1}
                </button>
              )}

              {/* Ellipsis or page numbers */}
              {currentPage < totalPages - 2 &&
                (currentPage === totalPages - 3 ? (
                  <button
                    onClick={() => onPageChange(totalPages - 2)}
                    className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label={`Page ${totalPages - 1}`}
                  >
                    {totalPages - 1}
                  </button>
                ) : (
                  <span className="flex items-center justify-center px-3 py-2 text-sm text-muted-foreground select-none">
                    •••
                  </span>
                ))}

              {/* Last page */}
              <button
                onClick={() => onPageChange(totalPages - 1)}
                className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  currentPage === totalPages - 1
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                aria-label={`Page ${totalPages}`}
                aria-current={
                  currentPage === totalPages - 1 ? "page" : undefined
                }
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              onPageChange(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 text-foreground hover:bg-muted hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight size={18} className="ml-1.5" />
          </button>
        </nav>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
