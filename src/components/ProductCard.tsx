import React from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../types.ts';
import { useStore } from '../context/StoreContext.tsx';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setActivePDPProduct,
    addToCart,
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  return (
    <article
      className="group relative flex flex-col bg-[#111115] border border-[#1f1f26] hover:border-[#383844] transition-all duration-300"
      onClick={() => setActivePDPProduct(product)}
    >
      {/* Visual Image Container (65-75% height) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0c0c0e]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet Subtle Badge (Single text label, not a pill) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 text-[11px] uppercase tracking-wider text-[#d4af37] bg-[#0c0c0e]/85 backdrop-blur-sm px-2.5 py-1 border border-[#2a2a34]">
            {product.badge}
          </div>
        )}

        {/* Top-Right Quick Action: Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorited
              ? 'bg-[#c5a059] text-black'
              : 'bg-[#0c0c0e]/70 text-[#c4c2bc] hover:text-white hover:bg-black'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Action Bar: Quick View */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-[#181820]/95 hover:bg-[#252530] text-xs font-medium text-white tracking-wider uppercase border border-[#333342] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Quick View</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.materials[0]);
            }}
            className="p-2 bg-[#c5a059] hover:bg-[#d4af37] text-black transition-colors cursor-pointer"
            aria-label="Add to shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Metadata & Information */}
      <div className="flex flex-col flex-1 p-5">
        {/* Unboxed Metadata (Anti-slop rule) */}
        <div className="flex items-center gap-2 text-xs text-[#8f8d86] tracking-wider uppercase mb-1.5 font-light">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{product.certification}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg text-white font-normal group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Subtitle / Key Specs */}
        <p className="mt-1 text-xs text-[#9d9b94] font-light line-clamp-1">
          {product.subtitle}
        </p>

        {/* Pricing & Stock Alignment */}
        <div className="mt-4 pt-3 border-t border-[#1f1f26] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-white tracking-wide font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#6e6c65] line-through font-mono tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Stock or Rating indicator */}
          <div className="flex items-center gap-1 text-xs text-[#b8b6af]">
            <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            <span className="font-mono tabular-nums">{product.rating}</span>
            <span className="text-[#666]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
