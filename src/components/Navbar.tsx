import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, SlidersHorizontal, Shield, X, Menu, ChevronDown, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { CURRENCY_MAP } from '../data/products.ts';
import { CurrencyCode, ProductCategory } from '../types.ts';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    selectedCategory,
    setSelectedCategory,
    isAdminMode,
    setIsAdminMode,
  } = useStore();

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { label: string; category: ProductCategory; id: string }[] = [
    { label: 'Solitaires & Rings', category: 'solitaires', id: 'solitaires' },
    { label: 'High Jewelry Necklaces', category: 'necklaces', id: 'necklaces' },
    { label: 'Bridal Polki', category: 'bridal', id: 'bridal' },
    { label: 'Royal Gemstones', category: 'bracelets', id: 'gemstones' },
    { label: 'Earrings', category: 'earrings', id: 'earrings' },
  ];

  return (
    <>
      {/* Top Heritage Notice Banner */}
      <div className="bg-[#121216] border-b border-[#22222a] py-1.5 px-4 text-xs text-[#a3a19b] text-center tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-3">
            <span>Bespoke Atelier Inquiries</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#c5a059]">concierge@zewarz.org</span>
          </div>
          <div className="mx-auto md:mx-0 flex items-center gap-2">
            <span className="text-[#d4af37] font-medium">Complimentary Armored White-Glove Courier</span>
            <span>on all worldwide orders over $1,000</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="text-[#c5a059] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3" />
              <span>{isAdminMode ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0b0b0d]/90 backdrop-blur-md border-b border-[#1c1c22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Zone 1: Single text wordmark */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-[#a3a19b] hover:text-white p-2"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-2xl sm:text-3xl font-serif tracking-[0.28em] text-white hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 uppercase font-light"
              >
                ZEWARZ
              </a>
            </div>

            {/* Zone 2: 4-5 single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.16em] uppercase font-medium text-[#c4c2bc]">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '';
                }}
                className={`hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-2 ${
                  window.location.hash !== '#shop' && window.location.hash !== '#admin' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : ''
                }`}
              >
                Home
              </a>
              <a
                href="#shop"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory('all');
                  window.location.hash = '#shop';
                }}
                className={`hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-2 ${
                  window.location.hash === '#shop' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : ''
                }`}
              >
                Shop All
              </a>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setActiveMegaMenu(item.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory(item.category);
                      window.location.hash = '#shop';
                    }}
                    className={`hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 py-2 flex items-center gap-1 ${
                      selectedCategory === item.category && window.location.hash === '#shop' ? 'text-[#d4af37] border-b-2 border-[#d4af37]' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                </div>
              ))}
            </nav>

            {/* Zone 3: Interactive Affordances (Currency, Search, Wishlist, Cart) */}
            <div className="flex items-center gap-4 shrink-0 text-[#e8e6e1]">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-1 text-xs tracking-wider uppercase text-[#c4c2bc] hover:text-[#d4af37] py-1.5 px-2 rounded border border-[#22222a] bg-[#121216] transition-colors"
                  aria-label="Select Currency"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-[#a3a19b]" />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-[#141418] border border-[#262630] rounded-md shadow-2xl py-1 z-50">
                    {(Object.keys(CURRENCY_MAP) as CurrencyCode[]).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#1f1f26] transition-colors ${
                          currency === code ? 'text-[#d4af37] font-medium' : 'text-[#a3a19b]'
                        }`}
                      >
                        <span>{code} ({CURRENCY_MAP[code].symbol.trim()})</span>
                        {currency === code && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Modal Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#c4c2bc] hover:text-[#d4af37] transition-colors cursor-pointer"
                aria-label="Search Fine Jewelry"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-[#c4c2bc] hover:text-[#d4af37] transition-colors cursor-pointer"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c5a059] text-black text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#c4c2bc] hover:text-[#d4af37] transition-colors cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#d4af37] text-black text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Admin toggle for quick testing */}
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors ${
                  isAdminMode
                    ? 'bg-[#c5a059] text-black border-[#c5a059] font-medium'
                    : 'border-[#2c2c36] text-[#a3a19b] hover:text-white hover:border-[#444455]'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{isAdminMode ? 'Admin View' : 'Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#0f0f13] border-r border-[#262630] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#22222a]">
                <span className="font-serif tracking-[0.25em] text-xl text-white">ZEWARZ</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#a3a19b] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4 text-sm tracking-wider uppercase">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 text-[#e8e6e1] hover:text-[#d4af37]"
                >
                  All Creations
                </button>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.category);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-2 text-[#a3a19b] hover:text-[#d4af37]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#22222a]">
              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-[#181820] border border-[#2e2e38] text-xs text-[#c5a059] flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>{isAdminMode ? 'Switch to Storefront' : 'Open Admin Dashboard'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
