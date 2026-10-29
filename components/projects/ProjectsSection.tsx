'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import { projects, type Project, type ProjectCategory } from '@/lib/projectData';

interface ProjectsSectionProps {
  onViewCaseStudy: (project: Project) => void;
}

const enterpriseProjects = projects;
const categoryLabels: Record<ProjectCategory, string> = {
  workflow: 'Workflow',
  quality: 'Quality',
  operations: 'Operations',
};
const filters: Array<{ label: string; value: ProjectCategory | 'all' }> = [
  { label: 'All projects', value: 'all' },
  ...(['workflow', 'quality', 'operations'] as const).map((category) => ({
    label: categoryLabels[category],
    value: category,
  })),
];

export default function ProjectsSection({ onViewCaseStudy }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const filteredProjects = activeFilter === 'all'
    ? enterpriseProjects
    : enterpriseProjects.filter((project) => project.filterCategory === activeFilter);

  return (
    <section
      id="projects"
      className="bg-portfolio-deep/50 py-16 sm:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">Selected work</p>
          <h2 id="projects-heading" className="mb-4 text-3xl font-bold text-portfolio-text sm:text-4xl">
            Featured projects
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-portfolio-muted">
            Public demos and source code sit alongside carefully limited case studies from private professional work.
          </p>
        </motion.div>

        <FeaturedProjects />

        <div className="mt-20">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">Professional work</p>
            <h3 id="enterprise-projects-heading" className="mb-4 text-3xl font-bold text-portfolio-text sm:text-4xl">
              Enterprise applications
            </h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-portfolio-muted">
              Six internal systems across workflow, quality, and operations. These case studies omit private records and keep project-specific claims to the available evidence.
            </p>
          </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter enterprise projects by category">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              aria-pressed={activeFilter === value}
              onClick={() => setActiveFilter(value)}
              className={`min-h-11 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-accent ${
                activeFilter === value
                  ? 'bg-portfolio-accent text-[#0B1220]'
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
      </div>
    </section>
  );
}
