"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";
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
    { id: "midnight", label: "Midnight Deep", color: "#6366f1" },
    { id: "forest", label: "Forest Dark", color: "#10b981" },
    { id: "carbon", label: "Carbon Black", color: "#ffffff" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">


        {/* ── NAVBAR (LIGHT SLAB) ──────────────────────────────────────── */}
        <nav
          className="w-full transition-all duration-300"
          style={{
            backgroundColor: '#F5F0E8',
            borderBottom: '1px solid #1A1F2E',
            padding: scrolled ? '4px 0' : '10px 0',
          }}
        >
          <div className="w-full px-6 md:px-16 flex items-center justify-between">

            {/* Brand */}
            <div className="flex items-center gap-2">
              <div className="h-full w-auto flex items-center gap-3">
                <div className="h-full w-auto flex items-center mx-2">
                  <img
                    src="/TG.png"
                    alt="GOI"
                    className="h-full"
                    height="80"
                    width="70"
                  />
                </div>
                <div className="h-full w-auto flex items-center mx-2">
                  <img
                    src="/RAMPLogo.png"
                    alt="Ramp"
                    className="h-full"
                    height="70"
                    width="60"
                  />
                </div>
                <div className="h-full w-auto flex items-center mx-2">
                  <img
                    src="/Rich.png"
                    alt="Ramp"
                    className="h-full"
                    height="40"
                    width="100"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group py-2 transition-all duration-300"
                >
                  <span
                    className="font-sans group-hover:text-[#2A6B4F] transition-colors"
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1A1F2E',
                    }}
                  >
                    {link.label}
                  </span>
                  {/* <span
                    className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: '#2A6B4F' }}
                  /> */}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="https://cii.metaversedu.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans flex items-center gap-2 text-white px-5 py-2 rounded-sm transition-all hover:brightness-110 active:scale-95 uppercase"
                style={{
                  backgroundColor: '#2A6B4F',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                Portal Login →
              </Link>

              {/* Mobile toggle */}
              <button
                className="lg:hidden w-10 h-10 rounded-sm flex items-center justify-center border"
                style={{ borderColor: '#1A1F2E', color: '#1A1F2E' }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 py-8 flex flex-col gap-6"
            style={{ backgroundColor: '#F5F0E8', borderBottom: '1px solid #1A1F2E' }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-numbers uppercase text-lg font-bold transition-colors pb-2"
                style={{ color: '#1A1F2E', letterSpacing: '0.15em', borderBottom: '1px solid rgba(26,31,46,0.15)' }}
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
                className="flex items-center justify-center gap-2 text-white font-bold py-3 rounded-sm"
                style={{ backgroundColor: '#2A6B4F' }}
                onClick={() => setMenuOpen(false)}
              >
                <LogIn size={18} /> Login Portal
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
