"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X, LogIn } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/#impact-dashboard" },
  { label: "Sectors", href: "/#sectors" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white/20 backdrop-blur-sm md:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className={`text-slate-900 font-black text-lg tracking-tighter`}>
                CII
              </span>
              <span className="text-emerald-600 font-black text-lg tracking-tighter">
                Energy
              </span>
            </div>
            <p className={`text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]`}>
              Telangana MSME Programme
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-slate-600 hover:text-emerald-600 text-[13px] font-semibold transition-colors tracking-wide`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA & Login */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://cii.metaversedu.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[12px] font-bold px-4 py-2 rounded-lg transition-all"
          >
            <LogIn className="w-3.5 h-3.5" /> Login Portal
          </Link>
          <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold px-5 py-2 rounded-lg transition-all shadow-md shadow-emerald-500/10">
            Apply Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`text-slate-900 md:hidden hover:text-emerald-600`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-slate-800 hover:text-emerald-600 text-lg font-bold transition-colors border-b border-slate-50 pb-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="https://cii.metaversedu.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold py-3 rounded-xl"
              onClick={() => setMenuOpen(false)}
            >
              <LogIn size={18} /> Login Portal
            </Link>
            <button className="bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20">
              Apply for Assessment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
