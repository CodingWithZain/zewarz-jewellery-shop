import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Gem, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const PromotionalFourGrid: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const blocks = [
    {
      title: 'Antwerp Type IIa Solitaires',
      badge: 'Certified D-Flawless',
      description:
        'Sourced through direct Antwerp syndicates. Chemically purest carbon crystals with zero nitrogen impurities, laser-inscribed by the GIA.',
      image: '/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg',
      category: 'solitaires' as const,
      spec: '0.00% Nitrogen Impurity',
    },
    {
      title: 'Royal Bikaneri Polki Jadau',
      badge: 'Ancestral Jadau Setting',
      description:
        'Natural uncut diamonds enveloped in pure 24K gold foil, complemented by natural basra pearls and intricate reverse-side Meenakari enameling.',
      image: '/src/assets/images/product_polki_bridal_choker_1793376453662.jpg',
      category: 'bridal' as const,
      spec: '180+ Artisan Setting Hours',
    },
    {
      title: 'Untreated Colombian Emeralds',
      badge: 'Muzo & Chivor Mines',
      description:
        'Intense vivid green saturation with characteristic "jardin" inclusions verifying authentic natural origin, set in rich 18K royal gold.',
      image: '/src/assets/images/hero_luxury_diamond_necklace_1793376452090.jpg',
      category: 'necklaces' as const,
      spec: 'Vivid Green GRS Certified',
    },
    {
      title: 'Chandelier Royal Sapphires',
      badge: 'Unheated Ceylon Gems',
      description:
        'Cornflower vibrancy stones custom-cut for kinetic drop earrings, counterweighted with precision to maintain flawless vertical drape.',
      image: '/src/assets/images/collection_heritage_earrings_1793376454302.jpg',
      category: 'earrings' as const,
      spec: 'Natural Sri Lankan Origin',
    },
  ];

  const handleBlockClick = (cat: any) => {
    setSelectedCategory(cat);
    window.location.hash = '#shop';
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#09090c] border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Materials & Provenance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
            Four Pillars of Sovereign Gemology
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#9d9b94] font-light leading-relaxed">
            Every raw stone entering our vaults is authenticated across four rigorous provenance criteria before cutting begins.
          </p>
        </div>

        {/* 4-Part Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blocks.map((block, idx) => (
            <div
              key={idx}
              onClick={() => handleBlockClick(block.category)}
              className="group relative h-[360px] sm:h-[400px] overflow-hidden bg-[#101015] border border-[#22222d] hover:border-[#c5a059] transition-all duration-500 cursor-pointer flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Background Photography */}
              <img
                src={block.image}
                alt={block.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/65 to-transparent" />

              {/* Card Information */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[11px] text-[#c5a059] uppercase tracking-wider font-medium mb-1.5">
                  <span>{block.badge}</span>
                  <span aria-hidden="true" className="text-[#666]">·</span>
                  <span className="font-mono text-[#a3a19b]">{block.spec}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug group-hover:text-[#d4af37] transition-colors">
                  {block.title}
                </h3>

                <p className="mt-2 text-xs text-[#b8b6af] font-light line-clamp-2 max-w-lg leading-relaxed">
                  {block.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-white font-semibold group-hover:text-[#c5a059] transition-colors">
                  <span>Explore Vault References</span>
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
