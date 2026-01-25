import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900/60 backdrop-blur-md border-t border-[#00BFFF]/20 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/projects", label: "Projects" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-300 font-medium transition-all duration-300 hover:text-[#00BFFF]
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#00BFFF] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider for Mobile */}
        <div className="w-full md:hidden border-t border-gray-700/30 my-2"></div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-300">Chandu Challa</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
