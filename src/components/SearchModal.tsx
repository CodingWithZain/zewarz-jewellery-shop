import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const SearchModal: React.FC = () => {
  const {
    products,
    isSearchOpen,
    setIsSearchOpen,
    formatPrice,
    setActivePDPProduct,
  } = useStore();

  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    if (!term.trim()) return products.slice(0, 4);
    const q = term.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.caratWeight.toLowerCase().includes(q) ||
        p.certification.toLowerCase().includes(q)
    );
  }, [term, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20">
        <div className="relative inline-block w-full max-w-2xl bg-[#111116] border border-[#2a2a38] text-left align-middle shadow-2xl z-10 overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#20202a] flex items-center gap-3 bg-[#14141c]">
            <Search className="w-5 h-5 text-[#c5a059] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search diamonds, emeralds, solitaires, polki chokers..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#777] focus:outline-none font-light"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Category Chips */}
          <div className="px-6 py-2.5 bg-[#0e0e12] border-b border-[#1c1c24] flex items-center gap-2 overflow-x-auto text-[11px] text-[#888]">
            <span className="uppercase tracking-wider">Suggestions:</span>
            {['Solitaires', 'Polki Choker', 'Emeralds', 'Eternity Band', 'Ceylon Sapphire'].map((s) => (
              <button
                key={s}
                onClick={() => setTerm(s)}
                className="px-2.5 py-0.5 bg-[#171720] border border-[#282836] text-[#c4c2bc] hover:border-[#c5a059] hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#888] font-medium mb-3">
              {term ? `Found ${filtered.length} Creations` : 'Curated Atelier Highlights'}
            </div>

            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#777]">
                No fine jewelry references matched "{term}".
              </div>
            ) : (
              filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setActivePDPProduct(p);
                  }}
                  className="flex items-center justify-between p-3 bg-[#14141a] border border-[#20202a] hover:border-[#c5a059] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-12 h-12 object-cover bg-black border border-[#262632]"
                    />
                    <div>
                      <h4 className="text-xs font-serif text-white group-hover:text-[#d4af37] transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-[#888]">{p.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-xs font-semibold text-white tabular-nums">
                      {formatPrice(p.price)}
                    </div>
                    <div className="text-[10px] text-[#c5a059]">{p.certification}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
