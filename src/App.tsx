/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HomeHero from './components/HomeHero';
import SommelierEngine from './components/SommelierEngine';
import PromotionsSection from './components/PromotionsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ReservationSystem from './components/ReservationSystem';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-zinc-950 overflow-x-hidden">
      
      {/* 1. Sticky Navigation Header with Frosted Glassmorphism Overlay */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* 2. Main Tabbed Content display */}
      <main className="flex-grow pt-24">
        {currentTab === 'home' && (
          <HomeHero
            onOpenBooking={() => setBookingOpen(true)}
            onExploreMenu={() => setCurrentTab('menu')}
          />
        )}

        {currentTab === 'menu' && (
          <SommelierEngine />
        )}

        {currentTab === 'promotions' && (
          <PromotionsSection onOpenBooking={() => setBookingOpen(true)} />
        )}

        {currentTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* 3. Constant High-End Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* 4. Imperial Reservation Table System Modal overlay */}
      <ReservationSystem
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
