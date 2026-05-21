/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ChevronRight, Star, Quote, ShieldCheck, Soup, ForkKnife, Clock, ArrowRight, Eye, RefreshCw, Layers } from 'lucide-react';
import { TESTIMONIALS } from '../data';

interface HomeHeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
}

export default function HomeHero({ onOpenBooking, onExploreMenu }: HomeHeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFlavorNode, setActiveFlavorNode] = useState<string>('Saffron');

  const slides = [
    {
      index: 'I',
      title: 'THE CORNERSTONE OF FLAVOR',
      subtitle: 'Where Legends Meet Light',
      desc: 'Crafting culinary artwork 3,000 feet above Islamabad from the mountain peak of Daman-e-Koh. Savor elite heritage tastes designed to expand and stun your senses.',
      bg: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
    },
    {
      index: 'II',
      title: 'Pairings of the Old World',
      subtitle: 'Liquid Gold of the Cellars',
      desc: 'Sip on world-honored cellars. Each bottle carries authentic history, curated side-by-side with our high-end chefs to create unforgettable pairings.',
      bg: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1600',
    },
    {
      index: 'III',
      title: 'The Glasshouse Veranda',
      subtitle: 'Ambiance of absolute Luxury',
      desc: 'Dine under thousands of twinkling celestial stars, blanketed by overhanging tropical vines while the capital city sparkles below you.',
      bg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1600',
    },
  ];

  // Interactive local spectrum variables (for a futuristic culinary feel)
  const flavorIngredients: Record<string, { desc: string; temp: string; match: string }> = {
    'Saffron': { desc: 'Exquisite Kashmiri stamens, cured over charcoal.', temp: 'Warm Amber', match: 'Chardonnay Blanc' },
    'Smoked Cardamom': { desc: 'Intense wood-fired green pods, crushed.', temp: 'Earthy Crisp', match: 'Gran Reserva' },
    'Black Garlic': { desc: '30-day fermented sweet and savory nodes.', temp: 'Rich Umami', match: 'Syrah Red' },
    'White Truffle': { desc: 'Shaved raw, earth-harvested diamonds.', temp: 'Velvet Soft', match: 'Imperial Pinot' }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. ASYMMETRICAL EDITORIAL HERO LANDING */}
      <section className="relative min-h-[92vh] lg:h-screen flex items-center justify-center px-4 sm:px-8 py-12 overflow-hidden border-b border-zinc-900/40">
        
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.02, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ backgroundImage: `url(${slides[activeSlide].bg})` }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.25]"
            />
          </AnimatePresence>
          {/* Subtle green overlay matrix glow style */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-transparent to-zinc-950/40" />
          
          {/* Futuristic geometric coordinate line */}
          <div className="absolute top-1/4 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 right-10 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 sm:pt-14">
          
          {/* LEFT PANEL: Narrative & Micro Index (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            
            {/* Micro Index Tracker */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-emerald-400 text-xs font-bold tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full uppercase">
                EXP. {slides[activeSlide].index}
              </span>
              <span className="w-8 h-[1px] bg-emerald-500/40" />
              <span className="text-zinc-500 font-mono text-[10px] tracking-[0.35em] uppercase">
                THE OBSIDIAN DOME
              </span>
            </div>

            {/* Main Title heading with gorgeous letter-spacing and italicized pairing */}
            <div className="min-h-[140px] sm:min-h-[180px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="space-y-2"
                >
                  <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-tight uppercase font-medium">
                    {slides[activeSlide].title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-emerald-400 block sm:inline italic font-thin font-serif lowercase">
                      {slides[activeSlide].title.split(" ").pop()}
                    </span>
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description Paragraph */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed font-light max-w-xl"
              >
                {slides[activeSlide].desc}
              </motion.p>
            </AnimatePresence>

            {/* Interactive Call to Action - Out of the box pill triggers */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-6 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="group relative px-8 py-4 rounded-full overflow-hidden bg-emerald-500 text-zinc-950 font-serif font-bold text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-900/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2"
              >
                <span>Imperial Seating Ticket</span>
                <ChevronRight className="w-4 h-4 text-zinc-950 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onExploreMenu}
                className="group px-8 py-4 rounded-full border border-zinc-800 hover:border-emerald-500/25 bg-zinc-950/40 backdrop-blur-md hover:bg-zinc-900/50 text-zinc-300 hover:text-emerald-400 font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Curated Vintages & Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Slides horizontal indicator progress bar */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-900/60 w-full max-w-md">
              {slides.map((s, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className="flex flex-col items-start gap-1 pb-2 flex-1 text-left cursor-pointer group"
                  >
                    <span className={`font-mono text-[9px] transition-colors duration-300 ${
                      isActive ? 'text-emerald-400 font-bold' : 'text-zinc-600 group-hover:text-zinc-400'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="w-full h-[2px] bg-zinc-900 relative rounded-full overflow-hidden">
                      {isActive && (
                        <motion.div
                          layoutId="slideProgressLine"
                          className="absolute inset-y-0 left-0 bg-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 8, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT PANEL: Embedded Glass Dial Specimen Card (Col 5) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background geometric mesh ring */}
            <div className="absolute w-80 h-80 rounded-full border border-emerald-500/5 animate-spin pointer-events-none" style={{ animationDuration: '60s' }} />
            <div className="absolute w-60 h-60 rounded-full border-2 border-emerald-500/5 border-dashed pointer-events-none" />

            {/* Custom interactive "Molecular Canvas Card" */}
            <div className="relative w-full max-w-sm cyber-glass border border-zinc-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
              
              <div className="flex items-center justify-between border-b border-zinc-900/80 pb-3">
                <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Culinary Specimen Index
                </span>
                <span className="font-mono text-[9px] text-zinc-500">M.D.04</span>
              </div>

              {/* Central Abstract Interactive Circle */}
              <div className="my-6 py-4 flex flex-col items-center justify-center relative">
                <div className="w-28 h-28 rounded-full border border-emerald-500/20 bg-zinc-950 flex flex-col items-center justify-center text-center p-3 relative group-hover:border-emerald-400/40 transition-colors duration-500">
                  <Layers className="w-5 h-5 text-emerald-500/60 mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="font-serif font-bold text-sm text-zinc-300 leading-none">
                    {activeFlavorNode}
                  </span>
                </div>

                {/* Satellite interactive rings on card */}
                <div className="flex items-center gap-1.5 mt-6 flex-wrap justify-center max-w-xs">
                  {Object.keys(flavorIngredients).map((ingName) => {
                    const isSelected = activeFlavorNode === ingName;
                    return (
                      <button
                        key={ingName}
                        onClick={() => setActiveFlavorNode(ingName)}
                        className={`text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                            : 'border-zinc-900 bg-zinc-950/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
                        }`}
                      >
                        {ingName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Info of the flavor card */}
              <div className="mt-4 pt-4 border-t border-zinc-900/60 bg-zinc-950/30 rounded-2xl p-4 border border-zinc-900/40 flex flex-col gap-3">
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-zinc-500 block uppercase">EXTRACTIVE NOTES</span>
                  <p className="text-xs text-zinc-300 mt-1 font-light leading-relaxed">
                    {flavorIngredients[activeFlavorNode].desc}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-zinc-900/40">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-zinc-500 block uppercase">SPECTRUM</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-0.5">
                      {flavorIngredients[activeFlavorNode].temp}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-zinc-500 block uppercase">SOMMELIER ALIGN</span>
                    <span className="text-[11px] font-mono text-zinc-300 block mt-0.5">
                      {flavorIngredients[activeFlavorNode].match}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlight interactive overlay */}
              <div className="absolute bottom-2 left-6 right-6 font-mono text-[8px] text-zinc-600 text-center uppercase tracking-widest pointer-events-none">
                Interactive Tasting Companion Table
              </div>
            </div>

          </div>

        </div>

        {/* Subtle decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>

      {/* 2. CHIC ASYMMETRICAL CULINARY NARRATIVE GRID */}
      <section className="relative py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Canvas Block (Col 5) */}
          <div className="lg:col-span-5 relative group">
            {/* Absolute ambient backing glow */}
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-emerald-500/20 to-transparent blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative rounded-[28px] overflow-hidden border border-zinc-900/60 shadow-2xl bg-zinc-950">
              <motion.div
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200')`,
                }}
                className="w-full h-[480px] bg-cover bg-center filter brightness-[0.6] group-hover:brightness-[0.7] group-hover:scale-105 transition-all duration-1000 ease-out"
              />

              {/* Frosted float stamp overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 backdrop-blur-md bg-zinc-950/70 border border-emerald-500/10 rounded-2xl p-5 shadow-xl">
                <span className="font-mono text-emerald-400 text-[10px] font-bold tracking-[0.2em] block mb-1">CRAFT MANIFESTO</span>
                <h4 className="font-serif font-bold text-white text-base">THE GLASS DOME AT DIAL ZONE</h4>
                <p className="text-[11px] text-zinc-400 font-light mt-1 leading-relaxed">
                  Painstakingly planned: from dynamic glass partitions to vintage copper lighting nodes perched 3,000 feet above the valleys.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Scope Block (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 lg:pl-6">
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs font-semibold text-emerald-500 tracking-[0.3em] uppercase">OUR PHILOSOPHY</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Gastronomy Elevated as <br className="hidden sm:inline" />
              <span className="text-emerald-400 italic font-light lowercase font-serif">an absolute</span> Art Form.
            </h2>

            <div className="h-[1px] w-1/3 bg-zinc-900" />

            <p className="text-zinc-400 font-sans font-light leading-relaxed text-sm sm:text-base">
              At The Obsidian Dome, we discard general mass culinary production. Our culinary operators extract raw parameters from authentic Mughal inheritances, modern French cellars, and fresh herbs native to the Margalla Hills. We design unforgettable moments, never just meals.
            </p>

            <p className="text-zinc-500 font-sans font-light leading-relaxed text-xs sm:text-sm">
              Every curated plate is engineered with profound contrast: the blistering char of fire-kissed mutton chops, the cooling whisper of saffron cardamon curd, and the sharp structure of frozen Chardonnay. Here, structure collides beautifully with flavor.
            </p>

            {/* Micro Columns details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 w-full">
              <div className="p-4 rounded-2xl bg-zinc-900/35 border border-zinc-900 flex items-start gap-4 hover:border-emerald-500/10 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Soup className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-zinc-250 text-sm text-zinc-200">Gourmet Alchemy</h5>
                  <p className="text-zinc-500 text-xs mt-0.5 font-sans leading-snug">Spices cured in-house under ancient peak pressure.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/35 border border-zinc-900 flex items-start gap-4 hover:border-emerald-500/10 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ForkKnife className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-zinc-250 text-sm text-zinc-200">Bespoke Chambers</h5>
                  <p className="text-zinc-500 text-xs mt-0.5 font-sans leading-snug">Personalize your table setting height & room temperature.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 3. DINE & TELL: CRITICS CORNER EXHIBIT */}
      <section className="relative py-28 px-4 sm:px-8 border-t border-zinc-900/40 bg-gradient-to-b from-zinc-950 via-zinc-900/10 to-zinc-950">
        
        {/* Absolute glowing shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-4 mb-20">
          <span className="font-mono text-xs font-semibold text-emerald-500 tracking-[0.3em] uppercase">EVALUATIONS</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight uppercase">
            Critique &amp; <span className="text-emerald-400 italic lowercase font-serif font-light">savour</span>
          </h2>
          <p className="text-zinc-400 font-sans max-w-xl text-xs sm:text-sm font-light leading-relaxed">
            Examine testimonies from our most discerning travelers, corporate partners, and design critics who scaled the mountain cliffs of Islamabad to find sanctuary.
          </p>
        </div>

        {/* Testimonials Bento Row */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="relative rounded-3xl p-6 sm:p-8 bg-zinc-900/20 hover:bg-zinc-900/35 border border-zinc-900 hover:border-emerald-500/15 transition-all duration-500 flex flex-col justify-between group"
            >
              {/* Quote marks corner decorative */}
              <div className="absolute top-6 right-8 text-zinc-900 group-hover:text-emerald-500/[0.04] transition-colors duration-500 pointer-events-none">
                <Quote className="w-16 h-16 stroke-[1.5]" />
              </div>

              <div>
                {/* 5 Stars styling */}
                <div className="flex items-center gap-1 text-emerald-500/40 mb-6 group-hover:text-emerald-400 transition-colors">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current stroke-0" />
                  ))}
                </div>

                <p className="text-zinc-350 font-sans text-xs sm:text-sm leading-relaxed mb-8 font-light italic text-zinc-400 group-hover:text-zinc-300">
                  "{t.text}"
                </p>
              </div>

              {/* Profile card metadata footer */}
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-zinc-900/60">
                <img
                  referrerPolicy="no-referrer"
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover filter brightness-[0.85] border border-zinc-800"
                />
                <div>
                  <h5 className="font-serif font-bold text-zinc-200 text-xs tracking-wider uppercase">{t.name}</h5>
                  <p className="text-[9px] tracking-widest uppercase text-zinc-500 font-mono mt-0.5">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. DESIGN PARALLAX SPLIT FRAMEWAY BANNER */}
      <section className="relative h-[250px] overflow-hidden flex items-center justify-center">
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600')`,
          }}
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 z-10" />

        <div className="relative z-20 text-center flex flex-col gap-3 px-6 max-w-4xl mx-auto">
          <span className="font-mono text-emerald-400 text-[10px] uppercase tracking-[0.35em] font-bold">CRITIC SELECTION REVIEW</span>
          <h3 className="font-serif font-light text-xl sm:text-3xl text-zinc-300 tracking-wide leading-relaxed">
            "A seamless symmetry of hill spices, radical glass dome architecture, and exquisite sommelier expertise."
          </h3>
          <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.25em] mt-2 block">— GASTRONOME WEEKLY CHARTER</span>
        </div>
      </section>

    </div>
  );
}
