"use client";

import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiUserCircle } from "react-icons/hi";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/lib/navItems";

const AppNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Handle scroll shadow and progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Set active section based on pathname for non-home pages
  useEffect(() => {
    const pathSegment = pathname.split('/')[1] || 'home';
    setActiveSection(pathSegment);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Observe active section (only for home page with sections)
  useEffect(() => {
    if (pathname === "/") {
      let lastActive = "";
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id !== lastActive) {
              setActiveSection(entry.target.id);
              lastActive = entry.target.id;
            }
          });
        },
        { 
          threshold: 0.5,
          rootMargin: '-20% 0px -80% 0px'
        }
      );
      
      // Error handling: Check if sections exist
      let hasSections = false;
      navItems.forEach((item) => {
        const section = document.getElementById(item.name.toLowerCase());
        if (section) {
          observer.observe(section);
          hasSections = true;
        }
      });
      
      if (!hasSections) {
        setActiveSection('home');
      }
      
      return () => observer.disconnect();
    }
  }, [pathname]);

  // Listen for hash changes (for manual anchor navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      // Only update if hash matches a valid nav item section
      const validSections = navItems.map(item => item.name.toLowerCase());
      if (validSections.includes(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar - Now on all pages */}
      <motion.div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-1 bg-cyan-400 z-[60]"
        initial={{ width: 0 }}
        animate={{ width: scrollProgress + "%" }}
        transition={{ duration: 0.2 }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 
        bg-gradient-to-r from-cyan-500/10 via-black/30 to-purple-600/10 
        backdrop-blur-xl border-b border-white/10 
        ${scrolled ? "shadow-lg shadow-cyan-500/20" : "shadow-none"}`}
        role="navigation"
        aria-label="Primary Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2 select-none">
            <HiUserCircle className="text-3xl text-cyan-400" />
            <div
              className="text-2xl font-extrabold text-white cursor-default hover:text-cyan-400 transition-colors duration-300"
              aria-label="Brand name"
            >
              Chandu
            </div>
          </div>

          {/* Desktop Menu */}
          <DesktopMenu
            navItems={navItems}
            activeSection={activeSection}
            pathname={pathname}
          />

          {/* Hamburger Menu */}
          <button
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            data-testid="hamburger-button"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          navItems={navItems}
          activeSection={activeSection}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </motion.nav>
    </>
  );
};

export default memo(AppNavbar);
