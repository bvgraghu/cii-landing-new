"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Landmark, 
  Handshake, 
  IndianRupee, 
  ArrowRight, 
  ClipboardEdit, 
  Cpu, 
  Link as LinkIcon, 
  ShieldCheck,
  Zap
} from "lucide-react";

export function MatchmakingPlatform() {
  const stats = [
    { 
      label: "MSMEs Matched with Vendors", 
      value: "310", 
      icon: <Users className="w-5 h-5" />, 
      iconBg: "bg-emerald-50", 
      iconColor: "text-emerald-600" 
    },
    { 
      label: "Financial Institutions Engaged", 
      value: "25", 
      icon: <Landmark className="w-5 h-5" />, 
      iconBg: "bg-blue-50", 
      iconColor: "text-blue-600" 
    },
    { 
      label: "Successful Deals Closed", 
      value: "145", 
      icon: <Handshake className="w-5 h-5" />, 
      iconBg: "bg-amber-50", 
      iconColor: "text-amber-600" 
    },
    { 
      label: "Loan Applications Facilitated", 
      value: "₹82 Cr", 
      icon: <IndianRupee className="w-5 h-5" />, 
      iconBg: "bg-purple-50", 
      iconColor: "text-purple-600" 
    },
  ];

  const steps = [
    { title: "MSME Registers Need", icon: <ClipboardEdit size={16} /> },
    { title: "AI-based Matching", icon: <Cpu size={16} /> },
    { title: "Vendor/FI Connection", icon: <LinkIcon size={16} /> },
    { title: "Deal Closure Support", icon: <ShieldCheck size={16} /> },
  ];

  const partners = [
    "SIDBI", 
    "PTC India Financial Services", 
    "IREDA", 
    "Yes Bank", 
    "State Bank of India", 
    "NABARD"
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="w-full py-8 px-4 md:px-8 bg-[#F0FDFA] border-t border-teal-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Zap size={20} className="text-emerald-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Matchmaking Platform
              </h2>
            </div>
            <p className="text-gray-500 font-medium">
              Bridging MSMEs with technology providers and financial institutions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
                className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-5 transition-all hover:shadow-lg hover:border-emerald-100 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.iconColor} transition-transform group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{stat.value}</p>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* How It Works */}
            <div className="lg:col-span-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                How It Works
              </h3>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-2">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 px-5 py-3 bg-[#F3F4F6] rounded-full border border-gray-200 group cursor-default transition-colors hover:border-emerald-200 hover:bg-emerald-50"
                    >
                      <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-colors">
                        {step.icon}
                      </div>
                      <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700">
                        {step.title}
                      </span>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:flex items-center justify-center px-1">
                        <ArrowRight size={16} className="text-gray-300" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Financial Partners */}
            <div className="lg:col-span-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                Key Financial Partners
              </h3>
              <div className="flex flex-wrap gap-2">
                {partners.map((partner, index) => (
                  <motion.span
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: "#E5E7EB" }}
                    className="px-4 py-2 bg-[#F3F4F6] text-[#374151] rounded-full text-xs font-bold border border-gray-200 cursor-pointer transition-colors"
                  >
                    {partner}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
