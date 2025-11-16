'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

export function DualRangeSlider({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChange,
  prefix = '',
  suffix = '',
  formatValue,
  disabled = false
}: DualRangeSliderProps) {
  const [minValue, setMinValue] = useState(valueMin);
  const [maxValue, setMaxValue] = useState(valueMax);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const rangeRef = useRef<HTMLDivElement>(null);

  // Update local state when props change
  useEffect(() => {
    setMinValue(valueMin);
    setMaxValue(valueMax);
  }, [valueMin, valueMax]);

  const formatDisplayValue = useCallback((value: number): string => {
    if (formatValue) return formatValue(value);
    return `${prefix}${value.toFixed(1)}${suffix}`;
  }, [prefix, suffix, formatValue]);

  const getPercentage = useCallback((value: number): number => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !rangeRef.current || disabled) return;

    const rect = rangeRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    let newValue = min + (percentage / 100) * (max - min);

    // Snap to step
    newValue = Math.round(newValue / step) * step;
    newValue = Math.max(min, Math.min(max, newValue));

    if (isDragging === 'min') {
      if (newValue <= maxValue) {
        setMinValue(newValue);
        onChange(newValue, maxValue);
      }
    } else {
      if (newValue >= minValue) {
        setMaxValue(newValue);
        onChange(minValue, newValue);
      }
    }
  }, [isDragging, min, max, step, minValue, maxValue, onChange, disabled]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  // Generate grid marks
  const gridMarks = [];
  const numMarks = 6; // 0, 3, 6, 9, 12, 15
  for (let i = 0; i < numMarks; i++) {
    const value = min + (i / (numMarks - 1)) * (max - min);
    gridMarks.push(value);
  }

  return (
    <div className="dual-range-slider-container">
      {/* Track container */}
      <div
        ref={rangeRef}
        className="dual-range-track"
      >
        {/* Background track */}
        <div className="dual-range-track-bg" />

        {/* Active range */}
        <div
          className="dual-range-track-active"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`
          }}
        />

        {/* Min handle */}
        <div
          className={`dual-range-handle ${isDragging === 'min' ? 'dragging' : ''}`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleMouseDown('min')}
        >
          <div className="dual-range-tooltip">
            {formatDisplayValue(minValue)}
          </div>
        </div>

        {/* Max handle */}
        <div
          className={`dual-range-handle ${isDragging === 'max' ? 'dragging' : ''}`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleMouseDown('max')}
        >
          <div className="dual-range-tooltip">
            {formatDisplayValue(maxValue)}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="dual-range-grid">
        {gridMarks.map((value, index) => (
          <div
            key={index}
            className="dual-range-grid-mark"
            style={{ left: `${getPercentage(value)}%` }}
          >
            <div className="dual-range-grid-line" />
            <div className="dual-range-grid-label">
              {formatDisplayValue(value)}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .dual-range-slider-container {
          position: relative;
          padding-top: 40px;
          padding-bottom: 30px;
          user-select: none;
        }

        .dual-range-track {
          position: relative;
          height: 8px;
          width: 100%;
        }

        .dual-range-track-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background-color: var(--light-600);
          border: 1px solid var(--light-400);
          border-radius: 4px;
        }

        .dual-range-track-active {
          position: absolute;
          top: 0;
          height: 100%;
          background-color: var(--primary);
          border-radius: 4px;
          transition: left 0.1s ease, width 0.1s ease;
        }

        .dual-range-handle {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background-color: var(--primary);
          border: 3px solid var(--light);
          border-radius: 50%;
          cursor: ${disabled ? 'not-allowed' : 'grab'};
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          z-index: 2;
        }

        .dual-range-handle:hover:not(.dragging) {
          background-color: var(--primary-dark);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .dual-range-handle.dragging {
          cursor: grabbing;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 3;
        }

        .dual-range-tooltip {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--dark-800);
          color: var(--light);
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          pointer-events: none;
        }

        .dual-range-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--dark-800);
        }

        .dual-range-grid {
          position: relative;
          margin-top: 15px;
          height: 20px;
        }

        .dual-range-grid-mark {
          position: absolute;
          transform: translateX(-50%);
        }

        .dual-range-grid-line {
          width: 1px;
          height: 8px;
          background-color: var(--light-400);
          margin: 0 auto;
        }

        .dual-range-grid-label {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--dark-400);
          font-size: 0.75rem;
          white-space: nowrap;
        }

        /* Dark mode support */
        :global(.dark) .dual-range-track-bg {
          background-color: var(--light-600);
          border-color: var(--light-400);
        }

        :global(.dark) .dual-range-grid-line {
          background-color: var(--light-400);
        }

        :global(.dark) .dual-range-grid-label {
          color: var(--dark-600);
        }
      `}</style>
    </div>
  );
}
