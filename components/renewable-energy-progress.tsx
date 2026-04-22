"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Download, Zap, Leaf, Award, ClipboardCheck, Users } from "lucide-react";
import { useAppTheme } from "@/context/theme-context";

// Conversion constants
const CO2_PER_GWH = 820;   // tonnes CO₂ per GWh
const TOE_PER_GWH = 86;    // TOE per GWh

const SECTORS = [
  { key: "msmeGeneric", label: "MSME Generic", color: "#3B82F6" },  // blue-500
  { key: "textile", label: "Textile", color: "#10B981" },  // emerald-500
  { key: "foodProcessing", label: "Food Processing", color: "#F59E0B" },  // amber-500
  { key: "foundry", label: "Foundry", color: "#F97316" },  // orange-500
  { key: "ceramic", label: "Ceramic", color: "#8B5CF6" },  // violet-500
] as const;

type SectorKey = typeof SECTORS[number]["key"];

const rawData: Array<{ year: string; msmeGeneric: number; textile: number; foodProcessing: number; foundry: number; ceramic: number; totalAudits: number; total: number }> = [
  { year: "2017-18", msmeGeneric: 5, textile: 3, foodProcessing: 2, foundry: 4, ceramic: 2, totalAudits: 32, total: 16 },
  { year: "2018-19", msmeGeneric: 7, textile: 5, foodProcessing: 3, foundry: 6, ceramic: 3, totalAudits: 48, total: 24 },
  { year: "2019-20", msmeGeneric: 9, textile: 6, foodProcessing: 4, foundry: 8, ceramic: 4, totalAudits: 62, total: 31 },
  { year: "2020-21", msmeGeneric: 12, textile: 8, foodProcessing: 6, foundry: 10, ceramic: 5, totalAudits: 85, total: 41 },
  { year: "2021-22", msmeGeneric: 18, textile: 12, foodProcessing: 9, foundry: 14, ceramic: 7, totalAudits: 112, total: 60 },
  { year: "2022-23", msmeGeneric: 25, textile: 16, foodProcessing: 13, foundry: 19, ceramic: 10, totalAudits: 148, total: 83 },
  { year: "2023-24", msmeGeneric: 34, textile: 22, foodProcessing: 18, foundry: 25, ceramic: 14, totalAudits: 192, total: 113 },
  { year: "2024-25", msmeGeneric: 45, textile: 30, foodProcessing: 24, foundry: 33, ceramic: 18, totalAudits: 240, total: 150 },
];

// Derived summary stats
const totalAudits = rawData.reduce((s, r) => s + r.totalAudits, 0);
const totalGWh = rawData.reduce((s, r) => s + SECTORS.reduce((ss, sec) => ss + r[sec.key], 0), 0);
const totalCO2 = Math.round(totalGWh * CO2_PER_GWH);
const totalTOE = Math.round(totalGWh * TOE_PER_GWH);
const sectorTotals = SECTORS.map(s => ({ ...s, total: rawData.reduce((ss, r) => ss + r[s.key], 0) }));
const topSector = [...sectorTotals].sort((a, b) => b.total - a.total)[0];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color?: string;
  fill?: string;
  name?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  activeSector: SectorKey | null;
}

function CustomTooltip({ active, payload, label, activeSector }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const sectorEntry = activeSector
    ? payload.find(p => p.dataKey === activeSector)
    : null;

  if (!sectorEntry) return null;

  const sectorMeta = SECTORS.find(s => s.key === activeSector)!;
  const gwh = sectorEntry.value;
  const co2 = Math.round(gwh * CO2_PER_GWH).toLocaleString();
  const toe = Math.round(gwh * TOE_PER_GWH).toLocaleString();

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E2E8F0",
      borderRadius: "10px",
      padding: "10px 14px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      minWidth: "190px",
      fontSize: "12px",
      color: "#374151",
    }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: "#1F2937", fontSize: 11 }}>
        FY {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: sectorMeta.color, display: "inline-block" }} />
        <span style={{ fontWeight: 700, color: "#111827" }}>{sectorMeta.label}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Row label="⚡ Energy Saved" value={`${gwh} GWh`} />
        <Row label="🌿 CO₂ Reduced" value={`${co2} t`} />
        <Row label="🛢️ TOE" value={toe} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <span style={{ color: "#6B7280" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "#111827" }}>{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function RenewableEnergyProgress() {
  const { theme, colors } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSector, setActiveSector] = useState<SectorKey | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="w-full py-10 px-6 md:px-12 font-sans relative border-t-4 border-violet-500" style={{ backgroundColor: 'var(--color-blue-100)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Download icon */}
        <div
          className="absolute top-8 right-12 cursor-pointer p-2 rounded-full transition-colors opacity-60 hover:opacity-100"
          style={{ color: '#7c3aed' }}
        >
          <Download className="w-5 h-5" />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black tracking-tight leading-none italic text-slate-900">
            Telangana Energy <span className="text-violet-700">Assessment Report</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1 text-slate-600">
            MSME sector-wise savings across Telangana · FY 2017-18 to 2024-25
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* ── Pyramid Chart ─────────────────────────────────────────── */}
          <div
            className="w-full lg:w-[42%] rounded-[2.5rem] border border-violet-200 bg-white p-8 flex flex-col justify-between"
          >
            <h3 className="text-[11px] font-black uppercase tracking-widest text-violet-600 mb-6">Audit Funnel — Stage Progression</h3>
            <div className="flex flex-col items-center justify-center gap-3 w-full flex-1">
              {[
                { label: "MSMEs Reached", value: "12,500+", pct: 100, color: "#7c3aed" },
                { label: "EoIs Submitted", value: "8,450", pct: 68, color: "#8b5cf6" },
                { label: "Eligible", value: "6,200", pct: 50, color: "#6d28d9" },
                { label: "Scheduled", value: "4,100", pct: 33, color: "#4f46e5" },
                { label: "Assessed (WT)", value: "3,976", pct: 25, color: "#3b82f6" },
                { label: "DEA Completed", value: "1,850", pct: 15, color: "#10b981" },
              ].map((row, i, arr) => (
                <div key={row.label} className="flex items-center w-full gap-4">
                  {/* left label */}
                  <div className="w-[130px] text-right shrink-0">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{row.label}</p>
                    <p className="text-sm font-black text-slate-800">{row.value}</p>
                  </div>
                  {/* bar */}
                  <div className="flex-1 flex justify-center">
                    <div
                      className="h-6 rounded-md transition-all duration-500 flex items-center justify-end pr-3"
                      style={{
                        width: `${row.pct}%`,
                        background: `linear-gradient(90deg, ${row.color}aa, ${row.color})`,
                        boxShadow: `0 0 12px ${row.color}44`,
                      }}
                    >
                      <span className="text-[9px] font-black text-white/80">{row.pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[9px] text-slate-400 mt-6 italic uppercase tracking-widest font-bold">
              *Indicative data — CII MSME Energy Assessment Programme
            </p>
          </div>

          {/* ── Right Panel ──────────────────────────────────────────────── */}
          <div className="w-full lg:w-[58%] pl-8 flex flex-col gap-6 lg:border-l border-slate-200">

            <div className="grid grid-cols-2 gap-5 h-full">
              <KPICard
                icon={<Users className="w-5 h-5" />}
                value="12,500+"
                title="MSMEs Reached"
                description="Targeted outreach for awareness and capacity building."
                accentColor="#7C3AED"
                growth="+24% YoY"
              />
              <KPICard
                icon={<ClipboardCheck className="w-5 h-5" />}
                value="3,240"
                title="EoIs Received"
                description="Total MSMEs expressing interest in greening."
                accentColor="#3B82F6"
                growth="+18% YoY"
              />
              <KPICard
                icon={<Zap className="w-5 h-5" />}
                value="1,850"
                title="Assessments"
                description="Resource Efficient & Cleaner Production (RECP) completed."
                accentColor="#F59E0B"
                growth="+12% YoY"
              />
              <KPICard
                icon={<Leaf className="w-5 h-5" />}
                value="2.4M t"
                title="CO₂ Reduction"
                description="Projected reduction through recommendations."
                accentColor="#10B981"
                growth="+32% YoY"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LegendItem({ color, label, textStyle }: { color: string; label: string; textStyle?: React.CSSProperties }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3.5 h-3.5 rounded-[2px]" style={{ backgroundColor: color }} />
      <span style={textStyle}>{label}</span>
    </div>
  );
}

function KPICard({
  icon, value, title, description, accentColor, growth
}: {
  icon: React.ReactNode; value: string; title: string; description: string; accentColor: string; growth?: string;
}) {
  return (
    <div
      className="group rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-200 transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative overflow-hidden bg-white h-full"
    >
      {/* Default Subtle Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(16,185,129,0.02))' }}
      />
      
      {/* Premium Sweeping Rotating Light Ray (Visible on Hover) */}
      <div className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div 
          className="w-full h-full animate-[spin_4s_linear_infinite]"
          style={{ background: `conic-gradient(from 0deg, transparent 0%, ${accentColor}1A 15%, transparent 30%)` }}
        />
      </div>
      
      {/* Left Accent Border */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex items-start justify-between">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110"
            style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
          >
            {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 20 })}
          </div>
          {growth && (
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{growth}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-[28px] font-bold tracking-tight text-slate-900 leading-none">{value}</p>
          </div>
          <p className="text-[10px] font-semibold text-slate-400 mt-2 uppercase tracking-widest leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalStat({
  value, total, color, label, isTotal,
}: {
  value: number; total: number; color: string; label: string; isTotal?: boolean;
}) {
  const { colors } = useAppTheme();
  const pct = Math.max(1, (value / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-[96px] shrink-0 text-[11px] font-bold truncate" style={{ color: '#475569' }}>{label}</div>
      <div className="flex-1 flex items-center h-[18px]">
        <div
          className="h-full shadow-sm"
          style={{ backgroundColor: color, width: isTotal ? "100%" : `${pct}%`, minWidth: "12px", borderRadius: "2px" }}
        />
        <span className="ml-2 text-[12px] font-bold whitespace-nowrap" style={{ color: '#1e293b' }}>{value} GWh</span>
      </div>
    </div>
  );
}
