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
  const [mounted, setMounted] = useState(false);
  const [activeSector, setActiveSector] = useState<SectorKey | null>(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section className="w-full py-12 px-6 md:px-12 font-sans relative" style={{ backgroundColor: "rgb(224 255 224)" }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Download icon */}
        <div className="absolute top-8 right-12 cursor-pointer text-[#1a3d1a] hover:bg-[#8ab58a]/40 p-2 rounded-full transition-colors">
          <Download className="w-5 h-5" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#162b16]">Telangana Energy Assessment Report</h2>
          <p className="text-xs text-[#3d6b3d] mt-1">MSME sector-wise energy savings from CII assessments across Telangana · FY 2017-18 to 2024-25</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 items-stretch">

          {/* ── Chart ─────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[65%] pr-6">
            <div className="h-[400px] w-full relative">
              {/* Y-axis label */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] text-[#2d5a2d] tracking-wide whitespace-nowrap">
                Energy Saved (GWh)
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={rawData}
                  margin={{ top: 20, right: 0, left: 10, bottom: 0 }}
                  barSize={26}
                  onMouseLeave={() => setActiveSector(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(30,80,30,0.2)" opacity={1} />
                  <XAxis
                    dataKey="year"
                    axisLine={{ stroke: "rgba(30,80,30,0.4)" }}
                    tickLine={false}
                    tick={{ fill: "#2d5a2d", fontSize: 10 }}
                    dy={10}
                    label={{ value: "Financial Year", position: "insideBottom", offset: -2, fill: "#3d6b3d", fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#2d5a2d", fontSize: 10 }}
                    dx={-10}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(30,80,30,0.08)" }}
                    content={<CustomTooltip activeSector={activeSector} />}
                  />

                  {SECTORS.map((sector, i) => (
                    <Bar
                      key={sector.key}
                      dataKey={sector.key}
                      name={sector.label}
                      stackId="a"
                      fill={sector.color}
                      onMouseEnter={() => setActiveSector(sector.key)}
                      style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                      opacity={activeSector && activeSector !== sector.key ? 0.45 : 1}
                    >
                      {/* total label on the topmost bar */}
                      {i === SECTORS.length - 1 && (
                        <LabelList
                          dataKey="total"
                          position="top"
                          fill="#162b16"
                          fontSize={10}
                          fontWeight="bold"
                        />
                      )}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-[#2d5a2d] ml-12">
              {SECTORS.map(s => (
                <LegendItem key={s.key} color={s.color} label={s.label} />
              ))}
            </div>

            <p className="text-center text-[10px] text-[#3d6b3d]/70 mt-4 ml-12 italic">
              *Indicative data based on CII MSME Energy Assessment Programme outcomes
            </p>
          </div>

          {/* ── Right Panel ──────────────────────────────────────────────── */}
          <div className="w-full lg:w-[35%] pl-8 flex flex-col gap-8 lg:border-l border-[#2d5a2d]/30">

            {/* KPI Cards */}
            <div>
              <h3 className="text-[15px] font-semibold text-[#162b16] mb-5 underline decoration-1 underline-offset-4 decoration-[#2d5a2d]/40">
                Telangana Programme Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  icon={<Users className="w-5 h-5" />}
                  value="12,500+"
                  title="MSMEs Reached"
                  description="Number of enterprises engaged through outreach, awareness campaigns, and capacity-building initiatives."
                  bg="#DBEAFE"
                  textColor="#1E40AF"
                />
                <KPICard
                  icon={<ClipboardCheck className="w-5 h-5" />}
                  value="3,240"
                  title="EoIs Received"
                  description="Total number of MSMEs that have shown interest in adopting green practices."
                  bg="#FEF3C7"
                  textColor="#92400E"
                />
                <KPICard
                  icon={<Zap className="w-5 h-5" />}
                  value="1,850"
                  title="RECP Assessments"
                  description="Number of Resource Efficient and Cleaner Production (RECP) assessments conducted."
                  bg="#D1FAE5"
                  textColor="#065F46"
                />
                <KPICard
                  icon={<Leaf className="w-5 h-5" />}
                  value="2.4M t"
                  title="CO₂ Reduction"
                  description="Projected reduction in greenhouse gas emissions through recommended interventions."
                  bg="#EDE9FE"
                  textColor="#5B21B6"
                />
              </div>
            </div>

            {/* Sector breakdown */}
            <div>
              <h3 className="text-[15px] font-semibold text-[#162b16] mb-5 underline decoration-1 underline-offset-4 decoration-[#2d5a2d]/40">
                Sector-wise Energy Saved (GWh)
              </h3>
              <div className="space-y-4">
                <HorizontalStat
                  color="#94A3B8"
                  value={totalGWh}
                  total={totalGWh}
                  label="Total"
                  isTotal
                />
                {sectorTotals.sort((a, b) => b.total - a.total).map(s => (
                  <HorizontalStat
                    key={s.key}
                    color={s.color}
                    value={s.total}
                    total={totalGWh}
                    label={s.label}
                  />
                ))}
              </div>
            </div>

            {/* Top sector badge */}
            <div className="mt-auto flex items-center gap-2 bg-[#162b16]/10 rounded-xl px-4 py-3 border border-[#2d5a2d]/30">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-[11px] text-[#2d5a2d]">
                <span className="font-semibold text-[#162b16]">Top contributor:</span>{" "}
                {topSector.label} · {topSector.total} GWh
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-[#3d6b3d]">Source: CII · Telangana MSME Energy Assessment Programme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-3.5 h-3.5 rounded-[2px]" style={{ backgroundColor: color }} />
      <span className="text-[#2d5a2d]">{label}</span>
    </div>
  );
}

function KPICard({
  icon, value, title, description, bg, textColor,
}: {
  icon: React.ReactNode; value: string; title: string; description: string; bg: string; textColor: string;
}) {
  return (
    <div className="rounded-2xl px-5 py-4 flex flex-col gap-2" style={{ backgroundColor: bg }}>
      <div className="flex items-center gap-2" style={{ color: textColor }}>
        {icon}
        <p className="text-[10px] font-black uppercase tracking-widest">{title}</p>
      </div>
      <p className="text-3xl font-black leading-none my-1" style={{ color: textColor }}>{value}</p>
      <p className="text-[10px] font-medium leading-[1.35] opacity-80" style={{ color: textColor }}>{description}</p>
    </div>
  );
}

function HorizontalStat({
  value, total, color, label, isTotal,
}: {
  value: number; total: number; color: string; label: string; isTotal?: boolean;
}) {
  const pct = Math.max(1, (value / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-[96px] shrink-0 text-[11px] text-[#3d6b3d] truncate">{label}</div>
      <div className="flex-1 flex items-center h-[18px]">
        <div
          className="h-full shadow-sm"
          style={{
            backgroundColor: color,
            width: isTotal ? "100%" : `${pct}%`,
            minWidth: "12px",
            borderRadius: "2px",
          }}
        />
        <span className="ml-2 text-[12px] text-[#162b16] font-semibold whitespace-nowrap">{value} GWh</span>
      </div>
    </div>
  );
}
