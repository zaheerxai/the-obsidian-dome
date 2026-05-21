/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Share2, ShieldCheck, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setCurrentTab, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 overflow-hidden">
      {/* Decorative Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* Brand identity space */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-emerald-500/20 flex items-center justify-center bg-zinc-900">
              <span className="font-serif font-semibold text-xl text-emerald-400">O</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-zinc-100 tracking-wider">THE OBSIDIAN DOME</h4>
              <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-medium">Fine Dining &bull; Islamabad</p>
            </div>
          </div>
          
          <p className="text-sm text-zinc-400 leading-relaxed font-sans font-light">
            Perched 3,000 feet above the capital at Daman-e-Koh. An avant-garde sanctuary of taste, custom-vintages, and architectural light, crafted uniquely for those who demand absolute distinction.
          </p>

          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-900 bg-zinc-900/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 flex items-center justify-center text-zinc-400 transition-all duration-300"
            >
              <Facebook className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-900 bg-zinc-900/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 flex items-center justify-center text-zinc-400 transition-all duration-300"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-900 bg-zinc-900/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 flex items-center justify-center text-zinc-400 transition-all duration-300"
            >
              <Youtube className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <h5 className="font-serif font-bold text-lg text-zinc-200 tracking-wide">Explore Sanctuary</h5>
          <div className="flex flex-col gap-3">
            {[
              { id: 'home', label: 'Elysium (Home)' },
              { id: 'menu', label: 'Curated Sommelier' },
              { id: 'promotions', label: 'Events & Experiences' },
              { id: 'contact', label: 'Lounge Location' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300 cursor-pointer font-sans font-light"
              >
                &bull; {link.label}
              </button>
            ))}
            <button
              onClick={onOpenBooking}
              className="text-left text-sm text-emerald-400 hover:text-emerald-300 hover:underline transition-all duration-300 cursor-pointer font-sans font-medium"
            >
              &bull; Secure Private Booking
            </button>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex flex-col gap-5">
          <h5 className="font-serif font-bold text-lg text-zinc-200 tracking-wide flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-emerald-400" />
            <span>Lounge Hours</span>
          </h5>
          <div className="text-sm font-sans font-light text-zinc-400 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
              <span>Monday - Friday</span>
              <span className="text-zinc-300 font-mono">11:30 AM - 11:30 PM</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
              <span>Saturday - Sunday</span>
              <span className="text-zinc-300 font-mono">11:30 AM - 12:00 AM</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
              <span>Saffron Sunday Brunch</span>
              <span className="text-emerald-500 font-mono">11:00 AM - 3:30 PM</span>
            </div>
            <p className="text-xs text-zinc-500 italic mt-1 leading-relaxed">
              Kitchen closes 45 minutes prior to structural closure. Reservations highly recommended.
            </p>
          </div>
        </div>

        {/* Head Office / Lounge Address */}
        <div className="flex flex-col gap-5 bg-gradient-to-br from-zinc-900/30 to-transparent p-5 rounded-2xl border border-zinc-900/60">
          <h5 className="font-serif font-bold text-lg text-zinc-200 tracking-wide">Imperial Location</h5>
          <div className="flex flex-col gap-4 text-sm font-sans text-zinc-400">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="font-light leading-relaxed">
                View Point, Daman-e-Koh Road, Sector E-7 Margalla Hills, Islamabad, Pakistan
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="tel:+923329636636" className="font-mono hover:text-emerald-400 transition-colors">
                +92 332-9636636
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="mailto:info@obsidiandome.pk" className="hover:text-emerald-400 transition-colors">
                info@obsidiandome.pk
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Corporate space */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900/60 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 relative z-10 font-sans">
        <p>&copy; {currentYear} The Obsidian Dome. Inspired by elite architecture & pristine high-end culinary arts. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Encryption
          </span>
          <span className="hover:text-emerald-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-emerald-400 cursor-pointer">Privacy Charter</span>
        </div>
      </div>
    </footer>
  );
}
