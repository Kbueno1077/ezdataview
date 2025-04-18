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
        <div className="flex items-center  bg-gray-100 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="h-full px-3 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          {totalPages <= 5 ? (
            // Show all page numbers if 5 or fewer
            Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx)}
                className={`p-3 min-w-[40px] transition-all duration-300 ${
                  currentPage === idx
                    ? "bg-purple-500 text-white font-medium shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50`}
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
                className={`p-3 min-w-[40px] transition-all duration-300 ${
                  currentPage === 0
                    ? "bg-purple-500 text-white font-medium shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50`}
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
                    className="p-3 min-w-[40px] transition-all duration-300 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
                    aria-label="Page 2"
                  >
                    2
                  </button>
                ) : (
                  <span className="p-3 text-gray-400 select-none">•••</span>
                ))}

              {/* Current page (if not first or last) */}
              {currentPage !== 0 && currentPage !== totalPages - 1 && (
                <button
                  className="p-3 min-w-[40px] transition-all duration-300 bg-purple-500 text-white font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
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
                    className="p-3 min-w-[40px] transition-all duration-300 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
                    aria-label={`Page ${totalPages - 1}`}
                  >
                    {totalPages - 1}
                  </button>
                ) : (
                  <span className="p-3 text-gray-400 select-none">•••</span>
                ))}

              {/* Last page */}
              <button
                onClick={() => onPageChange(totalPages - 1)}
                className={`p-3 min-w-[40px] transition-all duration-300 ${
                  currentPage === totalPages - 1
                    ? "bg-purple-500 text-white font-medium shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50`}
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
            className="h-full px-3 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

export default Pagination;
