'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects, type Project, type ProjectCategory } from '@/lib/projectData';

interface ProjectsSectionProps {
  onViewCaseStudy: (project: Project) => void;
}

const featuredProjects = projects.filter((project) => project.images.length > 0);
const categoryLabels: Record<ProjectCategory, string> = {
  workflow: 'Workflow',
  quality: 'Quality',
  operations: 'Operations',
};
const filters: Array<{ label: string; value: ProjectCategory | 'all' }> = [
  { label: 'All projects', value: 'all' },
  ...(['workflow', 'quality', 'operations'] as const)
    .filter((category) => featuredProjects.some((project) => project.filterCategory === category))
    .map((category) => ({ label: categoryLabels[category], value: category })),
];

export default function ProjectsSection({ onViewCaseStudy }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const filteredProjects = activeFilter === 'all'
    ? featuredProjects
    : featuredProjects.filter((project) => project.filterCategory === activeFilter);

  return (
    <section
      id="projects"
      className="bg-portfolio-deep/50 py-16 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-8 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">Selected work</p>
          <h2 id="projects-heading" className="mb-4 text-3xl font-bold text-portfolio-text sm:text-4xl">
            Enterprise applications
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-portfolio-muted sm:text-base">
            {featuredProjects.length} selected case studies from private company systems. Previews show the interfaces while keeping employee and operational details obscured.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              aria-pressed={activeFilter === value}
              onClick={() => setActiveFilter(value)}
              className={`min-h-11 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] ${
                activeFilter === value
                  ? 'bg-portfolio-accent text-white'
                  : 'border border-portfolio-border bg-portfolio-card text-portfolio-muted hover:border-portfolio-accent/40 hover:text-portfolio-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewCaseStudy={onViewCaseStudy}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="py-12 text-center text-portfolio-muted">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
