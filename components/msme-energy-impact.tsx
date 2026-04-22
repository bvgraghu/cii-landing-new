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
    <section className="w-full py-10 px-6 md:px-12 font-sans border-t border-slate-800 overflow-hidden relative bg-[#0B1120]">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Activity size={12} className="animate-pulse" />
            Strategic Impact Analysis
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none italic text-white">
            Telangana MSME Industrial <span className="text-emerald-400">Decarbonization Pathway</span>
          </h2>
          <p className="text-[11px] font-bold uppercase tracking-widest leading-none text-slate-400">
            Comparative Sectoral Emissions · Before vs After Intervention
          </p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* LEFT: Emissions Chart */}
          <div className="w-full lg:w-[65%] flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h3 className="text-xl font-black tracking-tight leading-none italic text-white">
                    Sectoral <span className="text-emerald-400">Emissions</span>
                  </h3>
               </div>
               <div className="flex gap-6 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">After Greening</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 rounded-[1.5rem] p-6 border border-slate-800 bg-[#111827]/80 shadow-2xl relative">
              <ResponsiveContainer width="100%" height={320}>
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
                  margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                  barGap={2}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="sector" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#64748b", fontSize: 10, fontWeight: 600 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      fontSize: '12px', 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      backgroundColor: '#0F172A',
                      color: '#F8FAFC'
                    }}
                    itemStyle={{ fontWeight: 800 }}
                  />
                  <Bar dataKey="before" name="Before (tCO2e)" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="after" name="After (tCO2e)" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
                <Leaf size={18} className="shrink-0 text-emerald-400" />
                <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
                  Decarbonization strategy successfully maps a <span className="text-emerald-400 font-black">50%+ reduction</span> in carbon emissions across all high-impact industrial sectors.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Resource Metrics Dashboard */}
          <div className="w-full lg:w-[35%] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black tracking-tight leading-none italic text-white">
                Sustainability <span className="text-blue-400">Dashboard</span>
              </h3>
            </div>

            <div className="flex-1 rounded-[1.5rem] p-6 border border-slate-800 bg-[#111827]/80 shadow-2xl flex flex-col justify-between gap-6">
              {[
                { label: "Specific Energy Reduction", val: "24.5%", icon: <Zap size={20} />, sub: "Goal: 30%", color: "#38BDF8", pct: 81 },
                { label: "Water Withdrawal Savings", val: "38.2%", icon: <Droplets size={20} />, sub: "Goal: 50%", color: "#818CF8", pct: 76 },
                { label: "Waste-to-Resource Rate", val: "62.0%", icon: <TrendingUp size={20} />, sub: "Goal: 85%", color: "#F472B6", pct: 72 },
                { label: "Renewable Energy Mix", val: "18.5%", icon: <Leaf size={20} />, sub: "Goal: 40%", color: "#10B981", pct: 46 },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 transition-colors group-hover:bg-white/10" style={{ color: m.color }}>{m.icon}</div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{m.label}</p>
                        <p className="text-2xl font-black tracking-tight italic leading-none text-white">{m.val}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded-full overflow-hidden bg-slate-800 border border-slate-700/50">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full rounded-full shadow-[0_0_10px_currentColor]" 
                        style={{ backgroundColor: m.color, color: m.color }} 
                      />
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-500">
                      <span>Progress vs Goal</span>
                      <span style={{ color: m.color }} className="font-black">{m.sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GOI" className="h-5 invert opacity-80" />
                 <div className="h-5 w-px bg-slate-700" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                   Sustainability Portal · GoI Initiative
                 </span>
            </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/3 translate-y-1/3" />
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
