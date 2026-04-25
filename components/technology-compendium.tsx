"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Settings, Sun, Database, Waves, LayoutGrid, Zap, BookOpen, ArrowUpRight } from 'lucide-react';

// Dynamically import react-pdf components to avoid SSR issues
const PDFCover = dynamic(() => import('@/components/pdf-cover'), { ssr: false });

export const TechnologyCompendium = () => {
  const [activeFilter, setActiveFilter] = useState('BOILERS');

  const filters = ['BOILERS', 'MOTORS', 'WASTE HEAT RECOVERY', 'SOLAR'];

  const books = [
    {
      id: 1,
      title: 'Dairy Sector Compendium',
      pages: 48,
      bgColor: 'bg-[#102a1d]',
      accentColor: 'text-[#34d399]',
      lineColor: 'border-[#34d399]/30',
      category: 'DAIRY',
      Icon: Database,
      pdfPath: '/pdf/Technology Compendium - Dairy Sector Sep2020.pdf'
    },
    {
      id: 2,
      title: 'Ceramic Sector (Ahmedabad)',
      pages: 44,
      bgColor: 'bg-[#311611]',
      accentColor: 'text-[#f97316]',
      lineColor: 'border-[#f97316]/30',
      category: 'CERAMIC',
      Icon: Settings,
      pdfPath: '/pdf/Technology Compendium in Ceramic Ahmedabad Cluster.pdf'
    },
    {
      id: 3,
      title: 'Ceramic Sector (Thangadh)',
      pages: 52,
      bgColor: 'bg-[#333010]',
      accentColor: 'text-[#eab308]',
      lineColor: 'border-[#eab308]/30',
      category: 'CERAMIC',
      Icon: Zap,
      pdfPath: '/pdf/Technology Compendium in Ceramic Thangadh Cluster 29May2020.pdf'
    },
    {
      id: 4,
      title: 'Foundry & Auto (Indore)',
      pages: 36,
      bgColor: 'bg-[#0f172a]',
      accentColor: 'text-[#38bdf8]',
      lineColor: 'border-[#38bdf8]/30',
      category: 'FOUNDRY',
      Icon: LayoutGrid,
      pdfPath: '/pdf/Technology-Compendium-Indore-Foundry-Auto-Cluster Sep2020.pdf'
    },
    {
      id: 5,
      title: 'Pharma & Readymade (Indore)',
      pages: 44,
      bgColor: 'bg-[#2d1b4d]',
      accentColor: 'text-[#a78bfa]',
      lineColor: 'border-[#a78bfa]/30',
      category: 'PHARMA',
      Icon: ArrowUpRight,
      pdfPath: '/pdf/Technology-Compendium-Indore-Pharma-and-Readymade-Cluster Sep2020.pdf'
    },
    {
      id: 6,
      title: 'Waste Heat Recovery',
      pages: 44,
      bgColor: 'bg-[#0f2336]',
      accentColor: 'text-[#38bdf8]',
      lineColor: 'border-[#38bdf8]/30',
      category: 'THERMAL',
      Icon: Sun,
      image: '/images/tech-hub/waste-heat.png'
    },
  ];

  return (
    <div className="w-full pt-12 pb-24 px-8 md:px-12 bg-[#F8F6F0] font-sans selection:bg-emerald-900 selection:text-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-1">
            Resource Hub • Knowledge Sharing
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-none">
            Technology <span className="text-emerald-600">Compendium</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-medium">
            Centralized repository of proven energy-efficient technologies for MSMEs
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="group relative h-[440px] w-full cursor-pointer [perspective:1500px]"
          >
            {/* The 3D Book Container */}
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] [transform:rotateY(-20deg)] group-hover:[transform:rotateY(0deg)] origin-right">

              {/* Main Book Cover */}
              <div
                className={`absolute inset-0 ${book.bgColor} rounded-l-sm overflow-hidden border-l border-white/10 shadow-2xl z-10 flex flex-col`}
              >
                {/* Top Section: Cover Image/PDF */}
                <div className="flex-1 relative overflow-hidden bg-black/20">
                  {book.pdfPath ? (
                    <div className="w-full h-full">
                      <PDFCover pdfPath={book.pdfPath} />
                    </div>
                  ) : (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Bottom Section: Text Content */}
                <div className="p-5 border-t border-white/20 bg-black/10">
                  <p className="text-[9px] text-white/50 tracking-[0.2em] mb-3 uppercase font-bold">RECP • ENERGY TECH • 2026</p>
                  <h4 className="text-white font-serif text-base leading-tight mb-6 group-hover:text-emerald-400 transition-colors line-clamp-2 min-h-[2.5rem]">{book.title}</h4>
                  <p className="text-[10px] text-white/40 tracking-widest font-mono uppercase">{book.pages} PAGES</p>
                </div>

                {/* Hover Overlay (Full card overlay for CTA) */}
                <div className="absolute inset-0 bg-[#0a1811]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <a
                    href={book.pdfPath || book.image}
                    download
                    className="bg-[#93C59D] hover:bg-[#7eb289] text-[#0a1811] text-[9px] font-bold tracking-widest px-5 py-2.5 rounded-full mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 no-underline"
                  >
                    DOWNLOAD PDF
                  </a>
                  <span className="text-white/60 text-[8px] font-bold tracking-[0.2em]">PREVIEW AVAILABLE</span>
                </div>
              </div>



              {/* Book Spine (Left thickness) */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-8 ${book.bgColor} origin-left [transform:rotateY(-90deg)] brightness-75 border-r border-white/5`}
              />

              {/* Book Pages Edge (Right thickness) */}
              <div
                className="absolute right-0 top-0 bottom-0 w-4 bg-[#E6E1D1] origin-right [transform:rotateY(90deg)] flex flex-col overflow-hidden"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #c8c2a8 2px, #c8c2a8 4px)'
                }}
              />

              {/* Back Cover shadow depth */}
              <div className="absolute inset-0 bg-black/20 [transform:translateZ(-20px)] rounded-r-md blur-sm -z-10 group-hover:opacity-0 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
