"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Menu, X, LogIn, ChevronDown, Palette, Check } from "lucide-react";
import { useAppTheme } from "@/context/theme-context";
import { nav } from "framer-motion/client";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/#impact-dashboard" },
  { label: "Sectors", href: "/#sectors" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { theme, setTheme, colors } = useAppTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const themes = [
    { id: "midnight", label: "Midnight Deep", color: "#6366f1" },
    { id: "forest", label: "Forest Dark", color: "#10b981" },
    { id: "carbon", label: "Carbon Black", color: "#ffffff" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* ── TOP TIER: GOI Strip ─────────────────────────────────────────── */}
        <div className="w-full bg-[#0c1b33] h-12 px-6 md:px-16 flex items-center justify-between border-b border-white/10 overflow-hidden">
          <div className="flex items-center gap-6 h-full py-2">
            <div className="h-full w-auto flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GOI" className="h-full invert" />
            </div>

            <div className="flex items-center gap-4 h-full border-l border-white/20 pl-6">
              <div className="hidden xl:flex flex-col">
                <span className="text-[13px] font-bold text-white/90 leading-tight tracking-tight">
                  Office of the Principal Scientific Adviser
                </span>
                <span className="text-[11px] font-medium text-white/60 leading-none mt-0.5 tracking-tight">
                  to the Government of India
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 opacity-70 group cursor-pointer">
              <span className="text-[9px] font-bold text-white uppercase tracking-widest group-hover:text-amber-400 transition-colors">Information Dashboard</span>
            </div>
            <div className="hidden md:block w-[1px] h-3 bg-white/10" />
            <Link href="https://cii.metaversedu.in/login" className="hidden md:flex items-center gap-2 group">
              <span className="text-[8px] font-black text-white/60 uppercase tracking-tighter group-hover:text-white transition-colors">Portal Login</span>
            </Link>
          </div>
        </div>

        {/* ── SECOND TIER: Simplified Main Navigation ────────────────────────── */}
        <nav
          className={`w-full transition-all duration-500 ${scrolled
            ? "bg-white shadow-md border-b border-slate-100 py-1"
            : "bg-white border-b border-slate-50 py-2"
            }`}
          style={{ backgroundColor: scrolled ? 'white' : colors.sectionBg }}
        >
          <div className="w-full px-6 md:px-16 flex items-center justify-between">
            
            {/* Left Spacer */}
            <div className="flex-1 hidden lg:block" />

            {/* Navigation Links (Center - Crisper/Tight Typography) */}
            <div className="hidden lg:flex items-center justify-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] font-semibold tracking-tight transition-all duration-300 relative group py-1.5`}
                  style={{ color: (scrolled || colors.sectionBg === '#ffffff') ? "#1e293b" : "#cbd5e1" }}
                >
                  <span className="relative z-10 group-hover:text-emerald-700 transition-colors">{link.label}</span>
                  <span 
                    className="absolute bottom-0 left-0 w-full h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: colors.primary }}
                  />
                </Link>
              ))}
            </div>

            {/* Actions (Right) */}
            <div className="flex-1 flex items-center justify-end gap-4">
              <div className="relative">
                <button
                  onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100 transition-all bg-slate-50/50 text-slate-400 hover:text-slate-600 shadow-sm"
                >
                  <Palette className="w-4 h-4" />
                </button>

                {themeMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-2.5 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                      {themes.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id as any);
                            setThemeMenuOpen(false);
                          }}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12px] font-bold transition-all ${theme === t.id
                            ? "bg-slate-50 text-slate-900 shadow-sm"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: t.color }} />
                            {t.label}
                          </div>
                          {theme === t.id && <Check className="w-4 h-4" style={{ color: t.color }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="https://cii.metaversedu.in/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: colors.primary }}
                className="flex items-center gap-2 text-white text-[11px] font-bold px-5 py-2 rounded-lg transition-all hover:brightness-110 active:scale-95 shadow-sm"
              >
                Portal Login →
              </Link>

              {/* Mobile toggle */}
              <button
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 text-slate-500"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-800 text-lg font-bold transition-colors border-b border-slate-50 pb-2"
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
              <button
                style={{ backgroundColor: colors.primary }}
                className="text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98]"
              >
                Apply for Assessment
              </button>
            </div>
          </div>
        )}
      </header>
      <style jsx>{`
        .hover-theme-color:hover {
          color: var(--hover-color) !important;
        }
      `}</style>
    </>
  );
}
