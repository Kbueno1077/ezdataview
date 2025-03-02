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
      <div className="flex justify-center mt-6">
        <div className="flex items-center space-x-1 bg-white rounded-full shadow-sm p-1">
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="text-gray-500" size={12} />
          </button>

          {totalPages <= 5 ? (
            // Show all page numbers if 5 or fewer
            Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentPage === idx
                    ? "bg-gray-100 text-foreground font-medium"
                    : "text-gray-500 hover:bg-gray-50"
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentPage === 0
                    ? "bg-gray-100 text-foreground font-medium"
                    : "text-gray-500 hover:bg-gray-50"
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
              {currentPage !== 0 && currentPage !== totalPages - 1 && (
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-foreground font-medium"
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
                onClick={() => onPageChange(totalPages - 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentPage === totalPages - 1
                    ? "bg-gray-100 text-foreground font-medium"
                    : "text-gray-500 hover:bg-gray-50"
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
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRight className="text-gray-500" size={12} />
          </button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
