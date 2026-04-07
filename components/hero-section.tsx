"use client";

import Image from "next/image";
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
          style={{ background: `linear-gradient(180deg, #ffffff 0%, ${colors.light} 100%)` }}
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
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-24 pb-20">
          {/* Badge */}
          <div 
            className="mb-8 flex items-center gap-2 rounded-full px-5 py-2 shadow-sm border transition-all duration-300 backdrop-blur-sm"
            style={{ 
              backgroundColor: `${colors.primary}08`, 
              borderColor: `${colors.primary}22` 
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: colors.primary }}
            />
            <span 
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: colors.accent }}
            >
              CII – Telangana MSME Energy Assessment Programme
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-[1.05]">
            <span
              className="text-transparent bg-clip-text transition-all duration-700"
              style={{ backgroundImage: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }}
            >
              Greening of MSMEs
            </span>{" "}
            under RAMP
          </h1>
          <p className="text-base md:text-xl mb-12 max-w-4xl text-slate-600 leading-relaxed font-semibold opacity-90">
            The Greening of MSMEs initiative under the Raising and Accelerating MSME Performance (RAMP) Programme aims to promote sustainable, resource-efficient, and low-carbon growth across Micro, Small, and Medium Enterprises (MSMEs) in India.
            <span className="block mt-4 text-slate-500 font-medium">
              The program supports MSMEs in adopting green technologies, improving energy efficiency, and reducing environmental impact while enhancing competitiveness.
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.75] saturate-[0.8] contrast-[1.1]"
                />
                
                {/* Visual Accent Layer */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: colors.accent }}
                />

                {/* Linear overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent flex flex-col justify-end p-6 text-left">
                  <p 
                    className="text-[11px] font-black uppercase tracking-[0.15em] mb-2 line-clamp-2 leading-[1.4] transition-colors"
                    style={{ color: colors.mid }}
                  >
                    {tile.title}
                  </p>
                  <p className="text-4xl font-black text-white tracking-tighter leading-none">{tile.value}</p>
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

