"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, ChevronRight } from "lucide-react";
import { useAppTheme } from "@/context/theme-context";

export function HeroSection() {
  const { theme, colors } = useAppTheme();

  return (
    <>
      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[640px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 transition-colors duration-700"
          style={{ background: `linear-gradient(180deg, ${colors.sectionBg} 0%, ${colors.light} 100%)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
            alt="Wind turbines representing clean energy"
            fill
            className="object-cover opacity-[0.12] transition-opacity duration-700"
            priority
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] transition-colors duration-700"
            style={{
              backgroundImage:
                `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Subtle bottom gradient to blend perfectly */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 transition-colors duration-700"
            style={{ background: `linear-gradient(to top, ${colors.mid}44 0%, transparent 100%)` }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-28 pb-10 transition-colors duration-700">
          {/* Headline */}
          <h1 
            className="text-4xl md:text-7xl font-black mb-2 tracking-tight leading-[1.1] transition-colors duration-700"
            style={{ color: colors.sectionBg === '#ffffff' ? '#0f172a' : '#f8fafc' }}
          >
            <span
              className="block text-transparent bg-clip-text transition-all duration-700"
              style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }}
            >
              Greening of MSMEs
            </span>
            <Link 
              href="https://tg.ramp.metaversedu.in/" 
              target="_blank"
              rel="noopener noreferrer"
              className="block text-2xl md:text-4xl mt-1 font-bold transition-all duration-700 opacity-60 hover:opacity-100 hover:text-indigo-500 underline decoration-indigo-500/30 underline-offset-8"
              style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#94a3b8' }}
            >
              under RAMP
            </Link>
          </h1>
          <p
            className="text-base md:text-xl mb-6 max-w-4xl leading-relaxed font-semibold transition-colors duration-700"
            style={{ color: colors.sectionBg === '#ffffff' ? '#334155' : '#cbd5e1' }}
          >
            The Greening of MSMEs initiative under the RAMP Programme promotes sustainable,
            <br className="hidden md:block" />
            resource-efficient, and low-carbon growth across India's MSME landscape.
            <span
              className="block mt-2 font-medium transition-colors duration-700 opacity-80"
              style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#94a3b8' }}
            >
              We support MSMEs in adopting green technologies and improving energy efficiency
              <br className="hidden md:block" />
              to enhance global competitiveness while reducing environmental impact.
            </span>
          </p>

          {/* 4 Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            {[
              {
                title: "MSMEs Reached for Awareness",
                value: "12,500+",
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Expressions of Interest (EoIs) Received",
                value: "3,240",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "RECP Assessments Completed",
                value: "1,850",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Estimated Reduction in Carbon Footprint",
                value: "2.4M t",
                img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
              },
            ].map((tile, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-3xl h-52 md:h-64 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <Image
                  src={tile.img}
                  alt={tile.title}
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.4] saturate-[0.8] contrast-[1.1] opacity-70"
                />

                {/* Visual Accent Layer */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: colors.accent }}
                />

                {/* Linear overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 text-left">
                  <p
                    className="text-[15px] font-black uppercase tracking-widest mb-3 line-clamp-2 leading-snug transition-colors text-slate-300 group-hover:text-white"
                  >
                    {tile.title}
                  </p>
                  <p className="text-2xl font-black text-white tracking-tight leading-none">{tile.value}</p>
                </div>

                {/* Interaction indicator */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

