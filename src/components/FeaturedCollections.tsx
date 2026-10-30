import React from 'react';
import { ArrowRight, Gem } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCategory } from '../types.ts';

export const FeaturedCollections: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const collections = [
    {
      title: 'Antwerp Solitaires & Rings',
      category: 'solitaires' as ProductCategory,
      subtitle: 'D-Flawless Diamonds in Pure 950 Platinum',
      image: '/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg',
      count: '12 Commissions',
    },
    {
      title: 'Heirloom Polki & Bridal',
      category: 'bridal' as ProductCategory,
      subtitle: 'Uncut Diamonds, Natural Pearls & Pure Jadau Gold',
      image: '/src/assets/images/product_polki_bridal_choker_1793376453662.jpg',
      count: '8 Commissions',
    },
    {
      title: 'Royal Colombian Emeralds',
      category: 'necklaces' as ProductCategory,
      subtitle: 'Vivid Green Emeralds with Marquise Fire Halos',
      image: '/src/assets/images/hero_luxury_diamond_necklace_1793376452090.jpg',
      count: '6 Commissions',
    },
  ];

  const handleSelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0d] border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-3">
            <Gem className="w-3.5 h-3.5" />
            <span>Curated Heritage Ateliers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal text-balance">
            Haute Joaillerie Collections
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#9d9b94] font-light leading-relaxed">
            Each creation is commissioned in limited quantities, accompanied by world-renowned gemological dossiers and armored white-glove transit.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((col, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(col.category)}
              className="group relative aspect-[4/5] overflow-hidden bg-[#121217] border border-[#20202a] hover:border-[#c5a059] transition-all duration-500 cursor-pointer flex flex-col justify-end p-8"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-xs font-mono uppercase tracking-wider text-[#c5a059] mb-1 tabular-nums">
                  {col.count}
                </div>
                <h3 className="font-serif text-2xl text-white font-normal leading-snug group-hover:text-[#d4af37] transition-colors">
                  {col.title}
                </h3>
                <p className="mt-1 text-xs text-[#b8b6af] font-light line-clamp-1">
                  {col.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-white font-medium group-hover:text-[#c5a059] transition-colors">
                  <span>Explore Vault</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
