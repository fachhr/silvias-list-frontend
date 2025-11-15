import React from 'react';

interface CardSkeletonProps {
  /** Number of cards to display (default: 2) */
  count?: number;
  /** Show action buttons at top of card (default: true) */
  showActions?: boolean;
  /** Number of input rows in each card (default: 4) */
  inputRows?: number;
  /** Custom class name */
  className?: string;
}

/**
 * Animated skeleton placeholder for card-based form entries
 * (e.g., education items, experience items, projects)
 */
export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  count = 2,
  showActions = true,
  inputRows = 4,
  className = ''
}) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[var(--light)] p-6 rounded-xl shadow-sm mb-6"
        >
          {/* Card header with optional actions */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-48 bg-[var(--light-800)] rounded animate-pulse" />
            {showActions && (
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-[var(--light-800)] rounded animate-pulse" />
                <div className="h-8 w-20 bg-[var(--light-800)] rounded animate-pulse" />
              </div>
            )}
          </div>

          {/* Card content - simulated input fields */}
          <div className="space-y-4">
            {Array.from({ length: inputRows }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="h-5 w-24 bg-[var(--light-800)] rounded animate-pulse mb-2" />
                  <div className="h-10 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
                </div>
                <div>
                  <div className="h-5 w-24 bg-[var(--light-800)] rounded animate-pulse mb-2" />
                  <div className="h-10 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface SimpleCardSkeletonProps {
  /** Number of simple cards to display (default: 1) */
  count?: number;
  /** Custom class name */
  className?: string;
}

/**
 * Simple card skeleton for smaller forms
 */
export const SimpleCardSkeleton: React.FC<SimpleCardSkeletonProps> = ({
  count = 1,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[var(--light)] p-6 rounded-xl shadow-sm"
        >
          <div className="space-y-4">
            <div className="h-5 w-32 bg-[var(--light-800)] rounded animate-pulse mb-2" />
            <div className="h-10 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
            <div className="h-10 w-full bg-[var(--light-800)] rounded-md animate-pulse" />
            <div className="h-10 w-2/3 bg-[var(--light-800)] rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};
