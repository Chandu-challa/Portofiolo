'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ScreenshotCarousel from './ScreenshotCarousel';
import type { Project } from '@/lib/projectData';

interface ProjectCardProps {
  project: Project;
  onViewCaseStudy: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onViewCaseStudy, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.32, delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-card transition-all duration-300 hover:border-portfolio-accent/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
    >
      {/* Screenshot carousel */}
      <div className="relative h-48 overflow-hidden bg-portfolio-deep">
        <ScreenshotCarousel
          images={project.images}
          title={project.title}
          className="h-full"
        />

        {/* Category badge */}
        <div className="absolute left-3 top-3 z-10 max-w-[90%]">
          <span className="inline-block truncate rounded-full border border-white/15 bg-[#0B1220]/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        {project.images.length > 0 && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-[#0B1220]/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {project.images.length} screen views
          </span>
        )}

      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-portfolio-text mb-2 group-hover:text-portfolio-accent transition-colors leading-snug">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-base leading-relaxed text-portfolio-muted">
          {project.description}
        </p>

        {/* Confirmed workflows */}
        {project.features.length > 0 ? (
          <ul className="mb-4 space-y-1.5" aria-label="Visible project workflows">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-base leading-relaxed text-portfolio-muted">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-portfolio-accent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-sm leading-relaxed text-portfolio-muted">Public workflow details are limited for this project.</p>
        )}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onViewCaseStudy(project)}
            aria-label={`View ${project.title} case study`}
            className="min-h-11 flex-1 flex items-center justify-center gap-2 rounded-xl border border-portfolio-accent/30 bg-portfolio-accent/10 px-4 py-2.5 text-sm font-medium text-portfolio-accent-bright transition-all hover:border-portfolio-accent/50 hover:bg-portfolio-accent/15 focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-1 focus:ring-offset-portfolio-card"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            View case study
          </button>
        </div>
      </div>
    </motion.article>
  );
}
