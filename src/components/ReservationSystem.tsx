/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Phone, Mail, Clock, MapPin, CheckCircle, Flame, Wine as WineIcon, Users, CreditCard, Sparkles, X, ChevronRight, HelpCircle, ShieldAlert } from 'lucide-react';
import { ZONES, WINES } from '../data';
import { Zone, Reservation } from '../types';

interface ReservationSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationSystem({ isOpen, onClose }: ReservationSystemProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedZoneId, setSelectedZoneId] = useState('zone-main');
  const [seatingPreference, setSeatingPreference] = useState<'Indoor' | 'Outdoor' | 'Window View'>('Indoor');
  const [selectedWineId, setSelectedWineId] = useState<string>('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Local validation error state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Tables state (for the visual floor plan)
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  // Completed successful state
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  // Local storage bookings ledger for administrative overview
  const [bookings, setBookings] = useState<Reservation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('obsidian_dome_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  // Floor plan tables depending on Zone
  const tables = useMemo(() => {
    if (selectedZoneId === 'zone-main') {
      return [
        { id: 101, name: 'T-01', seats: 2, status: 'available', x: '15%', y: '30%' },
        { id: 102, name: 'T-02', seats: 4, status: 'available', x: '40%', y: '30%' },
        { id: 103, name: 'T-03', seats: 4, status: 'available', x: '65%', y: '30%' },
        { id: 104, name: 'B-04', seats: 6, status: 'reserved', x: '88%', y: '30%' },
        { id: 105, name: 'T-05', seats: 2, status: 'available', x: '15%', y: '70%' },
        { id: 106, name: 'P-06', seats: 4, status: 'available', x: '40%', y: '70%' },
        { id: 107, name: 'B-07', seats: 8, status: 'available', x: '65%', y: '70%' },
        { id: 108, name: 'T-08', seats: 2, status: 'available', x: '88%', y: '70%' },
      ];
    } else if (selectedZoneId === 'zone-veranda') {
      return [
        { id: 201, name: 'V-Edge A', seats: 2, status: 'available', x: '15%', y: '50%' },
        { id: 202, name: 'Glass B', seats: 2, status: 'available', x: '35%', y: '50%' },
        { id: 203, name: 'Alcove C', seats: 4, status: 'available', x: '55%', y: '50%' },
        { id: 204, name: 'Trellis D', seats: 4, status: 'available', x: '75%', y: '50%' },
        { id: 205, name: 'V-Edge E', seats: 2, status: 'reserved', x: '92%', y: '50%' },
      ];
    } else {
      return [
        { id: 301, name: "Chef Counter Alpha", seats: 10, status: 'available', x: '50%', y: '50%' },
      ];
    }
  }, [selectedZoneId]);

  // Handle reserve submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name || !email || !phone || !date || !time) {
      setValidationError('Please verify all credentials: Name, email, phone, date & time coordinates of seat are requested.');
      const scrollContainer = document.getElementById('reservation-error-anchor');
      if (scrollContainer) {
        scrollContainer.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (!selectedTableId) {
      setValidationError('No Interactive Seat Anchor linked. Please tap/select an available Table on the Chamber Blueprint first.');
      const scrollContainer = document.getElementById('reservation-error-anchor');
      if (scrollContainer) {
        scrollContainer.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const newBooking: Reservation = {
      id: 'res-' + Math.floor(Math.random() * 100000),
      name,
      email,
      phone,
      date,
      time,
      guests,
      zoneId: selectedZoneId,
      seatingPreference,
      dietaryNotes,
      specialRequests,
      wineSelectionId: selectedWineId || undefined,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('obsidian_dome_bookings', JSON.stringify(updated));

    // Complete reservation
    setConfirmedBooking(newBooking);
  };

  // Reset form helper
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    setGuests(2);
    setSelectedZoneId('zone-main');
    setSeatingPreference('Indoor');
    setSelectedWineId('');
    setDietaryNotes('');
    setSpecialRequests('');
    setSelectedTableId(null);
    setConfirmedBooking(null);
    setValidationError(null);
  };

  if (!isOpen) return null;

  // Selected Zone Object
  const currentZone = ZONES.find((z) => z.id === selectedZoneId) as Zone;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Main glassmorphic scrollable container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-zinc-950 border border-zinc-900/80 shadow-2xl z-10 text-zinc-100 flex flex-col scrollbar-none">
        
        {/* Sticky Header inside modal */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div className="text-left font-sans">
              <h2 className="font-serif font-bold text-base sm:text-lg text-white uppercase tracking-wider">Imperial Seat Procurement</h2>
              <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">The Obsidian Dome &bull; Private Registry Code Base</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body split in Form & Visual selectors */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!confirmedBooking ? (
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* --- Left Column: Credentials & Specifications --- */}
                <div className="flex flex-col gap-6 text-left" id="reservation-error-anchor">
                  
                  {/* Validation banner (replaces raw window alert prompts) */}
                  {validationError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-2xl border border-red-500/10 bg-red-500/5 text-red-450 text-xs font-mono leading-relaxed flex items-start gap-3"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{validationError}</span>
                    </motion.div>
                  )}

                  <h3 className="font-serif font-bold text-base text-emerald-500 tracking-wide pb-2 border-b border-zinc-900/60 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-500/85" />
                    <span>Host Registry Credentials</span>
                  </h3>
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Host Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-650" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Duke of Westminster"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Private Mailbox *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-650" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="duke@regal.pk"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Mobile Contact *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-650" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+92 332-9636636"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-emerald-500 tracking-wide pb-2 border-b border-zinc-900/60 flex items-center gap-2 mt-4">
                    <Calendar className="w-4 h-4 text-emerald-500/85" />
                    <span>Table Specifications</span>
                  </h3>

                  {/* Date, Time & Guests Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Schedule Date *</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs focus:border-emerald-500/30 outline-none transition-colors font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Schedule Time *</label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs focus:border-emerald-500/30 outline-none transition-colors font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Imperial Party Cover *</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-650" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                            <option key={num} className="bg-zinc-950 text-zinc-350 text-xs font-mono" value={num}>
                              {num} {num === 1 ? 'Guest Cover' : 'Guests Cover'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Seating preference list & Wine Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Physical Room Anchor</label>
                      <select
                        value={seatingPreference}
                        onChange={(e: any) => setSeatingPreference(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-all"
                      >
                        <option className="bg-zinc-950 text-xs" value="Indoor">Indoor Saloon Seating</option>
                        <option className="bg-zinc-950 text-xs" value="Outdoor">Outdoor Panorama Deck</option>
                        <option className="bg-zinc-950 text-xs" value="Window View">Imperial Glass Wall Side</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Custom Sommelier Match</label>
                      <select
                        value={selectedWineId}
                        onChange={(e) => setSelectedWineId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-all"
                      >
                        <option className="bg-zinc-950 text-zinc-550 text-xs" value="">
                          Select Wine Vintage? (Optional)
                        </option>
                        {WINES.map((wine) => (
                          <option key={wine.id} className="bg-zinc-903 bg-zinc-950 text-zinc-300 text-xs" value={wine.id}>
                            {wine.name} ({wine.vintage})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dietary Exclusions */}
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Dietary Restrictions &amp; Exclusions</label>
                    <input
                      type="text"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder="Nut allergies, strict glucose-free, vegan only..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 text-xs font-mono focus:border-emerald-500/30 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* --- Right Column: Interactive Zone & Table Selector & Floorplan --- */}
                <div className="flex flex-col gap-6 text-left">
                  
                  {/* Zone Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Luxury Chamber Zones</label>
                    <div className="grid grid-cols-3 gap-2">
                      {ZONES.map((zone) => {
                        const isSelected = selectedZoneId === zone.id;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => {
                              setSelectedZoneId(zone.id);
                              setSelectedTableId(null);
                            }}
                            className={`px-3 py-3 rounded-xl text-center border transition-all cursor-pointer ${
                              isSelected
                                ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-bold'
                                : 'border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
                            }`}
                          >
                            <span className="font-serif text-xs block">{zone.name.split(' ').slice(1).join(' ')}</span>
                            {zone.extraCost > 0 ? (
                              <span className="text-[8px] font-mono text-emerald-500 mt-0.5 block">+Rs. {zone.extraCost}</span>
                            ) : (
                              <span className="text-[8px] font-mono text-zinc-650 mt-0.5 block">Standard</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Display Details of Selected Zone */}
                  <div className="p-4 rounded-2xl bg-zinc-900/10 border border-zinc-900 flex gap-4 items-center">
                    <img
                      referrerPolicy="no-referrer"
                      src={currentZone.image}
                      alt={currentZone.name}
                      className="w-20 h-20 rounded-xl object-cover border border-zinc-900 shrink-0"
                    />
                    <div className="font-sans">
                      <h4 className="font-serif font-bold text-sm text-zinc-100 uppercase tracking-widest">{currentZone.name}</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-light mt-1">{currentZone.description}</p>
                      <div className="flex items-center gap-1.5 flex-wrap mt-2">
                        {currentZone.features.map((feat) => (
                          <span key={feat} className="text-[8px] font-mono bg-zinc-950 px-2 py-0.5 border border-zinc-900 rounded text-emerald-555 text-emerald-500/80">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* --- Visual Floor Plan Vector Mockup --- */}
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase flex items-center justify-between">
                      <span>CHAMBER SEAT BLUEPRINT (TAP TABLE TO ANCHOR)</span>
                      {selectedTableId ? (
                        <span className="text-emerald-400 text-[10px] font-bold">Assigned Table: #{selectedTableId}</span>
                      ) : (
                        <span className="text-zinc-600 animate-pulse text-[9px]">Select Table</span>
                      )}
                    </label>

                    {/* Vector Seat Blueprint Layout */}
                    <div className="h-[220px] bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex flex-col justify-between relative overflow-hidden">
                      
                      {/* Grid overlay lines */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                      <div className="text-[9px] font-mono text-zinc-600 flex justify-between relative z-10 border-b border-zinc-900/40 pb-1.5">
                        <span className="flex items-center gap-1.5 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" /> Kitchen Side
                        </span>
                        <span className="flex items-center gap-1.5 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Glass Ridge Wall View
                        </span>
                      </div>

                      {/* Display spatial map design for tables */}
                      <div className="grid grid-cols-4 gap-3 relative z-10 my-auto">
                        {tables.map((table) => {
                          const isTableSelected = selectedTableId === table.id;
                          const isReserved = table.status === 'reserved';
                          return (
                            <button
                              key={table.id}
                              type="button"
                              disabled={isReserved}
                              onClick={() => setSelectedTableId(table.id)}
                              className={`p-2.5 rounded-xl border flex flex-col justify-between items-center text-center transition-all cursor-pointer h-16 relative overflow-hidden ${
                                isReserved
                                  ? 'border-red-950 bg-red-950/5 text-red-700 opacity-40 cursor-not-allowed'
                                  : isTableSelected
                                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20'
                                  : 'border-zinc-900 bg-zinc-955 bg-zinc-900/15 hover:border-zinc-805 hover:border-zinc-800 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              <span className="text-[10px] font-mono font-bold block">{table.name}</span>
                              <span className="text-[8px] font-mono text-zinc-600 block">{table.seats} Seats</span>
                              
                              {/* Glowing state point */}
                              {isReserved ? (
                                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500/60" />
                              ) : isTableSelected ? (
                                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              ) : (
                                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-850" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-[9px] text-zinc-650 font-mono text-center relative z-10 pt-2 border-t border-zinc-900/60 uppercase">
                        * Tapping table links spatial coordinates into reservation registry
                      </p>
                    </div>
                  </div>

                  {/* Submission row button */}
                  <div className="mt-auto pt-4 border-t border-zinc-900/60">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-serif font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-[1.01]"
                    >
                      Lock In Seating Coordinates
                    </button>
                  </div>

                </div>
              </form>
            ) : (
              // --- Successful Confirmation State ---
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center max-w-xl mx-auto flex flex-col items-center gap-5 font-sans"
              >
                <div className="w-18 h-18 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2 animate-pulse">
                  <CheckCircle className="w-9 h-9 text-emerald-400" />
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-500 tracking-[0.25em] uppercase">REGISTRY AUTHENTICATED</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide">Your Seat is Securely Appointed</h3>
                <p className="text-zinc-[400] text-zinc-400 font-sans text-xs font-light leading-relaxed">
                  Greetings <strong className="text-zinc-200">{confirmedBooking.name}</strong>, your private registry key is <strong className="text-emerald-400 font-mono text-sm">{confirmedBooking.id.toUpperCase()}</strong>. Complete outlays are stored in memory and sent to designated mailboxes.
                </p>

                {/* Receipt Grid details of reservation */}
                <div className="w-full bg-zinc-900/10 border border-zinc-900 p-6 rounded-[24px] mt-4 text-left flex flex-col gap-4 text-xs text-zinc-450 font-mono">
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-550 text-zinc-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> GUEST REGISTRY</span>
                    <span className="font-bold text-zinc-200">{confirmedBooking.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-550 text-zinc-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> COORDINATES</span>
                    <span className="text-emerald-400">{confirmedBooking.date} / {confirmedBooking.time}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-550 text-zinc-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> PARTY SIZE</span>
                    <span className="text-zinc-250 font-bold text-zinc-200">{confirmedBooking.guests} Private Seats</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                    <span className="text-zinc-550 text-zinc-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> ROOM REGION</span>
                    <span className="font-serif font-bold text-emerald-400">
                      {confirmedBooking.zoneId === 'zone-main' && 'OBSIDIAN GRAND SALOON'}
                      {confirmedBooking.zoneId === 'zone-veranda' && 'GLASSHOUSE VERANDA'}
                      {confirmedBooking.zoneId === 'zone-chef' && "EXCLUSIVE CHEF'S ZONE"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-zinc-550 text-zinc-500 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> PREFERENCE</span>
                    <span className="font-bold text-zinc-200 uppercase">{confirmedBooking.seatingPreference}</span>
                  </div>
                  {confirmedBooking.dietaryNotes && (
                    <div className="mt-2 pt-3 border-t border-zinc-900 flex flex-col gap-1.5 text-left">
                      <span className="text-zinc-500 text-[10px] uppercase">EXCLUSION NOTES:</span>
                      <p className="text-[11px] text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-900 italic leading-relaxed">
                        "{confirmedBooking.dietaryNotes}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center mt-6 w-full font-serif">
                  <button
                    onClick={resetForm}
                    className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.01]"
                  >
                    Configure Another
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-full border border-zinc-900 bg-zinc-955 bg-zinc-900/10 text-zinc-400 hover:text-white font-sans text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer hover:scale-[1.01]"
                  >
                    Close Portal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
