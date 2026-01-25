import React from "react";
import {
  HiHome,
  HiInformationCircle,
  HiPhone,
  HiFolderOpen,
  HiDocument,
  HiAcademicCap,
  HiBriefcase,
} from "react-icons/hi";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: <HiHome size={20} /> },
  { name: "About", href: "/about", icon: <HiInformationCircle size={20} /> },
  { name: "Experience", href: "/experience", icon: <HiBriefcase size={20} /> },
  { name: "Projects", href: "/projects", icon: <HiFolderOpen size={20} /> },
  { name: "Certificates", href: "/certificates", icon: <HiAcademicCap size={20} /> },
  // { name: "Contact", href: "/contact", icon: <HiPhone size={20} /> },
];
