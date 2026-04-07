"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { Zap, IndianRupee, Leaf, Droplets, MapPin, TrendingUp, Info, Activity, Users, ClipboardCheck } from "lucide-react";

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
          el.style.fill = "#a7f3d0"; // Emerald 200 (Green by default)
          el.style.stroke = "#10b981"; // Emerald 500
          el.style.strokeWidth = "0.8";
          el.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.cursor = "pointer";

          el.addEventListener("mouseenter", () => {
            const svgName = el.getAttribute("name") || "";
            const districtName = SVG_NAME_TO_DISTRICT[svgName] || svgName;
            setHoveredDistrict(districtName);
            el.style.fill = "#10b981"; // Emerald 500
            el.style.stroke = "#064e3b"; // Emerald 900
            el.style.filter = "drop-shadow(0 0 12px rgba(16, 185, 129, 0.4)) translate(0, -2px)";
            el.style.zIndex = "50";
          });

          el.addEventListener("mouseleave", () => {
            setHoveredDistrict(null);
            el.style.fill = "#a7f3d0";
            el.style.stroke = "#10b981";
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
    <section className="w-full bg-white py-24 px-6 md:px-12 font-sans border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-[1500px] mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
            <Activity size={12} className="animate-pulse" />
            Live Impact Dashboard
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none italic">
            Telangana MSME Energy <span className="text-emerald-500">Excellence Hub</span>
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Interactive District-wise efficiency reporting · FY 2020-25
          </p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* LEFT: Map Container */}
          <div className="w-full lg:w-[45%] relative group">
            <div className="absolute -inset-4 bg-emerald-50/30 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />

            {!svgLoaded && (
              <div className="flex flex-col items-center justify-center gap-4 h-[460px]">
                <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Constructing Map...</p>
              </div>
            )}

            <div ref={svgContainerRef} className="w-full h-full max-w-[420px] mx-auto animate-fade-in flex items-center justify-center overflow-visible" />

            {/* District Callout Overlay */}
            <AnimatePresence>
              {hoveredDistrict && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  className="absolute top-0 right-0 lg:-right-8 bg-white/80 backdrop-blur-xl border border-emerald-100 p-6 rounded-3xl shadow-2xl shadow-emerald-500/10 min-w-[220px]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Current District</p>
                      <h3 className="text-xl font-black text-slate-900 tracking-tighter">{hoveredDistrict}</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <DistrictStat label="Efficiency Rank" val="#04" />
                    <DistrictStat label="MSME Clusters" val="124" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Chart Container */}
          <div className="w-full lg:w-[55%] flex flex-col gap-8 h-[500px]">
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none italic">
                  Efficiency Trends <span className="text-emerald-400">· {hoveredDistrict || "Telangana Total"}</span>
                </h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Historical impact growth over 5 years</p>
              </div>
              <div className="flex gap-4">
                <LegendItem color="#16a34a" label="Energy" />
                <LegendItem color="#d97706" label="Cost" />
              </div>
            </div>

            <div className="flex-1 bg-slate-50/50 rounded-[2.5rem] p-8 border border-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                  <XAxis
                    dataKey="fy"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone" dataKey="energy" name="Energy Savings" stroke="#16a34a" strokeWidth={3}
                    fill="url(#gEnergy)"
                    dot={{ r: 4, fill: "#fff", strokeWidth: 3, stroke: "#16a34a" }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: "#16a34a" }}
                  />
                  <Area
                    type="monotone" dataKey="cost" name="Cost Savings" stroke="#d97706" strokeWidth={3}
                    fill="url(#gCost)"
                    dot={{ r: 4, fill: "#fff", strokeWidth: 3, stroke: "#d97706" }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: "#d97706" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── BOTTOM KPI CARDS: Total Telangana ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 p-8 bg-slate-50/80 backdrop-blur-lg rounded-[3rem] border border-white">
          {TOTAL_KPI_DATA.map((kpi) => (
            <div key={kpi.id} className="relative group p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-4 right-4 text-slate-100 group-hover:text-slate-200 transition-colors">
                {kpi.id === 'awareness' && <Users size={48} />}
                {kpi.id === 'eoi' && <Activity size={48} />}
                {kpi.id === 'recp' && <ClipboardCheck size={48} />}
                {kpi.id === 'co2' && <Leaf size={48} />}
              </div>

              <div className="relative z-10 flex flex-col gap-1">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12"
                  style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}
                >
                  {kpi.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 line-clamp-1">{kpi.label}</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter italic">{kpi.value}</span>
                  {kpi.unit && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.unit}</span>}
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-3 leading-[1.35] opacity-80 border-t border-slate-100 pt-3">
                  {kpi.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Branding Footer */}
        <div className="text-center mt-12 py-8 border-t border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
            CII Telangana MSME Energy Excellence Report · Strategic Impact
          </p>
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

function DistrictStat({ label, val }: { label: string; val: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-emerald-50 pb-2 last:border-0 last:pb-0">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-black text-emerald-600">{val}</span>
    </div>
  );
}
