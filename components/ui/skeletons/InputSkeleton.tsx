import React from 'react';

interface InputSkeletonProps {
  /** Width of the skeleton (default: 'full') */
  width?: 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4';
  /** Height variant (default: 'md') */
  height?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show a label skeleton above input (default: true) */
  showLabel?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Animated skeleton placeholder for input fields
 */
export const InputSkeleton: React.FC<InputSkeletonProps> = ({
  width = 'full',
  height = 'md',
  showLabel = true,
  className = ''
}) => {
  const widthClasses = {
    'full': 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4'
  };

  const heightClasses = {
    'sm': 'h-8',
    'md': 'h-10',
    'lg': 'h-12',
    'xl': 'h-24'
  };

  return (
    <div className={`${className}`}>
      {showLabel && (
        <div className="h-5 w-24 bg-[var(--light-800)] rounded animate-pulse mb-2" />
      )}
      <div
        className={`${widthClasses[width]} ${heightClasses[height]} bg-[var(--light-800)] rounded-md animate-pulse`}
      />
    </div>
  );
};

interface TextAreaSkeletonProps {
  /** Show a label skeleton above textarea (default: true) */
  showLabel?: boolean;
  /** Number of rows to simulate (default: 4) */
  rows?: number;
  /** Custom class name */
  className?: string;
}

/**
 * Animated skeleton placeholder for textarea fields
 */
export const TextAreaSkeleton: React.FC<TextAreaSkeletonProps> = ({
  showLabel = true,
  rows = 4,
  className = ''
}) => {
  return (
    <div className={className}>
      {showLabel && (
        <div className="h-5 w-32 bg-[var(--light-800)] rounded animate-pulse mb-2" />
      )}
      <div
        className={`w-full bg-[var(--light-800)] rounded-md animate-pulse`}
        style={{ height: `${rows * 1.5}rem` }}
      />
    </div>
  );
};
