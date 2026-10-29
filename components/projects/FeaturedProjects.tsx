import {
  ArrowUpRight,
  FileSearch,
  Github,
  Network,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface FeaturedProject {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
  note?: string;
  links: Array<{ label: string; href: string; primary?: boolean }>;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'CareerGraph',
    category: 'Career intelligence',
    description:
      'A career exploration app that connects skills, roles, technologies, and prerequisites to support skill-gap analysis and learning-path discovery.',
    technologies: ['Next.js', 'TypeScript', 'Graph data', 'Cypher'],
    icon: Network,
    links: [
      { label: 'Live demo', href: 'https://careergraph-delta.vercel.app/', primary: true },
      { label: 'Source code', href: 'https://github.com/Chandu-challa/careergraph' },
    ],
  },
  {
    title: 'HRMS Lite',
    category: 'Employee operations',
    description:
      'A React application for employee records and daily attendance, connected to a Django REST API.',
    technologies: ['React', 'Axios', 'Django REST Framework'],
    icon: Users,
    note: 'The hosted API may need time to wake up on a first visit.',
    links: [
      { label: 'Open frontend demo', href: 'https://hrlightfrontend.netlify.app/', primary: true },
      { label: 'Frontend code', href: 'https://github.com/Chandu-challa/HRFrontend' },
      { label: 'Backend code', href: 'https://github.com/Chandu-challa/HrBackend' },
    ],
  },
  {
    title: 'Fake Job Detection',
    category: 'Machine learning',
    description:
      'An NLP-based machine-learning project exploring ways to identify potentially fraudulent job postings. No performance figures are published here.',
    technologies: ['Python', 'NLP', 'Machine learning'],
    icon: FileSearch,
    links: [
      {
        label: 'Source code',
        href: 'https://github.com/Chandu-challa/Detection-of-Fake-Job-Postings',
        primary: true,
      },
    ],
  },
];

export default function FeaturedProjects() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {featuredProjects.map(({ title, category, description, technologies, icon: Icon, note, links }) => (
        <article
          key={title}
          className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-card transition-all duration-200 hover:-translate-y-1 hover:border-portfolio-accent/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
        >
          <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-portfolio-border bg-gradient-to-br from-portfolio-panel to-portfolio-bg">
            <div className="absolute inset-0 opacity-35" aria-hidden="true">
              <div className="absolute left-[20%] top-1/2 h-px w-[60%] bg-portfolio-accent/40" />
              <div className="absolute left-1/2 top-[20%] h-[60%] w-px bg-portfolio-accent/40" />
              <span className="absolute left-[20%] top-[20%] h-2 w-2 rounded-full bg-portfolio-accent/70" />
              <span className="absolute right-[20%] top-[20%] h-2 w-2 rounded-full bg-portfolio-accent/70" />
              <span className="absolute bottom-[20%] left-[20%] h-2 w-2 rounded-full bg-portfolio-accent/70" />
              <span className="absolute bottom-[20%] right-[20%] h-2 w-2 rounded-full bg-portfolio-accent/70" />
            </div>
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-portfolio-accent/25 bg-portfolio-bg/90 text-portfolio-accent shadow-lg shadow-black/20">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="absolute left-4 top-4 rounded-full border border-portfolio-border bg-portfolio-bg/90 px-3 py-1 text-xs font-medium text-portfolio-muted">
              {category}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-bold leading-snug text-portfolio-text">{title}</h3>
            <p className="mt-3 text-base leading-relaxed text-portfolio-muted">{description}</p>
            {note && <p className="mt-3 text-sm leading-relaxed text-portfolio-muted">{note}</p>}

            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
              {technologies.map((technology) => (
                <li key={technology} className="rounded-lg border border-portfolio-border bg-portfolio-panel px-2.5 py-1 text-xs font-medium text-portfolio-muted">
                  {technology}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {links.map(({ label, href, primary }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-accent ${
                    primary
                      ? 'bg-portfolio-accent text-[#0B1220] hover:bg-portfolio-accent-light'
                      : 'border border-portfolio-border text-portfolio-muted hover:border-portfolio-accent/40 hover:text-portfolio-text'
                  }`}
                >
                  {label}
                  {label.includes('code') ? <Github className="h-4 w-4" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
