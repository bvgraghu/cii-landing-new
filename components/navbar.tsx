"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* ── TOPBAR (DARK SLAB) ───────────────────────────────────────── */}
        <div
          className="w-full h-12 px-6 md:px-16 flex items-center justify-between overflow-hidden"
          style={{
            backgroundColor: '#0F1724',
            borderBottom: '1px solid #C8963C',
          }}
        >
          <div className="flex items-center gap-6 h-full py-2">
            <div className="h-full w-auto flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="GOI"
                className="h-full"
                style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(45%) saturate(600%) hue-rotate(10deg) brightness(95%)' }}
              />
            </div>

            <div className="flex items-center gap-4 h-full border-l pl-6" style={{ borderColor: 'rgba(200,150,60,0.3)' }}>
              <div className="hidden xl:flex flex-col">
                <span
                  className="font-display leading-tight"
                  style={{
                    fontSize: '13px',
                    fontVariant: 'small-caps',
                    color: 'rgba(255,255,255,0.90)',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  Office of the Principal Scientific Adviser
                </span>
                <span
                  className="font-display leading-none mt-0.5"
                  style={{
                    fontSize: '11px',
                    fontVariant: 'small-caps',
                    color: 'rgba(255,255,255,0.50)',
                    fontWeight: 500,
                  }}
                >
                  to the Government of India
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Removed Information Dashboard and Portal Login */}
          </div>
        </div>

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
              <span
                className="font-display font-bold tracking-tight"
                style={{ fontSize: '20px', color: '#2A6B4F' }}
              >
                CII Energy
              </span>
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
                    className="font-numbers uppercase group-hover:text-[#2A6B4F] transition-colors"
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#1A1F2E',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: '#2A6B4F' }}
                  />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="https://cii.metaversedu.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-5 py-2 rounded-sm transition-all hover:brightness-110 active:scale-95 font-numbers uppercase"
                style={{
                  backgroundColor: '#2A6B4F',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
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
