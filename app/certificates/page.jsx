import React from "react";
import { Award, Home, Download, ExternalLink, Sparkles, CheckCircle, Calendar } from "lucide-react";

const certificates = [
  {
    id: "cert1",
    title: "Python Course Completion Certificate",
    issuer: "Coding Brains",
    description: "Comprehensive Python programming course covering fundamentals, OOP, and advanced concepts.",
    link: "https://drive.google.com/drive/folders/1aPtOVH8bxfkzITk1XNFCQZUR_qBSxKPZ?usp=sharing",
    validity: "Does not expire",
    category: "Programming",
  },
  {
    id: "cert2",
    title: "Artificial Intelligence",
    issuer: "Slash Mark",
    description: "Foundations of AI, machine learning algorithms, and practical AI implementations.",
    link: "https://drive.google.com/file/d/1EpyO0_dBkxNgXh4XwiYE5RKXywlfvfGl/view?usp=sharing",
    validity: "Does not expire",
    category: "AI/ML",
  },
  {
    id: "cert3",
    title: "SQL Internship",
    issuer: "Slash Mark",
    description: "Database design, optimization, complex queries, and SQL Server management.",
    link: "https://drive.google.com/file/d/1logckmuyqxZgxPUSCblxJ0WkRn5Uxoj7/view?usp=sharing",
    validity: "Does not expire",
    category: "Database",
  },
];

export default function CertificatesPage() {
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
            <li className="text-cyan-400">Certificates</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-3">
            <Award className="w-3 h-3" />
            Certifications
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Professional Certificates
          </h1>
        
        </header>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {certificates.map((cert) => (
            <article
              key={cert.id}
              className="relative bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                    <Award className="text-cyan-400 w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <span className="font-semibold text-cyan-400">{cert.issuer}</span>
                      <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400">
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Validity */}
                {/* <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 pb-4 border-b border-slate-700/50">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">{cert.validity}</span>
                </div> */}

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover/link:scale-110 transition-transform" />
                    View Certificate
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-colors">
            <div className="text-2xl font-bold text-cyan-400 mb-1">{certificates.length}</div>
            <div className="text-xs text-gray-400">Certificates</div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-colors">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {[...new Set(certificates.map(c => c.category))].length}
            </div>
            <div className="text-xs text-gray-400">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-colors">
            <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
            <div className="text-xs text-gray-400">Verified</div>
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Continuous Learning</h3>
          </div>
          <p className="text-gray-400 text-xs mb-4 max-w-md mx-auto">
            Always expanding my skill set through professional certifications and hands-on projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-2 px-5 rounded-lg text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105 transition-all">
              View All Skills
            </button>
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-cyan-400/50 text-cyan-400 font-medium py-2 px-5 rounded-lg text-sm hover:bg-cyan-400/10 hover:scale-105 transition-all"
            >
              Back to About
            </a>
          </div>
        </div> */}
      </main>
    </div>
  );
}