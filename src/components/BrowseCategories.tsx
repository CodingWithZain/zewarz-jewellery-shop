import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCategory } from '../types.ts';

export const BrowseCategories: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const categories: {
    id: ProductCategory;
    name: string;
    description: string;
    image: string;
    count: string;
  }[] = [
    {
      id: 'solitaires',
      name: 'Diamond Solitaires',
      description: 'Antwerp certified oval, round & emerald-cut solitaires',
      image: '/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg',
      count: '14 References',
    },
    {
      id: 'bridal',
      name: 'Bridal Polki & Jadau',
      description: 'Heirloom uncut diamonds with natural pearls & meenakari',
      image: '/src/assets/images/product_polki_bridal_choker_1793376453662.jpg',
      count: '9 References',
    },
    {
      id: 'necklaces',
      name: 'High Jewelry Suites',
      description: 'Cascading Colombian emeralds and brilliant diamond collars',
      image: '/src/assets/images/hero_luxury_diamond_necklace_1793376452090.jpg',
      count: '11 References',
    },
    {
      id: 'bracelets',
      name: 'Architectural Cuffs',
      description: 'Triple micro-pavé and channel-set gemstone baguettes',
      image: '/src/assets/images/product_emerald_cuff_bracelet_1793376453600.jpg',
      count: '8 References',
    },
    {
      id: 'earrings',
      name: 'Chandelier Earrings',
      description: 'Articulated drops with Ceylon sapphires and pear diamonds',
      image: '/src/assets/images/collection_heritage_earrings_1793376454302.jpg',
      count: '12 References',
    },
    {
      id: 'rings',
      name: 'Eternity Bands',
      description: 'Continuous ribbons of step-cut and emerald-cut stones',
      image: '/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg',
      count: '7 References',
    },
  ];

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    // Switch route to shop or scroll to catalog
    window.location.hash = '#shop';
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#0c0c0f] border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] block mb-2 font-medium">
              Curated Taxonomy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
              Browse Fine Jewelry Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              window.location.hash = '#shop';
            }}
            className="text-xs uppercase tracking-wider text-[#a3a19b] hover:text-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6-Grid Category Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group relative flex flex-col bg-[#121217] border border-[#20202a] hover:border-[#c5a059] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0d]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/20 to-transparent" />
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xs font-serif text-white font-medium group-hover:text-[#d4af37] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-[10px] text-[#888] font-light line-clamp-1">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#1a1a22] flex items-center justify-between text-[10px] text-[#c5a059] font-mono tabular-nums">
                  <span>{cat.count}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
