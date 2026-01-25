"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { NavItem } from "@/lib/navItems";

interface MobileMenuProps {
  navItems: NavItem[];
  activeSection: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  activeSection,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <FocusTrap>
            <motion.ul
              key="mobile-menu"
              id="mobile-menu"
              initial={{ opacity: 0, height: 0, y: -50 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/90 backdrop-blur-md shadow-lg rounded-b-md px-6 py-4 space-y-4 z-50 relative"
              role="menu"
              data-testid="mobile-menu"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map(({ name, href, icon }) => (
                <li key={name} role="menuitem" className="min-h-[44px] flex items-center">
                  <Link href={href}>
                    <span
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center font-semibold transition-colors duration-300 ${
                        activeSection === name.toLowerCase()
                          ? "text-cyan-400"
                          : "text-white hover:text-cyan-400"
                      }`}
                    >
                      <span className="mr-2">{icon}</span>
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          </FocusTrap>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
