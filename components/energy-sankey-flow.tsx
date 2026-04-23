"use client";

import { useState } from "react";
import { Sankey, Tooltip, ResponsiveContainer, Layer } from "recharts";
import {
  Share2, Download, ChevronRight, FileText, Clipboard, User,
  Factory, Shirt, Package, FlaskConical, MoreHorizontal, MapPin,
  FileSearch, Building2, Globe2, Leaf, ClipboardCheck, Target, Map as MapIcon, TrendingUp,
  Zap, Cloud, Settings, Utensils, IndianRupee, Droplets, Trash2
} from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const SANKEY_DATA = {
  nodes: [
    // Sectors (Left) — index 0-5 (Green)
    { name: "Steel & Metals", type: "sector", valueFormatted: "3,220", percentage: "25.8%" },
    { name: "Textiles", type: "sector", valueFormatted: "2,410", percentage: "19.4%" },
    { name: "FMCG", type: "sector", valueFormatted: "2,180", percentage: "17.5%" },
    { name: "Chemicals", type: "sector", valueFormatted: "2,648", percentage: "21.3%" },
    { name: "Engineering", type: "sector", valueFormatted: "1,850", percentage: "14.8%" },
    { name: "Food Processing", type: "sector", valueFormatted: "1,200", percentage: "9.6%" },

    // Clusters (Middle) — index 6-12 (Blue)
    { name: "Hyderabad", type: "cluster", valueFormatted: "2,450", percentage: "18.1%" },
    { name: "Medchal", type: "cluster", valueFormatted: "1,950", percentage: "14.4%" },
    { name: "Rangareddy", type: "cluster", valueFormatted: "1,680", percentage: "12.4%" },
    { name: "Sangareddy", type: "cluster", valueFormatted: "1,520", percentage: "11.3%" },
    { name: "Jeedimetla", type: "cluster", valueFormatted: "1,400", percentage: "10.4%" },
    { name: "Mahbubnagar", type: "cluster", valueFormatted: "1,250", percentage: "9.3%" },
    { name: "Other Districts", type: "cluster", valueFormatted: "3,258", percentage: "24.1%" },

    // Impact Metrics (Right) — index 13-18 (Purple)
    { name: "CO₂ Reduction", type: "metric", valueFormatted: "38.5k", percentage: "25%", unit: "tCO₂e" },
    { name: "Cost Savings", type: "metric", valueFormatted: "₹125.4", percentage: "15%", unit: "Cr" },
    { name: "TOE Savings", type: "metric", valueFormatted: "12.8k", percentage: "10%", unit: "TOE" },
    { name: "Energy Savings", type: "metric", valueFormatted: "45.2", percentage: "20%", unit: "GWh" },
    { name: "Water Savings", type: "metric", valueFormatted: "850", percentage: "15%", unit: "ML" },
    { name: "Waste Reduction", type: "metric", valueFormatted: "2,400", percentage: "15%", unit: "MT" },
  ],
  links: [
    // Sectors -> Clusters (Balanced distribution)
    { source: 0, target: 6, value: 400 }, { source: 0, target: 7, value: 400 }, { source: 0, target: 8, value: 400 },
    { source: 1, target: 9, value: 400 }, { source: 1, target: 10, value: 400 }, { source: 1, target: 11, value: 400 },
    { source: 2, target: 12, value: 400 }, { source: 2, target: 6, value: 400 }, { source: 2, target: 7, value: 300 },
    { source: 3, target: 8, value: 300 }, { source: 3, target: 9, value: 400 }, { source: 3, target: 10, value: 400 },
    { source: 4, target: 11, value: 400 }, { source: 4, target: 12, value: 400 }, { source: 4, target: 6, value: 400 },
    { source: 5, target: 7, value: 300 }, { source: 5, target: 8, value: 300 }, { source: 5, target: 9, value: 200 }, { source: 5, target: 10, value: 200 }, { source: 5, target: 12, value: 200 },

    // Clusters -> Metrics (Balanced distribution)
    { source: 6, target: 13, value: 400 }, { source: 6, target: 14, value: 400 }, { source: 6, target: 15, value: 400 },
    { source: 7, target: 16, value: 400 }, { source: 7, target: 17, value: 300 }, { source: 7, target: 18, value: 300 },
    { source: 8, target: 13, value: 400 }, { source: 8, target: 14, value: 300 }, { source: 8, target: 15, value: 300 },
    { source: 9, target: 16, value: 400 }, { source: 9, target: 17, value: 300 }, { source: 9, target: 18, value: 300 },
    { source: 10, target: 13, value: 400 }, { source: 10, target: 14, value: 300 }, { source: 10, target: 15, value: 300 },
    { source: 11, target: 16, value: 400 }, { source: 11, target: 17, value: 200 }, { source: 11, target: 18, value: 200 },
    { source: 12, target: 13, value: 300 }, { source: 12, target: 14, value: 100 }, { source: 12, target: 15, value: 100 }, { source: 12, target: 16, value: 100 }, { source: 12, target: 17, value: 200 }, { source: 12, target: 18, value: 200 }
  ]
};

const getIcon = (name: string, className: string) => {
  switch (name) {
    case "Steel & Metals": return <Factory className={className} />;
    case "Textiles": return <Shirt className={className} />;
    case "FMCG": return <Package className={className} />;
    case "Chemicals": return <FlaskConical className={className} />;
    case "Engineering": return <Settings className={className} />;
    case "Food Processing": return <Utensils className={className} />;
    case "Hyderabad":
    case "Medchal":
    case "Rangareddy":
    case "Sangareddy":
    case "Jeedimetla":
    case "Mahbubnagar":
    case "Other Districts": return <MapPin className={className} />;
    case "CO₂ Reduction": return <Cloud className={className} />;
    case "Cost Savings": return <IndianRupee className={className} />;
    case "TOE Savings": return <Zap className={className} />;
    case "Energy Savings": return <Zap className={className} />;
    case "Water Savings": return <Droplets className={className} />;
    case "Waste Reduction": return <Trash2 className={className} />;
    default: return <div className={className} />;
  }
};

const CustomNode = ({ x, y, width, height, payload }: any) => {
  const isSector = payload.type === 'sector';
  const isCluster = payload.type === 'cluster';

  const themeColors = isSector
    ? { bg: 'bg-emerald-100', border: 'bg-emerald-500', textPrimary: 'text-emerald-950', textSecondary: 'text-emerald-700/60', iconText: 'text-emerald-600' }
    : isCluster
      ? { bg: 'bg-blue-100', border: 'bg-blue-500', textPrimary: 'text-blue-950', textSecondary: 'text-blue-700/60', iconText: 'text-blue-600' }
      : { bg: 'bg-violet-100', border: 'bg-violet-500', textPrimary: 'text-violet-950', textSecondary: 'text-violet-700/60', iconText: 'text-violet-600' };

  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div
        className={cn("w-full h-full flex items-center p-3 rounded-lg shadow-sm relative overflow-hidden transition-all hover:shadow-md", themeColors.bg)}
      >
        <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", themeColors.border)} />
        <div className="flex items-center gap-3 w-full ml-2">
          <div className={cn("flex-shrink-0", themeColors.iconText)}>
            {getIcon(payload.name, "w-5 h-5")}
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-[11px] font-bold truncate", themeColors.textPrimary)}>{payload.name}</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className={cn("text-base font-black tracking-tight leading-none", themeColors.textPrimary)}>{payload.valueFormatted}</span>
              <span className={cn("text-[9px] font-bold", themeColors.textSecondary)}>({payload.percentage})</span>
            </div>
          </div>
        </div>
      </div>
    </foreignObject>
  );
};

const CustomLink = ({ sourceX, sourceY, targetX, targetY, linkWidth, payload, index, activeIndex, setActiveIndex }: any) => {
  const isSector = payload.source.type === 'sector';
  const color = isSector ? '#10b981' : '#3b82f6'; // Emerald for sector->cluster, Blue for cluster->metric

  const isActive = activeIndex === index;
  const isOthersMuted = activeIndex !== null && activeIndex !== index;
  const opacity = isActive ? 0.4 : isOthersMuted ? 0.05 : 0.15;

  const path = `M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`;

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth={Math.max(linkWidth, 1.5)}
      strokeOpacity={opacity}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      className="transition-all duration-300 cursor-pointer"
    />
  );
};

const BottomMetricCard = ({ icon, title, value, subtext }: any) => (
  <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-4 flex-1">
    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
      <div className="flex flex-col">
        <span className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">{value}</span>
        <span className="text-[10px] font-bold text-slate-500">{subtext}</span>
      </div>
    </div>
  </div>
);

export function EnergySankeyFlow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col items-center">

      {/* Main Container */}
      <div className="w-full bg-white rounded-[2rem] p-5 md:p-6 shadow-sm border border-slate-200 mb-6 relative">

        {/* Header row */}
        <div className="flex items-center justify-between gap-6 mb-1 pb-4 border-b border-slate-100">
          {/* Left: icon + title + legend */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Share2 size={14} />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-widest uppercase text-slate-800 leading-none">ECOSYSTEM FLOW</h3>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[7px] font-black uppercase tracking-widest text-slate-400">SECTOR</span></div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[7px] font-black uppercase tracking-widest text-slate-400">CLUSTER</span></div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /><span className="text-[7px] font-black uppercase tracking-widest text-slate-400">IMPACT</span></div>
              </div>
            </div>
          </div>

          {/* Right: stat strip */}
          <div className="flex items-center divide-x divide-slate-200 flex-1 justify-end border-l border-slate-200 pl-6">
            {[
              { label: "Total Interventions", value: "14,850", badge: "+12.4%", color: "text-slate-800" },
              { label: "Sectors Covered", value: "6", badge: "Live", color: "text-emerald-600" },
              { label: "Clusters Impacted", value: "7", badge: "Districts", color: "text-blue-600" },
              { label: "MSMEs Reached", value: "12,458", badge: "Units", color: "text-indigo-600" },
              { label: "Investment Mobilized", value: "450", badge: "₹ Cr", color: "text-amber-600" },
              { label: "Outcomes Generated", value: "38,450", badge: "Units", color: "text-violet-600" },
            ].map(({ label, value, badge, color }) => (
              <div key={label} className="px-5 first:pl-0 last:pr-0 text-right flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                <div className="flex items-baseline gap-1.5 justify-end">
                  <span className={cn("text-2xl font-black leading-none", color)}>{value}</span>
                  <span className="text-xs font-bold text-slate-500">{badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sankey Chart Area */}
        <div className="relative w-full h-[600px] bg-indigo-950/5 rounded-3xl p-6 border border-indigo-100">

          {/* Column Headers */}
          <div className="absolute top-6 left-6 right-6 flex justify-between z-10 px-[110px] pointer-events-none">
            <div className="bg-slate-100/80 backdrop-blur px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">SECTOR</div>
            <div className="bg-slate-100/80 backdrop-blur px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">CLUSTER / DISTRICT</div>
            <div className="bg-slate-100/80 backdrop-blur px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">IMPACT METRICS</div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={SANKEY_DATA}
              node={<CustomNode />}
              link={<CustomLink activeIndex={activeIndex} setActiveIndex={setActiveIndex} />}
              nodePadding={24}
              nodeWidth={220}
              margin={{ top: 60, left: 10, right: 10, bottom: 20 }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const isNode = data.name !== undefined && data.source === undefined;
                    return (
                      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-800 min-w-[200px] text-[10px]">
                        {isNode ? (
                          <>
                            <p className="font-black uppercase tracking-widest opacity-60 mb-1">{data.type || "Ecosystem"} Node</p>
                            <h4 className="text-sm font-black mb-2">{data.name}</h4>
                            <div className="flex items-center justify-between mb-1">
                              <span className="opacity-60 uppercase font-black">Total Value</span>
                              <span className="font-black text-emerald-400">
                                {data.valueFormatted || data.payload?.valueFormatted || data.value || "0"} {data.unit || data.payload?.unit || ""}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="opacity-60 uppercase font-black">Contribution</span>
                              <span className="font-black text-blue-400">
                                {data.percentage || data.payload?.percentage || "0%"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="font-black uppercase tracking-widest opacity-60 mb-1">Flow Intelligence</p>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-black uppercase">{data.source?.name}</span>
                              <ChevronRight size={10} className="opacity-40" />
                              <span className="font-black uppercase">{data.target?.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="opacity-60 uppercase font-black">Flow Value</span>
                              <span className="font-black text-emerald-400">{data.value} Units</span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </Sankey>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Metrics Row */}
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <BottomMetricCard
          icon={<ClipboardCheck size={20} />}
          title="CONVERSION RATE"
          value="72.4%"
          subtext="Interventions to Impact"
        />
        <BottomMetricCard
          icon={<User size={20} />}
          title="AVG IMPACT PER MSME"
          value="₹3.2L"
          subtext="Value Generated / Unit"
        />
        <BottomMetricCard
          icon={<Target size={20} />}
          title="TOP SECTOR"
          value="Steel & Metals"
          subtext="3,220 MSMEs"
        />
        <BottomMetricCard
          icon={<MapIcon size={20} />}
          title="TOP CLUSTER"
          value="Hyderabad"
          subtext="2,450 MSMEs"
        />
        <BottomMetricCard
          icon={<TrendingUp size={20} />}
          title="IMPACT GROWTH (YOY)"
          value="+24.8%"
          subtext="Sustainability Yield"
        />
      </div>

    </div>
  );
}
