'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Layers, Lock, User, X } from 'lucide-react';
import ScreenshotCarousel from './ScreenshotCarousel';
import { Project } from '@/lib/projectData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!project) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setActiveImage(0);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.2 }}
            className="my-auto flex max-h-[calc(100vh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-panel shadow-2xl sm:max-h-[calc(100vh-3rem)]"
          >
            <div className="relative shrink-0 bg-portfolio-deep">
              {project.images.length > 0 ? (
                <div className="relative h-52 sm:h-[26rem]">
                  <ScreenshotCarousel
                    images={project.images}
                    title={project.title}
                    currentIndex={activeImage}
                    onCurrentIndexChange={setActiveImage}
                    className="h-full"
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111722] to-transparent" />
                </div>
              ) : (
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#0D1520] to-[#151D2A] sm:h-52">
                  <div className="max-w-sm px-6 text-center">
                    <Layers className="mx-auto mb-3 h-8 w-8 text-portfolio-accent" aria-hidden="true" />
                    <p className="font-semibold text-portfolio-text">No verified screenshots available</p>
                    <p className="mt-1 text-sm text-portfolio-muted">This project’s details need confirmation.</p>
                  </div>
                </div>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#5B8CFF]"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-8">
              <div className="mb-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-portfolio-accent/30 bg-portfolio-accent/15 px-3 py-1 text-xs font-medium text-portfolio-accent-bright">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-portfolio-border bg-portfolio-card px-3 py-1 text-xs font-medium text-portfolio-muted">
                    <Lock className="h-3 w-3" aria-hidden="true" /> Private project
                  </span>
                </div>
                <h2 id="case-study-title" className="text-xl font-bold text-portfolio-text sm:text-2xl">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-portfolio-muted sm:text-base">{project.objective}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <section>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-portfolio-text">
                    <Layers className="h-4 w-4 text-portfolio-accent" aria-hidden="true" />
                    Confirmed application screens
                  </h3>
                  <p className="text-sm leading-relaxed text-portfolio-muted">{project.confirmedScreens}</p>
                </section>
                <section>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-portfolio-text">
                    <User className="h-4 w-4 text-portfolio-accent" aria-hidden="true" />
                    My role
                  </h3>
                  <p className="text-sm leading-relaxed text-portfolio-muted">{project.myRole}</p>
                </section>
              </div>

              {project.features.length > 0 && (
                <section className="mt-6">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-portfolio-text">
                    <CheckCircle className="h-4 w-4 text-portfolio-accent" aria-hidden="true" />
                    Visible workflows
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-portfolio-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-portfolio-accent" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.images.length > 1 && (
                <section className="mt-6" aria-label={`${project.title} screenshot gallery`}>
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-semibold text-portfolio-text">Interface previews</h3>
                    <p className="text-xs text-portfolio-muted">{project.images.length} screen views</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {project.images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Show ${image.originalName.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ')} screenshot`}
                        aria-pressed={activeImage === index}
                        className={`relative aspect-video overflow-hidden rounded-lg border bg-portfolio-deep transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] ${
                          activeImage === index ? 'border-portfolio-accent' : 'border-portfolio-border hover:border-portfolio-accent/50'
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          loading="lazy"
                          className="object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-6 rounded-xl border border-portfolio-border bg-portfolio-deep p-4">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                  <div className="space-y-2 text-xs leading-relaxed text-portfolio-muted">
                    <p>
                      This is a private enterprise application. The live system and source code are not public.
                    </p>
                    <p>Screen details are softly blurred to protect employee and operational information.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
