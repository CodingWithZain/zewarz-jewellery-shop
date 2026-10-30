import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const InstagramFeed: React.FC = () => {
  const { setActivePDPProduct, products } = useStore();

  const posts = [
    {
      image: '/src/assets/images/hero_luxury_diamond_necklace_1793376452090.jpg',
      caption: 'The Sovereign Emerald Suite at the Paris Biennale des Antiquaires. #ZewarzAtelier',
      product: products[2] || products[0],
    },
    {
      image: '/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg',
      caption: 'Pure fire: 3.12-carat oval brilliant diamond in hand-forged 950 platinum. #Solitaire',
      product: products[0],
    },
    {
      image: '/src/assets/images/product_polki_bridal_choker_1793376453662.jpg',
      caption: 'Centuries of royal Indian Jadau heritage woven into gold silk cords. #PolkiChoker',
      product: products[1],
    },
    {
      image: '/src/assets/images/product_emerald_cuff_bracelet_1793376453600.jpg',
      caption: 'Architectural geometry: Baguette Zambian emeralds with triple micro-pavé borders. #HauteJoaillerie',
      product: products[3] || products[0],
    },
  ];

  return (
    <section className="py-16 bg-[#0a0a0d] border-b border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@zewarzofficial</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-normal">
              From The Atelier & Global Salons
            </h3>
          </div>
          <a
            href="https://zewarz.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-[#a3a19b] hover:text-[#d4af37] flex items-center gap-1 transition-colors"
          >
            <span>Follow Our Commissions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              onClick={() => setActivePDPProduct(post.product)}
              className="group relative aspect-square bg-[#121217] border border-[#202028] overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                <p className="text-[11px] leading-relaxed line-clamp-3 text-[#dcdad5]">
                  {post.caption}
                </p>
                <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold mt-2">
                  Inspect Reference →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
