"use client";

import { useEffect, useRef, useState, useMemo, JSX } from "react";
import {
  Factory, Shirt, Package, FlaskConical, MapPin,
  Settings, Utensils, IndianRupee, Droplets, Trash2,
  Zap, Cloud, Truck, Cpu, Layers, Beaker,
  Thermometer, Wind, Boxes, Leaf,
} from "lucide-react";

// ─── Layout constants ─────────────────────────────────────────────────────────
const CARD_W = 152;
const CARD_H_SECTOR  = 36;
const CARD_H_CLUSTER = 72;
const CARD_H_METRIC  = 64;
const CARD_GAP = 8;
const COL_PAD_TOP = 50;

// ─── Types ────────────────────────────────────────────────────────────────────
type NodeType = "sector" | "cluster" | "metric";

interface AppNode { name: string; type: NodeType; valueFormatted?: string; unit?: string; percentage?: string; }
interface AppLink { source: number; target: number; value: number; }

// ─── Data (sectors sorted by dominant cluster → fewer crossings) ──────────────
const NODES: AppNode[] = [
  // Sectors 0-14
  { name: "Engineering", type: "sector", valueFormatted: "3,220", percentage: "18%" },
  { name: "Metals", type: "sector", valueFormatted: "2,850", percentage: "15%" },
  { name: "Pharmaceuticals", type: "sector", valueFormatted: "2,410", percentage: "12%" },
  { name: "Chemicals", type: "sector", valueFormatted: "2,180", percentage: "10%" },
  { name: "Paper & Print", type: "sector", valueFormatted: "820", percentage: "2%" },
  { name: "Electronics", type: "sector", valueFormatted: "680", percentage: "1.2%" },
  { name: "Automobile Parts", type: "sector", valueFormatted: "540", percentage: "1%" },
  { name: "Electricals", type: "sector", valueFormatted: "750", percentage: "1.5%" },
  { name: "Textiles", type: "sector", valueFormatted: "1,850", percentage: "8%" },
  { name: "Plastics & Rubber", type: "sector", valueFormatted: "1,640", percentage: "7%" },
  { name: "Food Processing", type: "sector", valueFormatted: "1,950", percentage: "9%" },
  { name: "Foundry", type: "sector", valueFormatted: "1,420", percentage: "6%" },
  { name: "Rice Mills", type: "sector", valueFormatted: "1,200", percentage: "5%" },
  { name: "Ceramics", type: "sector", valueFormatted: "950", percentage: "3%" },
  { name: "Agro & Others", type: "sector", valueFormatted: "450", percentage: "0.8%" },
  // Clusters 15-21
  { name: "Hyderabad", type: "cluster", valueFormatted: "4,450", percentage: "18%" },
  { name: "Medchal", type: "cluster", valueFormatted: "3,950", percentage: "16%" },
  { name: "Rangareddy", type: "cluster", valueFormatted: "3,680", percentage: "14%" },
  { name: "Sangareddy", type: "cluster", valueFormatted: "3,520", percentage: "13%" },
  { name: "Jeedimetla", type: "cluster", valueFormatted: "3,400", percentage: "12%" },
  { name: "Mahbubnagar", type: "cluster", valueFormatted: "3,250", percentage: "11%" },
  { name: "Other Districts", type: "cluster", valueFormatted: "4,258", percentage: "16%" },
  // Metrics 22-27
  { name: "CO₂ Reduction", type: "metric", valueFormatted: "38.5k", unit: "tCO₂e" },
  { name: "Cost Savings", type: "metric", valueFormatted: "₹125.4", unit: "Cr" },
  { name: "Energy Savings", type: "metric", valueFormatted: "45.2", unit: "GWh" },
  { name: "Water Savings", type: "metric", valueFormatted: "850", unit: "ML" },
  { name: "Waste Reduction", type: "metric", valueFormatted: "2,400", unit: "MT" },
];

const LINKS: AppLink[] = [
  // Sectors → Clusters
  { source: 0, target: 15, value: 800 }, { source: 0, target: 16, value: 700 }, { source: 0, target: 19, value: 600 },
  { source: 1, target: 15, value: 900 }, { source: 1, target: 19, value: 800 },
  { source: 2, target: 15, value: 600 }, { source: 2, target: 16, value: 800 }, { source: 2, target: 18, value: 500 }, { source: 2, target: 19, value: 700 },
  { source: 3, target: 15, value: 500 }, { source: 3, target: 16, value: 600 }, { source: 3, target: 18, value: 500 }, { source: 3, target: 19, value: 500 },
  { source: 4, target: 15, value: 400 }, { source: 4, target: 16, value: 420 },
  { source: 5, target: 15, value: 680 },
  { source: 6, target: 16, value: 540 },
  { source: 7, target: 17, value: 750 },
  { source: 8, target: 17, value: 600 }, { source: 8, target: 21, value: 1200 },
  { source: 9, target: 16, value: 600 }, { source: 9, target: 21, value: 600 },
  { source: 10, target: 15, value: 400 }, { source: 10, target: 20, value: 800 }, { source: 10, target: 21, value: 900 },
  { source: 11, target: 15, value: 500 }, { source: 11, target: 21, value: 700 },
  { source: 12, target: 21, value: 1200 },
  { source: 13, target: 21, value: 950 },
  { source: 14, target: 21, value: 450 },
  // Clusters → Metrics
  { source: 15, target: 22, value: 1200 }, { source: 15, target: 23, value: 1000 }, { source: 15, target: 24, value: 1200 }, { source: 15, target: 26, value: 800 },
  { source: 16, target: 22, value: 1100 }, { source: 16, target: 24, value: 1000 }, { source: 16, target: 26, value: 600 },
  { source: 17, target: 22, value: 900 }, { source: 17, target: 23, value: 800 }, { source: 17, target: 25, value: 600 },
  { source: 18, target: 22, value: 800 }, { source: 18, target: 25, value: 800 },
  { source: 19, target: 22, value: 900 }, { source: 19, target: 23, value: 800 }, { source: 19, target: 24, value: 900 }, { source: 19, target: 26, value: 500 },
  { source: 20, target: 22, value: 800 }, { source: 20, target: 24, value: 700 }, { source: 20, target: 25, value: 600 },
  { source: 21, target: 22, value: 1500 }, { source: 21, target: 23, value: 1200 }, { source: 21, target: 24, value: 1000 }, { source: 21, target: 26, value: 500 },
];

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  sector: { bg: "#f0fdf4", border: "#86efac", accent: "#16a34a", icon: "#16a34a", text: "#14532d", sub: "#4ade80", line: "#22c55e" },
  cluster: { bg: "#eff6ff", border: "#93c5fd", accent: "#2563eb", icon: "#2563eb", text: "#1e3a8a", sub: "#60a5fa", line: "#3b82f6" },
  metric: { bg: "#faf5ff", border: "#c4b5fd", accent: "#7c3aed", icon: "#7c3aed", text: "#3b0764", sub: "#a78bfa", line: "#8b5cf6" },
};

// ─── Icon map ─────────────────────────────────────────────────────────────────
function NodeIcon({ name }: { name: string }) {
  const cls = "w-3.5 h-3.5";
  const icons: Record<string, JSX.Element> = {
    "Engineering": <Settings className={cls} />, "Metals": <Layers className={cls} />,
    "Pharmaceuticals": <Beaker className={cls} />, "Chemicals": <FlaskConical className={cls} />,
    "Food Processing": <Utensils className={cls} />, "Textiles": <Shirt className={cls} />,
    "Plastics & Rubber": <Boxes className={cls} />, "Foundry": <Factory className={cls} />,
    "Rice Mills": <Wind className={cls} />, "Ceramics": <Package className={cls} />,
    "Paper & Print": <Truck className={cls} />, "Electricals": <Zap className={cls} />,
    "Electronics": <Cpu className={cls} />, "Automobile Parts": <Truck className={cls} />,
    "Agro & Others": <Leaf className={cls} />, "CO₂ Reduction": <Cloud className={cls} />,
    "Cost Savings": <IndianRupee className={cls} />, "TOE Savings": <Thermometer className={cls} />,
    "Energy Savings": <Zap className={cls} />, "Water Savings": <Droplets className={cls} />,
    "Waste Reduction": <Trash2 className={cls} />,
  };
  return icons[name] ?? <MapPin className={cls} />;
}

// ─── Smooth cubic Bézier ──────────────────────────────────────────────────────
function bézier(sx: number, sy: number, tx: number, ty: number) {
  const cx = (sx + tx) / 2;
  return `M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ty}, ${tx} ${ty}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function EnergySankeyFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(1100);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWrapW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Column x positions (left edge of card)
  const colX = useMemo(() => {
    const pad = 16;
    return {
      sector: pad,
      cluster: (wrapW - CARD_W) / 2,
      metric: wrapW - pad - CARD_W,
    };
  }, [wrapW]);

  // Card positions per node index
  const { posMap, svgH } = useMemo(() => {
    const byType: Record<NodeType, number[]> = { sector: [], cluster: [], metric: [] };
    NODES.forEach((n, i) => byType[n.type].push(i));

    const getH = (t: NodeType) => t === "sector" ? CARD_H_SECTOR : t === "cluster" ? CARD_H_CLUSTER : CARD_H_METRIC;

    const colHeight = (idxs: number[], type: NodeType) => {
      const h = getH(type);
      return idxs.length * h + (idxs.length - 1) * CARD_GAP;
    };
    const maxH = Math.max(...(["sector", "cluster", "metric"] as NodeType[]).map(t => colHeight(byType[t], t)));
    const svgH = maxH + COL_PAD_TOP + 32;

    const posMap = new Map<number, { x: number; y: number }>();
    (["sector", "cluster", "metric"] as NodeType[]).forEach(type => {
      const idxs = byType[type];
      const totalH = colHeight(idxs, type);
      const startY = COL_PAD_TOP + (maxH - totalH) / 2;
      const x = colX[type];
      const h = getH(type);
      idxs.forEach((nodeIdx, i) => {
        posMap.set(nodeIdx, { x, y: startY + i * (h + CARD_GAP) });
      });
    });

    return { posMap, svgH };
  }, [colX]);

  // Highlighted link set on hover
  const hlSet = useMemo(() => {
    const s = new Set<number>();
    if (hover === null) return s;
    const hovType = NODES[hover].type;
    LINKS.forEach((l, i) => {
      if (l.source === hover || l.target === hover) {
        s.add(i);
        // cascade: sector hover → also dim/show downstream cluster→metric links
        if (hovType === "sector") {
          LINKS.forEach((l2, i2) => { if (l2.source === l.target) s.add(i2); });
        }
        // cascade: metric hover → show upstream cluster→sector links
        if (hovType === "metric") {
          LINKS.forEach((l2, i2) => { if (l2.target === l.source) s.add(i2); });
        }
      }
    });
    return s;
  }, [hover]);

  const anyHover = hover !== null;
  const maxVal = Math.max(...LINKS.map(l => l.value));

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-1">
            Telangana · Industrial Energy Programme
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-none">
            Energy & Resource <span className="text-indigo-600">Flow Pathway</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Hover any card to trace its complete upstream &amp; downstream flow
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {([
            { label: "Sectors", val: "15", color: T.sector.accent },
            { label: "Clusters", val: "7", color: T.cluster.accent },
            { label: "Impact Areas", val: "5", color: T.metric.accent },
          ] as const).map(d => (
            <div key={d.label} className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <div className="text-xl font-black" style={{ color: d.color }}>{d.val}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mb-4 pl-1 items-center">
        {(["sector", "cluster", "metric"] as NodeType[]).map(t => (
          <div key={t} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: T[t].accent }} />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {t === "sector" ? "Industrial Sectors" : t === "cluster" ? "District Clusters" : "Impact Metrics"}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-end gap-0.5 h-3">
            {[2, 4, 7].map(w => <div key={w} className="rounded-full bg-slate-300" style={{ width: 24, height: w }} />)}
          </div>
          <span className="text-[10px] font-medium text-slate-400">Line weight = flow volume</span>
        </div>
      </div>

      {/* Canvas */}
      <div ref={wrapRef} className="relative w-full" style={{ height: svgH }}>

        {/* Column headers */}
        {(["sector", "cluster", "metric"] as NodeType[]).map(t => (
          <div
            key={t}
            className="absolute flex flex-col items-center"
            style={{ left: colX[t], top: 10, width: CARD_W }}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: T[t].accent }}>
              {t === "sector" ? "Industrial Sectors" : t === "cluster" ? "District Clusters" : "Impact Metrics"}
            </span>
            <div className="mt-1.5 h-[2px] w-10 rounded-full" style={{ background: T[t].accent }} />
          </div>
        ))}

        {/* SVG link layer (behind cards) */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%" height={svgH}
          style={{ overflow: "visible" }}
        >
          <defs>
            {LINKS.map((_, i) => {
              const s = NODES[LINKS[i].source];
              const t = NODES[LINKS[i].target];
              return (
                <linearGradient key={i} id={`g${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={T[s.type].line} />
                  <stop offset="100%" stopColor={T[t.type].line} />
                </linearGradient>
              );
            })}
          </defs>

          {/* Draw dim pass first, then highlighted on top */}
          {[false, true].map(pass =>
            LINKS.map((l, i) => {
              const sp = posMap.get(l.source);
              const tp = posMap.get(l.target);
              if (!sp || !tp) return null;

              const hl = hlSet.has(i);
              const dm = anyHover && !hl;
              if (pass !== hl) return null; // render highlighted in second pass

              // stroke width scaled to value
              const baseW = 1.5 + (l.value / maxVal) * 9;
              const sw = hl ? baseW + 1.5 : baseW;

              // Connect: right-centre of source card → left-centre of target card
              const s = NODES[l.source];
              const t = NODES[l.target];
              const sh = s.type === "sector" ? CARD_H_SECTOR : s.type === "cluster" ? CARD_H_CLUSTER : CARD_H_METRIC;
              const th = t.type === "sector" ? CARD_H_SECTOR : t.type === "cluster" ? CARD_H_CLUSTER : CARD_H_METRIC;
              const sx = sp.x + CARD_W;
              const sy = sp.y + sh / 2;
              const tx = tp.x;
              const ty = tp.y + th / 2;

              return (
                <path
                  key={i}
                  d={bézier(sx, sy, tx, ty)}
                  fill="none"
                  stroke={dm ? "#e2e8f0" : hl ? `url(#g${i})` : "#d1d5db"}
                  strokeWidth={sw}
                  strokeOpacity={dm ? 0.25 : hl ? 0.9 : 0.4}
                  strokeLinecap="round"
                  style={{ transition: "stroke-opacity 0.18s, stroke-width 0.18s" }}
                />
              );
            })
          )}
        </svg>

        {/* HTML card layer (in front of SVG) */}
        {NODES.map((node, i) => {
          const pos = posMap.get(i);
          if (!pos) return null;
          const theme = T[node.type];
          const isHov = hover === i;
          const involvedLinks = LINKS.some((l, li) =>
            (l.source === i || l.target === i) && hlSet.has(li)
          );
          const faded = anyHover && !isHov && !involvedLinks;

          return (
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                position: "absolute",
                left: pos.x,
                top: pos.y,
                width: CARD_W,
                height: node.type === "sector" ? CARD_H_SECTOR : node.type === "cluster" ? CARD_H_CLUSTER : CARD_H_METRIC,
                background: faded ? "#f8fafc" : theme.bg,
                border: `1.5px solid ${isHov ? theme.accent : faded ? "#e2e8f0" : theme.border}`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                padding: "0 10px 0 14px",
                gap: 8,
                cursor: "default",
                opacity: faded ? 0.3 : 1,
                transform: isHov ? "scale(1.04)" : "scale(1)",
                boxShadow: isHov
                  ? `0 6px 24px ${theme.accent}30, 0 1px 4px ${theme.accent}15`
                  : "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.18s ease",
                zIndex: isHov ? 20 : 1,
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: "absolute", left: 0, top: 6, bottom: 6,
                width: 3, borderRadius: "0 2px 2px 0",
                background: theme.accent,
                opacity: faded ? 0.3 : 1,
              }} />

              {/* Icon badge */}
              <div style={{
                flexShrink: 0,
                width: 26, height: 26, borderRadius: 7,
                background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                color: theme.icon,
              }}>
                <NodeIcon name={node.name} />
              </div>

              {/* Labels */}
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{
                  margin: 0, fontSize: 10, fontWeight: 800, color: theme.text,
                  textTransform: "uppercase", letterSpacing: "0.03em",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  lineHeight: 1.2,
                }}>
                  {node.name}
                </p>
                <p style={{
                  margin: 0, marginTop: 2, fontSize: 9, fontWeight: 600,
                  color: faded ? "#94a3b8" : theme.sub,
                }}>
                  {node.valueFormatted}
                  {node.unit ? ` ${node.unit}` : node.percentage ? ` · ${node.percentage}` : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="mt-5 text-center text-[10px] tracking-widest font-semibold uppercase text-slate-300">
        15,420 Total Interventions · Telangana Industrial Energy Efficiency Programme
      </p>
    </div>
  );
}