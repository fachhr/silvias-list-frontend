// app/components/icons/XIcon.tsx
import React from 'react';

// No separate IconProps interface needed if it's empty

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="1em"
    height="1em"
    fill="currentColor" 
    aria-hidden="true" 
    focusable="false"
    {...props} 
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);