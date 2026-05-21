/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Calendar, Sparkles, ChevronRight, BookmarkCheck, ArrowUpRight, Percent, CircleDot, Mail } from 'lucide-react';
import { PROMOTIONS } from '../data';

interface PromotionsSectionProps {
  onOpenBooking: () => void;
}

export default function PromotionsSection({ onOpenBooking }: PromotionsSectionProps) {
  return (
    <section className="bg-zinc-950 py-32 px-4 sm:px-8 relative overflow-hidden font-sans">
      
      {/* Background Decorative Shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-zinc-900/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title details */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs font-semibold text-emerald-500 tracking-[0.3em] uppercase">MUGHALS &amp; MICHELIN</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-tight uppercase max-w-3xl">
            Special Events &amp; <br />
            <span className="text-emerald-400 italic lowercase font-serif font-thin">Exclusive Gatherings</span>
          </h2>
          <div className="h-[1px] w-24 bg-zinc-900 mt-2" />
          <p className="text-zinc-400 font-sans max-w-2xl text-xs sm:text-sm font-light leading-relaxed">
            Uncover a meticulously planned portfolio of culinary gatherings designed for extraordinary palates. From starlit rooftop brunches to vintage pairing nights, experience absolute luxury.
          </p>
        </div>

        {/* Promotions Bento list cards with unique styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {PROMOTIONS.map((promo, index) => {
            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="group flex flex-col h-full bg-zinc-950/40 border border-zinc-900 rounded-[28px] overflow-hidden transition-all duration-550 hover:border-emerald-500/15 hover:shadow-[0_0_30px_rgba(16,185,129,0.04)] relative"
              >
                {/* Subtle side glow coding lines */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent group-hover:via-emerald-400/30 transition-colors" />

                {/* Image Section */}
                <div className="relative h-64 sm:h-72 overflow-hidden border-b border-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent z-10" />
                  <img
                    referrerPolicy="no-referrer"
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.75]"
                  />

                  {/* Rating or Premium Tag over image overlay */}
                  <div className="absolute top-4 left-4 z-20 flex sm:items-center gap-1.5 flex-wrap">
                    {promo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-mono uppercase bg-zinc-950/80 text-emerald-400 border border-emerald-500/10 px-2.5 py-1.5 rounded-lg backdrop-blur-sm tracking-widest font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Premium Cost Float Badge */}
                  <div className="absolute bottom-4 right-4 z-20 bg-zinc-950/95 border border-zinc-900 rounded-xl px-4 py-2 text-[10px] font-mono font-bold text-white shadow-lg backdrop-blur-md">
                    {promo.price}
                  </div>
                </div>

                {/* Info and action section */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-mono text-emerald-500/80 font-semibold uppercase tracking-widest block flex items-center gap-1.5">
                      <CircleDot className="w-2.5 h-2.5 text-emerald-500/60" />
                      {promo.subtitle}
                    </span>
                    <h4 className="font-serif font-bold text-xl text-zinc-100 group-hover:text-emerald-400 transition-colors duration-400">
                      {promo.title}
                    </h4>
                    <p className="text-zinc-[450] text-zinc-400 font-sans text-xs font-light leading-relaxed mt-1">
                      {promo.description}
                    </p>
                  </div>

                  {/* Micro index and actions */}
                  <div className="mt-8 pt-5 border-t border-zinc-900/60 flex items-center justify-between">
                    <button
                      onClick={onOpenBooking}
                      className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 hover:text-white group-hover:translate-x-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Procure Seat Ticket</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                    <div className="w-8 h-8 rounded-full border border-zinc-900 bg-zinc-950/60 flex items-center justify-center text-zinc-500 group-hover:text-emerald-400 group-hover:border-emerald-500/15 transition-all duration-300">
                      <BookmarkCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- Immersive Event Booking Banner --- */}
        <div className="relative rounded-3xl border border-zinc-900/60 overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-zinc-950 to-zinc-900/40 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Top subtle line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          <div className="absolute top-0 right-0 w-[400px] h-full bg-emerald-500/[0.02] blur-3xl rounded-full" />
          
          <div className="max-w-xl relative z-10 flex flex-col gap-3 text-left">
            <span className="font-mono text-emerald-500 text-[10px] font-bold uppercase tracking-[0.25em] block">PRIVATE SOIRÉES</span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">Arrange a Custom Private Gathering</h3>
            <p className="text-zinc-[450] text-zinc-400 font-sans text-xs font-light leading-relaxed mt-1">
              Are you planning customized layouts for elite mountain-side birthday parties, corporate dinners, or high-end proposals? Our events director will curate hand-picked menu selections, private vintage listings, and dedicated telescope view positions.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-8 py-4 px-7 py-3 rounded-full bg-zinc-900 border border-emerald-500/20 hover:border-emerald-400/40 text-emerald-400 transition-all duration-500 hover:scale-105 active:scale-95 group shadow-xl flex items-center gap-2 cursor-pointer uppercase font-serif text-xs font-bold tracking-[0.2em] shrink-0"
          >
            <Mail className="w-4 h-4 text-emerald-500" />
            <span className="text-zinc-100 group-hover:text-emerald-300">Inquire Private Event</span>
          </button>
        </div>

      </div>
    </section>
  );
}
