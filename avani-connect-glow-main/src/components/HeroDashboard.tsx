import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroDashboard - The original dashboard/chart visual for the hero section right column.
 * This component is kept separate so it can be swapped back in easily.
 * 
 * Usage in Home.tsx hero right column:
 *   <HeroDashboard />
 */
const HeroDashboard = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[75%] bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-white overflow-hidden z-10">
      <div className="p-8 h-full flex flex-col">
        {/* Top Header Mockup */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-500 rounded-xl" />
            <div>
              <div className="w-32 h-3 bg-slate-100 rounded-full mb-2" />
              <div className="w-20 h-2 bg-slate-50 rounded-full" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-50" />
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-100">
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Graph Data Section - SQUARE & MULTI-COLOR */}
        <div className="flex-1 grid grid-cols-12 gap-6">
          <div className="col-span-8 bg-slate-50/50 rounded-3xl p-6 border border-slate-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue Growth</span>
              <span className="text-xs font-bold text-emerald-500">+24.5%</span>
            </div>

            {/* Bar Graph UI - Square & Colorful */}
            <div className="flex items-end justify-between h-32 gap-3 px-2">
              {[
                { h: 40, c: "bg-amber-500" },
                { h: 70, c: "bg-amber-500" },
                { h: 55, c: "bg-orange-500" },
                { h: 90, c: "bg-emerald-500" },
                { h: 65, c: "bg-orange-500" },
                { h: 80, c: "bg-indigo-500" },
                { h: 100, c: "bg-rose-500" }
              ].map((bar, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.h}%` }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                  className={`flex-1 ${bar.c} rounded-none shadow-sm opacity-90 hover:opacity-100 transition-opacity`}
                />
              ))}
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <div className="flex-1 bg-amber-50/50 rounded-3xl p-5 border border-amber-100/50 text-center flex flex-col justify-center">
              <div className="text-[10px] font-black text-amber-600 uppercase mb-2">Projects</div>
              <div className="text-2xl font-black text-slate-800">300+</div>
            </div>
            <div className="flex-1 bg-sky-50/50 rounded-3xl p-5 border border-sky-100/50 text-center flex flex-col justify-center">
              <div className="text-[10px] font-black text-sky-600 uppercase mb-2">Clients</div>
              <div className="text-2xl font-black text-slate-800">150+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
