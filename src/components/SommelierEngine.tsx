/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine as WineIcon, Filter, Search, Sparkles, Check, Flame, Info, Eye, X } from 'lucide-react';
import { MENU_ITEMS, WINES } from '../data';
// import { MenuItem, Wine } from '../types'; // Uncomment if you need these types elsewhere

const CATEGORIES = ['All', 'Starters', 'Salads', 'Traditional', 'Steaks', 'Seafood', 'Chinese', 'Desserts'];
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut-Free', 'Dairy-Free'];
const FLAVORS = ['All Flavors', 'Delicate', 'Bold', 'Rich', 'Spicy', 'Sweet'];

export default function SommelierEngine() {
  const [selectedDietaries, setSelectedDietaries] = useState<string[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const [activeWineId, setActiveWineId] = useState<string | null>(null);
  const [hoveredWineId, setHoveredWineId] = useState<string | null>(null);

  const handleDietaryToggle = useCallback((item: string) => {
    setSelectedDietaries((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  }, []);

  const resetAllFilters = useCallback(() => {
    setSelectedDietaries([]);
    setSelectedFlavor(null);
    setSearchQuery('');
    setSelectedCategory('All');
    setActiveWineId(null);
  }, []);

  const filteredMenuItems = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    return MENU_ITEMS.filter((item) => {
      const matchesSearch = !lowerQuery || 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.description.toLowerCase().includes(lowerQuery);
      
      if (!matchesSearch) return false; 

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      const matchesDietary = selectedDietaries.length === 0 || selectedDietaries.every((diet) => item.dietary.includes(diet as any));
      if (!matchesDietary) return false;

      const matchesFlavor = !selectedFlavor || selectedFlavor === 'All Flavors' || item.flavorProfile === selectedFlavor;
      if (!matchesFlavor) return false;

      const matchesActiveWine = !activeWineId || item.recommendedWineId === activeWineId;
      return matchesActiveWine;
    });
  }, [searchQuery, selectedCategory, selectedDietaries, selectedFlavor, activeWineId]);

  const hoveredDishWine = useMemo(() => {
    if (!hoveredWineId) return null;
    return WINES.find((w) => w.id === hoveredWineId) || null;
  }, [hoveredWineId]);

  return (
    <section className="bg-zinc-950 py-32 px-4 sm:px-8 relative overflow-hidden font-sans">
      
      {/* Decorative Cyber Grid & Lights */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-emerald-600/[0.03] blur-[150px] rounded-full pointer-events-none animate-pulse" />
      
      {/* Editorial Title Block */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-semibold text-emerald-500 tracking-[0.3em] uppercase">EXPERIENCE RADICAL GASTRONOMY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight uppercase max-w-3xl">
            Interactive Sommelier &amp; <br />
            <span className="text-emerald-400 italic lowercase font-serif font-thin">Dietary Personalizer</span>
          </h2>
          <div className="h-[1px] w-24 bg-zinc-900 mt-2" />
          <p className="text-zinc-400 font-sans max-w-2xl text-xs sm:text-sm font-light leading-relaxed">
            Personalize your dining coordinates: Select dietary parameters, refine flavor matrices, or tap an elegant world-honored vintage below to automatically show paired recipes. Hover any card to instantly call its optimal wine pairing.
          </p>
        </div>

        {/* --- 1. THE AMBASSADOR'S WINE CELLAR (SOMMELIER SELECTION MECHANISM) --- */}
        <div className="mb-14 bg-zinc-905 bg-zinc-950/40 backdrop-blur-xl border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-8 gap-4 pb-4 border-b border-zinc-900/40">
            <div>
              <h3 className="font-serif font-bold text-lg text-white tracking-wide uppercase flex items-center gap-2.5">
                <WineIcon className="w-4 h-4 text-emerald-400" />
                <span>The Ambassador's Private Cellar</span>
              </h3>
              <p className="text-zinc-500 text-[10px] tracking-wider uppercase font-mono mt-1">Tap a vintage to isolate fully aligned masterwork receipts</p>
            </div>
            {activeWineId && (
              <button
                onClick={() => setActiveWineId(null)}
                className="text-[10px] text-emerald-400 hover:text-white font-mono transition-all border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
              >
                <span>Clear Isolated Pairing</span>
                <X className="w-3 h-3 text-emerald-400" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WINES.map((wine, index) => {
              const isSelected = activeWineId === wine.id;
              return (
                <button
                  key={wine.id}
                  onClick={() => setActiveWineId(isSelected ? null : wine.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-500 relative group flex flex-col justify-between h-full cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'border-emerald-500/40 bg-zinc-900/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                      : 'border-zinc-900 bg-zinc-950/20 hover:border-zinc-800 hover:bg-zinc-900/20'
                  }`}
                >
                  <span className="absolute top-4 right-4 font-mono text-[9px] text-zinc-700 font-bold group-hover:text-emerald-500/40 transition-colors">
                    0{index + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 group-hover:border-emerald-500/15 group-hover:text-emerald-400 transition-colors">
                        {wine.type}
                      </span>
                      <span className="font-mono text-zinc-500 text-[10px] font-semibold">{wine.vintage}</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-zinc-200 mt-4 leading-snug group-hover:text-white transition-colors">
                      {wine.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light mt-2 line-clamp-3 group-hover:text-zinc-300 transition-colors">
                      {wine.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-900/60 flex items-center justify-between">
                    <span className="font-mono text-emerald-500/70 uppercase tracking-widest font-semibold text-[9px]">
                      {wine.intensity}
                    </span>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-400/20">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                    ) : (
                      <span className="text-[9px] font-mono text-zinc-650 uppercase tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity">
                        Isolate
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 2. MAIN CONFIGURATION ROW (DIETARY CONTROLS & FILTER GRID) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="lg:col-span-1 bg-zinc-900/20 border border-zinc-900 p-6 rounded-3xl flex flex-col gap-8 h-fit relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/[0.02] blur-xl rounded-full" />
            
            <div className="flex flex-col gap-2">
              <label className="text-zinc-[400] text-[10px] font-mono tracking-[0.15em] uppercase block">Search Receipts</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  placeholder="Ex: seared ribeye..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-300 placeholder-zinc-600 text-xs font-mono focus:border-emerald-500/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-900/60">
              <label className="text-zinc-[400] text-[10px] font-mono tracking-[0.15em] uppercase flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-emerald-500/70" />
                <span>Dietary Exclusion</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((diet) => {
                  const isChecked = selectedDietaries.includes(diet);
                  return (
                    <button
                      key={diet}
                      onClick={() => handleDietaryToggle(diet)}
                      className={`text-[10px] font-mono px-3 py-2 rounded-lg border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                        isChecked
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-zinc-900 bg-zinc-950/60 text-zinc-500 hover:border-zinc-700 hover:text-zinc-350'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-emerald-400" />}
                      <span>{diet}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-900/60">
              <label className="text-zinc-[400] text-[10px] font-mono tracking-[0.15em] uppercase flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-emerald-500/70" />
                <span>Flavor Coordinates</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavor === flavor || (flavor === 'All Flavors' && !selectedFlavor);
                  return (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor === 'All Flavors' ? null : flavor)}
                      className={`text-[10px] font-mono px-3 py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-bold'
                          : 'border-zinc-900 bg-zinc-950/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
                      }`}
                    >
                      {flavor}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={resetAllFilters}
              className="mt-2 w-full py-3 rounded-xl border border-zinc-900 text-center font-mono text-zinc-600 hover:text-emerald-400 hover:border-emerald-500/15 text-[10px] uppercase tracking-wider transition-colors cursor-pointer bg-zinc-950/40"
            >
              Reset Configuration
            </button>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            
            <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-zinc-900/60 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-zinc-950 shadow-lg'
                        : 'bg-zinc-900/30 border border-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      key={item.id}
                      onMouseEnter={() => setHoveredWineId(item.recommendedWineId || null)}
                      onMouseLeave={() => setHoveredWineId(null)}
                      className="group bg-zinc-905 bg-zinc-950/30 border border-zinc-900 rounded-3xl p-5 overflow-hidden transition-all duration-500 hover:border-emerald-500/15 hover:bg-zinc-900/20 flex gap-5 relative"
                    >
                      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-emerald-500/10 group-hover:bg-emerald-400/40 transition-colors" />

                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-zinc-900 relative bg-zinc-900/30 flex items-center justify-center">
                        <img
                          referrerPolicy="no-referrer"
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8] group-hover:brightness-[0.9]"
                        />
                        <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <Eye className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </div>
                      </div>

                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="font-serif font-bold text-base text-zinc-100 group-hover:text-emerald-400 transition-colors duration-400 leading-snug">
                              {item.name}
                            </h4>
                            <span className="font-mono font-bold text-emerald-400 text-xs sm:text-sm whitespace-nowrap bg-emerald-500/5 px-2.5 py-1 rounded-lg border border-emerald-500/10">
                              Rs. {item.price.toLocaleString()}
                            </span>
                          </div>

                          <p className="text-zinc-400 font-sans text-xs leading-relaxed font-light mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-900/60 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1 flex-wrap">
                            {item.dietary.slice(0, 2).map((diet) => (
                              <span
                                key={diet}
                                className="text-[8px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-emerald-500 border border-emerald-500/10"
                              >
                                {diet}
                              </span>
                            ))}
                          </div>

                          {item.recommendedWineId && (
                            <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-650 group-hover:text-emerald-400 transition-colors">
                              <WineIcon className="w-3 h-3 text-emerald-500/70 group-hover:animate-spin" />
                              <span>Cellar Align</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 py-24 text-center text-zinc-600 font-sans font-light bg-zinc-900/10 rounded-3xl border border-zinc-900/60 p-8 flex flex-col items-center justify-center gap-4">
                    <Info className="w-8 h-8 text-zinc-750" />
                    <p className="text-xs font-mono">No culinary templates match these filters. Reset params above.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* --- 3. FLOATING FIXED BOTTOM GLASS SOMMELIER ENLIGHTEN OVERLAY --- */}
        <AnimatePresence>
          {hoveredWineId && hoveredDishWine && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              className="fixed bottom-6 left-6 md:left-auto md:right-8 z-40 max-w-sm backdrop-blur-2xl bg-zinc-950/90 border border-emerald-500/20 rounded-2xl p-4.5 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex gap-4.5 items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 scale-105 shrink-0 relative">
                <WineIcon className="w-5 h-5 text-emerald-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="font-sans leading-tight">
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  CELLAR COUPLING
                </span>
                <h5 className="font-serif font-bold text-zinc-100 text-sm mt-1">
                  {hoveredDishWine.name} &bull; <span className="text-emerald-500 font-mono text-[10px]">{hoveredDishWine.vintage}</span>
                </h5>
                <p className="text-[10px] text-zinc-500 font-light mt-1">
                  {hoveredDishWine.intensity} intensity &bull; fine {hoveredDishWine.type}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}