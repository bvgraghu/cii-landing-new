"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    title: "Number of Proposals Issued",
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
    value: "2.4 Mt",
    img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
    accent: "#65A30D",
  },
];

const SLIDES = [
  "The Government of Telangana has launched the Greening of MSMEs initiative to support MSMEs in adopting sustainable practices, improving energy and resource efficiency, reducing costs, and transitioning towards greener technologies. As part of this initiative, 2,000 MSMEs across Telangana will receive free Resource Efficiency and Cleaner Production (RECP) assessments.",
  "The Greening of MSMEs in Telangana initiative is part of the Raising and Accelerating MSME Performance (RAMP) Programme by the Government of India, supported by the World Bank. The programme aims to enhance MSME competitiveness by improving access to markets and finance, strengthening institutional support systems, and enabling coordinated, reform-driven implementation at the state level."
];

export function HeroSection() {
  const { theme, colors } = useAppTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
            <span className="text-emerald-600">Greening of MSMEs in Telangana</span>
            <br />
            <Link
              href="https://tg.ramp.metaversedu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all underline underline-offset-8 group text-xl sm:text-2xl lg:text-3xl"
              style={{ color: '#2A6B4F', textDecorationColor: 'rgba(42,107,79,0.3)' }}
            >
              Under Raising and Accelerating MSME Performance (RAMP) Programme
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </h1>

          {/* Sub-copy Slideshow */}
          <div className="relative min-h-[140px] sm:min-h-[100px] lg:min-h-[80px] my-6 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium"
              >
                {SLIDES[currentSlide]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2 mb-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === i ? "w-8 bg-emerald-600" : "w-2 bg-emerald-600/30 hover:bg-emerald-600/50"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

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
                  <p className="text-[18px] sm:text-[18px] font-bold uppercase tracking-[0.18em] mb-3 text-emerald-400 leading-snug max-w-[140px] sm:max-w-[180px]">
                    {tile.title}
                  </p>
                  <p className="text-[58px] sm:text-[58px] font-black text-white tracking-tighter drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
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
      <section className="relative z-20 w-full border-t border-emerald-900/10 bg-white px-6 md:px-12 py-12 shadow-[0_-18px_45px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-600" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
            <h3 className="font-semibold text-slate-800 mb-4">
              MSMEs Reached vs Target
            </h3>

            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>1,280 reached</span>
              <span>2,000 target</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3 ring-1 ring-slate-900/5">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-lime-500 w-[64%]" />
            </div>

            <p className="text-xs font-medium text-emerald-700">
              64% of target achieved
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
            <h3 className="font-semibold text-slate-800 mb-4">
              Energy Assessments Completed vs Target
            </h3>

            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>720 completed</span>
              <span>1,280 reached</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3 ring-1 ring-slate-900/5">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-lime-500 w-[56%]" />
            </div>

            <p className="text-xs font-medium text-emerald-700">
              56% assessment rate
            </p>
          </div>

        </div>
      </section>
    </>
  );
}

