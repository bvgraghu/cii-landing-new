"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Zap, Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Programme", href: "#programme" },
  { label: "MSME Sectors", href: "#sectors" },
  { label: "Impact", href: "#impact" },
  { label: "About CII", href: "#about" },
];

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                <span className={`${scrolled ? 'text-slate-900' : 'text-slate-800'} font-black text-lg tracking-tighter`}>CII</span>
                <span className="text-emerald-600 font-black text-lg tracking-tighter">Energy</span>
              </div>
              <p className={`text-[10px] ${scrolled ? 'text-slate-500' : 'text-slate-500'} font-bold uppercase tracking-[0.15em]`}>Telangana MSME Programme</p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${scrolled ? 'text-slate-600' : 'text-slate-700'} hover:text-emerald-600 text-[13px] font-semibold transition-colors tracking-wide`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold px-5 py-2.5 rounded-lg transition-all shadow-md shadow-emerald-500/10"
            >
              Apply for Audit <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`${scrolled ? 'text-slate-900' : 'text-slate-800'} md:hidden hover:text-emerald-600`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-6 flex flex-col gap-4 shadow-xl">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-700 hover:text-emerald-600 text-[15px] font-bold py-1 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[640px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
            alt="Wind turbines representing clean energy"
            fill
            className="object-cover opacity-[0.04] grayscale"
            priority
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16, 185, 129, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Subtle bottom gradient to blend perfectly */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(to top, rgb(224,255,224) 0%, transparent 100%)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-24 pb-20">
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-5 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-[10px] font-bold tracking-widest uppercase">
              CII – Telangana MSME Energy Assessment Programme
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #059669, #10b981)" }}
            >
              Greening of MSMEs
            </span>{" "}
            under RAMP
          </h1>
          <p className="text-base md:text-lg mb-12 max-w-4xl text-slate-600 leading-relaxed font-semibold opacity-90">
            The Greening of MSMEs initiative under the Raising and Accelerating MSME Performance (RAMP) Programme aims to promote sustainable, resource-efficient, and low-carbon growth across Micro, Small, and Medium Enterprises (MSMEs) in India.
            <span className="block mt-4">
              The program supports MSMEs in adopting green technologies, improving energy efficiency, and reducing environmental impact while enhancing competitiveness.
            </span>
          </p>

          {/* 4 Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
            {[
              {
                title: "MSMEs Reached for Awareness",
                value: "12,500+",
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", // Elegant empty conference/training room
                accent: "#10B981",
              },
              {
                title: "Expressions of Interest (EoIs) Received",
                value: "3,240",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop", // Close-up of paperwork, signature, calculator
                accent: "#059669",
              },
              {
                title: "RECP Assessments Completed",
                value: "1,850",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop", // Macro shot of industrial pressure gauges
                accent: "#34d399",
              },
              {
                title: "Estimated Reduction in State Carbon Footprint",
                value: "2.4M t",
                img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop", // Munnar, India. Iconic lush green tea gardens (Carbon reduction)
                accent: "#65A30D",
              },
            ].map((tile, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-2xl h-48 md:h-56 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <Image
                  src={tile.img}
                  alt={tile.title}
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.85] saturate-[0.8] contrast-[1.05]"
                />
                {/* subtle accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ backgroundColor: tile.accent }} />

                {/* Linear overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-5 text-left">
                  <p className="text-[11px] font-black uppercase tracking-[0.1em] mb-1.5 line-clamp-3 leading-[1.4] text-emerald-300 drop-shadow-md">
                    {tile.title}
                  </p>
                  <p className="text-3xl font-black text-white mt-1 tracking-tight leading-none">{tile.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
