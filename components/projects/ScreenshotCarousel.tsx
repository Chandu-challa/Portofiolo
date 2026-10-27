'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react';
import type { ProjectImage } from '@/lib/projectData';

interface ScreenshotCarouselProps {
  images: ProjectImage[];
  title: string;
  className?: string;
  currentIndex?: number;
  onCurrentIndexChange?: (index: number) => void;
}

export default function ScreenshotCarousel({
  images,
  title,
  className = '',
  currentIndex,
  onCurrentIndexChange,
}: ScreenshotCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const current = Math.min(currentIndex ?? internalIndex, Math.max(images.length - 1, 0));

  useEffect(() => {
    setInternalIndex(0);
    onCurrentIndexChange?.(0);
  }, [images, onCurrentIndexChange]);

  const goTo = useCallback(
    (index: number) => {
      if (images.length < 2) return;
      const nextIndex = (index + images.length) % images.length;
      if (currentIndex === undefined) setInternalIndex(nextIndex);
      onCurrentIndexChange?.(nextIndex);
    },
    [currentIndex, images.length, onCurrentIndexChange],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  if (images.length === 0) {
    return (
      <div className={`relative flex items-center justify-center bg-portfolio-deep ${className}`}>
        <div className="max-w-xs px-6 text-center">
          <Monitor className="mx-auto mb-3 h-8 w-8 text-portfolio-accent/60" aria-hidden="true" />
          <p className="text-sm font-medium text-portfolio-text">No project screenshots available</p>
          <p className="mt-1 text-xs text-portfolio-muted">Project details need confirmation.</p>
        </div>
      </div>
    );
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined || Math.abs(end - start) < 40) return;
    if (end < start) next();
    else previous();
  };

  return (
    <div
      className={`group relative overflow-hidden bg-portfolio-deep touch-pan-y ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label={`${title} screenshots`}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={images[current].src}
          initial={reduceMotion ? false : { opacity: 0.72 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0.72 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            priority={current === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:bg-black/85 focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            aria-label={`Previous ${title} screenshot`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:bg-black/85 focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            aria-label={`Next ${title} screenshot`}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {images.length <= 5 && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/55 px-2 py-1" role="group" aria-label="Choose screenshot">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show screenshot ${index + 1} of ${images.length}`}
                  aria-pressed={current === index}
                  className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                    current === index ? 'w-4 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>
          )}

          <span className="absolute right-2 top-2 z-10 rounded-full bg-black/65 px-2 py-1 text-xs text-white" aria-live="polite">
            {current + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
