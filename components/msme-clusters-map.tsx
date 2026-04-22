"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Factory, Users, TrendingUp, Info, Award, 
  Calendar, ChevronDown, Map, Crosshair, Building, 
  Home, Plus, Minus, BarChart2, ChevronRight, Leaf 
} from "lucide-react";

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
  const [hoveredSvgDistrict, setHoveredSvgDistrict] = useState<string | null>(null);
  const [selectedSvgDistrict, setSelectedSvgDistrict] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'state' | 'hub'>('state');
  const [scale, setScale] = useState(1.15);
  const [mounted, setMounted] = useState(false);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const hoveredClusters = useMemo(() => {
    if (!hoveredSvgDistrict) return [];
    return CLUSTERS_DATA.filter(c => c.svgDistrict === hoveredSvgDistrict).sort((a, b) => b.msmes - a.msmes);
  }, [hoveredSvgDistrict]);

  const selectedClusters = useMemo(() => {
    if (!selectedSvgDistrict) return [];
    return CLUSTERS_DATA.filter(c => c.svgDistrict === selectedSvgDistrict).sort((a, b) => b.msmes - a.msmes);
  }, [selectedSvgDistrict]);

  const top5ClustersGlobally = useMemo(() => {
    return [...CLUSTERS_DATA].sort((a, b) => b.msmes - a.msmes).slice(0, 5);
  }, []);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setScale(1.15);

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
        svg.style.maxHeight = "100%";
        svg.style.filter = "drop-shadow(0 10px 25px rgba(15, 118, 110, 0.1))";

        // Style Paths
        svg.querySelectorAll("path[name]").forEach(path => {
          const el = path as SVGPathElement;
          const svgName = el.getAttribute("name") || "";
          
          const normalizedSvgName = svgName.trim().toLowerCase();
          const clustersInDistrict = CLUSTERS_DATA.filter(c => c.svgDistrict.toLowerCase() === normalizedSvgName || c.svgDistrict === svgName);
          
          const msmesInDistrict = clustersInDistrict.reduce((sum, c) => sum + c.msmes, 0);
          
          let defaultFill = "#a7f3d0"; // Lightest green (< 250)
          if (msmesInDistrict >= 2500) defaultFill = "#064e3b"; // Darkest green
          else if (msmesInDistrict >= 1500) defaultFill = "#0f766e"; 
          else if (msmesInDistrict >= 750) defaultFill = "#10b981"; 
          else if (msmesInDistrict >= 250) defaultFill = "#6ee7b7"; 

          const defaultStroke = "rgba(255, 255, 255, 0.6)";
          const hoverFill = "#022c22";
          const hoverStroke = "#ffffff";

          el.style.fill = defaultFill;
          el.style.stroke = defaultStroke;
          el.style.strokeWidth = "0.8";
          el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

          el.addEventListener("mouseenter", () => {
            setHoveredSvgDistrict(svgName);
            el.style.fill = hoverFill;
            el.style.stroke = hoverStroke;
            el.style.zIndex = "50";
            el.style.filter = "brightness(1.1) drop-shadow(0 0 10px rgba(0,0,0,0.2))";
          });

          el.addEventListener("click", () => {
            setSelectedSvgDistrict(prev => prev === svgName ? null : svgName);
          });

          el.addEventListener("mouseleave", () => {
            setHoveredSvgDistrict(null);
            if (selectedSvgDistrict !== svgName) {
              el.style.fill = defaultFill;
              el.style.stroke = defaultStroke;
              el.style.filter = "";
              el.style.zIndex = "1";
            }
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
    <section id="clusters" className="w-full py-12 px-6 md:px-12 font-sans bg-[#f4f7f6]">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
          <div className="text-left space-y-1">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-800">
              Strategic Action Zones for <span className="text-[#0f766e]">Green Transformation</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 max-w-2xl">
              Mapping resource-intensive manufacturing hubs prioritized for energy efficiency interventions
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors shrink-0">
            <Calendar size={16} className="text-slate-500" /> 
            FY 2024-25 
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start h-auto lg:h-[650px]">

          {/* LEFT: Map Container */}
          <div className="w-full lg:w-[70%] h-[500px] lg:h-full relative p-0 rounded-3xl shadow-sm border border-slate-200 overflow-hidden bg-white">
            
            {/* Dotted Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-40" 
                 style={{ 
                   backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)", 
                   backgroundSize: "24px 24px" 
                 }} 
            />

            {/* Map View Toggle */}
            <div className="absolute top-6 right-6 z-20 flex bg-white p-1.5 rounded-full shadow-sm border border-slate-200">
              <button
                onClick={() => setMapView('state')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mapView === 'state' ? 'bg-[#0f766e] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Map size={14} /> State View
              </button>
              <button
                onClick={() => setMapView('hub')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mapView === 'hub' ? 'bg-[#0f766e] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Crosshair size={14} /> Hub Focus
              </button>
            </div>

            {/* Quick Stats Overlay (Top Left) */}
            <div className="absolute top-6 left-6 flex flex-col gap-4 z-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 w-52">
                <div className="bg-[#e6f4ea] text-[#0f766e] p-2.5 rounded-xl shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Target Network</p>
                  <p className="text-xl font-bold text-slate-800 leading-none mt-1">31,147</p>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase mt-0.5">MSMEs</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 w-52">
                <div className="bg-[#e6f4ea] text-[#0f766e] p-2.5 rounded-xl shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Active Scope</p>
                  <p className="text-xl font-bold text-slate-800 leading-none mt-1">20</p>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase mt-0.5">Clusters</p>
                </div>
              </div>
            </div>

            {/* Map Legend (Bottom Left) */}
            <div className="absolute bottom-6 left-6 z-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-48">
              <p className="text-[11px] font-bold text-slate-800 mb-3">MSMEs Prioritized</p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#064e3b]"></span><span className="text-[10px] font-semibold text-slate-600">2,500+</span></div>
                <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#0f766e]"></span><span className="text-[10px] font-semibold text-slate-600">1,500 - 2,500</span></div>
                <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#10b981]"></span><span className="text-[10px] font-semibold text-slate-600">750 - 1,500</span></div>
                <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#6ee7b7]"></span><span className="text-[10px] font-semibold text-slate-600">250 - 750</span></div>
                <div className="flex items-center gap-3"><span className="w-4 h-4 rounded bg-[#a7f3d0]"></span><span className="text-[10px] font-semibold text-slate-600">&lt; 250</span></div>
              </div>
            </div>

            {/* Zoom Controls (Bottom Right) */}
            <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-3">
              <button 
                onClick={handleResetZoom}
                className="bg-white p-3 rounded-full shadow-sm border border-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                title="Reset Zoom"
              >
                <Home size={20} />
              </button>
              <div className="bg-white rounded-full shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                <button 
                  onClick={handleZoomIn}
                  className="p-3 text-slate-600 hover:bg-slate-50 border-b border-slate-100 transition-colors"
                  title="Zoom In"
                >
                  <Plus size={20} />
                </button>
                <button 
                  onClick={handleZoomOut}
                  className="p-3 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Zoom Out"
                >
                  <Minus size={20} />
                </button>
              </div>
            </div>

            {!svgLoaded && (
              <div className="flex flex-col items-center justify-center gap-4 h-full relative z-10">
                <div className="w-8 h-8 border-4 border-[#0f766e]/20 border-t-[#0f766e] rounded-full animate-spin" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Constructing Map...</p>
              </div>
            )}

            <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
              <style>{`
                 .map-wrapper > svg {
                   transform: scale(${scale}) translate(0, 0);
                   transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                   width: 100%;
                   height: 100%;
                 }
                 .hub-zoomed > svg path {
                   fill: #f1f5f9 !important;
                   stroke: #e2e8f0 !important;
                   opacity: 0.6 !important;
                   filter: none !important;
                 }
                 .hub-zoomed > svg path:is([name="Hyderabad"], [name="Ranga Reddy"], [name="Medchal"], [name="Sangareddy"]) {
                   fill: #10b981 !important;   
                   stroke: #059669 !important;
                   opacity: 1 !important;
                   filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5)) !important;
                 }
               `}</style>
              <div ref={svgContainerRef} className={`w-[90%] h-[90%] map-wrapper ${mapView === 'hub' ? 'hub-zoomed' : ''}`} />
            </div>

            {/* Hover Tooltip in Right Empty Space */}
            <AnimatePresence>
              {hoveredSvgDistrict && hoveredClusters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-6 top-24 z-50 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-slate-700 p-5 rounded-2xl shadow-2xl min-w-[260px] max-w-[280px]"
                >
                  <p className="text-[11px] font-black text-white uppercase tracking-widest mb-3 border-b border-slate-700 pb-2">
                    {SVG_NAME_TO_DISTRICT[hoveredSvgDistrict]} District
                  </p>
                  <div className="space-y-3">
                    {hoveredClusters.slice(0, 3).map(c => (
                      <div key={c.id}>
                        <p className="text-[11px] font-bold text-emerald-400 leading-none mb-1.5">{c.name}</p>
                        <p className="text-[10px] text-slate-300 leading-tight"><span className="text-white font-bold uppercase tracking-widest text-[8px] mr-1">Main:</span> {c.topSector}</p>
                        {c.otherSectors && <p className="text-[9px] text-slate-400 leading-tight mt-1"><span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] mr-1">Other:</span> {c.otherSectors}</p>}
                      </div>
                    ))}
                    {hoveredClusters.length > 3 && <p className="text-[10px] text-slate-500 italic mt-3 py-2 border-t border-slate-800 font-medium">+{hoveredClusters.length - 3} more clusters</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Global Ranking */}
          <div className="w-full lg:w-[30%] h-[500px] lg:h-full bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col overflow-y-auto">
            
            <AnimatePresence mode="wait">
              {selectedSvgDistrict && selectedClusters.length > 0 ? (
                <motion.div
                  key="district-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <button 
                      onClick={() => setSelectedSvgDistrict(null)}
                      className="text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <ChevronRight className="rotate-180" size={20} />
                    </button>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#0f766e]">District Details</p>
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight truncate mt-0.5">{SVG_NAME_TO_DISTRICT[selectedSvgDistrict]}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {selectedClusters.map((cluster, idx) => (
                      <div key={cluster.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-2 relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0f766e] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-bold text-slate-800">{cluster.name}</h4>
                          <div className="text-right">
                            <p className="text-lg font-bold text-[#064e3b] leading-none">{cluster.msmes.toLocaleString()}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase">MSMEs</p>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                          <p className="text-xs font-medium text-slate-700"><span className="text-slate-400 font-bold uppercase text-[9px] mr-1">Primary:</span> {cluster.topSector}</p>
                          {cluster.otherSectors && <p className="text-[10px] font-medium text-slate-500 mt-1"><span className="text-slate-400 font-bold uppercase text-[9px] mr-1">Secondary:</span> {cluster.otherSectors}</p>}
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
                  className="flex flex-col h-full"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#064e3b] rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#0f766e]">Global Ranking</p>
                      <h3 className="text-2xl font-bold text-slate-800 leading-tight mt-0.5">Top 5 Mega-Clusters</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Hover over the map to view specific district data. The top 5 clusters alone account for nearly <span className="font-bold text-[#064e3b]">11,800 MSMEs</span> prioritized for immediate RECP interventions.
                  </p>

                  <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                    {top5ClustersGlobally.map((cluster, idx) => (
                      <div key={cluster.id} className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center gap-3 transition-colors hover:border-emerald-200 cursor-pointer">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-amber-100 text-amber-600' : 'bg-[#e6f4ea] text-[#0f766e]'}`}>
                          {idx === 0 ? <Award size={20} /> : <span className="font-bold text-sm">#{idx + 1}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{cluster.name}</h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{cluster.svgDistrict} District</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-[#064e3b] leading-none">{cluster.msmes.toLocaleString()}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mt-1">MSMEs</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 bg-[#f0fdf4] text-[#0f766e] hover:bg-emerald-50 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors border border-emerald-100">
                    <BarChart2 size={18} /> View All Clusters <ChevronRight size={18} className="ml-auto mr-2" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="w-full lg:w-[70%] mt-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-2 bg-[#e6f4ea] text-[#0f766e] rounded-xl shrink-0">
            <Leaf size={20} />
          </div>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            Darker shades represent higher concentration of resource-intensive MSMEs<br className="hidden sm:block" />
            and greater priority for energy efficiency interventions.
          </p>
        </div>

      </div>
    </section>
  );
}
