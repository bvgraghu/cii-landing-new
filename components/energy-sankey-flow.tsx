"use client";

import { useState } from "react";
import { Sankey, Tooltip, ResponsiveContainer, Layer } from "recharts";
import { 
  Share2, Download, ChevronRight, FileText, Clipboard, User, 
  Factory, Shirt, Package, FlaskConical, MoreHorizontal, MapPin,
  FileSearch, Building2, Globe2, Leaf, ClipboardCheck, Target, Map as MapIcon, TrendingUp,
  Zap, Cloud
} from "lucide-react";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const SANKEY_DATA = {
  nodes: [
    // Audit Sources — index 0,1
    { name: "DEAs", type: "audit", valueFormatted: "7,482", percentage: "65.3%" },
    { name: "Walkthrough Audits", type: "audit", valueFormatted: "3,976", percentage: "34.7%" },

    // Sectors — index 2,3,4,5,6
    { name: "Steel & Metals", type: "sector", valueFormatted: "3,220", percentage: "25.8%" },
    { name: "Textiles", type: "sector", valueFormatted: "2,410", percentage: "19.4%" },
    { name: "FMCG", type: "sector", valueFormatted: "2,180", percentage: "17.5%" },
    { name: "Chemicals", type: "sector", valueFormatted: "2,648", percentage: "21.3%" },
    { name: "Others", type: "sector", valueFormatted: "2,000", percentage: "16.0%" },

    // Geographies — index 7,8,9,10,11
    { name: "Hyderabad", type: "geo", valueFormatted: "2,450", percentage: "28.0%" },
    { name: "Medchal", type: "geo", valueFormatted: "1,950", percentage: "22.3%" },
    { name: "Rangareddy", type: "geo", valueFormatted: "1,680", percentage: "19.2%" },
    { name: "Sangareddy", type: "geo", valueFormatted: "1,520", percentage: "17.4%" },
    { name: "Other Districts", type: "geo", valueFormatted: "1,142", percentage: "13.1%" },
  ],
  links: [
    // DEAs (0) -> Sectors
    { source: 0, target: 2, value: 2200 },
    { source: 0, target: 3, value: 1700 },
    { source: 0, target: 4, value: 1400 },
    { source: 0, target: 5, value: 1300 },
    { source: 0, target: 6, value: 882 },

    // Walkthrough Audits (1) -> Sectors
    { source: 1, target: 2, value: 1020 },
    { source: 1, target: 3, value: 710 },
    { source: 1, target: 4, value: 780 },
    { source: 1, target: 5, value: 1348 },
    { source: 1, target: 6, value: 1118 },

    // Sector -> Geo
    { source: 2, target: 7, value: 900 },
    { source: 2, target: 8, value: 500 },
    { source: 2, target: 9, value: 400 },
    { source: 2, target: 10, value: 300 },
    { source: 2, target: 11, value: 160 },

    { source: 3, target: 7, value: 500 },
    { source: 3, target: 8, value: 400 },
    { source: 3, target: 9, value: 350 },
    { source: 3, target: 10, value: 300 },
    { source: 3, target: 11, value: 140 },

    { source: 4, target: 7, value: 400 },
    { source: 4, target: 8, value: 350 },
    { source: 4, target: 9, value: 300 },
    { source: 4, target: 10, value: 300 },
    { source: 4, target: 11, value: 180 },

    { source: 5, target: 7, value: 450 },
    { source: 5, target: 8, value: 500 },
    { source: 5, target: 9, value: 400 },
    { source: 5, target: 10, value: 350 },
    { source: 5, target: 11, value: 160 },

    { source: 6, target: 7, value: 200 },
    { source: 6, target: 8, value: 200 },
    { source: 6, target: 9, value: 230 },
    { source: 6, target: 10, value: 270 },
    { source: 6, target: 11, value: 502 },
  ]
};

const getIcon = (name: string, className: string) => {
  switch (name) {
    case "DEAs": return <FileText className={className} />;
    case "Walkthrough Audits": return <Clipboard className={className} />;
    case "Steel & Metals": return <Factory className={className} />;
    case "Textiles": return <Shirt className={className} />;
    case "FMCG": return <Package className={className} />;
    case "Chemicals": return <FlaskConical className={className} />;
    case "Others": return <MoreHorizontal className={className} />;
    case "Hyderabad":
    case "Medchal":
    case "Rangareddy":
    case "Sangareddy":
    case "Other Districts": return <MapPin className={className} />;
    default: return <div className={className} />;
  }
};

const CustomNode = ({ x, y, width, height, payload }: any) => {
  const isAudit = payload.type === 'audit';
  const isSector = payload.type === 'sector';
  
  const themeColors = isAudit 
    ? { bg: 'bg-emerald-100', border: 'bg-emerald-500', textPrimary: 'text-emerald-950', textSecondary: 'text-emerald-700/60', iconText: 'text-emerald-600' }
    : isSector
    ? { bg: 'bg-violet-100', border: 'bg-violet-500', textPrimary: 'text-violet-950', textSecondary: 'text-violet-700/60', iconText: 'text-violet-600' }
    : { bg: 'bg-blue-100', border: 'bg-blue-500', textPrimary: 'text-blue-950', textSecondary: 'text-blue-700/60', iconText: 'text-blue-600' };

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
  const isAudit = payload.source.type === 'audit';
  const color = isAudit ? '#10b981' : '#8b5cf6'; // Emerald for audit->sector, Violet for sector->geo
  
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
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[7px] font-black uppercase tracking-widest text-slate-400">AUDIT</span></div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-violet-500" /><span className="text-[7px] font-black uppercase tracking-widest text-slate-400">SECTOR</span></div>
                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[7px] font-black uppercase tracking-widest text-slate-400">GEO</span></div>
              </div>
            </div>
          </div>

          {/* Right: stat strip */}
          <div className="flex items-center divide-x divide-slate-200 flex-1 justify-end border-l border-slate-200 pl-6">
            {[
              { label: "Assessments", value: "12,458", badge: "+18.6%", color: "text-emerald-600" },
              { label: "Sectors", value: "6", badge: "+2", color: "text-violet-600" },
              { label: "Regions", value: "5", badge: "+1", color: "text-blue-600" },
              { label: "Converted", value: "8,742", badge: "+21.4%", color: "text-emerald-600" },
              { label: "Energy Yield", value: "45.2", badge: "GWh", color: "text-amber-500" },
              { label: "CO₂ Cut", value: "38.5", badge: "kt", color: "text-sky-600" },
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
            <div className="bg-slate-100/80 backdrop-blur px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">AUDIT SOURCE</div>
            <div className="bg-slate-100/80 backdrop-blur px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">SECTOR</div>
            <div className="bg-slate-100/80 backdrop-blur px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">GEOGRAPHY (REGIONAL OUTCOME)</div>
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
                             <p className="font-black uppercase tracking-widest opacity-60 mb-1">Ecosystem Node</p>
                             <h4 className="text-sm font-black mb-2">{data.name}</h4>
                             <div className="flex items-center justify-between"><span className="opacity-60 uppercase font-black">Impact Yield</span><span className="font-black text-emerald-400">{data.value}</span></div>
                          </>
                        ) : (
                          <>
                             <p className="font-black uppercase tracking-widest opacity-60 mb-1">Flow Intelligence</p>
                             <div className="flex items-center gap-2 mb-3">
                                <span className="font-black uppercase">{data.source.name}</span>
                                <ChevronRight size={10} className="opacity-40" />
                                <span className="font-black uppercase">{data.target.name}</span>
                             </div>
                             <div className="flex items-center justify-between"><span className="opacity-60 uppercase font-black">Contribution</span><span className="font-black text-emerald-400">{data.value}</span></div>
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
          value="70.2%" 
          subtext="Assessments to Outcomes" 
        />
        <BottomMetricCard 
          icon={<Target size={20} />} 
          title="TOP PERFORMING SECTOR" 
          value="Steel & Metals" 
          subtext="3,220 Outcomes" 
        />
        <BottomMetricCard 
          icon={<MapIcon size={20} />} 
          title="TOP REGION" 
          value="Hyderabad" 
          subtext="2,450 Outcomes" 
        />
        <BottomMetricCard 
          icon={<TrendingUp size={20} />} 
          title="GROWTH (YOY)" 
          value="+21.4%" 
          subtext="Outcome Increase" 
        />
      </div>

    </div>
  );
}
