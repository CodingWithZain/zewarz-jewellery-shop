import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { CURRENCY_MAP } from '../data/products.ts';
import { CurrencyCode } from '../types.ts';

export const Footer: React.FC = () => {
  const { currency, setCurrency, setSelectedCategory, setIsAdminMode } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address for VIP correspondence.');
      return;
    }
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#08080a] text-[#b8b6af] border-t border-[#1c1c24] text-xs">
      {/* Newsletter Header Banner */}
      <div className="border-b border-[#1c1c24] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <h3 className="font-serif text-2xl text-white font-normal">
              The Sovereign Atelier Salon
            </h3>
            <p className="mt-1 text-xs text-[#8f8d86] font-light">
              Receive private invitations to private viewing salons, limited diamond releases, and bespoke gemological monographs.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/30 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been entered into the VIP Salon ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#121218] border border-[#262634] px-3.5 py-2.5 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold uppercase tracking-wider text-xs transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
            {error && <p className="mt-2 text-red-400 text-[11px]">{error}</p>}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif tracking-[0.25em] text-2xl text-white font-light uppercase block">
              ZEWARZ
            </span>
            <p className="text-xs text-[#888] font-light leading-relaxed max-w-sm">
              Haute Joaillerie and royal heritage jewelry atelier. Crafting bespoke diamond solitaires, heirloom polki chokers, and certified gemstones with uncompromised Antwerp and Bikaneri artisanal heritage.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#888] pt-2">
              <span>Mayfair, London</span>
              <span aria-hidden="true">·</span>
              <span>Geneva</span>
              <span aria-hidden="true">·</span>
              <span>Dubai DIFC</span>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8f8d86]">
              <li>
                <button
                  onClick={() => setSelectedCategory('solitaires')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Antwerp Solitaires
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('bridal')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Heirloom Polki Bridal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('necklaces')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Colombian Emeralds
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('bracelets')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Architectural Cuffs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('earrings')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Chandelier Drops
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Atelier & Trust */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              Atelier & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8f8d86]">
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">
                Bespoke Commission Process
              </li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">
                GIA & IGI Diamond Dossiers
              </li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">
                Armored White-Glove Transit
              </li>
              <li className="hover:text-[#d4af37] transition-colors cursor-pointer">
                Restoration & Cleaning
              </li>
              <li>
                <button
                  onClick={() => setIsAdminMode(true)}
                  className="text-[#c5a059] hover:underline"
                >
                  Executive Atelier Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Currencies & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-medium mb-4">
              Regional Currency
            </h4>
            <div className="space-y-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-[#121217] border border-[#242430] p-2 text-xs text-[#d4af37] focus:outline-none"
              >
                {(Object.keys(CURRENCY_MAP) as CurrencyCode[]).map((code) => (
                  <option key={code} value={code}>
                    {code} - {CURRENCY_MAP[code].name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#666] pt-1">
                Settled according to real-time interbank gold and diamond exchange indices.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Structured Statement */}
        <div className="mt-12 pt-8 border-t border-[#181820] text-[11px] text-[#666] leading-relaxed">
          <p>
            ZEWARZ® Haute Joaillerie is a trademark of Zewarz International. All diamond acquisitions adhere to the Kimberly Process Certification Scheme (KPCS) and UN System of Warranties. Handcrafted with ethically sourced 18K yellow, white, and rose gold, pure 950 platinum, certified natural polki uncut diamonds, and untreated emeralds from Muzo and Kagem mines.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#555] gap-4">
          <div>© {new Date().getFullYear()} ZEWARZ Atelier. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#888] cursor-pointer">Privacy Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#888] cursor-pointer">Terms of Commission</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#888] cursor-pointer">Authenticity Dossier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
