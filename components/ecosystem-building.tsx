"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Globe,
  Presentation
} from "lucide-react";

export function EcosystemBuilding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const workshops = [
    {
      title: "Energy Efficiency Workshop",
      location: "Hyderabad, Telangana",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Green Manufacturing Demo",
      location: "Warangal, Telangana",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Panel Discussion",
      location: "Telangana MSMEs Summit",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  const stats = [
    { label: "Conducted", value: "45", icon: <Presentation size={20} className="text-emerald-600" /> },
    { label: "Participants", value: "3,500", icon: <Users size={20} className="text-blue-600" /> },
    { label: "States Covered", value: "12", icon: <Globe size={20} className="text-purple-600" /> },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % workshops.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + workshops.length) % workshops.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-2 px-4 md:px-8 bg-[#F5F3FF] font-sans border-t border-violet-200">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-purple-100/50">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-purple-50 pb-4">
          <div className="space-y-0.5">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase italic">
              Ecosystem <span className="text-emerald-600">Building</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em]">
              Creating a comprehensive support system for MSMEs
            </p>
          </div>
          <div className="max-w-md hidden md:block">
            <p className="text-slate-400 text-[10px] font-medium leading-relaxed italic text-right">
              "Workshops, technology, and partnerships facilitating a sustainable industrial transition."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Stats & Info (Left) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-800 uppercase italic flex items-center gap-2">
                <Presentation size={16} className="text-emerald-600" />
                Workshops
              </h3>
              <p className="text-slate-500 font-medium text-[11px] leading-relaxed">
                Capacity-building programs across Telangana’s industrial clusters.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="bg-[#F9FAFB] p-3 rounded-xl border border-slate-200 flex items-center gap-4 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="w-9 h-9 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 leading-none">{stat.value}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated Slideshow (Right) */}
          <div className="lg:col-span-8 relative group">
            <div className="relative h-[340px] md:h-[380px] w-full overflow-hidden rounded-[20px] shadow-2xl bg-slate-50 border border-slate-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] group-hover:scale-105"
                    style={{ backgroundImage: `url(${workshops[currentIndex].image})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-1.5"
                    >
                      <h4 className="text-lg md:text-xl font-black text-white leading-tight">
                        {workshops[currentIndex].title}
                      </h4>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[9px] tracking-widest">
                        <MapPin size={12} />
                        {workshops[currentIndex].location}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {workshops.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentIndex ? "w-8 bg-emerald-500" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
