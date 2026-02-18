"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{ href: "/", label: "Countdown" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 z-50 p-4">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-red-900/40 bg-black/70 p-2 backdrop-blur-md"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-full bg-red-500 transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-full bg-red-500 transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-full bg-red-500 transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 w-44 overflow-hidden rounded-xl border border-red-900/30 bg-black/90 shadow-2xl backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-5 py-4 font-mono text-sm tracking-widest uppercase transition-colors ${
                pathname === link.href
                  ? "bg-red-900/20 text-red-400"
                  : "text-red-500/70 hover:bg-red-900/10 hover:text-red-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
