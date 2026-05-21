/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Send, CheckCircle, MessageSquare, Clock, Globe, HelpCircle, ShieldAlert } from 'lucide-react';

export default function ContactSection() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!userName || !userEmail || !userMsg) {
      setFormError('Mandatory telemetry missing. Please provide host name, email, and message detail.');
      return;
    }

    // Save in local storage or simulate mail dispatch
    const existingMsgs = JSON.parse(localStorage.getItem('obsidian_dome_messages') || '[]');
    const newMsg = {
      id: Date.now(),
      name: userName,
      email: userEmail,
      message: userMsg,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('obsidian_dome_messages', JSON.stringify([newMsg, ...existingMsgs]));
    setMessageSent(true);
  };

  const handleReset = () => {
    setUserName('');
    setUserEmail('');
    setUserMsg('');
    setFormError(null);
    setMessageSent(false);
  };

  return (
    <section className="bg-zinc-950 py-32 px-4 sm:px-8 relative overflow-hidden border-t border-zinc-900/40 font-sans">
      
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-zinc-900/30 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Details */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs font-semibold text-emerald-500 tracking-[0.3em] uppercase">CONTACT &amp; COORDINATES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-tight uppercase max-w-3xl">
            Lounge Location &amp; <br />
            <span className="text-emerald-400 italic lowercase font-serif font-thin">Direct Dispatch</span>
          </h2>
          <div className="h-[1px] w-24 bg-zinc-900 mt-2" />
          <p className="text-zinc-400 font-sans max-w-2xl text-xs sm:text-sm font-light leading-relaxed">
            Have questions, direct suggestions, or custom requests for a private penthouse lounge? Fire us an encrypted message dispatch below, call our hotline, or ascend the beautiful cliffs of Daman-e-Koh to dine above the clouds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* --- Left Columns: Dispatch mail form (Cols 5) --- */}
          <div className="lg:col-span-5 bg-zinc-955 bg-zinc-950/40 border border-zinc-900 p-6 sm:p-8 rounded-[28px] relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] blur-2xl rounded-full animate-pulse" />
            
            <AnimatePresence mode="wait">
              {!messageSent ? (
                <form onSubmit={handleMessageSubmit} className="flex flex-col gap-5 text-left">
                  <div className="flex items-center gap-2.5 mb-2 pb-3 border-b border-zinc-900/60">
                    <MessageSquare className="w-4.5 h-4.5 text-emerald-500" />
                    <h3 className="font-serif font-bold text-base text-zinc-100 uppercase tracking-wide">Direct Message Dispatch</h3>
                  </div>

                  {/* Form System Errors (No Raw Alerts) */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl border border-red-500/10 bg-red-500/5 text-red-400 text-xs font-mono leading-relaxed"
                    >
                      {formError}
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Your Name</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-350 text-xs font-mono focus:border-emerald-500/30 outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="jane@obsidiandome.pk"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-350 text-xs font-mono focus:border-emerald-500/30 outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-[400] text-[10px] font-mono tracking-wider uppercase block">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      value={userMsg}
                      onChange={(e) => setUserMsg(e.target.value)}
                      placeholder="Customizations, event requests, or feedback notes..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-300 text-xs font-mono focus:border-emerald-500/30 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-serif font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95 hover:scale-[1.01]"
                  >
                    <Send className="w-3.5 h-3.5 text-zinc-950 stroke-[2.5]" />
                    <span>Send Dispatch</span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-white uppercase tracking-wider">Message Transmitted</h4>
                  <p className="text-zinc-400 font-sans text-xs font-light leading-relaxed max-w-sm">
                    Salutations <strong className="text-zinc-200">{userName}</strong>! Your direct enquiry has been transmitted safely to our administrative logs. We will analyze your coordinates shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-full border border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Dispatch
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- Right Columns: Interactive Map Mockup & Address Info --- */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Elegant Map Box Frame */}
            <div className="h-[350px] rounded-[28px] overflow-hidden border border-zinc-900 relative shadow-2xl group bg-zinc-950">
              
              <iframe
                src="https://maps.google.com/maps?q=the%20dome%2520islamabad&t=m&z=15&output=embed&iwloc=near"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-[180deg] saturate-[30%] opacity-85 hover:opacity-100 transition-opacity duration-700 ease-out"
                title="Google Maps Location for The Obsidian Dome"
                allowFullScreen
                loading="lazy"
              />

              {/* Float location info box */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-20 backdrop-blur-md bg-zinc-950/80 border border-zinc-900 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="font-serif font-bold text-xs text-zinc-100 uppercase tracking-widest">Daman-e-Koh Road</h4>
                  <p className="text-[10px] text-zinc-500 font-light mt-0.5 leading-snug">Margalla Hills, Sector E-7 peak, Islamabad, 44000</p>
                </div>
              </div>

            </div>

            {/* General Corporate specifics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-zinc-900/10 border border-zinc-900/60 flex items-start gap-4">
                <Phone className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-serif font-bold text-zinc-300 text-xs uppercase tracking-widest text-zinc-400">Direct Booking Hub</h5>
                  <p className="font-mono text-zinc-100 text-sm mt-1.5">+92 332-9636636</p>
                  <p className="text-zinc-500 text-[10px] mt-1 leading-normal font-sans">Available daily from 11:30 AM to 11:30 PM for table appointments.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/10 border border-zinc-900/60 flex items-start gap-4">
                <Mail className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-serif font-bold text-zinc-300 text-xs uppercase tracking-widest text-zinc-400 font-serif">Registry Inquiries</h5>
                  <p className="text-zinc-100 font-mono text-xs mt-1.5 leading-none">management@obsidiandome.pk</p>
                  <p className="text-zinc-500 text-[10px] mt-1 leading-normal font-sans text-zinc-500">Reach out for custom partnerships, events, &amp; franchise reviews.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
