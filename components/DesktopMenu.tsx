"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NavItem } from "@/lib/navItems";

interface DesktopMenuProps {
  navItems: NavItem[];
  activeSection: string;
  pathname: string;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  navItems,
  activeSection,
  pathname,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setFocusedIndex((prev) => (prev + 1) % navItems.length);
    } else if (e.key === "ArrowLeft") {
      setFocusedIndex((prev) => (prev - 1 + navItems.length) % navItems.length);
    } else if (e.key === "Enter") {
      const link = document.querySelector(
        `a[data-index="${focusedIndex}"]`
      ) as HTMLAnchorElement;
      link?.click();
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0) {
      const link = document.querySelector(
        `a[data-index="${focusedIndex}"]`
      ) as HTMLElement;
      link?.focus();
    }
  }, [focusedIndex]);

  return (
    <ul
      className="hidden md:flex items-center space-x-8"
      role="list"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-testid="desktop-menu"
    >
      {navItems.map(({ name, href, icon }, index) => (
        <li key={name} className="relative group" role="listitem">
          <Link href={href} data-index={index}>
            <span
              className={`flex items-center font-semibold transition-colors duration-300 ${
                activeSection === name.toLowerCase()
                  ? "text-cyan-400"
                  : "text-white hover:text-cyan-400"
              }`}
              aria-current={
                activeSection === name.toLowerCase() ? "page" : undefined
              }
            >
              <span className="mr-1">{icon}</span>
              {name}
            </span>
          </Link>
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-full transition-[width] ease-in-out duration-500 ${
              activeSection === name.toLowerCase()
                ? "w-full"
                : "w-0 group-hover:w-full"
            }`}
          />
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;
