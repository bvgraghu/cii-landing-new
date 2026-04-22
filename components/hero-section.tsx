"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppTheme } from "@/context/theme-context";

const TILES = [
  {
    title: "MSMEs Reached for Awareness",
    value: "12,500+",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    accent: "#10B981",
  },
  {
    title: "Expressions of Interest Received",
    value: "3,240",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    accent: "#059669",
  },
  {
    title: "RECP Assessments Completed",
    value: "1,850",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    accent: "#34d399",
  },
  {
    title: "Estimated State Carbon Reduction",
    value: "2.4M t",
    img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    accent: "#65A30D",
  },
];

export function HeroSection() {
  const { theme, colors } = useAppTheme();

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      {/* NO overflow-hidden, NO items-center/justify-center — content flows naturally */}
      <section className="relative w-full min-h-screen flex flex-col bg-[#bbf7d0]">
        {/* Background image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
            alt="Wind turbines"
            fill
            className="object-cover opacity-[0.3]"
            priority
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content wrapper — top padding clears the fixed two-slab header (topbar 48px + navbar ~44px) */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 pt-28 md:pt-28 pb-12">
          {/* Badge */}
          {/* <div className="mb-5 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full px-5 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
              CII – Telangana MSME Energy Assessment Programme
            </span>
          </div> */}

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl pt-5 font-black mb-4 tracking-tight text-slate-900 leading-[0.9] max-w-5xl">
            <span className="text-emerald-600">Greening of MSMEs</span>
            <br />
            <Link
              href="https://tg.ramp.metaversedu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all underline underline-offset-8 group text-xl sm:text-2xl lg:text-3xl"
              style={{ color: '#2A6B4F', textDecorationColor: 'rgba(42,107,79,0.3)' }}
            >
              under RAMP
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </h1>

          {/* Sub-copy */}
          <p className="text-sm sm:text-base lg:text-lg mb-10 max-w-3xl text-slate-700 leading-relaxed font-medium">
            The Greening of MSMEs initiative under the Raising and Accelerating MSME Performance
            (RAMP) Programme aims to promote sustainable, resource-efficient, and low-carbon growth
            across Micro, Small, and Medium Enterprises (MSMEs) in India.
          </p>

          {/* ── Stat Cards ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl border border-emerald-900/10 bg-emerald-900/20">
            {TILES.map((tile, i) => (
              <div
                key={i}
                className="relative group overflow-hidden h-56 sm:h-64 lg:h-72 cursor-default bg-slate-900"
              >
                <Image
                  src={tile.img}
                  alt={tile.title}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-1000 group-hover:scale-110 brightness-[0.4] saturate-[0.8] group-hover:brightness-[0.55]"
                />

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                  <div
                    className="h-1 mb-4 rounded-full transition-all duration-500 w-10 group-hover:w-20"
                    style={{ backgroundColor: tile.accent }}
                  />
                  <p className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.18em] mb-3 text-emerald-400 leading-snug max-w-[140px] sm:max-w-[180px]">
                    {tile.title}
                  </p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
                    {tile.value}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

