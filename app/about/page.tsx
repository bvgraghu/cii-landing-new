"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Leaf, 
  Users, 
  Cpu, 
  Target, 
  Award, 
  Globe, 
  ArrowRight,
  Database,
  Briefcase
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero / Header ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern> pattern
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
              Institutional Framework
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8 italic">
              Empowering MSMEs, <br />
              <span className="text-emerald-600">Enabling Growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-semibold leading-relaxed max-w-3xl mx-auto">
              The Greening of MSMEs under RAMP initiative is designed to accelerate the transition of MSMEs towards sustainable and climate-resilient operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT RAMP ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -z-10" />
              <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                What is <span className="text-emerald-600 underline decoration-4 underline-offset-8">RAMP</span>?
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
                <p>
                  <strong>Raising and Accelerating MSME Performance (RAMP)</strong> is a flagship programme of the Ministry of MSME, supported by the World Bank, aimed at strengthening MSMEs across the country.
                </p>
                <p>
                  MSMEs are central to this transition, playing a vital role in driving sustainable growth and contributing to national Net Zero goals.
                </p>
                <p className="bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-600 italic">
                  "In Telangana, this vision is further reinforced by the State’s commitment to become a Green Energy State by 2030."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]"
            >
              <Image 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2013" 
                alt="Sustainability and industry" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE PROGRAMME ───────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">About the Project</h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-16 font-semibold">Accelerating the transition towards sustainable and climate-resilient operations.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="w-8 h-8" />, 
                title: "Resource Efficiency", 
                desc: "Focusing on improving resource efficiency, reducing emissions, and enabling MSMEs to adopt cleaner production practices." 
              },
              { 
                icon: <Users className="w-8 h-8" />, 
                title: "Expert Guidance", 
                desc: "Through structured assessments and active engagement with a wider ecosystem of technology providers and experts." 
              },
              { 
                icon: <Globe className="w-8 h-8" />, 
                title: "Global Alignment", 
                desc: "Aligns with India’s broader commitments to sustainable development by strengthening MSME competitiveness." 
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTICIPATING AGENCIES ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Collaborators</span>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">PARTICIPATING AGENCIES</h2>
          </div>

          <div className="space-y-12">
            {[
              {
                name: "Government of Telangana",
                desc: "The Government of Telangana plays a pivotal role in driving the greening agenda by providing policy support, institutional backing, and strategic direction.",
                role: "Strategic Direction & Policy Support",
                icon: <ShieldCheck className="w-10 h-10 text-emerald-600" />
              },
              {
                name: "Research and Innovation Circle of Hyderabad (RICH)",
                desc: "RICH acts as a key innovation and knowledge partner, fostering collaboration between industry, academia, and startups.",
                role: "Innovation & Knowledge Partner",
                icon: <Cpu className="w-10 h-10 text-emerald-600" />
              },
              {
                name: "Confederation of Indian Industry (CII)",
                desc: "CII serves as the implementing agency for the initiative, leading on-ground execution and industry engagement.",
                role: "Implementing Agency",
                icon: <Briefcase className="w-10 h-10 text-emerald-600" />
              }
            ].map((agency, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 p-8 md:p-12 bg-slate-50 rounded-[3rem] border border-slate-100 items-center hover:bg-white hover:shadow-2xl transition-all group"
              >
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  {agency.icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider mb-2 block">{agency.role}</span>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{agency.name}</h3>
                  <p className="text-slate-500 font-semibold leading-relaxed max-w-2xl">
                    {agency.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM BUILDING ──────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 skew-x-12 translate-x-1/2" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tighter uppercase">ECOSYSTEM BUILDING</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                The initiative focuses on building a strong ecosystem to support MSMEs through capacity building, stakeholder engagement, and knowledge dissemination.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Workshops Conducted", icon: <Users size={18} /> },
                  { title: "Total Participants", icon: <Award size={18} /> },
                  { title: "Technology Compendium", icon: <Database size={18} /> }
                ].map((key, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                      {key.icon}
                    </div>
                    <span className="font-bold text-sm text-slate-200">{key.title}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-emerald-600 h-80 w-full rounded-[4rem] flex items-center justify-center rotate-3 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black opacity-20" />
                 <div className="relative z-10 text-center p-10 -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <h3 className="text-2xl font-black mb-4 uppercase">Join the Transition</h3>
                    <p className="text-emerald-50 mb-8 font-bold">Access the Green Technology Portal to begin your journey.</p>
                    <a 
                      href="https://cii.metaversedu.in/login" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors"
                    >
                      Login to Portal <ArrowRight size={16} />
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <span className="font-black text-slate-900">CII</span>
             <span className="font-black text-emerald-600">Energy</span>
          </div>
          <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">
            © 2024 Confederation of Indian Industry · Telangana MSME Programme
          </p>
        </div>
      </footer>
    </main>
  );
}
