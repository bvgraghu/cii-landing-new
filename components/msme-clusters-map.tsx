"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Factory, Users, TrendingUp, Info } from "lucide-react";
import { useAppTheme } from "@/context/theme-context";

/* ─── Map Constants ───────────────────────────────────────────────────────── */

const TELANGANA_SVG_URL = "https://raw.githubusercontent.com/mranilkish/TelanganaMap/main/t.svg";

// District name mapping from SVG `name` attribute
const SVG_NAME_TO_DISTRICT: Record<string, string> = {
  "Hyderabad": "Hyderabad",
  "Ranga Reddy": "Rangareddy",
  "Medchal": "Medchal-Malkajgiri",
  "Sangareddy": "Sangareddy",
  "Medak": "Medak",
  "Siddipet": "Siddipet",
  "Kamareddy": "Kamareddy",
  "Nizamabad": "Nizamabad",
  "Nirmal": "Nirmal",
  "Adilabad": "Adilabad",
  "Komaram Bheem": "Komaram Bheem",
  "Mancherial": "Mancherial",
  "Peddapalli": "Peddapalli",
  "Jayashankar": "Jayashankar Bhupalpally",
  "Bhadradri": "Bhadradri Kothagudem",
  "Khammam": "Khammam",
  "Nalgonda": "Nalgonda",
  "Suryapet": "Suryapet",
  "Yadadri": "Yadadri Bhuvanagiri",
  "Jangaon": "Jangaon",
  "Warangal(urban)": "Warangal Urban",
  "Warangal(rural)": "Warangal Rural",
  "Mahabubabad": "Mahabubabad",
  "Karimnagar": "Karimnagar",
  "Jagtial": "Jagtial",
  "Rajanna": "Rajanna Sircilla",
  "Vikarabad": "Vikarabad",
  "Nagarkurnool": "Nagarkurnool",
  "Wanaparthy": "Wanaparthy",
  "Gadwal": "Jogulamba Gadwal",
  "Mahbubnagar": "Mahbubnagar",
  "Narayanpet": "Narayanpet",
  "Mulugu": "Mulugu",
};

/* ─── Cluster Data ────────────────────────────────────────────────────────── */

export const CLUSTERS_DATA = [
  { id: 1, name: "Balanagar", msmes: 2387, svgDistrict: "Hyderabad", rank: "Top 5", topSector: "Engineering, Metals (50%)", otherSectors: "Pharma, Chemicals (15%)" },
  { id: 2, name: "Jeedimetla", msmes: 2378, svgDistrict: "Hyderabad", rank: "Top 5", topSector: "Pharma & Chemicals (33%)", otherSectors: "Engineering & Metals (30%)" },
  { id: 3, name: "Katedan", msmes: 1119, svgDistrict: "Hyderabad", rank: "Top 20", topSector: "Food Processing (35%)", otherSectors: "Engineering, Metals (20%)" },
  { id: 4, name: "Cherlapally", msmes: 967, svgDistrict: "Medchal", rank: "Top 20", topSector: "Pharma, Chemicals (30%)", otherSectors: "Engineering, Metals (30%)" },
  { id: 5, name: "Medchal-Malkajgiri", msmes: 1871, svgDistrict: "Medchal", rank: "Top 5", topSector: "Food Processing (16%)", otherSectors: "Fabrication (16%)" },
  { id: 6, name: "Nacharam", msmes: 1103, svgDistrict: "Medchal", rank: "Top 20", topSector: "Engineering, Metals (35%)", otherSectors: "Chemicals, Rubber (50%)" },
  { id: 7, name: "Hanumakonda", msmes: 1176, svgDistrict: "Warangal(urban)", rank: "Top 20", topSector: "Food Processing (38%)", otherSectors: "Textiles (31%)" },
  { id: 8, name: "Karimnagar", msmes: 1709, svgDistrict: "Karimnagar", rank: "Top 20", topSector: "Food Processing (36%)", otherSectors: "Textiles (33%)" },
  { id: 9, name: "Khammam", msmes: 1615, svgDistrict: "Khammam", rank: "Top 20", topSector: "Food Processing (49%)", otherSectors: "Non-metallic mineral (17%)" },
  { id: 10, name: "Mahabubnagar", msmes: 1168, svgDistrict: "Mahbubnagar", rank: "Top 20", topSector: "Food Processing (57%)", otherSectors: "Textiles (13.5%)" },
  { id: 11, name: "Maheshwaram", msmes: 1119, svgDistrict: "Ranga Reddy", rank: "Top 20", topSector: "Engineering, Electrical (45%)", otherSectors: "Food Processing (30%)" },
  { id: 12, name: "Mancherial", msmes: 1408, svgDistrict: "Mancherial", rank: "Top 20", topSector: "Food Processing (42%)", otherSectors: "Textiles (42%)" },
  { id: 13, name: "Medak", msmes: 1077, svgDistrict: "Medak", rank: "Top 20", topSector: "Food Processing (53%)", otherSectors: "Textiles (16%)" },
  { id: 14, name: "Nalgonda", msmes: 2856, svgDistrict: "Nalgonda", rank: "Top 5", topSector: "Food Processing (48%)", otherSectors: "Textile (28%)" },
  { id: 15, name: "Nizamabad", msmes: 2341, svgDistrict: "Nizamabad", rank: "Top 5", topSector: "Food Processing (39%)", otherSectors: "Textiles (37%)" },
  { id: 16, name: "Patancheru", msmes: 741, svgDistrict: "Sangareddy", rank: "Top 20", topSector: "Pharma, Chemicals (50%)", otherSectors: "Engineering, Metals (20%)" },
  { id: 17, name: "Rajanna Sircilla", msmes: 1822, svgDistrict: "Rajanna", rank: "Top 20", topSector: "Textiles (65%)", otherSectors: "Food Processing (26%)" },
  { id: 18, name: "Sangareddy", msmes: 1319, svgDistrict: "Sangareddy", rank: "Top 20", topSector: "Food Processing (35%)", otherSectors: "Textiles (10%)" },
  { id: 19, name: "Warangal", msmes: 1550, svgDistrict: "Warangal(urban)", rank: "Top 20", topSector: "Food Processing (50%)", otherSectors: "Textiles (27%)" },
  { id: 20, name: "Yadadri Bhuvanagiri", msmes: 1421, svgDistrict: "Yadadri", rank: "Top 20", topSector: "Textiles (56%)", otherSectors: "Food Processing (28%)" },
];

/* ─── Components ───────────────────────────────────────────────────────────── */

export function MSMEClustersMap() {
  const { theme, colors } = useAppTheme();
  const [hoveredSvgDistrict, setHoveredSvgDistrict] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'clusters' | 'sectors'>('clusters');
  const [mapView, setMapView] = useState<'state' | 'hub'>('state');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const activeClusters = useMemo(() => {
    if (!hoveredSvgDistrict) return [];
    return CLUSTERS_DATA.filter(c => c.svgDistrict === hoveredSvgDistrict).sort((a, b) => b.msmes - a.msmes);
  }, [hoveredSvgDistrict]);

  const top5ClustersGlobally = useMemo(() => {
    return [...CLUSTERS_DATA].sort((a, b) => b.msmes - a.msmes).slice(0, 5);
  }, []);

  // Map Loading Effect
  useEffect(() => {
    if (!mounted || !svgContainerRef.current) return;

    fetch(TELANGANA_SVG_URL)
      .then(res => res.text())
      .then(svgText => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (!svg) return;

        // Clean & Style SVG
        svg.querySelectorAll("metadata, sodipodi\\:namedview, defs").forEach(el => el.remove());
        
        // Fix scaling: Map width/height to viewBox
        const w = svg.getAttribute("width") || "928";
        const h = svg.getAttribute("height") || "875";
        svg.setAttribute("viewBox", `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        
        // Remove the non-district outline path
        const firstPath = svg.querySelector("path:not([name])");
        if (firstPath) firstPath.remove();

        svg.setAttribute("class", "w-full h-auto cursor-crosshair mx-auto");
        svg.style.maxHeight = "90%";
        svg.style.filter = "drop-shadow(0 15px 40px rgba(16, 185, 129, 0.1))";

        // Style Paths
        svg.querySelectorAll("path[name]").forEach(path => {
          const el = path as SVGPathElement;
          const svgName = el.getAttribute("name") || "";
          
          const normalizedSvgName = svgName.trim().toLowerCase();
          const clustersInDistrict = CLUSTERS_DATA.filter(c => c.svgDistrict.toLowerCase() === normalizedSvgName || c.svgDistrict === svgName);
          const hasTop5 = clustersInDistrict.some(c => c.rank === "Top 5");
          const hasTop20 = clustersInDistrict.length > 0 && !hasTop5;
          const isHighest = normalizedSvgName === "hyderabad" || normalizedSvgName === "ranga reddy" || normalizedSvgName === "medchal";

          const defaultFill = isHighest ? colors.accent : hasTop5 ? colors.primary : hasTop20 ? colors.mid : colors.light;
          const defaultStroke = isHighest ? colors.accent : hasTop5 ? colors.primary : hasTop20 ? colors.primary + '44' : colors.mid;
          
          const hoverFill = isHighest ? colors.accent : hasTop5 ? colors.primary : hasTop20 ? colors.primary + '88' : colors.mid;
          const hoverStroke = isHighest ? colors.accent : hasTop5 ? colors.accent : hasTop20 ? colors.primary : colors.primary;

          el.style.fill = defaultFill;
          el.style.stroke = defaultStroke;
          el.style.strokeWidth = "0.8";
          el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.cursor = clustersInDistrict.length > 0 ? "pointer" : "default";

          el.addEventListener("mouseenter", () => {
            setHoveredSvgDistrict(svgName);
            el.style.fill = hoverFill;
            el.style.stroke = hoverStroke;
            if (clustersInDistrict.length > 0 || isHighest) {
              const shadowColor = isHighest ? "rgba(6, 95, 70, 0.5)" : hasTop5 ? "rgba(16, 185, 129, 0.4)" : "rgba(167, 243, 208, 0.6)";
              el.style.filter = `drop-shadow(0 0 12px ${shadowColor}) translate(0, -2px)`;
              el.style.zIndex = "50";
            }
          });

          el.addEventListener("mouseleave", () => {
            setHoveredSvgDistrict(null);
            el.style.fill = defaultFill;
            el.style.stroke = defaultStroke;
            el.style.filter = "";
            el.style.zIndex = "1";
          });
        });

        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = "";
          svgContainerRef.current.appendChild(svg);
          setSvgLoaded(true);
        }
      });
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section id="clusters" className="w-full bg-slate-50 py-24 px-6 md:px-12 font-sans border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div 
            className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border"
            style={{ color: colors.accent, borderColor: colors.mid }}
          >
            <Factory size={12} style={{ color: colors.primary }} />
            Geography of Impact
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-none italic">
            Strategic Action Zones for <span style={{ color: colors.primary }}>Green Transformation</span>
          </h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-2xl mx-auto">
            Mapping resource-intensive manufacturing hubs prioritized for energy efficiency interventions
          </p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-auto lg:h-[520px]">

          <div 
            className="w-full lg:w-1/2 h-[450px] lg:h-full relative p-6 lg:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border transition-all duration-700 overflow-hidden"
            style={{ backgroundColor: `${colors.mid}11`, borderColor: colors.mid }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            
            {/* Map View Toggle */}
            <div className="absolute top-6 right-6 z-20 flex gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-slate-100">
              <button 
                onClick={() => setMapView('state')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mapView === 'state' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                style={{ backgroundColor: mapView === 'state' ? colors.primary : 'transparent' }}
              >
                State View
              </button>
              <button 
                onClick={() => setMapView('hub')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mapView === 'hub' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                style={{ backgroundColor: mapView === 'hub' ? colors.primary : 'transparent' }}
              >
                Hub Focus
              </button>
            </div>

            {/* Quick Stats Overlay (Top Left) */}
            <div className="absolute top-6 left-6 flex flex-col gap-3 z-10 bg-white/90 backdrop-blur-md p-3 lg:p-4 rounded-2xl shadow-sm border border-slate-100">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Target Network</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-800">31,147</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">MSMEs</span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Active Scope</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-800">20</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Clusters</span>
                </div>
              </div>
            </div>

            {/* Map Legend (Bottom Center) */}
            <div className="absolute bottom-6 left-0 w-full flex justify-center z-10 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-slate-100 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.accent }} /><span className="text-[9px] font-black text-slate-600 uppercase tracking-wider">Highest Density</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.primary }} /><span className="text-[9px] font-black text-slate-600 uppercase tracking-wider">Top 5</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.mid }} /><span className="text-[9px] font-black text-slate-600 uppercase tracking-wider">Top 20</span></div>
              </div>
            </div>

            {!svgLoaded && (
              <div className="flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Constructing Map...</p>
              </div>
            )}

            <div className={`w-full h-full relative ${mapView === 'hub' ? 'hub-zoomed' : 'state-view'}`}>
               <style>{`
                 .hub-zoomed > div > svg, .state-view > div > svg {
                    width: 100%;
                    height: 100%;
                 }
                 .hub-zoomed > div > svg {
                   transform: scale(3.5) translate(10%, -6%);
                   transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                 }
                 .state-view > div > svg {
                   transform: scale(1) translate(0, 0);
                   transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                 }
                 .hub-zoomed > div > svg path {
                   fill: #f1f5f9 !important;
                   stroke: #e2e8f0 !important;
                   opacity: 0.6 !important;
                   filter: none !important;
                 }
                 .hub-zoomed > div > svg path:is([name="Hyderabad"], [name="Ranga Reddy"], [name="Medchal"], [name="Sangareddy"]) {
                   fill: #0d9488 !important;   /* Vivid Teal */
                   stroke: #0f766e !important;
                   opacity: 1 !important;
                   filter: drop-shadow(0 0 10px rgba(13, 148, 136, 0.5)) !important;
                 }
               `}</style>
               <div ref={svgContainerRef} className="w-full h-full flex justify-center items-center overflow-visible pt-16 pb-12" />
            </div>

            {/* Floating Tooltip Inside Map */}
            <AnimatePresence>
              {hoveredSvgDistrict && activeClusters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-50 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl min-w-[200px]"
                  style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
                >
                  <p className="text-[10px] font-black text-white uppercase tracking-widest mb-2 border-b border-slate-700 pb-2">
                    {SVG_NAME_TO_DISTRICT[hoveredSvgDistrict]} Sectors
                  </p>
                  <div className="space-y-2">
                    {activeClusters.slice(0, 3).map(c => (
                       <div key={c.id}>
                         <p className="text-[10px] font-bold text-emerald-400 leading-none mb-1">{c.name}</p>
                         <p className="text-[10px] text-slate-300 leading-tight"><span className="text-white font-medium">Main Sector:</span> {c.topSector}</p>
                         {c.otherSectors && <p className="text-[9px] text-slate-400 leading-tight mt-0.5"><span className="text-slate-300 font-medium">Other Sectors:</span> {c.otherSectors}</p>}
                       </div>
                    ))}
                    {activeClusters.length > 3 && <p className="text-[9px] text-slate-500 italic mt-2 py-1 border-t border-slate-800">+{activeClusters.length - 3} more clusters</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Selected Info / Global Ranking */}
          <div className="w-full lg:w-1/2 h-[450px] lg:h-full flex flex-col gap-6">
            
            <AnimatePresence mode="wait">
              {hoveredSvgDistrict && activeClusters.length > 0 ? (
                <motion.div
                  key="district-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 h-full overflow-y-auto"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
                      style={{ backgroundColor: colors.light, color: colors.primary }}
                    >
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest leading-none" style={{ color: colors.primary }}>Selected District</p>
                      <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tighter mt-1">{SVG_NAME_TO_DISTRICT[hoveredSvgDistrict]}</h3>
                    </div>
                  </div>

                  <div className="flex gap-4 border-b border-slate-100 mb-6 sticky top-0 bg-white/95 backdrop-blur-sm z-10 pt-2">
                    <button 
                      onClick={() => setActiveTab('clusters')} 
                      className={`text-[11px] font-black uppercase tracking-widest pb-3 border-b-2 transition-colors ${activeTab === 'clusters' ? 'text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      style={{ borderBottomColor: activeTab === 'clusters' ? colors.primary : 'transparent' }}
                    >
                      Cluster View
                    </button>
                    <button 
                      onClick={() => setActiveTab('sectors')} 
                      className={`text-[11px] font-black uppercase tracking-widest pb-3 border-b-2 transition-colors ${activeTab === 'sectors' ? 'text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      style={{ borderBottomColor: activeTab === 'sectors' ? colors.primary : 'transparent' }}
                    >
                      Sector View
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {activeTab === 'clusters' ? activeClusters.map((cluster) => (
                      <div 
                        key={cluster.id} 
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-100 transition-colors"
                        style={{ borderColor: hoveredSvgDistrict ? colors.mid + '44' : undefined }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="text-base font-black text-slate-800">{cluster.name}</h5>
                            <span 
                              className="inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-colors"
                              style={{ 
                                backgroundColor: cluster.rank === 'Top 5' ? colors.primary : colors.mid, 
                                color: cluster.rank === 'Top 5' ? 'white' : colors.accent 
                              }}
                            >
                              {cluster.rank}
                            </span>
                          </div>
                          <div className="text-right">
                            <span 
                              className="text-xl font-black italic leading-none block transition-colors"
                              style={{ color: colors.primary }}
                            >
                              {cluster.msmes.toLocaleString()}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">MSMEs</span>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-100">
                          <p className="text-xs font-semibold text-slate-600 mb-1"><span className="text-slate-400 font-bold uppercase text-[9px] mr-1 tracking-widest">Primary:</span> {cluster.topSector}</p>
                          <p className="text-[11px] font-medium text-slate-500"><span className="text-slate-400 font-bold uppercase text-[9px] mr-1 tracking-widest">Secondary:</span> {cluster.otherSectors}</p>
                        </div>
                      </div>
                    )) : activeClusters.flatMap(c => [
                      { source: c.name, title: c.topSector, type: 'Primary' },
                      ...(c.otherSectors ? [{ source: c.name, title: c.otherSectors, type: 'Secondary' }] : [])
                    ]).map((sector, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                        <p className="font-bold text-slate-800 text-[13px] mb-2">{sector.title}</p>
                        <div className="flex flex-wrap items-center gap-2">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${sector.type === 'Primary' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>{sector.type} Sector</span>
                           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Focus in {sector.source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="global-ranking"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 h-full overflow-y-auto flex flex-col"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div 
                      className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg transition-transform"
                      style={{ backgroundColor: colors.primary, boxShadow: `0 10px 20px ${colors.primary}33` }}
                    >
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest leading-none" style={{ color: colors.primary }}>Global Ranking</p>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter mt-1">Top 5 Mega-Clusters</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                    Hover over the map to view specific district data. The top 5 clusters alone account for nearly <strong className="text-slate-800">11,800 MSMEs</strong> prioritized for immediate RECP interventions.
                  </p>

                  <div className="space-y-3">
                    {top5ClustersGlobally.map((cluster, idx) => (
                      <div key={cluster.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-500 group-hover:text-emerald-700 group-hover:border-emerald-300">
                            #{idx + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-800 group-hover:text-emerald-800">{cluster.name}</h5>
                            <p className="text-[10px] font-semibold text-slate-500">{cluster.svgDistrict} District</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-emerald-600 text-lg">{cluster.msmes.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div 
                    className="mt-8 p-4 rounded-2xl border flex items-start gap-3 transition-colors"
                    style={{ backgroundColor: colors.light, borderColor: colors.mid }}
                  >
                    <Info size={16} className="shrink-0 mt-0.5" style={{ color: colors.primary }} />
                    <p className="text-xs font-medium leading-relaxed" style={{ color: colors.accent }}>
                      Sectors including <strong>Food Processing</strong>, <strong>Pharma & Chemicals</strong>, and <strong>Engineering & Metals</strong> form the bulk of the high-impact greening targets.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
