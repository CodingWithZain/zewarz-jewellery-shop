/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HomeView } from './components/HomeView.tsx';
import { ShopView } from './components/ShopView.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { ProductQuickView } from './components/ProductQuickView.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { FakeBuyToast } from './components/FakeBuyToast.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';

function MainRouter() {
  const {
    isAdminMode,
    setIsAdminMode,
    quickViewProduct,
    setQuickViewProduct,
    activePDPProduct,
    setActivePDPProduct,
  } = useStore();

  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);
      if (hash === '#admin') {
        setIsAdminMode(true);
      } else if (isAdminMode && hash !== '#admin') {
        setIsAdminMode(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminMode, setIsAdminMode]);

  // Sync admin mode to hash
  useEffect(() => {
    if (isAdminMode && window.location.hash !== '#admin') {
      window.location.hash = '#admin';
    } else if (!isAdminMode && window.location.hash === '#admin') {
      window.location.hash = '';
    }
  }, [isAdminMode]);

  if (isAdminMode || currentHash === '#admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#09090c] text-[#e8e6e1] selection:bg-[#c5a059] selection:text-black flex flex-col justify-between">
      <div>
        {/* Sticky Header & Mega Menu */}
        <Navbar />

        {/* Dynamic Route View */}
        {currentHash === '#shop' ? <ShopView /> : <HomeView />}
      </div>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {activePDPProduct && (
        <ProductDetailModal
          product={activePDPProduct}
          onClose={() => setActivePDPProduct(null)}
        />
      )}

      {/* Real-time Purchase Social Proof Toast */}
      <FakeBuyToast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
