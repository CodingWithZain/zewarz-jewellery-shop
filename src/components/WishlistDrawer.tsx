import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setActivePDPProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f14] border-l border-[#242430] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#1f1f28] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-xl text-white">Your Saved Curations</h2>
              <span className="text-xs text-[#888] font-mono tabular-nums">
                ({favoritedProducts.length})
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#a3a19b] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favoritedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <Heart className="w-12 h-12 text-[#2a2a36] mb-3" />
                <h3 className="font-serif text-lg text-white">No pieces saved yet</h3>
                <p className="text-xs text-[#888] mt-1 max-w-xs">
                  Save pieces while exploring our bespoke high-jewelry vaults for future consultations.
                </p>
              </div>
            ) : (
              favoritedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-4 p-3.5 bg-[#121218] border border-[#20202a]"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-20 h-20 object-cover bg-black shrink-0 border border-[#2a2a36] cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setActivePDPProduct(p);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setActivePDPProduct(p);
                          }}
                          className="text-xs font-serif text-white font-medium line-clamp-1 hover:text-[#d4af37] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-[#666] hover:text-red-400 p-0.5"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#888]">{p.certification}</div>
                      <div className="mt-1 font-mono text-xs font-semibold text-white">
                        {formatPrice(p.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(p, p.materials[0]);
                        setIsWishlistOpen(false);
                      }}
                      className="mt-2 py-1.5 px-3 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move To Bag</span>
                    </button>
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
