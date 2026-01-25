import React from "react";
import { Briefcase, Home, ArrowLeft, Calendar, MapPin, Code2, Trophy, Sparkles } from "lucide-react";

const experiences = [
  {
    id: "exp1",
    title: "Full Stack Developer",
    company: "Greentech Industries",
    location: "Dwarakapuram, Naidupeta, AP",
    dates: "Jan 2025 - Present",
    type: "Full-Time",
    description: "Developed internal applications using Next.js, React.js and TypeScript. Implemented reusable UI components, API integrations, and state management. Worked with SQL Server for joins, stored procedures, and CRUD operations.",
    technologies: ["Next.js", "React.js", "TypeScript", "SQL Server"],
    highlights: [
      "Built multiple production-ready internal applications",
      "Optimized database operations and API integrations",
      "Mastered modern full-stack development practices",
    ],
  },
];

function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border backdrop-blur-sm ${styles[variant]}`}>
      {children}
    </span>
  );
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Subtle background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12 mt-10">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-gray-400">
            <li>
              <a href="/" className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Home className="w-3 h-3" /> Home
              </a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-cyan-400">Experience</li>
          </ol>
        </nav>

        {/* Compact Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-3">
            <Briefcase className="w-3 h-3" />
            Professional Experience
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Work Experience
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Building scalable applications and delivering impactful solutions as a full-stack developer.
          </p>
        </header>

        {/* Experience Cards */}
        <div className="space-y-6 mb-8">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="relative bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 sm:p-6 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 pb-4 border-b border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                      <Briefcase className="text-cyan-400 w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                        {exp.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span className="font-semibold text-cyan-400">{exp.company}</span>
                        <span className="text-gray-600">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <Badge variant="success">{exp.type}</Badge>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {exp.dates}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="text-cyan-400 w-3.5 h-3.5" />
                    <h3 className="text-xs font-semibold text-cyan-400">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs bg-slate-800/60 border border-slate-700/50 rounded-md text-gray-300 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="text-cyan-400 w-3.5 h-3.5" />
                    <h3 className="text-xs font-semibold text-cyan-400">Key Highlights</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Timeline indicator */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs text-gray-400">Current Position</span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>

        {/* CTA Section - Compact */}
        <div className="mt-8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-xl p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Let's Collaborate</h3>
          </div>
          <p className="text-gray-400 text-xs mb-4 max-w-md mx-auto">
            Open to exciting opportunities and impactful projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-2 px-5 rounded-lg text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105 transition-all">
              Get in Touch
            </button>
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to About
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}