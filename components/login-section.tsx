"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck,
  Building2,
  Key
} from "lucide-react";

export function LoginSection() {
  return (
    <section className="w-full py-16 bg-[#064e3b] relative overflow-hidden font-sans">
      {/* Decorative background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} />
                Secure Portal Access
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase italic">
                Access the <span className="text-emerald-400">Green Tech</span> Ecosystem
              </h2>
              <p className="text-emerald-100/70 text-sm md:text-lg max-w-lg leading-relaxed">
                Sign in to manage your MSME audits, connect with technology providers, and access specialized financial matchmaking tools.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-800/50 rounded-xl flex items-center justify-center text-emerald-400 shadow-inner">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">Industrial Portal</p>
                  <p className="text-[11px] text-emerald-200/60 leading-tight">Managed audits & reporting</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-800/50 rounded-xl flex items-center justify-center text-emerald-400 shadow-inner">
                  <Key size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">Vendor Dashboard</p>
                  <p className="text-[11px] text-emerald-200/60 leading-tight">Technology showcasing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl relative"
          >
            <div className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-black text-slate-900 uppercase italic">Welcome Back</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Enter your credentials to continue</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Password</label>
                    <a href="#" className="text-[9px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-emerald-600 text-white rounded-2xl py-5 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 mt-4"
              >
                Sign In to Portal <ArrowRight size={18} />
              </motion.button>

              <div className="pt-6 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Don't have an account? <a href="#" className="text-emerald-600 hover:underline">Register Now</a>
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
