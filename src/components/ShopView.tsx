import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Home,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import { ProductCategory, Product } from '../types.ts';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    formatPrice,
  } = useStore();

  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [activeCertification, setActiveCertification] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 9;

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Vault Pieces', value: 'all' },
    { label: 'Solitaires & Rings', value: 'solitaires' },
    { label: 'High Jewelry Necklaces', value: 'necklaces' },
    { label: 'Bridal Polki & Jadau', value: 'bridal' },
    { label: 'Cuffs & Bracelets', value: 'bracelets' },
    { label: 'Chandelier Earrings', value: 'earrings' },
    { label: 'Eternity Bands', value: 'rings' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Metal
    if (selectedMetal !== 'all') {
      result = result.filter((p) =>
        p.materials.some((m) =>
          m.name.toLowerCase().includes(selectedMetal.toLowerCase())
        )
      );
    }

    // Certification
    if (activeCertification !== 'all') {
      result = result.filter((p) => p.certification === activeCertification);
    }

    // Max Price
    result = result.filter((p) => p.price <= priceRange[1]);

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, inStockOnly, selectedMetal, activeCertification, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMetal('all');
    setActiveCertification('all');
    setInStockOnly(false);
    setPriceRange([0, 30000]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-[#e8e6e1] pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#888] mb-6 font-light">
          <button
            onClick={() => {
              window.location.hash = '';
            }}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-[#555]" />
          <span className="text-[#a3a19b]">Shop All Collections</span>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3 h-3 text-[#555]" />
              <span className="text-[#c5a059] uppercase tracking-wider font-medium">
                {selectedCategory}
              </span>
            </>
          )}
        </nav>

        {/* Page Header Banner */}
        <div className="py-8 border-b border-[#1f1f28] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Atelier Dossier</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal">
              The Grand Haute Joaillerie Vault
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#9d9b94] font-light max-w-xl leading-relaxed">
              Explore all active commissions, individual solitaire rings, uncut bridal polki necklaces, and certified gemstone jewels ready for discreet armored courier delivery.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-[#14141c] border border-[#242432] px-4 py-2 text-[#a3a19b]">
              Showing <span className="text-white font-mono font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="text-white font-mono">{products.length}</span> pieces
            </div>
          </div>
        </div>

        {/* Top Filter & Sort Bar */}
        <div className="py-6 border-b border-[#181822] flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  setSelectedCategory(c.value);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  selectedCategory === c.value
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'bg-[#121217] text-[#888] hover:text-white border border-[#22222d]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-[#777] uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121217] border border-[#262634] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="featured">Featured Atelier Order</option>
              <option value="price-asc">Investment: Low to High</option>
              <option value="price-desc">Investment: High to Low</option>
              <option value="rating">Top Client Appraisals</option>
              <option value="newest">Latest Vault Commission</option>
            </select>
          </div>
        </div>

        {/* Refined Secondary Filter Bar */}
        <div className="py-4 border-b border-[#14141c] flex flex-wrap items-center justify-between gap-4 text-xs text-[#a3a19b]">
          <div className="flex flex-wrap items-center gap-6">
            {/* Precious Metal Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[#666] uppercase text-[11px] tracking-wider">Alloy:</span>
              <select
                value={selectedMetal}
                onChange={(e) => setSelectedMetal(e.target.value)}
                className="bg-[#121217] border border-[#242432] px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="all">All Precious Alloys</option>
                <option value="Platinum">950 Platinum</option>
                <option value="Yellow Gold">18K Yellow Gold</option>
                <option value="White Gold">18K White Gold</option>
                <option value="Rose Gold">18K Rose Gold</option>
                <option value="Jadau">24K Jadau Pure Gold</option>
              </select>
            </div>

            {/* Certification Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[#666] uppercase text-[11px] tracking-wider">Report:</span>
              <select
                value={activeCertification}
                onChange={(e) => setActiveCertification(e.target.value)}
                className="bg-[#121217] border border-[#242432] px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="all">All Gemological Seals</option>
                <option value="GIA Certified">GIA Certified</option>
                <option value="IGI Certified">IGI Certified</option>
                <option value="Bespoke Atelier Seal">Bespoke Atelier Seal</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="flex items-center gap-2">
              <span className="text-[#666] uppercase text-[11px] tracking-wider">Max Price:</span>
              <input
                type="range"
                min="3000"
                max="30000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="accent-[#c5a059] cursor-pointer w-28"
              />
              <span className="font-mono text-white tabular-nums">
                {formatPrice(priceRange[1])}
              </span>
            </div>

            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#c5a059]"
              />
              <span className="text-white">Vault In-Stock</span>
            </label>
          </div>

          {(selectedCategory !== 'all' ||
            selectedMetal !== 'all' ||
            activeCertification !== 'all' ||
            inStockOnly ||
            priceRange[1] < 30000) && (
            <button
              onClick={resetAllFilters}
              className="text-[#c5a059] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-white">No commissions matched your specifications</h3>
            <p className="mt-2 text-xs text-[#888] max-w-sm mx-auto">
              Try adjusting your alloy selection or raising the investment ceiling.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2 text-xs font-mono">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? 'border-[#c5a059] bg-[#c5a059] text-black font-bold'
                      : 'border-[#262634] text-[#888] hover:text-white bg-[#121217]'
                  }`}
                >
                  0{page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
