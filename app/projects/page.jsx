"use client";

import React, { useState } from "react";
import { Github, ExternalLink, Code2, Folder, Home, Sparkles } from "lucide-react";

const projects = [
  {
    title: "Dormitory Management System",
    description: "A full-stack system for managing employees, rooms, and allocations with efficient database operations and responsive UI.",
    tech: ["Next.js", "React", "TypeScript", "SQL Server", "Prisma"],
    github: "https://github.com/Chandu-challa/Dormitory-management-system/tree/chandu",
    live: "#",
    category: "Full Stack",
    features: [
      "Developed full-stack system for managing employees, rooms, and allocations",
      "Used Prisma ORM for efficient relational queries on SQL Server",
      "Built responsive UI components and routing with React and Next.js"
    ]
  },
  {
    title: "Fake Job Detection System",
    description: "Machine learning-powered system to classify fake vs real job posts with real-time prediction capabilities.",
    tech: ["Django", "Python", "ML (RF, KNN, Logistic Regression)"],
    github: "https://github.com/Chandu-challa/Detection-of-Fake-Job-Postings",
    live: "#",
    category: "AI/ML",
    features: [
      "Built ML model to classify fake vs real job posts using TF-IDF and supervised algorithms",
      "Integrated trained model into Django app for real-time job prediction",
      "Implemented multiple classification algorithms for improved accuracy"
    ]
  },
  {
    title: "Employee Database Management System",
    description: "Comprehensive CRUD operations for employee data management with form validation and Bootstrap UI.",
    tech: ["Django", "SQLite", "Bootstrap"],
    github: "https://github.com/Chandu-challa/Employee",
    live: "#",
    category: "Web App",
    features: [
      "Built CRUD operations for managing employee data with form validation",
      "Designed UI using Bootstrap and dynamic rendering with Django templates",
      "Implemented efficient database operations and user-friendly interface"
    ]
  },
  {
  title: "Expense Tracker Application",
  description: "A modern expense tracking application that helps users manage, analyze, and visualize their expenses with category-based insights and real-time updates.",
  tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  github: "https://github.com/chandu-challa/expense-tracker",
  live: "#",
  category: "Full Stack",
  features: [
    "Built a dynamic expense tracker with category-based analysis and date-wise filtering",
    "Implemented real-time calculations and visual reports using charts",
    "Focused on scalable component design and smooth user experience"
  ]
}

];

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Subtle background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 max-w-8xl mx-auto px-5 sm:px-8 py-8 sm:py-12 mt-10">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-gray-400">
            <li>
              <a href="/" className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Home className="w-3 h-3" /> Home
              </a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-cyan-400">Projects</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Featured Projects
          </h1>
          <p className="text-gray-400 text-sm">
            A collection of projects showcasing my expertise in full-stack development, UI/UX design, and modern web technologies.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {projects.map((project, index) => (
            <article
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Image placeholder with gradient */}
              <div className="relative h-36 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="w-12 h-12 text-cyan-400/40 group-hover:text-cyan-400/60 transition-colors" />
                </div>
                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-sm rounded-md text-xs text-cyan-400 font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-5">
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-slate-800/60 border border-slate-700/50 rounded text-gray-300 hover:border-cyan-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-700/50">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-cyan-400 transition-colors group/link"
                  >
                    <Github className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                    Code
                  </a>
                  {/* <span className="text-gray-600">•</span>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-cyan-400 transition-colors group/link"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                    Demo
                  </a> */}
                </div>
              </div>
            </article>
          ))}
        </div>


        {/* CTA Section */}
            </main>
    </div>
  );
}