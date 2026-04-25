"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid } from "lucide-react";

export function EcosystemBuilding() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  const set1 = [
    { title: "Technical Session", location: "Industrial Cluster", image: "/images/workshops/085A8926.JPG" },
    { title: "Capacity Building", location: "MSME Workshop", image: "/images/workshops/1D8A0937.JPG" },
    { title: "Knowledge Sharing", location: "Sectoral Training", image: "/images/workshops/1D8A1106.JPG" },
    { title: "Industrial Outreach", location: "Field Demonstration", image: "/images/workshops/1D8A8124.JPG" },
    { title: "Energy Audit Training", location: "Manufacturing Unit", image: "/images/workshops/DSC03679.JPG" },
    { title: "Strategic Planning", location: "Stakeholder Meet", image: "/images/workshops/DSC04090.JPG" },
  ];

  const set2 = [
    { title: "Panel Discussion", location: "Regional Summit", image: "/images/workshops/DSC06897.JPG" },
    { title: "Expert Presentation", location: "Technology Hub", image: "/images/workshops/DSC07749.JPG" },
    { title: "Group Workshop Photo", location: "Bollaram Cluster", image: "/images/workshops/Group Photo - Bollaram Workshop 30Jan2026.JPG" },
    { title: "Q&A Session", location: "Technical Seminar", image: "/images/workshops/PANA8454.JPG" },
    { title: "Felicitation Ceremony", location: "Bollaram Workshop", image: "/images/workshops/Shri Madhukar Babu Garu - Shri Ananda Rao, Bollaram Workshop 30Jan2026.JPG" },
  ];

  useEffect(() => {
    const timer1 = setInterval(() => {
      setIndex1((prev) => (prev + 1) % set1.length);
    }, 5000);
    const timer2 = setInterval(() => {
      setIndex2((prev) => (prev + 1) % set2.length);
    }, 6000); // Slightly staggered
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, [set1.length, set2.length]);

  const stats = [
    { label: "CONDUCTED", value: "45" },
    { label: "PARTICIPANTS", value: "3,500+" },
    { label: "SECTORS COVERED", value: "15" },
  ];

  return (
    <div className="w-full bg-[#F8F6F0] py-16 px-8 md:px-12 font-sans selection:bg-emerald-900 selection:text-white">
      {/* Header & Stats Cards */}
      <div className="flex flex-col lg:flex-row justify-between items-end mb-8 pb-8 border-b border-[#E6E2D6] gap-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-1">
            Cluster Engagement • Capacity Building
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-none">
            Ecosystem <span className="text-emerald-600">Building</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-medium max-w-md">
            Collaborative workshops and technical demonstrations across industrial clusters.
          </p>
        </div>

        <div className="flex gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-[#E6E2D6] px-6 py-4 rounded-md min-w-[140px] text-left shadow-sm">
              <div className="text-3xl font-black text-[#102a1d] mb-1">{stat.value}</div>
              <div className="text-[9px] font-bold tracking-[0.2em] text-[#8C8673] uppercase leading-tight">
                {stat.label.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slideshow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px] md:h-[500px]">
        {/* Slideshow 1 */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl group border border-[#E6E2D6]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index1}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={set1[index1].image}
                alt={set1[index1].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-medium text-sm tracking-wide">
                  {set1[index1].title} <span className="text-white/60 mx-1">·</span> {set1[index1].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slideshow 2 */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl group border border-[#E6E2D6]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index2}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={set2[index2].image}
                alt={set2[index2].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-medium text-sm tracking-wide">
                  {set2[index2].title} <span className="text-white/60 mx-1">·</span> {set2[index2].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
