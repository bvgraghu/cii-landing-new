"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Leaf, Activity, Droplets, Zap, IndianRupee } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useAppTheme } from "@/context/theme-context";
import { EnergySankeyFlow } from "@/components/energy-sankey-flow";

// --- LAYER-BASED COLOR STRATEGY (STRICT) ---
const SECTOR_THEMES: Record<string, { base: string, mid: string, light: string }> = {
  "Food Processing": { base: "#10B981", mid: "#6EE7B7", light: "#D1FAE5" },
  "Textiles": { base: "#F59E0B", mid: "#FCD34D", light: "#FEF3C7" },
  "Engineering/Metals": { base: "#3B82F6", mid: "#93C5FD", light: "#DBEAFE" },
  "Pharma/Chemicals": { base: "#14B8A6", mid: "#5EEAD4", light: "#CCFBF1" },
  "Others": { base: "#64748B", mid: "#94A3B8", light: "#F8FAFC" },
};

// --- Raw Data Seed ---
const RAW_DATA: Record<string, { total: number, breakdown: Record<string, number> }> = {
  "Balanagar": { total: 2387, breakdown: { "Engineering/Metals": 0.5, "Pharma/Chemicals": 0.15, "Food Processing": 0.1, "Others": 0.15 } },
  "Cherlapally": { total: 967, breakdown: { "Pharma/Chemicals": 0.3, "Engineering/Metals": 0.3, "Food Processing": 0.1, "Textiles": 0.1, "Others": 0.2 } },
  "Hanumakonda": { total: 1176, breakdown: { "Food Processing": 0.38, "Textiles": 0.31, "Others": 0.31 } },
  "Jeedimetla": { total: 2378, breakdown: { "Pharma/Chemicals": 0.33, "Engineering/Metals": 0.30, "Food Processing": 0.15, "Others": 0.22 } },
  "Karimnagar": { total: 1709, breakdown: { "Food Processing": 0.36, "Textiles": 0.33, "Others": 0.31 } },
  "Khammam": { total: 1615, breakdown: { "Food Processing": 0.49, "Textiles": 0.10, "Others": 0.41 } },
  "Katedan": { total: 1119, breakdown: { "Food Processing": 0.35, "Engineering/Metals": 0.20, "Pharma/Chemicals": 0.25, "Others": 0.20 } },
  "Mahabubnagar": { total: 1168, breakdown: { "Food Processing": 0.57, "Textiles": 0.135, "Others": 0.295 } },
  "Maheshwaram": { total: 1119, breakdown: { "Engineering/Metals": 0.45, "Food Processing": 0.3, "Pharma/Chemicals": 0.17, "Others": 0.08 } },
  "Mancherial": { total: 1408, breakdown: { "Food Processing": 0.42, "Textiles": 0.42, "Others": 0.16 } },
  "Medak": { total: 1077, breakdown: { "Food Processing": 0.53, "Textiles": 0.16, "Others": 0.31 } },
  "Medchal-Malkajgiri": { total: 1871, breakdown: { "Food Processing": 0.16, "Engineering/Metals": 0.29, "Textiles": 0.11, "Pharma/Chemicals": 0.18, "Others": 0.26 } },
  "Nacharam": { total: 1103, breakdown: { "Engineering/Metals": 0.35, "Pharma/Chemicals": 0.50, "Others": 0.15 } },
  "Nalgonda": { total: 2856, breakdown: { "Food Processing": 0.48, "Textiles": 0.28, "Others": 0.24 } },
  "Nizamabad": { total: 2341, breakdown: { "Food Processing": 0.39, "Textiles": 0.37, "Others": 0.24 } },
  "Patancheru": { total: 741, breakdown: { "Pharma/Chemicals": 0.50, "Engineering/Metals": 0.20, "Food Processing": 0.15, "Others": 0.15 } },
  "Rajanna Sircilla": { total: 1822, breakdown: { "Textiles": 0.65, "Food Processing": 0.26, "Others": 0.09 } },
  "Sangareddy": { total: 1319, breakdown: { "Food Processing": 0.35, "Textiles": 0.10, "Engineering/Metals": 0.18, "Pharma/Chemicals": 0.13, "Others": 0.24 } },
  "Warangal": { total: 1550, breakdown: { "Food Processing": 0.50, "Textiles": 0.27, "Others": 0.23 } },
  "Yadadri Bhuvanagiri": { total: 1421, breakdown: { "Textiles": 0.56, "Food Processing": 0.28, "Others": 0.16 } },
};

const TOP_SECTORS = ["Food Processing", "Textiles", "Engineering/Metals", "Pharma/Chemicals"];

export function EOIAssessmentDashboard() {
  const { theme, colors } = useAppTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [scrollPhase, setScrollPhase] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => {
      let phase = Math.floor(v * 11);
      if (phase > 10) phase = 10;
      setScrollPhase(phase);
    });
  }, [scrollYProgress]);

  const [hoveredData, setHoveredData] = useState<any>(null);

  // 1. Generate 3-Level Interactive Tree
  const echartData = useMemo(() => {
    const data: any[] = [];
    const TICK = scrollPhase;

    TOP_SECTORS.forEach((sectorName, sIdx) => {
      let maxDepth = 1;
      if (TICK > 0) {
        const relativeTick = TICK - (sIdx * 2);
        if (relativeTick >= 2) maxDepth = 3;
        else if (relativeTick === 1) maxDepth = 2;
        else maxDepth = 1;
      }

      const INVISIBLE = {
        itemStyle: { opacity: 0, borderWidth: 0, color: 'transparent' },
        label: { show: false }
      };

      const theme = SECTOR_THEMES[sectorName] || SECTOR_THEMES["Others"];

      const sectorNode = {
        id: `sector-${sIdx + 1}`,
        name: sectorName,
        itemStyle: { color: theme.base, opacity: 1 },
        children: [] as any[],
        // Store for summary
        meta: { theme, type: 'sector', name: sectorName }
      };

      const clusterBuffer: any[] = [];

      Object.keys(RAW_DATA).forEach(clusterName => {
        const cData = RAW_DATA[clusterName];
        if (cData.breakdown[sectorName]) {
          const exactVolume = Math.round(cData.total * cData.breakdown[sectorName]);

          const eoisVal = Math.round(exactVolume * 0.85 * 0.25);
          const assessments = Math.round(exactVolume * 0.85 * 0.25 * 0.55);

          let mlt = 1;
          if (sectorName === "Engineering/Metals") { mlt = 1.5; }
          if (sectorName === "Pharma/Chemicals") { mlt = 1.8; }
          if (sectorName === "Food Processing") { mlt = 1.2; }
          if (sectorName === "Textiles") { mlt = 1.6; }
          if (sectorName === "Rubber/Plastics") { mlt = 2.8; } // Maximum width for label fit

          const energyMWh = Math.round((assessments * 15000 * mlt) / 1000);
          const clusterVisible = maxDepth >= 2;
          const impactVisible = maxDepth >= 3;

          const clusterNode = {
            originalName: clusterName,
            name: clusterName,
            value: exactVolume,
            itemStyle: clusterVisible ? { color: theme.mid, opacity: 0.95 } : INVISIBLE.itemStyle,
            label: clusterVisible ? { color: '#0f172a', rotate: 'tangential', fontSize: 10 } : INVISIBLE.label,
            meta: { theme, type: 'cluster', sector: sectorName, cluster: clusterName, eois: eoisVal, energy: energyMWh },
            children: [
              {
                name: `EoIs: ${eoisVal.toLocaleString()}`,
                value: exactVolume / 2,
                formattedVal: `${eoisVal.toLocaleString()} EoIs`,
                unit: "EoIs",
                itemStyle: impactVisible ? { color: theme.light, opacity: 0.9 } : INVISIBLE.itemStyle,
                label: impactVisible ? { color: '#1e293b' } : INVISIBLE.label,
                meta: { theme, type: 'metric', label: 'Registered EoIs', value: eoisVal, unit: 'Applications' }
              },
              {
                name: `Saving: ${energyMWh.toLocaleString()} MWh`,
                value: exactVolume / 2,
                formattedVal: `${energyMWh.toLocaleString()} MWh`,
                unit: "MWh",
                itemStyle: impactVisible ? { color: theme.light, opacity: 0.9 } : INVISIBLE.itemStyle,
                label: impactVisible ? { color: '#1e293b' } : INVISIBLE.label,
                meta: { theme, type: 'metric', label: 'Projected Energy Savings', value: energyMWh, unit: 'MWh' }
              }
            ]
          };

          clusterBuffer.push(clusterNode);
        }
      });

      if (clusterBuffer.length > 0) {
        clusterBuffer.sort((a, b) => b.value - a.value);
        const top3 = clusterBuffer.slice(0, 3);
        const sectorTotal = top3.reduce((sum, c) => sum + c.value, 0);

        top3.forEach(c => {
          const pct = Math.round((c.value / sectorTotal) * 100);
          c.name = `${c.originalName.replace('-', '-\n')}\n(${pct}%)`;
          delete c.value;
          sectorNode.children.push(c);
        });

        data.push(sectorNode);
      }
    });

    const globalTotal = data.reduce((sum, s) =>
      sum + s.children.reduce((cSum: number, c: any) =>
        cSum + c.children.reduce((lSum: number, l: any) => lSum + l.value, 0)
        , 0)
      , 0);

    data.forEach(s => {
      const sVol = s.children.reduce((cSum: number, c: any) =>
        cSum + c.children.reduce((lSum: number, l: any) => lSum + l.value, 0)
        , 0);
      const pct = Math.round((sVol / globalTotal) * 100);
      s.meta.totalMWh = s.children.reduce((sum: number, c: any) => sum + (c.meta?.energy || 0), 0);
      s.meta.totalEoIs = s.children.reduce((sum: number, c: any) => sum + (c.meta?.eois || 0), 0);
      s.name = `${s.name.replace('/', '/\n')}\n(${pct}%)`;
    });

    return [{
      id: 'root',
      name: 'Telangana\nEnergy\nGrowth\n\n- Impact -',
      itemStyle: { color: 'transparent' },
      label: { show: true, position: 'inside', align: 'center', rotate: 0, color: '#0f172a', fontSize: 16, fontWeight: '900' },
      children: data
    }];
  }, [scrollPhase]);

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        borderRadius: 12,
        padding: [12, 16],
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowBlur: 10,
        textStyle: { color: '#0f172a', fontSize: 13 },
        formatter: (params: any) => {
          if (params.data?.itemStyle?.opacity === 0 || params.treePathInfo?.length === 0) return '';
          const { name, data, treePathInfo } = params;
          if (treePathInfo.length === 1) return `<b>Statewide Target</b><br/>Click to zoom out`;

          let breadcrumb = treePathInfo.slice(1).map((t: any) => t.name.replace(/\n(.*)/g, '')).join(' / ');

          if (data.formattedVal) {
            return `
                 <div style="font-size:10px;color:#64748b;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;font-weight:700">${breadcrumb}</div>
                 <div style="font-size:16px;font-weight:800;color:#0f172a">${name.split('\n')[0]}: <span style="color:${params.color}">${data.formattedVal}</span></div>
               `;
          }
          return `
               <div style="font-size:10px;color:#64748b;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em;font-weight:700">${breadcrumb}</div>
               <div style="font-size:15px;font-weight:800;color:#0f172a">${name.replace(/\n(.*)/g, ' $1')}</div>
               <div style="font-size:11px;color:#64748b;margin-top:4px;">Click to explore deeper</div>
            `;
        }
      },
      series: {
        type: 'sunburst',
        data: echartData,
        radius: [0, '100%'],
        sort: null,
        nodeClick: 'rootToNode',
        emphasis: {
          focus: 'ancestor',
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(0,0,0,0.15)'
          }
        },
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1.5
        },
        levels: [
          { itemStyle: { color: 'transparent' } }, // Root
          { itemStyle: { color: 'transparent' } }, // Virtual Root
          {
            // Level 1: Sectors
            r0: scrollPhase === 0 ? '30%' : '20%',
            r: scrollPhase === 0 ? '70%' : '45%',
            label: { position: 'inside', rotate: 0, align: 'center', fontSize: 13, fontWeight: '800', color: '#ffffff' }
          },
          {
            // Level 2: Clusters
            r0: '45%', r: '72%',
            label: { position: 'inside', rotate: 0, align: 'center', fontSize: 11, fontWeight: '700', color: '#1e293b' }
          },
          {
            // Level 3: Metrics
            r0: '72%', r: '100%',
            label: {
              position: 'inside',
              rotate: 'radial',
              align: 'right',
              minAngle: 10,
              overflow: 'truncate',
              color: '#334155',
              fontSize: 8.5,
              fontWeight: '800'
            }
          }
        ]
      }
    };
  }, [echartData, scrollPhase]);

  const onEvents = {
    'mouseover': (params: any) => {
      if (params.data?.meta) {
        setHoveredData(params.data.meta);
      }
    },
    'mouseout': () => {
      setHoveredData(null);
    }
  };

  return (
    <>
    <section ref={containerRef} className="w-full relative py-10 bg-slate-900 border-t-4 border-emerald-500 border-b border-b-slate-700" id="impact-dashboard">
      <div className="w-full flex items-center justify-center px-4 md:px-12">
        <div className="max-w-[1500px] w-full mx-auto flex flex-col items-center justify-center gap-8">



          <EnergySankeyFlow />

        </div>
      </div>
    </section>

    {/* --- SECTORAL COVERAGE MAP HIDDEN ---
          <section className="w-full relative transition-colors duration-700" id="impact-dashboard" style={{ height: "300vh", backgroundColor: colors.sectionBg }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-2 md:py-3 px-4 md:px-12">
        <div className="max-w-[1500px] w-full mx-auto flex flex-col h-full items-center justify-center">

          <div className="flex flex-col md:flex-row items-end justify-between border-b border-slate-200 pb-1 mb-1 w-full transition-colors duration-700">
            <div className="w-full md:w-auto">
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-none italic mb-0.5 md:mb-0.5 transition-colors duration-700"
                style={{ color: colors.sectionBg === '#ffffff' ? '#0f172a' : '#f8fafc' }}
              >
                Sectoral <span style={{ color: colors.primary }}>Coverage Map</span>
              </h2>
              <p
                className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-700"
                style={{ color: colors.sectionBg === '#ffffff' ? '#94a3b8' : '#cbd5e1' }}
              >
                Interactive visualization showcasing MSME distribution across sectors.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <p
                className="text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm border border-slate-100 px-4 py-1.5 rounded-full mt-4 md:mt-0 max-w-sm ml-auto transition-colors duration-700"
                style={{
                  backgroundColor: colors.sectionBg === '#ffffff' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)',
                  color: colors.sectionBg === '#ffffff' ? '#94a3b8' : '#cbd5e1'
                }}
              >
                <span style={{ color: colors.primary }} className="text-base">↓</span> <span style={{ color: colors.primary }}>Scroll slowly</span> to build the tree.
              </p>
            </div>
          </div>

          <div
            className="w-full backdrop-blur-sm shadow-[0_30px_100px_rgba(0,0,0,0.08)] rounded-[2rem] md:rounded-[3rem] border p-4 md:p-8 flex flex-1 w-full min-h-[400px] md:min-h-[600px] max-h-[85vh] relative mt-2 overflow-hidden transition-all duration-700"
            style={{ backgroundColor: `${colors.light}aa`, borderColor: colors.mid }}
          >

            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 flex flex-col gap-2 md:gap-4 bg-white/40 backdrop-blur-xl p-3 md:p-5 rounded-2xl md:rounded-3xl border border-white/40 shadow-sm pointer-events-none min-w-[140px] md:min-w-[200px]">
              <div className="space-y-0.5 md:space-y-1">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Milestone</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg md:text-2xl font-black text-slate-900 tracking-tighter">1,240+</span>
                  <span className="text-[10px] md:text-xs font-black italic" style={{ color: colors.primary }}>MWh</span>
                </div>
              </div>
              <div className="h-px bg-slate-200/50 w-full" />
              <div className="space-y-0.5 md:space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-md md:text-xl font-black text-slate-900 tracking-tighter">8,450+</span>
                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase">EoIs</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: hoveredData ? 1 : 0, x: hoveredData ? 0 : 20 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-48 md:w-72 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 shadow-xl pointer-events-none scale-90 md:scale-100 origin-top-right"
            >
              {hoveredData && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: hoveredData.theme.light }}>
                      <Activity size={20} style={{ color: hoveredData.theme.base }} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Highlighted Segment</h4>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {hoveredData.type === 'sector' ? hoveredData.name : hoveredData.cluster || hoveredData.label}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {hoveredData.type === 'sector' ? (
                      <>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/50">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Sector Total Energy Saved</p>
                          <p className="text-xl font-black text-slate-900">{hoveredData.totalMWh.toLocaleString()} <span className="text-xs text-slate-500 font-bold italic">MWh</span></p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/50">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Total Sector EoIs</p>
                          <p className="text-xl font-black text-slate-900">{hoveredData.totalEoIs.toLocaleString()} <span className="text-xs text-slate-500 font-bold italic">Units</span></p>
                        </div>
                      </>
                    ) : hoveredData.type === 'cluster' ? (
                      <>
                        <div className="p-3 rounded-2xl" style={{ backgroundColor: hoveredData.theme.light + '40', border: `1px solid ${hoveredData.theme.mid}20` }}>
                          <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Cluster Energy Savings</p>
                          <p className="text-xl font-black" style={{ color: hoveredData.theme.base }}>{hoveredData.energy.toLocaleString()} <span className="text-xs opacity-70 italic font-bold">MWh</span></p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-slate-100">
                          <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Interest Expressions</p>
                          <p className="text-lg font-black text-slate-800">{hoveredData.eois.toLocaleString()} <span className="text-xs text-slate-500">EoIs</span></p>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 rounded-2xl" style={{ backgroundColor: hoveredData.theme.base + '10', border: `1px solid ${hoveredData.theme.base}20` }}>
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{hoveredData.label}</p>
                        <p className="text-2xl font-black" style={{ color: hoveredData.theme.base }}>{hoveredData.value.toLocaleString()} <span className="text-xs opacity-60 font-bold italic">{hoveredData.unit}</span></p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: hoveredData.theme.base }} />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Live Analysis Active</span>
                  </div>
                </div>
              )}
            </motion.div>

            <ReactECharts
              ref={chartRef}
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
              onEvents={onEvents}
            />
          </div>

        </div>
      </div>
    </section>
    --- SECTORAL COVERAGE MAP HIDDEN --- */}
    </>
  );
}
