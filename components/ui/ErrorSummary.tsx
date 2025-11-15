import React, { useEffect, useRef } from 'react';
import { FieldErrors } from 'react-hook-form';

// Error icon component
const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
  </svg>
);

interface ErrorSummaryProps {
  errors: FieldErrors<any>;
  onErrorClick?: (fieldPath: string) => void;
}

export function ErrorSummary({ errors, onErrorClick }: ErrorSummaryProps) {
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

  // Convert FieldErrors to flat array of [fieldPath, message] entries
  const errorEntries = Object.entries(errors)
    .filter(([_, error]) => error && typeof error === 'object' && 'message' in error)
    .map(([key, error]: [string, any]) => [key, error.message as string]);
  
  const handleErrorClick = (fieldPath: string) => {
    if (onErrorClick) {
      onErrorClick(fieldPath);
    } else {
      // Default behavior: try to focus the field
      const fieldId = fieldPath.replace(/\./g, '-');
      const element = document.getElementById(fieldId) || 
                    document.querySelector(`[name="${fieldPath}"]`) ||
                    document.querySelector(`[data-field="${fieldPath}"]`);
      
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const formatFieldName = (fieldPath: string): string => {
    // Convert field paths like "professional_experience.0.positionName" to readable names
    const parts = fieldPath.split('.');
    const lastPart = parts[parts.length - 1];
    
    // Handle specific field mappings
    const fieldMappings: Record<string, string> = {
      positionName: 'Position Name',
      companyName: 'Company Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      city: 'City',
      country: 'Country',
      positionType: 'Position Type',
      challenge: 'Context/Challenge',
      actions: 'Actions Taken',
      results: 'Results Achieved',
      universityName: 'University Name',
      generalField: 'General Field',
      specificField: 'Specific Field',
      degreeType: 'Degree Type',
    };

    const readableName = fieldMappings[lastPart] || lastPart.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    
    // Add context for nested fields
    if (parts.includes('professional_experience')) {
      const index = parts[1];
      return `Experience ${parseInt(index) + 1}: ${readableName}`;
    }
    
    if (parts.includes('education_history')) {
      const index = parts[1];
      return `Education ${parseInt(index) + 1}: ${readableName}`;
    }
    
    if (parts.includes('contributions')) {
      const expIndex = parts[1];
      const contribIndex = parts[3];
      return `Experience ${parseInt(expIndex) + 1}, Contribution ${parseInt(contribIndex) + 1}: ${readableName}`;
    }
    
    return readableName;
  };

  return (
    <div ref={summaryRef} className="error-summary" role="alert" aria-live="polite">
      <h3>
        <ErrorIcon className="w-5 h-5" />
        Please correct the following errors:
      </h3>
      <ul>
        {errorEntries.map(([fieldPath, message]) => (
          <li key={fieldPath}>
            <button
              type="button"
              onClick={() => handleErrorClick(fieldPath)}
              className="text-left underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {formatFieldName(fieldPath)}: {message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}