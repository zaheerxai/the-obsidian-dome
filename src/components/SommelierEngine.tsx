/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wine as WineIcon, Filter, Search, Sparkles, Check, Flame, Info, Eye, X } from 'lucide-react';
import { MENU_ITEMS, WINES } from '../data';

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
    setHoveredWineId(null);
  }, []);

  // Filtered Menu Items
  const filteredMenuItems = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();

    return MENU_ITEMS.filter((item) => {
      if (lowerQuery && 
          !item.name.toLowerCase().includes(lowerQuery) && 
          !item.description.toLowerCase().includes(lowerQuery)) {
        return false;
      }

      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (selectedDietaries.length > 0 && 
          !selectedDietaries.every((diet) => item.dietary.includes(diet as any))) {
        return false;
      }
      if (selectedFlavor && selectedFlavor !== 'All Flavors' && 
          item.flavorProfile !== selectedFlavor) {
        return false;
      }
      if (activeWineId && item.recommendedWineId !== activeWineId) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDietaries, selectedFlavor, activeWineId]);

  const hoveredDishWine = useMemo(() => {
    if (!hoveredWineId) return null;
    return WINES.find((w) => w.id === hoveredWineId) || null;
  }, [hoveredWineId]);

  return (
    <section className="bg-zinc-950 py-32 px-4 sm:px-8 relative overflow-hidden font-sans">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-emerald-600/[0.03] blur-[150px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-semibold text-emerald-500 tracking-[0.3em] uppercase">
              EXPERIENCE RADICAL GASTRONOMY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight uppercase max-w-3xl">
            Interactive Sommelier &amp; <br />
            <span className="text-emerald-400 italic lowercase font-serif font-thin">Dietary Personalizer</span>
          </h2>
          <p className="text-zinc-400 font-sans max-w-2xl text-xs sm:text-sm font-light leading-relaxed mt-4">
            Personalize your dining coordinates: Select dietary parameters, refine flavor matrices, or tap a vintage below.
          </p>
        </div>

        {/* Wine Cellar */}
        <div className="mb-14 bg-zinc-950/40 backdrop-blur-xl border border-zinc-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-8 gap-4 pb-4 border-b border-zinc-900/40">
            <div>
              <h3 className="font-serif font-bold text-lg text-white tracking-wide uppercase flex items-center gap-2.5">
                <WineIcon className="w-4 h-4 text-emerald-400" />
                The Ambassador's Private Cellar
              </h3>
              <p className="text-zinc-500 text-[10px] tracking-wider uppercase font-mono mt-1">
                Tap a vintage to isolate paired dishes
              </p>
            </div>
            {activeWineId && (
              <button
                onClick={() => setActiveWineId(null)}
                className="text-[10px] text-emerald-400 hover:text-white font-mono transition-all border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 px-4 py-2 rounded-full flex items-center gap-2"
              >
                Clear Isolated Pairing <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WINES.map((wine, index) => (
              <button
                key={wine.id}
                onClick={() => setActiveWineId(activeWineId === wine.id ? null : wine.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-500 relative group flex flex-col justify-between h-full cursor-pointer overflow-hidden ${
                  activeWineId === wine.id
                    ? 'border-emerald-500/40 bg-zinc-900/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'border-zinc-900 bg-zinc-950/20 hover:border-zinc-800 hover:bg-zinc-900/20'
                }`}
              >
                {/* Wine card content (unchanged for brevity) */}
                {/* ... keep your existing wine card JSX ... */}
              </button>
            ))}
          </div>
        </div>

        {/* Filters + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 bg-zinc-900/20 border border-zinc-900 p-6 rounded-3xl flex flex-col gap-8 h-fit">
            {/* Search, Dietary, Flavor, Reset buttons — keep your existing code here */}
            {/* ... your filter sidebar code ... */}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-zinc-900/60 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-zinc-950 shadow-lg'
                      : 'bg-zinc-900/30 border border-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      key={item.id}
                      onMouseEnter={() => setHoveredWineId(item.recommendedWineId || null)}
                      onMouseLeave={() => setHoveredWineId(null)}
                      className="group bg-zinc-950/30 border border-zinc-900 rounded-3xl p-5 overflow-hidden hover:border-emerald-500/15 hover:bg-zinc-900/20 flex gap-5 relative"
                    >
                      {/* Your dish card content */}
                      {/* ... keep your existing card JSX ... */}
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-zinc-500 text-sm">No matching dishes found with current filters.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}