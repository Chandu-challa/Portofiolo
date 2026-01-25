"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaTimes } from "react-icons/fa";
import Footer from "../components/Footer";

// 🌟 Constants
const HERO_TITLE = "Hi, I'm Chandu 👋";
const HERO_DESC =
  "A Full Stack Developer who builds modern, fast, and scalable web applications using React, Next.js, and SQL Server.";

// 🎨 Animation Variants
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const wordVariant: Variants = {
  hidden: { y: -50, opacity: 0, rotate: -5 },
  show: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [particles, setParticles] = useState<
    {
      id: number;
      width: number;
      height: number;
      top: string;
      left: string;
      duration: number;
      delay: number;
    }[]
  >([]);

  // ✨ Initialize animations & particles
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 1000);

    const generatedParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);

    // Escape key to close modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowWelcome(false);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const splitWords = useCallback((text: string) => text.split(" "), []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white overflow-hidden">
      {/* 🌈 Gradient Background */}
      <div className="absolute inset-0 animate-gradientMove bg-[length:600%_600%] bg-gradient-to-br from-[#0f0c29] via-[#302b63] via-[#24243e] to-[#0f0c29]" />

      {/* Shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

      {/* ✨ Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
            }}
            animate={{
              y: [0, 20, -20, 0],
              x: [0, -10, 10, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* 💬 Welcome Modal */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWelcome(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/40 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              aria-label="Close welcome modal"
            >
              <FaTimes className="text-xl" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              👋
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-blue-400 mb-3"
            >
              Welcome!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 mb-6 leading-relaxed"
            >
              Thanks for visiting my portfolio! I’m <span className="text-blue-400 font-semibold">Chandu Challa</span>, a passionate Full Stack Developer.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowWelcome(false)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform duration-300"
            >
              Let’s Explore!
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 🧩 Hero Section */}
      <motion.div
        className="relative z-20 px-6 flex flex-col items-center mt-10"
        variants={container}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
      >
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 flex flex-wrap justify-center">
          {splitWords(HERO_TITLE).map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className="mx-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          custom={0.3}
          className="text-lg md:text-xl text-yellow-300 mb-10 max-w-3xl leading-relaxed"
        >
          {HERO_DESC}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          custom={0.4}
          className="flex gap-6 justify-center mb-12"
        >
          <motion.a
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 25px rgba(59,130,246,0.8)",
            }}
            href="/projects"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full font-semibold shadow-lg transition-all"
          >
            View Projects
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 20px rgba(147,197,253,0.6)",
            }}
            href="/about"
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-full font-semibold transition-all"
          >
            About Me
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={fadeUp}
          custom={0.5}
          className="flex gap-8 justify-center"
        >
          <SocialIcon
            href="https://linkedin.com/in/chandu-challa"
            color="text-blue-400"
            icon={<FaLinkedin />}
          />
          <SocialIcon
            href="https://github.com/chandu-challa"
            color="text-gray-300"
            icon={<FaGithub />}
          />
          <SocialIcon
            href="mailto:chanduchalla@example.com"
            color="text-green-400"
            icon={<FaEnvelope />}
          />
        </motion.div>
      </motion.div>

     
    </div>
  );
}

// 🔹 Social Icon Component
function SocialIcon({
  href,
  icon,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.a
      whileHover={{ scale: 1.25, rotate: 5 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-3xl ${color} transition-all duration-300 p-3 rounded-full bg-white/5 hover:bg-white/10`}
    >
      {icon}
    </motion.a>
  );
}

/* 🌈 Tailwind custom animation */
if (typeof document !== "undefined") {
  const style = `
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradientMove {
    animation: gradientMove 16s ease infinite;
  }
  `;
  const existing = document.getElementById("gradientMove");
  if (!existing) {
    const styleTag = document.createElement("style");
    styleTag.id = "gradientMove";
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);
  }
}
