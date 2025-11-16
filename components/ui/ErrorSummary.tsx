import React, { useEffect, useRef } from 'react';
import { FieldErrors } from 'react-hook-form';

// Alert icon component - exclamation triangle
const AlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

interface ErrorSummaryProps {
  errors: FieldErrors<any>;
}

export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to error summary when it appears
    if (Object.keys(errors).length > 0 && summaryRef.current) {
      summaryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [errors]);

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div
      ref={summaryRef}
      className="
        relative
        bg-red-50 border-l-4 border-l-red-600 border border-red-200 rounded-lg p-4
        transition-all duration-300 ease-in-out
        animate-in fade-in slide-in-from-top-2
        shadow-sm
      "
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center space-x-3">
        <AlertIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
        <p className="text-sm font-medium text-red-600">
          Please correct the highlighted errors above.
        </p>
      </div>
    </div>
  );
}