'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { FocusTrap } from 'focus-trap-react';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Code2,
  Database,
  Server,
  GitBranch,
  Building2,
  Layers,
  TrendingUp,
  Calendar,
  ArrowUp,
  Menu,
  X as XIcon,
  CheckCircle,
  Phone,
  MessageCircle,
} from 'lucide-react';
import type { Project } from '@/lib/projectData';
import ProjectsSection from '@/components/projects/ProjectsSection';
import CertificatesSection from '@/components/certificates/CertificatesSection';
import CaseStudyModal from '@/components/projects/CaseStudyModal';
import ContactForm from '@/components/contact/ContactForm';

// ─── Static data ───────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];
const SECTION_IDS = NAV_ITEMS.map(({ href }) => href.slice(1));

const RESUME_URL = '/images/Fullstack_developer.pdf';
const EMAIL = 'chanduchanduchalla7@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/chandu-challa-b91172330/';
const GITHUB_URL = 'https://github.com/Chandu-challa';

const HIGHLIGHTS = [
  { label: 'Current Employer', value: 'GreenTech Industries', icon: Building2 },
  { label: 'Internal Applications', value: '6 enterprise systems', icon: Layers },
  { label: 'Core Technology Stack', value: 'React · Next.js · Python · SQL Server', icon: Code2 },
  { label: 'Career Progression', value: 'Intern → Full Stack Developer', icon: TrendingUp },
];

const APPROACH = [
  {
    step: '01',
    title: 'Understand the workflow',
    desc: 'Clarify the business need and map the steps people need to complete.',
  },
  {
    step: '02',
    title: 'Build the interface and integration',
    desc: 'Create responsive UI, connect APIs and database operations, and handle validation and permissions.',
  },
  {
    step: '03',
    title: 'Verify and maintain',
    desc: 'Test complete workflows, resolve issues, and support the application as requirements evolve.',
  },
];

const SKILLS = [
  {
    title: 'Frontend',
    icon: Code2,
    color: '#60A5FA',
    skills: [
      'React.js',
      'Next.js',
      'JavaScript (ES6+)',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#60A5FA',
    skills: [
      'Python',
      'Django',
      'FastAPI',
      'REST APIs',
      'JWT Authentication',
      'Role-Based Access Control',
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: '#60A5FA',
    skills: [
      'Microsoft SQL Server',
      'T-SQL',
      'Stored Procedures',
      'Joins & Views',
      'Query Optimisation',
      'Prisma ORM',
    ],
  },
  {
    title: 'Development Practices',
    icon: GitBranch,
    color: '#60A5FA',
    skills: [
      'API Integration',
      'Form Validation',
      'Authentication & Authorisation',
      'Error Handling',
      'Debugging',
      'Git & GitHub',
    ],
  },
];

const EXPERIENCE = [
  {
    title: 'Full Stack Developer',
    company: 'GreenTech Industries',
    type: 'Full-Time',
    dates: 'August 2025 – Present',
    isCurrent: true,
    responsibilities: [
      'Develop and maintain enterprise web applications for business workflows',
      'Build responsive React and Next.js interfaces and integrate REST APIs',
      'Work with Python, FastAPI, SQL Server queries, and stored procedures',
      'Implement validation, permissions, error handling, and application maintenance',
    ],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'GreenTech Industries',
    type: 'Internship',
    dates: 'January 2025 – July 2025',
    isCurrent: false,
    responsibilities: [
      'Translated business requirements into interface and workflow features',
      'Built reusable React components and integrated application APIs',
      'Worked with SQL Server queries, stored procedures, and data validation',
      'Debugged and maintained existing applications with the development team',
    ],
  },
];

// ─── Utility ───────────────────────────────────────────────────────────
function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
        }
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-portfolio-accent to-portfolio-violet"
      aria-hidden="true"
    />
  );
}

// ─── Main Component ────────────────────────────────────────────────────
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pendingMobileSectionRef = useRef<string | null>(null);
  const closeCaseStudy = useCallback(() => setSelectedProject(null), []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      setShowBackToTop(scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Keep the page still while the mobile navigation is open and support Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen || !pendingMobileSectionRef.current) return;
    const href = pendingMobileSectionRef.current;
    pendingMobileSectionRef.current = null;
    const frame = window.requestAnimationFrame(() => scrollToSection(href));
    return () => window.cancelAnimationFrame(frame);
  }, [mobileOpen]);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen overflow-x-hidden bg-portfolio-bg text-portfolio-text">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* ── NAVBAR ───────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-portfolio-bg/95 backdrop-blur-md border-b border-portfolio-border shadow-lg'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-portfolio-accent focus:text-[#0B1220] focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
        >
          Skip to content
        </a>

        <nav
          className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Brand */}
          <a
            href="#hero"
            className="inline-flex items-center gap-2 rounded text-base font-bold text-portfolio-text transition-colors hover:text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent sm:text-lg"
            aria-label="Chandu Challa, home"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-portfolio-accent text-sm font-extrabold text-[#0B1220]">CC.</span>
            <span>Chandu Challa</span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden xl:flex items-center gap-4 2xl:gap-6" role="list">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={`relative rounded pb-0.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-accent ${
                      isActive
                        ? 'text-portfolio-accent'
                        : 'text-portfolio-muted hover:text-portfolio-text'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-portfolio-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Resume button */}
          <a
            href={RESUME_URL}
            download="Chandu-Challa-Resume.pdf"
            className="hidden xl:flex items-center gap-2 rounded-xl bg-portfolio-accent px-4 py-2 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-portfolio-accent-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-2 focus:ring-offset-portfolio-bg"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Download Resume
          </a>

          {/* Mobile hamburger */}
          <button
            ref={mobileToggleRef}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-portfolio-muted transition-colors hover:bg-portfolio-card hover:text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 bg-black/55 xl:hidden"
              />
              <FocusTrap focusTrapOptions={{ escapeDeactivates: false, returnFocusOnDeactivate: true }}>
                <motion.div
                  id="mobile-nav"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-50 overflow-hidden border-t border-portfolio-border bg-portfolio-bg xl:hidden"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                <div className="flex items-center justify-between px-6 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-portfolio-muted">Navigation</p>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-portfolio-muted hover:bg-portfolio-card hover:text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                    aria-label="Close navigation menu"
                  >
                    <XIcon className="h-4 w-4" aria-hidden="true" />
                    Close
                  </button>
                </div>
                <ul className="space-y-1 px-6 py-4" role="list">
                  {NAV_ITEMS.map(({ label, href }) => {
                    const isActive = activeSection === href.replace('#', '');
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          onClick={(event) => {
                            event.preventDefault();
                            pendingMobileSectionRef.current = href;
                            window.history.pushState(null, '', href);
                            setMobileOpen(false);
                          }}
                          aria-current={isActive ? 'location' : undefined}
                          className={`flex min-h-11 w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-portfolio-accent ${
                            isActive
                              ? 'bg-portfolio-accent/10 text-portfolio-accent-bright'
                              : 'text-portfolio-muted hover:bg-portfolio-card hover:text-portfolio-text'
                          }`}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className="px-6 pb-5">
                  <a
                    href={RESUME_URL}
                    download="Chandu-Challa-Resume.pdf"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-portfolio-accent px-4 py-3 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-portfolio-accent-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download Resume
                  </a>
                </div>
                </motion.div>
              </FocusTrap>
            </>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex min-h-[82svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
        aria-labelledby="hero-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-[8%] top-20 h-[28rem] w-[28rem] rounded-full bg-portfolio-accent/[0.06] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-portfolio-accent/25 bg-portfolio-accent/[0.08] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-portfolio-accent-light sm:text-sm">
              FULL STACK DEVELOPER
            </p>
            <p className="mb-3 text-base font-medium text-portfolio-muted">Chandu Challa</p>
            <h1 id="hero-heading" className="max-w-3xl text-[2.55rem] font-bold leading-[1.08] tracking-tight text-portfolio-text sm:text-5xl xl:text-[3.5rem]">
              Full Stack Developer building scalable,{' '}
              <span className="text-portfolio-accent">business-focused web applications.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-portfolio-muted sm:text-lg sm:leading-8">
              At GreenTech Industries, I build responsive interfaces and reliable backend services using React, Next.js, Python, FastAPI, and SQL Server.
            </p>

            <p className="mt-5 text-sm font-medium tracking-wide text-portfolio-muted sm:text-base">
              React.js <span className="px-1.5 text-portfolio-accent" aria-hidden="true">·</span> Next.js <span className="px-1.5 text-portfolio-accent" aria-hidden="true">·</span> TypeScript <span className="px-1.5 text-portfolio-accent" aria-hidden="true">·</span> Python <span className="px-1.5 text-portfolio-accent" aria-hidden="true">·</span> SQL Server
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-portfolio-accent px-5 py-3 text-sm font-semibold text-[#0B1220] transition-colors hover:bg-portfolio-accent-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-2 focus:ring-offset-portfolio-bg">
                View My Projects
              </a>
              <a href={RESUME_URL} download="Chandu-Challa-Resume.pdf" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-portfolio-border bg-portfolio-panel px-5 py-3 text-sm font-semibold text-portfolio-text transition-colors hover:border-portfolio-accent/50 hover:bg-portfolio-card focus:outline-none focus:ring-2 focus:ring-portfolio-accent">
                <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-portfolio-muted transition-colors hover:text-portfolio-text focus:outline-none focus:ring-2 focus:ring-portfolio-accent">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="relative mx-auto w-full max-w-[27rem] lg:mr-2"
          >
            <div className="absolute -inset-4 rounded-2xl bg-portfolio-accent/[0.06] blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl border border-portfolio-border bg-portfolio-panel shadow-xl shadow-black/20">
              <Image
                src="/images/chandu1.png"
                alt="Chandu Challa, Full Stack Developer"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/85 to-transparent px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
                <p className="text-lg font-semibold text-white">Chandu Challa</p>
                <p className="mt-1 text-sm text-white/85">Full Stack Developer · GreenTech Industries</p>
              </div>
            </div>
            <div className="absolute -left-4 top-7 hidden rounded-xl border border-portfolio-border bg-portfolio-panel/95 px-4 py-3 shadow-xl sm:block">
              <p className="text-[11px] uppercase tracking-wider text-portfolio-muted">Education</p>
              <p className="mt-1 text-sm font-medium text-portfolio-text">B.Tech · AI &amp; Data Science</p>
              <p className="text-xs text-portfolio-muted">NBKR Institute · 2025</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROFESSIONAL HIGHLIGHTS ──────────────────────────────── */}
      <section
        className="border-y border-portfolio-border bg-portfolio-deep/60 py-10 sm:py-12"
        aria-label="Professional highlights"
      >
        <div className="mx-auto max-w-6xl px-6">
          <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {HIGHLIGHTS.map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 rounded-2xl border border-portfolio-border bg-portfolio-card p-5 transition-colors hover:border-portfolio-accent/30"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-portfolio-accent/10">
                  <Icon className="h-5 w-5 text-portfolio-accent" aria-hidden="true" />
                </span>
                <span>
                  <dt className="mb-1 text-xs text-portfolio-muted">{label}</dt>
                  <dd className="text-sm font-semibold text-portfolio-text">{value}</dd>
                </span>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <ProjectsSection onViewCaseStudy={setSelectedProject} />

      {/* ── EXPERIENCE ───────────────────────────────────────────── */}
      <section
        id="experience"
        className="py-16 sm:py-24"
        aria-labelledby="experience-heading"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-portfolio-accent uppercase tracking-widest mb-3">
              Work History
            </p>
            <h2
              id="experience-heading"
              className="text-3xl sm:text-4xl font-bold text-portfolio-text"
            >
              Experience
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-portfolio-accent to-portfolio-border hidden sm:block"
              aria-hidden="true"
            />

            <ol className="space-y-10">
              {EXPERIENCE.map((job, i) => (
                <motion.li
                  key={job.title + job.dates}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, delay: i * 0.05 }}
                  className="relative sm:pl-12"
                >
                  {/* Timeline dot */}
                  <div
                    className={`hidden sm:flex absolute left-0 top-1.5 w-10 h-10 rounded-full border-2 items-center justify-center ${
                      job.isCurrent
                        ? 'bg-portfolio-accent border-portfolio-accent'
                        : 'bg-portfolio-card border-portfolio-border'
                    }`}
                    aria-hidden="true"
                  >
                    <Building2
                      className={`w-4 h-4 ${job.isCurrent ? 'text-[#0B1220]' : 'text-portfolio-muted'}`}
                    />
                  </div>

                  <div className="p-6 rounded-2xl bg-portfolio-card border border-portfolio-border hover:border-portfolio-accent/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-portfolio-text">{job.title}</h3>
                          <span
                            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                              job.isCurrent
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                                : 'bg-portfolio-deep text-portfolio-muted border border-portfolio-border'
                            }`}
                          >
                            {job.type}
                          </span>
                        </div>
                        <p className="text-portfolio-accent font-medium text-sm">{job.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-5 text-xs text-portfolio-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {job.dates}
                      </span>
                    </div>

                    <ul className="space-y-2" aria-label="Responsibilities">
                      {job.responsibilities.map((r, ri) => (
                        <li
                          key={ri}
                          className="flex items-start gap-2 text-base leading-relaxed text-portfolio-muted"
                        >
                          <CheckCircle
                            className="w-3.5 h-3.5 text-portfolio-accent flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-16 sm:py-24 bg-portfolio-deep/50"
        aria-labelledby="skills-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-portfolio-accent uppercase tracking-widest mb-3">
              Technical Skills
            </p>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-bold text-portfolio-text"
            >
              What I work with
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map(({ title, icon: Icon, color, skills }, i) => (
              <motion.div
                key={title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-portfolio-card border border-portfolio-border hover:border-portfolio-accent/30 hover:shadow-[0_8px_30px_rgba(96,165,250,0.08)] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-portfolio-text mb-4">{title}</h3>
                <ul className="space-y-2" aria-label={`${title} skills`}>
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-base text-portfolio-muted"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-16 sm:py-24"
        aria-labelledby="about-heading"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Education and focus card */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="w-full max-w-xl rounded-2xl border border-portfolio-border bg-portfolio-panel p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-portfolio-accent">Education</p>
                <p className="mt-4 text-2xl font-semibold leading-snug text-portfolio-text">B.Tech in Artificial Intelligence and Data Science</p>
                <p className="mt-3 text-sm leading-relaxed text-portfolio-muted">NBKR Institute of Science and Technology · Graduated 2025</p>
                <div className="my-7 h-px bg-portfolio-border" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-portfolio-accent">Focus</p>
                <p className="mt-3 text-base font-medium leading-relaxed text-portfolio-text">Enterprise applications, business workflows, and data-driven systems.</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <p className="text-sm font-semibold text-portfolio-accent uppercase tracking-widest mb-3">
                About Me
              </p>
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl font-bold text-portfolio-text mb-6"
              >
                More than interfaces — I build complete business applications.
              </h2>
              <div className="space-y-4 text-base text-portfolio-muted leading-relaxed">
                <p>
                  I&apos;m a Full Stack Developer at <strong className="text-portfolio-text">GreenTech Industries</strong>, building business applications with React.js, Next.js, Python, FastAPI, and SQL Server.
                </p>
                <p>
                  My work spans responsive interfaces, API and database integration, validation, permissions, debugging, and maintaining application workflows with internal teams.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={RESUME_URL}
                  download="Chandu-Challa-Resume.pdf"
                  className="flex min-h-11 items-center gap-2 rounded-xl bg-portfolio-accent px-5 py-2.5 font-semibold text-[#0B1220] transition-colors hover:bg-portfolio-accent-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-2 focus:ring-offset-portfolio-bg"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download Resume
                </a>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-portfolio-border px-5 py-2.5 text-portfolio-muted transition-all hover:border-portfolio-accent/40 hover:text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contact Me
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING APPROACH ─────────────────────────────────── */}
      <section className="py-16 sm:py-24" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">How I Work</p>
            <h2 id="approach-heading" className="text-3xl font-bold text-portfolio-text sm:text-4xl">
              My Engineering Approach
            </h2>
          </motion.div>
          <ol className="grid gap-4 md:grid-cols-3">
            {APPROACH.map(({ step, title, desc }) => (
              <motion.li
                key={step}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4 rounded-2xl border border-portfolio-border bg-portfolio-panel p-6 transition-all duration-200 hover:-translate-y-1 hover:border-portfolio-accent/30 hover:bg-portfolio-card"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-portfolio-accent-light" aria-hidden="true">{step}</span>
                <div>
                  <h3 className="mb-2 text-base font-bold text-portfolio-text">{title}</h3>
                  <p className="text-sm leading-relaxed text-portfolio-muted">{desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <CertificatesSection />

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-16 sm:py-24 bg-portfolio-deep/50"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-8 text-center"
          >
            <p className="text-sm font-semibold text-portfolio-accent uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-bold text-portfolio-text mb-4"
            >
              Let&apos;s build something useful.
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-portfolio-muted">
              I&apos;m open to opportunities where I can contribute to frontend development, full-stack engineering, and business application development.
            </p>
          </motion.div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.65fr)] lg:gap-8">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <ContactForm />
            </motion.div>

            <aside className="space-y-4" aria-label="Other ways to contact Chandu">
              <div className="rounded-2xl border border-portfolio-border bg-portfolio-panel p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-portfolio-accent">Direct contact</p>
                <h3 className="mt-2 text-lg font-semibold text-portfolio-text">Prefer another way?</h3>
                <div className="mt-5 space-y-3">
                  {[
                    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                    { icon: Phone, label: 'Phone', value: '+91 9346347775', href: 'tel:+919346347775' },
                    { icon: MessageCircle, label: 'WhatsApp', value: 'Message on WhatsApp', href: 'https://wa.me/919346347775' },
                    { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: LINKEDIN_URL },
                    { icon: Github, label: 'GitHub', value: 'github.com/Chandu-challa', href: GITHUB_URL },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 text-base text-portfolio-muted transition-colors hover:bg-portfolio-card hover:text-portfolio-accent focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-portfolio-accent-light" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="sr-only">{label}: </span>
                        <span className="break-all">{value}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={RESUME_URL}
                download="Chandu-Challa-Resume.pdf"
                className="flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-portfolio-border bg-portfolio-card px-5 py-4 text-base font-semibold text-portfolio-text transition-colors hover:border-portfolio-accent/40 hover:bg-portfolio-accent/[0.05] focus:outline-none focus:ring-2 focus:ring-portfolio-accent"
              >
                <span className="inline-flex items-center gap-3">
                  <Download className="h-4 w-4 text-portfolio-accent-light" aria-hidden="true" />
                  Download resume
                </span>
                <span className="text-xs font-medium text-portfolio-muted">PDF</span>
              </a>
            </aside>
          </div>
        </div>
      </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-portfolio-border bg-portfolio-bg" role="contentinfo">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <p className="text-lg font-bold text-portfolio-text">Chandu Challa<span className="text-portfolio-accent">.</span></p>
              <p className="mt-1 text-xs text-portfolio-muted">Full Stack Developer · React.js · Next.js · Python · SQL Server</p>
            </div>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3" role="list">
                {NAV_ITEMS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="rounded text-sm text-portfolio-muted transition-colors hover:text-portfolio-accent-bright focus:outline-none focus:ring-2 focus:ring-portfolio-accent">{label}</a>
                  </li>
                ))}
                <li>
                  <a href={RESUME_URL} download="Chandu-Challa-Resume.pdf" className="rounded text-sm text-portfolio-muted transition-colors hover:text-portfolio-accent-bright focus:outline-none focus:ring-2 focus:ring-portfolio-accent">Download Resume</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-portfolio-border pt-6 sm:flex-row">
            <p className="text-center text-xs text-portfolio-muted sm:text-left">© {new Date().getUTCFullYear()} Chandu Challa. Full Stack Developer.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs">
              <a href={`mailto:${EMAIL}`} className="break-all text-portfolio-muted transition-colors hover:text-portfolio-accent-bright focus:outline-none focus:ring-2 focus:ring-portfolio-accent">{EMAIL}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="inline-flex items-center gap-1.5 rounded text-portfolio-muted transition-colors hover:text-portfolio-accent-bright focus:outline-none focus:ring-2 focus:ring-portfolio-accent">
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="inline-flex items-center gap-1.5 rounded text-portfolio-muted transition-colors hover:text-portfolio-accent-bright focus:outline-none focus:ring-2 focus:ring-portfolio-accent">
                <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
              </a>
              <a href="#hero" className="inline-flex items-center gap-1 rounded text-portfolio-muted transition-colors hover:text-portfolio-accent-bright focus:outline-none focus:ring-2 focus:ring-portfolio-accent">
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> Back to top
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToSection('#hero')}
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-portfolio-accent text-[#0B1220] shadow-lg shadow-portfolio-accent/20 transition-colors hover:bg-portfolio-accent-light focus:outline-none focus:ring-2 focus:ring-portfolio-accent focus:ring-offset-2 focus:ring-offset-portfolio-bg"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Case study modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={closeCaseStudy}
      />
    </div>
    </MotionConfig>
  );
}
