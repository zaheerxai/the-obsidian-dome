/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, UtensilsCrossed, Calendar, Award, PhoneCall, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ currentTab, setCurrentTab, onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Elysium', index: '01', icon: Compass },
    { id: 'menu', label: 'Sommelier & Menu', index: '02', icon: UtensilsCrossed },
    { id: 'promotions', label: 'Mireaux & Events', index: '03', icon: Award },
    { id: 'contact', label: 'Lounge Location', index: '04', icon: PhoneCall },
  ];

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'p-3 sm:p-4' : 'p-4 sm:p-6'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 rounded-3xl sm:rounded-full bg-zinc-950/70 backdrop-blur-xl border border-zinc-900/70 shadow-2xl flex items-center justify-between px-6 sm:px-8 py-3.5 relative overflow-hidden ${
          isScrolled 
            ? 'shadow-emerald-950/5 border-emerald-500/10' 
            : 'border-zinc-800/30'
        }`}
      >
        {/* Subtle top ambient glowing divider line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
        
        {/* Brand Monogram Identity */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-4 cursor-pointer group select-none relative z-10"
        >
          <div className="relative flex items-center justify-center">
            {/* Ambient neon backdrop glow */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md scale-125 opacity-70 group-hover:opacity-100 transition-all duration-700" />
            
            {/* Outer futuristic spinning dashed ring */}
            <div className="absolute w-12 h-12 rounded-full border border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite] group-hover:border-emerald-400/60" />
            
            {/* Inner solid ring */}
            <div className="w-9 h-9 rounded-full border border-emerald-500/40 flex items-center justify-center bg-zinc-950 shadow-[inset_0_0_10px_rgba(16,185,129,0.25)] transition-all duration-500 group-hover:border-emerald-300 group-hover:scale-105 active:scale-95">
              <span className="font-mono text-xs font-black text-emerald-400 tracking-wider group-hover:text-white transition-colors">
                O
              </span>
            </div>
            
            {/* Mini active status signal node */}
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div>
            <h1 className="font-display text-xs font-bold tracking-[0.25em] text-zinc-100 group-hover:text-emerald-400 transition-colors duration-500 uppercase flex items-center gap-1">
              OBSIDIAN<span className="text-emerald-400 font-extralight">DOME</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[7.5px] tracking-[0.3em] uppercase text-emerald-500 font-bold font-mono">
                SYS_E-7 // DMK
              </span>
              <span className="w-1.5 h-[1px] bg-zinc-800" />
              <span className="text-[7.5px] tracking-[0.35em] uppercase text-zinc-500 font-light font-sans">
                Fine Dining
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Outside-the-box Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-4 xl:px-5 py-2.5 rounded-full transition-all duration-550 flex flex-col items-center gap-0.5 group cursor-pointer ${
                  isActive ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {/* Micro Index Header */}
                <span className={`font-mono text-[9px] tracking-widest transition-all duration-500 ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-zinc-600 group-hover:text-emerald-500/70'
                }`}>
                  {item.index}
                </span>

                {/* Main Label */}
                <span className="font-serif text-xs font-semibold uppercase tracking-widest block transition-all duration-300 group-hover:scale-[1.02]">
                  {item.label}
                </span>

                {/* Ambient glowing dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="headerActiveCircle"
                    className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Elegant Action Capsule */}
        <div className="hidden sm:flex items-center gap-4 relative z-10">
          <button
            onClick={onOpenBooking}
            className="relative px-6 py-2.5 rounded-full overflow-hidden bg-zinc-950 border border-emerald-500/30 text-emerald-400 font-display text-[9.5px] font-semibold tracking-[0.25em] uppercase transition-all duration-500 hover:scale-105 active:scale-95 group shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:border-emerald-400 hover:text-white flex items-center gap-2.5 cursor-pointer"
          >
            {/* Glowing sweep effect */}
            <div className="absolute inset-0 -left-[100%] group-hover:left-[100%] w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent transition-all duration-1000 ease-out" />
            
            {/* Active pulsing signal indicator */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>

            <span>Procure Table</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-550 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-900/50 transition-all cursor-pointer rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 animate-pulse" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Floating Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute top-full left-4 right-4 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-900 p-6 rounded-3xl flex flex-col gap-5 lg:hidden z-40 shadow-2xl mt-2"
          >
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item, index) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 px-5 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-zinc-600 font-bold">{item.index}</span>
                      <span className="font-serif text-sm font-semibold tracking-widest uppercase">{item.label}</span>
                    </div>
                    {isActive ? (
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-700" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-zinc-900/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-center font-serif font-bold text-xs tracking-[0.25em] uppercase shadow-xl shadow-emerald-950/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Imperial Seating</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

