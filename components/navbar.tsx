"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, Menu, X, LogIn, ChevronDown, Palette, Check } from "lucide-react";
import { useAppTheme } from "@/context/theme-context";

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
    { id: "green", label: "Emerald Energy", color: "#10b981" },
    { id: "forest", label: "Forest Prime", color: "#15803d" },
    { id: "blue", label: "Trust Blue", color: "#3b82f6" },
    { id: "teal", label: "Modern Teal", color: "#14b8a6" },
    { id: "slate", label: "Industrial Slate", color: "#475569" },
    { id: "indigo", label: "Indigo Elite", color: "#4f46e5" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white shadow-xl border-b border-slate-200"
          : "bg-white/70 backdrop-blur-md md:bg-transparent"
        }`}
    >
      <div className="w-full px-6 md:px-16 h-24 flex items-center justify-between">
        {/* PSA Logo - Super-Wide Integrated Banner 60% Width */}
        <div className="flex-[0_0_60%] h-full flex items-center overflow-hidden">
          <Link href="/" className="inline-block w-full h-full flex items-center">
            <div className="relative h-full w-full flex items-center overflow-hidden">
              <Image 
                src="/Office of PSA Logo.png" 
                alt="Office of PSA" 
                width={1200} 
                height={240} 
                className="h-[140%] w-auto object-contain object-center scale-110"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right Side Items (Links + CTA) */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-slate-600 hover:text-emerald-600 text-[13px] font-bold transition-colors tracking-wide hover-theme-color`}
                style={{ "--hover-color": colors.primary } as any}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA, Theme Switching & Login */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-white text-slate-600 text-[12px] font-bold`}
              >
                <Palette className="w-4 h-4" style={{ color: colors.primary }} />
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${themeMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {themeMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-2 flex flex-col gap-1">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id as any);
                          setThemeMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors ${theme === t.id
                            ? "bg-slate-50 text-slate-900"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
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
              className="flex items-center gap-1.5 border border-slate-200 text-slate-700 text-[12px] font-bold px-4 py-2 rounded-lg transition-all hover:bg-slate-50"
              style={{ borderColor: scrolled ? undefined : "rgba(0,0,0,0.1)" }}
            >
              <LogIn className="w-3.5 h-3.5" /> Login Portal
            </Link>
            <button
              style={{
                backgroundColor: colors.primary,
                boxShadow: `0 4px 14px ${colors.primary}33`
              }}
              className="flex items-center gap-1.5 text-white text-[12px] font-bold px-5 py-2 rounded-lg transition-all hover:brightness-110 active:scale-95"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden hover:text-slate-900`}
            style={{ color: colors.primary }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

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
            <div className="flex justify-center gap-4 mt-6 p-4 bg-slate-50 rounded-2xl">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center bg-white ${theme === t.id ? "scale-110 shadow-md" : "opacity-60 grayscale-[0.5]"
                    }`}
                  style={{ borderColor: theme === t.id ? t.color : "transparent" }}
                >
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: t.color }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .hover-theme-color:hover {
          color: var(--hover-color) !important;
        }
      `}</style>
    </nav>
  );
}
