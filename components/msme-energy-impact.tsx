"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar
} from "recharts";
import { Zap, IndianRupee, Leaf, Droplets, MapPin, TrendingUp, Info, Activity, Users, ClipboardCheck } from "lucide-react";
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

const DISTRICTS = Object.values(SVG_NAME_TO_DISTRICT);

/* ─── Mock Data Generators ────────────────────────────────────────────────── */

// Generate trend data for a district
function generateTrendData(name: string | null) {
  // Use a hash of the name for deterministic randomization
  let seed = 0;
  if (name) {
    for (let i = 0; i < name.length; i++) seed += name.charCodeAt(i);
  } else {
    seed = 123456; // Total Telangana seed
  }

  const r = (base: number, variance: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    return base + (seed / 233280) * variance;
  };

  const multiplier = name ? 0.1 : 1.0; // Districts are roughly 1/10th of total

  return [
    { fy: "FY20", energy: r(30, 10) * multiplier, cost: r(20, 10) * multiplier, co2: r(15, 10) * multiplier, toe: r(3, 1) * multiplier },
    { fy: "FY21", energy: r(50, 15) * multiplier, cost: r(35, 15) * multiplier, co2: r(28, 15) * multiplier, toe: r(4, 2) * multiplier },
    { fy: "FY22", energy: r(70, 20) * multiplier, cost: r(55, 20) * multiplier, co2: r(45, 20) * multiplier, toe: r(6, 3) * multiplier },
    { fy: "FY23", energy: r(95, 30) * multiplier, cost: r(85, 30) * multiplier, co2: r(60, 30) * multiplier, toe: r(8, 4) * multiplier },
    { fy: "FY24", energy: r(135, 40) * multiplier, cost: r(125, 40) * multiplier, co2: r(85, 40) * multiplier, toe: r(11, 5) * multiplier },
    { fy: "FY25", energy: r(190, 60) * multiplier, cost: r(175, 60) * multiplier, co2: r(115, 60) * multiplier, toe: r(16, 8) * multiplier },
  ].map(item => ({
    ...item,
    energy: Math.floor(item.energy),
    cost: Number(item.cost.toFixed(1)),
    co2: Math.floor(item.co2),
    toe: Number(item.toe.toFixed(1)),
  }));
}

const TOTAL_KPI_DATA = [
  { id: "awareness", label: "MSMEs Reached for Awareness", value: "12,500+", unit: "", color: "#2563EB", icon: <Users size={18} />, desc: "Number of enterprises engaged through outreach, awareness campaigns, and capacity-building initiatives." },
  { id: "eoi", label: "Expressions of Interest (EoIs)", value: "3,240", unit: "Received", color: "#D97706", icon: <Activity size={18} />, desc: "Total number of MSMEs that have shown interest in adopting green practices." },
  { id: "recp", label: "RECP Assessments", value: "1,850", unit: "Completed", color: "#16A34A", icon: <ClipboardCheck size={18} />, desc: "Number of Resource Efficient and Cleaner Production (RECP) assessments conducted across MSMEs." },
  { id: "co2", label: "State Carbon Footprint", value: "2.4M", unit: "t Reduced", color: "#065F46", icon: <Leaf size={18} />, desc: "Projected reduction in greenhouse gas emissions through adoption of recommended interventions." },
];

/* ─── Components ───────────────────────────────────────────────────────────── */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl px-4 py-3 shadow-xl">
      <p className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">{label} Trends</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-6 mb-1.5 last:mb-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{p.name}:</span>
          </div>
          <span className="font-black text-slate-900 text-sm">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function MSMEEnergyImpact() {
  const { theme, colors } = useAppTheme();
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Current Trend Data
  const currentTrendData = useMemo(() => generateTrendData(hoveredDistrict), [hoveredDistrict]);

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
        svg.style.maxHeight = "460px";
        svg.style.filter = "drop-shadow(0 10px 40px rgba(16, 185, 129, 0.08))";

        // Style Paths
        svg.querySelectorAll("path[name]").forEach(path => {
          const el = path as SVGPathElement;
          el.style.fill = colors.mid; 
          el.style.stroke = colors.primary;
          el.style.strokeWidth = "0.8";
          el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.cursor = "pointer";

          el.addEventListener("mouseenter", () => {
            const svgName = el.getAttribute("name") || "";
            const districtName = SVG_NAME_TO_DISTRICT[svgName] || svgName;
            setHoveredDistrict(districtName);
            el.style.fill = colors.primary;
            el.style.stroke = colors.accent;
            el.style.filter = `drop-shadow(0 0 12px ${colors.primary}66) translate(0, -2px)`;
            el.style.zIndex = "50";
          });

          el.addEventListener("mouseleave", () => {
            setHoveredDistrict(null);
            el.style.fill = colors.mid;
            el.style.stroke = colors.primary;
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
    <section className="w-full py-6 px-6 md:px-12 font-sans border-t border-slate-100 overflow-hidden relative transition-colors duration-700" style={{ backgroundColor: colors.sectionBg }}>
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-4 space-y-1 transition-colors duration-700">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] animate-fade-in transition-colors duration-700"
            style={{ 
              backgroundColor: colors.sectionBg === '#ffffff' ? colors.light : `${colors.light}22`, 
              color: colors.primary 
            }}
          >
            <Activity size={10} className="animate-pulse" />
            Strategic Impact Analysis
          </div>
          <h2 
            className="text-2xl font-black tracking-tight leading-none italic transition-colors duration-700"
            style={{ color: colors.sectionBg === '#ffffff' ? '#1e293b' : '#f8fafc' }}
          >
            Telangana MSME Industrial <span style={{ color: colors.primary }}>Decarbonization Pathway</span>
          </h2>
          <p 
            className="text-[10px] font-bold uppercase tracking-widest leading-none opacity-70 transition-colors duration-700"
            style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#cbd5e1' }}
          >
            Comparative Sectoral Emissions · Before vs After Intervention
          </p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[450px]">

          {/* LEFT: Emissions Chart */}
          <div className="w-full lg:w-[62%] flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 transition-colors duration-700">
               <div>
                  <h3 
                    className="text-base font-black tracking-tight leading-none italic transition-colors duration-700"
                    style={{ color: colors.sectionBg === '#ffffff' ? '#1e293b' : '#f8fafc' }}
                  >
                    Sectoral <span style={{ color: colors.primary }}>Emissions</span>
                  </h3>
                  <p 
                    className="text-[8px] font-bold uppercase tracking-widest mt-1 opacity-70 transition-colors duration-700"
                    style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#cbd5e1' }}
                  >Status: Before vs After Greening</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.sectionBg === '#ffffff' ? '#e2e8f0' : '#334155' }} />
                    <span 
                      className="text-[9px] font-bold uppercase tracking-widest opacity-80 transition-colors duration-700"
                      style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#94a3b8' }}
                    >Before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.accent }} />
                    <span 
                      className="text-[9px] font-bold uppercase tracking-widest opacity-80 transition-colors duration-700"
                      style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#94a3b8' }}
                    >After</span>
                  </div>
               </div>
            </div>

            <div 
              className="flex-1 rounded-[1.5rem] p-6 border shadow-sm transition-all duration-700"
              style={{ 
                borderColor: colors.mid,
                backgroundColor: colors.sectionBg === '#ffffff' ? '#ffffff' : `${colors.light}33`
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[
                    { sector: "Eng/Metals", before: 420, after: 215 },
                    { sector: "Pharma", before: 385, after: 190 },
                    { sector: "Food Proc.", before: 290, after: 145 },
                    { sector: "Textiles", before: 310, after: 160 },
                    { sector: "Chemicals", before: 260, after: 130 },
                    { sector: "Plastics", before: 220, after: 110 },
                    { sector: "Foundry", before: 450, after: 225 },
                    { sector: "Rice Mills", before: 180, after: 90 },
                    { sector: "Others", before: 140, after: 85 },
                  ]} 
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.sectionBg === '#ffffff' ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.05)"} />
                  <XAxis 
                    dataKey="sector" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: colors.sectionBg === '#ffffff' ? "#64748b" : "#94a3b8", fontSize: 8, fontWeight: 800 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: colors.sectionBg === '#ffffff' ? "#64748b" : "#94a3b8", fontSize: 9 }}
                  />
                  <Tooltip 
                    cursor={{ fill: colors.sectionBg === '#ffffff' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      fontSize: '11px', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      backgroundColor: colors.sectionBg === '#ffffff' ? '#ffffff' : colors.mid,
                      color: colors.sectionBg === '#ffffff' ? '#1e293b' : '#f8fafc'
                    }}
                  />
                  <Bar dataKey="before" name="Before (tCO2e)" fill={colors.sectionBg === '#ffffff' ? "#e2e8f0" : "#334155"} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="after" name="After (tCO2e)" fill={colors.accent} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              
              <div 
                className="mt-4 p-3 rounded-xl border flex items-start gap-2 transition-colors duration-700"
                style={{ 
                  backgroundColor: colors.sectionBg === '#ffffff' ? '#eef2ff' : `${colors.primary}11`,
                  borderColor: colors.sectionBg === '#ffffff' ? '#e0e7ff' : `${colors.primary}33`
                }}
              >
                <Leaf size={14} className="mt-0.5 shrink-0" style={{ color: colors.primary }} />
                <p 
                  className="text-[10px] font-semibold leading-normal transition-colors duration-700"
                  style={{ color: colors.sectionBg === '#ffffff' ? '#312e81' : '#cbd5e1' }}
                >
                  Decarbonization strategy aiming for a <span style={{ color: colors.accent }} className="font-black">50%+ reduction</span> in carbon across high-impact sectors.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Resource Metrics Chart */}
          <div className="w-full lg:w-[38%] flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 transition-colors duration-700">
              <div>
                <h3 
                  className="text-base font-black tracking-tight leading-none italic transition-colors duration-700"
                  style={{ color: colors.sectionBg === '#ffffff' ? '#1e293b' : '#f8fafc' }}
                >
                  Sustainability <span style={{ color: colors.primary }}>Dashboard</span>
                </h3>
              </div>
            </div>

            <div 
              className="flex-1 rounded-[1.5rem] p-8 border shadow-sm transition-all duration-700 flex flex-col justify-around gap-4"
              style={{ 
                backgroundColor: colors.sectionBg === '#ffffff' ? '#ffffff' : `${colors.light}33`, 
                borderColor: colors.mid 
              }}
            >
              {[
                { label: "Specific Energy Reduction", val: "24.5%", icon: <Zap size={18} />, sub: "Goal: 30%", color: colors.primary, pct: 81 },
                { label: "Water Withdrawal Savings", val: "38.2%", icon: <Droplets size={18} />, sub: "Goal: 50%", color: "#0ea5e9", pct: 76 },
                { label: "Waste-to-Resource Rate", val: "62.0%", icon: <TrendingUp size={18} />, sub: "Goal: 85%", color: colors.accent, pct: 72 },
                { label: "Renewable Energy Mix", val: "18.5%", icon: <Leaf size={18} />, sub: "Goal: 40%", color: "#10b981", pct: 46 },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${m.color}22`, color: m.color }}>{m.icon}</div>
                    <div>
                      <p 
                        className="text-[8px] font-black uppercase tracking-widest mb-0.5 transition-colors duration-700 opacity-60"
                        style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#cbd5e1' }}
                      >{m.label}</p>
                      <p 
                        className="text-xl font-black tracking-tight italic leading-none transition-colors duration-700"
                        style={{ color: colors.sectionBg === '#ffffff' ? '#0f172a' : '#f8fafc' }}
                      >{m.val}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div 
                      className="h-1.5 w-full rounded-full overflow-hidden flex transition-colors duration-700"
                      style={{ backgroundColor: colors.sectionBg === '#ffffff' ? '#f1f5f9' : '#1e293b' }}
                    >
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full rounded-full" 
                        style={{ backgroundColor: m.color }} 
                      />
                    </div>
                    <div 
                      className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest opacity-60 transition-colors duration-700"
                      style={{ color: colors.sectionBg === '#ffffff' ? '#64748b' : '#94a3b8' }}
                    >
                      <span>Progress</span>
                      <span style={{ color: m.color }}>{m.sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-10 pt-4 border-t border-slate-100/10 flex items-center justify-between">
            <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GOI" className="h-4" style={{ filter: colors.sectionBg === '#ffffff' ? 'none' : 'invert(1)' }} />
                 <div className="h-4 w-px bg-slate-300" />
                 <span 
                    className="text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-700"
                    style={{ color: colors.sectionBg === '#ffffff' ? '#1e293b' : '#ffffff' }}
                 >
                   Sustainability Portal · GoI Initiative
                 </span>
            </div>
            <div className="flex gap-4">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
            </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/30 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-[4px] rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function DistrictStat({ label, val, colors }: { label: string; val: string, colors: any }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-2 last:border-0 last:pb-0" style={{ borderBottomColor: colors.mid + '44' }}>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black" style={{ color: colors.primary }}>{val}</span>
    </div>
  );
}
