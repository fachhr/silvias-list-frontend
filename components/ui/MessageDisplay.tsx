// app/components/MessageDisplay.tsx
"use client"; // This component is likely to be used in client pages

import React from 'react';
import Button from './Button';

interface MessageDisplayProps {
  message: string | null;
  type: 'success' | 'error' | 'info' | 'warning'; // Added 'warning' as a common type
  onDismiss?: () => void; // Optional dismiss handler
}

export function MessageDisplay({ message, type, onDismiss }: MessageDisplayProps) {
  if (!message) return null;

  let bgColor = 'bg-[var(--info-bg)]';
  let textColor = 'text-[var(--info-color)]';
  let borderColor = 'border-[var(--info-color)]';
  let iconPath = ( // SVG paths for icons
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> // Info icon
  );

  switch (type) {
    case 'success':
      bgColor = 'bg-[var(--success-bg)]';
      textColor = 'text-[var(--success-color)]';
      borderColor = 'border-[var(--success-color)]';
      iconPath = (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> // Success icon
      );
      break;
    case 'error':
      bgColor = 'bg-[var(--error-bg)]';
      textColor = 'text-[var(--error-color)]';
      borderColor = 'border-[var(--error-color)]';
      iconPath = (
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> // Error icon (X)
      );
      break;
    case 'warning':
      bgColor = 'bg-[var(--warning-bg)]';
      textColor = 'text-[var(--warning-color)]';
      borderColor = 'border-[var(--warning-color)]';
      iconPath = (
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> // Warning icon
      );
      break;
    // 'info' uses default styles
  }

  return (
    <div className={`my-4 p-4 rounded-md border ${bgColor} ${borderColor} ${textColor} flex items-start text-sm shadow-md`}>
      <div className="flex-shrink-0 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          {iconPath}
        </svg>
      </div>
      <div className="flex-grow">
        {message}
      </div>
      {onDismiss && (
        <div className="ml-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className={`-mx-1.5 -my-1.5 p-1.5 ${textColor} hover:opacity-75`}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}