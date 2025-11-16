'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
  disabled?: boolean;
}

export function DualRangeSlider({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChange,
  disabled = false
}: DualRangeSliderProps) {
  const [minVal, setMinVal] = useState(valueMin);
  const [maxVal, setMaxVal] = useState(valueMax);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Update parent component state
  const handleMouseUp = () => {
    onChange(minVal, maxVal);
  };

  return (
    <div className="relative flex items-center pt-3">
      {/* Min Value Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        disabled={disabled}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - step);
          setMinVal(value);
        }}
        onMouseUp={handleMouseUp}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
      />
      {/* Max Value Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        disabled={disabled}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + step);
          setMaxVal(value);
        }}
        onMouseUp={handleMouseUp}
        className="thumb thumb--right"
      />

      {/* Slider Track */}
      <div className="relative w-full h-2">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>

      <style jsx>{`
        .thumb {
          pointer-events: none;
          position: absolute;
          height: 0;
          width: 100%;
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: none; /* Make slider track transparent */
          z-index: 3;
        }

        .thumb--left {
          z-index: 3;
        }

        .thumb--right {
          z-index: 4;
        }

        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .thumb::-moz-range-thumb {
          pointer-events: all;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #3b82f6;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .thumb:hover::-webkit-slider-thumb {
          transform: scale(1.1);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        .thumb:hover::-moz-range-thumb {
          transform: scale(1.1);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        .slider__track {
          position: absolute;
          height: 8px;
          width: 100%;
          background-color: #e5e7eb;
          border-radius: 9999px;
          z-index: 1;
        }

        .slider__range {
          position: absolute;
          height: 8px;
          background-color: #3b82f6;
          border-radius: 9999px;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}