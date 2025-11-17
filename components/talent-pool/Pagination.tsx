'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6">
      {/* Results Count */}
      <div className="text-center mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Showing {startResult}-{endResult} of {totalResults} candidates
      </div>

      {/* Page Numbers */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: currentPage === 1 ? 'var(--surface-2)' : 'var(--surface-1)',
            color: 'var(--text-primary)',
            borderColor: 'var(--light-400)',
            borderWidth: '1px'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = 'var(--surface-2)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = 'var(--surface-1)';
              e.currentTarget.style.borderColor = 'var(--light-400)';
            }
          }}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm"
                style={{ color: 'var(--text-tertiary)' }}
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className="px-4 py-2 rounded-md font-medium text-sm transition-all"
              style={{
                backgroundColor: isActive ? 'var(--accent-gold)' : 'var(--surface-1)',
                color: isActive ? 'var(--button-text-on-gold)' : 'var(--text-primary)',
                borderColor: isActive ? 'var(--accent-gold)' : 'var(--light-400)',
                borderWidth: '1px',
                boxShadow: isActive ? 'var(--glow-gold-subtle)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--surface-2)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--surface-1)';
                  e.currentTarget.style.borderColor = 'var(--light-400)';
                }
              }}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: currentPage === totalPages ? 'var(--surface-2)' : 'var(--surface-1)',
            color: 'var(--text-primary)',
            borderColor: 'var(--light-400)',
            borderWidth: '1px'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = 'var(--surface-2)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = 'var(--surface-1)';
              e.currentTarget.style.borderColor = 'var(--light-400)';
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
