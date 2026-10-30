import React, { useState, useEffect } from 'react';
import { Play, Pause, ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory } = useStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Haute Joaillerie & Royal Heirlooms',
      kicker: 'The 2026 Sovereign High Jewelry Collection',
      description:
        'Individually forged in pure platinum and 18-karat gold, each Zewarz piece is a celebration of uncut polki diamonds, certified Colombian emeralds, and peerless Antwerp solitaires.',
      image: '/src/assets/images/hero_luxury_diamond_necklace_1793376452090.jpg',
      category: 'necklaces' as const,
      tag: 'Bespoke Craftsmanship',
    },
    {
      title: 'The Noor Solitaire Masterpiece',
      kicker: 'Pure D-Color Flawless Diamonds',
      description:
        'Sculpted with ultra-slender claw prongs to unleash mesmerizing fire. Laser-inscribed with GIA dual verification for the discerning collector.',
      image: '/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg',
      category: 'solitaires' as const,
      tag: 'Antwerp Diamonds',
    },
  ];

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <section
      className="relative w-full h-[620px] lg:h-[720px] overflow-hidden bg-[#070709] border-b border-[#1f1f26]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Imagery with Subtle Ambient Zoom & Scrim */}
      <div className="absolute inset-0">
        <img
          src={activeSlide.image}
          alt={activeSlide.title}
          className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
            isPlaying && !isHovered ? 'scale-105' : 'scale-100'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Measured Luxury Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/95 via-[#070709]/70 to-[#070709]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/60" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Quiet Unboxed Metadata Kicker (Anti-slop zero pill rule) */}
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#c5a059] mb-4">
            <Gem className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{activeSlide.kicker}</span>
            <span aria-hidden="true" className="text-[#555] font-light">·</span>
            <span className="text-[#a3a19b]">{activeSlide.tag}</span>
          </div>

          {/* Refined Luxury Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-wide font-normal leading-[1.15] mb-6 text-balance"
          >
            {activeSlide.title}
          </h1>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-lg text-[#b8b6af] font-light leading-relaxed mb-8 max-w-xl">
            {activeSlide.description}
          </p>

          {/* Actions & Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setSelectedCategory(activeSlide.category);
                window.location.hash = '#shop';
                const catalogEl = document.getElementById('catalog-section');
                if (catalogEl) {
                  catalogEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-7 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-[0.18em] uppercase rounded-none transition-all flex items-center gap-2 shadow-lg shadow-[#c5a059]/15 group cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('craftsmanship-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-transparent hover:bg-white/5 text-[#e8e6e1] hover:text-white border border-[#3e3e4a] hover:border-[#c5a059] font-medium text-xs tracking-[0.18em] uppercase transition-all cursor-pointer"
            >
              Discover Luxury
            </button>
          </div>

          {/* Trust Attributes Strip */}
          <div className="mt-12 flex flex-wrap items-center gap-4 text-xs text-[#8f8d86] tracking-wider pt-6 border-t border-[#22222a]/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>GIA & IGI Certified</span>
            </div>
            <span aria-hidden="true" className="text-[#444]">·</span>
            <div>Armored White-Glove Courier</div>
            <span aria-hidden="true" className="text-[#444]">·</span>
            <div>30-Day Heritage Guarantee</div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Media Autoplay Controls & Slide Switcher */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-4 bg-[#121216]/80 backdrop-blur-md px-4 py-2 border border-[#262630] rounded-none">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-[#a3a19b] hover:text-[#d4af37] transition-colors p-1"
          aria-label={isPlaying ? 'Pause banner slideshow' : 'Play banner slideshow'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8f8d86] tabular-nums">
          <span>0{currentSlide + 1}</span>
          <span className="text-[#444]">/</span>
          <span>0{slides.length}</span>
        </div>

        <div className="flex items-center gap-1.5 ml-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 transition-all ${
                currentSlide === idx ? 'w-6 bg-[#c5a059]' : 'w-2 bg-[#333] hover:bg-[#555]'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
