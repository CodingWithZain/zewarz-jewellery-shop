import React, { useState } from 'react';
import { Sparkles, Calendar, Check, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const ConversionBanner: React.FC = () => {
  const [clientEmail, setClientEmail] = useState('');
  const [preferredCity, setPreferredCity] = useState('London Salon (Mayfair)');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;
    setIsBooked(true);
    setTimeout(() => {
      setClientEmail('');
      setIsBooked(false);
    }, 4500);
  };

  return (
    <section className="py-20 bg-[#0e0e12] border-b border-[#1f1f28] relative overflow-hidden">
      {/* Subtle gold radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#c5a059]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>The Sovereign Salon Experience</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-wide leading-tight text-balance">
          Schedule A Private Gemological Salon & Viewing
        </h2>

        <p className="mt-4 text-xs sm:text-base text-[#b0aeab] font-light max-w-2xl mx-auto leading-relaxed">
          Inspect unmounted Antwerp diamond solitaires, examine raw emerald lots under master stereomicroscopes, or commission an heirloom bridal choker with our principal master jeweler.
        </p>

        {isBooked ? (
          <div className="mt-8 p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs sm:text-sm max-w-lg mx-auto flex items-center justify-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Your private salon consultation has been requested. Our Senior Concierge will contact you within 4 hours.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto"
          >
            <div className="w-full sm:w-auto flex-1">
              <input
                type="email"
                required
                placeholder="Enter VIP collector email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full bg-[#14141c] border border-[#2a2a38] px-4 py-3 text-xs text-white placeholder-[#777] focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={preferredCity}
                onChange={(e) => setPreferredCity(e.target.value)}
                className="w-full bg-[#14141c] border border-[#2a2a38] px-3.5 py-3 text-xs text-[#c5a059] focus:outline-none focus:border-[#c5a059]"
              >
                <option value="London Salon (Mayfair)">London (Mayfair Salon)</option>
                <option value="Geneva Private Vault">Geneva (Private Vault)</option>
                <option value="Dubai DIFC Atelier">Dubai (DIFC Atelier)</option>
                <option value="New York Park Ave">New York (Park Ave Suite)</option>
                <option value="Virtual Gemological Concierge">Virtual High-Res 4K Concierge</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Consultation</span>
            </button>
          </form>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#777] tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Strict Confidentiality Charter</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Armored Valet Parking</span>
          <span aria-hidden="true">·</span>
          <span>Complimentary Gemological Valuation</span>
        </div>
      </div>
    </section>
  );
};
