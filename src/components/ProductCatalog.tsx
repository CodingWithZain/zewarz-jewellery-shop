import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import { ProductCategory, Product } from '../types.ts';

export const ProductCatalog: React.FC = () => {
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

  const [selectedMetalFilter, setSelectedMetalFilter] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Vault Creations', value: 'all' },
    { label: 'Solitaires & Rings', value: 'solitaires' },
    { label: 'High Jewelry Necklaces', value: 'necklaces' },
    { label: 'Bridal Polki & Jadau', value: 'bridal' },
    { label: 'Cuffs & Bracelets', value: 'bracelets' },
    { label: 'Royal Earrings', value: 'earrings' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // In Stock Only
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Precious Metal Filter
    if (selectedMetalFilter !== 'all') {
      result = result.filter((p) =>
        p.materials.some((m) =>
          m.name.toLowerCase().includes(selectedMetalFilter.toLowerCase())
        )
      );
    }

    // Price Range Filter
    result = result.filter((p) => p.price <= priceRange[1]);

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Featured / Default
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedMetalFilter, inStockOnly, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedMetalFilter('all');
    setInStockOnly(false);
    setPriceRange([0, 30000]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  return (
    <section id="catalog-section" className="py-16 bg-[#09090c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Section Lead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#1f1f28] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-2 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Joaillerie Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
              The Sovereign Collection
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#888]">
            <span className="font-mono tabular-nums text-white font-medium">
              {filteredProducts.length}
            </span>
            <span>Master Pieces Curated</span>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1b1b22]">
          {/* Category Tabs (Interactive Filter Controls - allowed per Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-[#c5a059] text-black'
                    : 'bg-[#14141c] text-[#a3a19b] hover:text-white border border-[#22222d]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-[#888] uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-[#c5a059]" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121217] border border-[#262632] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="featured">Atelier Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Client Appraisals</option>
              <option value="newest">Recent Releases</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Bar: Metal, Max Price, In-Stock */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#a3a19b] border-b border-[#16161d]">
          <div className="flex flex-wrap items-center gap-4">
            {/* Metal Filter */}
            <div className="flex items-center gap-2">
              <span className="uppercase text-[#777] text-[11px] tracking-wider">Metal:</span>
              <select
                value={selectedMetalFilter}
                onChange={(e) => setSelectedMetalFilter(e.target.value)}
                className="bg-[#14141c] border border-[#262632] px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="all">All Metals</option>
                <option value="Platinum">950 Platinum</option>
                <option value="Yellow Gold">18K Yellow Gold</option>
                <option value="White Gold">18K White Gold</option>
                <option value="Rose Gold">18K Rose Gold</option>
                <option value="Jadau">Artisanal Jadau Gold</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-2">
              <span className="uppercase text-[#777] text-[11px] tracking-wider">Max Investment:</span>
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
              <span className="text-white">Vault Ready Only</span>
            </label>
          </div>

          {(selectedCategory !== 'all' ||
            selectedMetalFilter !== 'all' ||
            inStockOnly ||
            priceRange[1] < 30000) && (
            <button
              onClick={handleResetFilters}
              className="text-[#c5a059] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid: 3-column desktop layout adhering to e-commerce constitution */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-serif text-xl text-white">No creations match your filter criteria</h3>
            <p className="mt-2 text-xs text-[#888] max-w-sm mx-auto">
              Try adjusting your price ceiling or selecting all precious metal alloys.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 text-xs font-mono">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 800, behavior: 'smooth' });
                  }}
                  className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? 'border-[#c5a059] bg-[#c5a059] text-black font-bold'
                      : 'border-[#262632] text-[#888] hover:text-white bg-[#14141c]'
                  }`}
                >
                  0{page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
