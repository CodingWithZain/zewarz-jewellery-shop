import React from 'react';
import { ShieldCheck, Gem, Sparkles, Award } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship-section" className="py-20 bg-[#08080b] border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#111116] border border-[#242432] overflow-hidden relative">
              <img
                src="/src/assets/images/hero_luxury_diamond_necklace_1793376452090.jpg"
                alt="Zewarz Master Goldsmith Craftsmanship"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0e0e12]/90 backdrop-blur-md border border-[#2a2a36]">
                <div className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium">
                  The Antwerp & Jaipur Guild Legacy
                </div>
                <div className="text-sm font-serif text-white mt-0.5">
                  Hand-forged prongs accurate to within 10 microns for zero optical obstruction.
                </div>
              </div>
            </div>
          </div>

          {/* Text Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059]">
              <Gem className="w-3.5 h-3.5" />
              <span>Generations of Sovereign Artistry</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
              Where Ancient Polki Jadau Meets Flawless European Lapidary
            </h2>

            <p className="text-xs sm:text-sm text-[#a8a69f] font-light leading-relaxed">
              At ZEWARZ, every creation begins in our private mineral vaults. We source unheated Ceylon sapphires, Muzo emeralds, and GIA-certified Type IIa diamonds with zero fluorescence. Our master artisans cold-forge 950 platinum and 18-karat royal gold, blending royal Mughal Jadau stone-setting with contemporary minimalist architectural proportions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f1f28] text-xs">
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-white tabular-nums">42+</span>
                <span className="block text-[#888]">Artisan Hours Per Ring</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-white tabular-nums">100%</span>
                <span className="block text-[#888]">Conflict-Free Kimberley Process</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-white tabular-nums">0.02mm</span>
                <span className="block text-[#888]">Pavé Bezel Tolerance</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xl font-bold text-white tabular-nums">Lifetime</span>
                <span className="block text-[#888]">Complimentary Vault Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
