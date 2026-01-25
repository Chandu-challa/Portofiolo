import React from "react";
import Link from "next/link";
import { Download, Mail, Code2, Wrench, GraduationCap, Database, ArrowRight, Sparkles } from "lucide-react";

const education = [
  { id: 1, degree: "10th Standard", institution: "Z.P.P.H School, Gudur", dates: "2018 - 2019", percentage: "83%" },
  { id: 2, degree: "Intermediate (12th)", institution: "Sri Swarnandhra Bharathi Junior College", dates: "2019 - 2021", description: "M.P.C", percentage: "83%" },
  { id: 3, degree: "B.Tech", institution: "N.B.K.R.I.S.T", dates: "2021 - 2025", description: "AI & Data Science", percentage: "72%" },
];

const skillsCategories = [
  { title: "Frontend", icon: Code2, skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind"] },
  { title: "Backend", icon: Wrench, skills: ["Django", "Python", "REST APIs", "Authentication"] },
  { title: "Database", icon: Database, skills: ["SQL Server", "Prisma ORM", "SQLite"] },
  { title: "Tools & Other", icon: Sparkles, skills: ["Git/GitHub", "VS Code", "Machine Learning", "NLP"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10  mx-auto px-5 sm:px-8 py-8 sm:py-12 mt-10 max-w-7xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-3">
            <Sparkles className="w-3 h-3" />
            About Me
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
            Chandu Challa
          </h1>
          <p className="text-gray-400 text-sm">Full-Stack Developer</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative w-20 h-20 rounded-full border-2 border-cyan-500/30 overflow-hidden bg-slate-800">
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400">
                      CC
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Chandu Challa</h2>
                  <p className="text-xs text-gray-400">AI & Data Science</p>
                  <p className="text-xs text-cyan-400 mt-0.5">N.B.K.R.I.S.T</p>
                </div>
                <a
                  href="https://drive.google.com/file/d/19ZmEnTX8PT_NsG9YY-rr7FjfXkSkb6Me/view?usp=sharing"
                  download
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Resume
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-slate-900/40 p-3 rounded-lg border border-slate-700/30 hover:border-cyan-500/20 transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-medium text-xs">{edu.degree}</h4>
                      <span className="text-yellow-400 text-xs font-medium">{edu.percentage}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-tight">{edu.institution}</p>
                    {edu.description && <p className="text-gray-500 text-xs mt-0.5">{edu.description}</p>}
                    <span className="text-cyan-400 text-xs">{edu.dates}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Overview
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Full-Stack Developer skilled in building <span className="text-cyan-400 font-medium">scalable web applications</span> using <span className="text-white font-semibold">React.js, Next.js, Django, Python, SQL Server, Prisma, HTML, CSS, JavaScript, TypeScript</span>. Strong understanding of authentication, REST APIs, and database modeling, with experience in <span className="text-purple-400 font-medium">Machine Learning and NLP</span> for building classification systems. Quick learner handling both frontend and backend workflows.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                Technical Skills
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {skillsCategories.map((cat, i) => {
                  const IconComponent = cat.icon;
                  return (
                    <div key={i} className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <IconComponent className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-sm font-semibold text-white">{cat.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill, idx) => (
                          <span key={idx} className="bg-slate-900/50 px-2.5 py-1 rounded-md border border-slate-700/30 hover:border-cyan-500/30 hover:scale-105 text-gray-300 text-xs font-medium transition-all cursor-default">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 border border-cyan-500/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Let's Build Something Great</h3>
              <p className="text-gray-400 text-sm mb-5 max-w-2xl mx-auto">
                Open to opportunities and collaborations. Let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {/* <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-2 px-5 rounded-lg text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Me
                </button> */}
                <Link href="/projects">
                  <button className="border border-cyan-400/50 text-cyan-400 font-medium py-2 px-5 rounded-lg text-sm hover:bg-cyan-400/10 hover:scale-105 transition-all flex items-center justify-center gap-2">
                    View Projects
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}