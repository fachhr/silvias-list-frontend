import React, { useEffect, useRef } from 'react';
import { FieldErrors } from 'react-hook-form';

// Error icon component - circle X (matches original design)
const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
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
    <div ref={summaryRef} className="error-summary" role="alert" aria-live="polite">
      <h3>
        <ErrorIcon className="w-5 h-5" />
        Please correct the highlighted errors above.
      </h3>
    </div>
  );
}