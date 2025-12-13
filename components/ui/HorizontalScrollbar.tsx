'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

interface HorizontalScrollbarProps {
  children: ReactNode;
  className?: string;
}

/**
 * A container with an ALWAYS-VISIBLE custom horizontal scrollbar.
 * Solves macOS overlay scrollbar invisibility issue.
 */
export function HorizontalScrollbar({ children, className = '' }: HorizontalScrollbarProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbStyle, setThumbStyle] = useState({ width: '20%', left: '0%' });
  const [isDragging, setIsDragging] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(true); // Default true to always show

  const dragState = useRef({ startX: 0, startScrollLeft: 0 });

  // Update thumb position and size
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateThumb = () => {
      const { scrollWidth, clientWidth, scrollLeft } = content;

      // Check if content overflows
      const overflows = scrollWidth > clientWidth + 1; // +1 for rounding errors
      setHasOverflow(overflows);

      if (!overflows) {
        setThumbStyle({ width: '100%', left: '0%' });
        return;
      }

      // Calculate thumb width as percentage of track
      const thumbWidthPercent = Math.max((clientWidth / scrollWidth) * 100, 10);

      // Calculate thumb position
      const maxScroll = scrollWidth - clientWidth;
      const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const maxLeftPercent = 100 - thumbWidthPercent;
      const leftPercent = scrollPercent * maxLeftPercent;

      setThumbStyle({
        width: `${thumbWidthPercent}%`,
        left: `${leftPercent}%`,
      });
    };

    // Initial update
    updateThumb();

    // Update on scroll
    content.addEventListener('scroll', updateThumb, { passive: true });

    // Update on resize
    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe(content);

    // Also observe the first child (table) for size changes
    if (content.firstElementChild) {
      resizeObserver.observe(content.firstElementChild);
    }

    // Delayed update to catch late renders
    const timer = setTimeout(updateThumb, 100);
    const timer2 = setTimeout(updateThumb, 500);

    return () => {
      content.removeEventListener('scroll', updateThumb);
      resizeObserver.disconnect();
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      startScrollLeft: contentRef.current?.scrollLeft || 0,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const content = contentRef.current;
      const track = trackRef.current;
      if (!content || !track) return;

      const trackRect = track.getBoundingClientRect();
      const deltaX = e.clientX - dragState.current.startX;
      const trackWidth = trackRect.width;
      const { scrollWidth, clientWidth } = content;
      const maxScroll = scrollWidth - clientWidth;

      // Convert pixel delta to scroll delta
      const thumbWidthPercent = (clientWidth / scrollWidth);
      const scrollableTrackWidth = trackWidth * (1 - thumbWidthPercent);
      const scrollDelta = scrollableTrackWidth > 0
        ? (deltaX / scrollableTrackWidth) * maxScroll
        : 0;

      content.scrollLeft = dragState.current.startScrollLeft + scrollDelta;
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore if clicking the thumb
    if ((e.target as HTMLElement).dataset.thumb) return;

    const content = contentRef.current;
    const track = trackRef.current;
    if (!content || !track) return;

    const trackRect = track.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const clickPercent = clickX / trackRect.width;

    const { scrollWidth, clientWidth } = content;
    const maxScroll = scrollWidth - clientWidth;
    const scrollTo = clickPercent * maxScroll;

    content.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable content - native scrollbar hidden */}
      <div
        ref={contentRef}
        className="overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Hide webkit scrollbar */}
        <style>{`
          .scrollbar-hidden::-webkit-scrollbar { display: none; }
        `}</style>
        <div className="scrollbar-hidden" style={{ display: 'contents' }}>
          {children}
        </div>
      </div>

      {/* ALWAYS VISIBLE Custom Scrollbar */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="h-3 mt-3 mx-1 rounded-full cursor-pointer"
        style={{
          background: 'var(--bg-surface-2)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        {/* Thumb */}
        <div
          data-thumb="true"
          onMouseDown={handleMouseDown}
          className="h-full rounded-full transition-colors duration-150"
          style={{
            width: thumbStyle.width,
            marginLeft: thumbStyle.left,
            background: isDragging
              ? 'var(--gold)'
              : hasOverflow
                ? 'var(--text-tertiary)'
                : 'var(--border-strong)',
            cursor: isDragging ? 'grabbing' : 'grab',
            minWidth: '40px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
}
