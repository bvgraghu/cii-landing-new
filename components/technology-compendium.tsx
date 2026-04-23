"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Download,
  Flame,
  Settings,
  Sun,
  Zap,
  ArrowRight
} from "lucide-react";

export function TechnologyCompendium() {
  const tiles = [
    {
      id: 1,
      title: "Motor Systems Guide",
      subtitle: "36 Pages · Comprehensive optimization and performance benchmarks for industrial drives.",
      category: "Motors",
      image: "/images/tech-hub/motors.png",
      span: "col-span-2 row-span-2",
      type: "image",
      icon: <Settings size={24} />
    },
    {
      id: 2,
      title: "Boiler Efficiency",
      subtitle: "Benchmark your thermal systems against industry standards.",
      category: "Boilers",
      span: "col-span-1 row-span-1",
      type: "solid",
      bgColor: "bg-[#0F766E]", // Teal
      cta: "VIEW GUIDE"
    },
    {
      id: 3,
      title: "Waste Heat Recovery",
      subtitle: "52 Pages · Advanced heat exchange technologies for MSMEs.",
      category: "Thermal",
      image: "/images/tech-hub/waste-heat.png",
      span: "col-span-1 row-span-1",
      type: "image",
      icon: <Zap size={20} />
    },
    {
      id: 4,
      title: "Green Tech Portal",
      subtitle: "Access our centralized repository of proven EE technologies.",
      category: "Resource",
      span: "col-span-1 row-span-1",
      type: "solid",
      bgColor: "bg-[#1E3A8A]", // Blue
      cta: "READ MORE"
    },
    {
      id: 5,
      title: "Institutional Roadmap",
      subtitle: "Strategic guidelines for MSME industrial scaling and decarbonization.",
      category: "Strategy",
      span: "col-span-1 row-span-1",
      type: "solid",
      bgColor: "bg-[#6D28D9]", // Purple
      cta: "EXPLORE"
    },
    {
      id: 6,
      title: "Solar Energy Solutions",
      subtitle: "44 Pages · Rooftop integration and financial modeling for decentralized solar.",
      category: "Solar",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
      span: "col-span-2 row-span-1",
      type: "image",
      icon: <Sun size={24} />
    },
    {
      id: 7,
      title: "Resource Library",
      subtitle: "Search through 120+ verified technical case studies.",
      category: "Archives",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
      span: "col-span-1 row-span-1",
      type: "image",
      icon: <BookOpen size={20} />
    },
    {
      id: 8,
      title: "Financial Incentives",
      subtitle: "Schemes and subsidies available for industrial greening.",
      category: "Finance",
      span: "col-span-1 row-span-1",
      type: "solid",
      bgColor: "bg-[#0d9488]", // Teal-600
      cta: "VIEW ALL"
    },
  ];

  return (
    <section className="w-full py-8 bg-[#F1F5F9] font-sans border-t-2 border-slate-200">
      <div className="w-full px-4 md:px-8 mb-12">
        {/* Header Section: Multi-column layout to utilize space */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight uppercase italic leading-none">
              Technology <span className="text-emerald-600">Compendium</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.25em]">
              Centralized repository of proven energy-efficient technologies
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 lg:gap-12">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <p className="text-3xl font-black text-slate-900 leading-none">120+</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Technologies</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="flex flex-col">
                <p className="text-3xl font-black text-slate-900 leading-none">4</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Categories</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all"
            >
              Access Resource Library <Download size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Full-Width Wipro-style Collage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-0 grid-auto-flow-dense w-full">
        {tiles.map((tile, index) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ zIndex: 10 }}
            className={`relative overflow-hidden group cursor-pointer ${tile.span}`}
          >
            {tile.type === "image" ? (
              <>
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${tile.image})` }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-emerald-400">
                      {tile.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      {tile.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-xl leading-tight mb-2 group-hover:text-emerald-300 transition-colors">
                    {tile.title}
                  </h3>

                  <p className="text-white/70 text-sm font-medium line-clamp-2 max-w-sm">
                    {tile.subtitle}
                  </p>
                </div>
              </>
            ) : (
              <div className={`absolute inset-0 ${tile.bgColor} p-8 flex flex-col justify-between h-full group-hover:brightness-110 transition-all`}>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-6 block">
                    {tile.category}
                  </span>
                  <h3 className="font-black text-white text-2xl leading-tight mb-4">
                    {tile.title}
                  </h3>
                  <p className="text-white/80 text-sm font-medium leading-relaxed">
                    {tile.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-white font-black text-[11px] tracking-widest mt-auto">
                  {tile.cta} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="w-full h-12 bg-slate-200/50 border-t border-slate-200 mt-0" />
    </section>
  );
}
