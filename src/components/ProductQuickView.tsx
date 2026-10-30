import React, { useState } from 'react';
import { X, Check, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product, ProductMaterial } from '../types.ts';
import { useStore } from '../context/StoreContext.tsx';

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const { formatPrice, addToCart, setActivePDPProduct } = useStore();
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial>(
    product.materials[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);

  const calculatedPrice = product.price + selectedMaterial.priceDelta;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#111116] border border-[#292936] shadow-2xl z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 text-[#a3a19b] hover:text-white bg-[#0b0b0e]/80"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-[4/3] sm:aspect-auto h-full min-h-[280px] bg-[#0c0c0e]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-[#d4af37] bg-[#0c0c0e]/90 px-2 py-0.5 border border-[#2a2a34]">
                {product.badge}
              </div>
            )}
          </div>

          {/* Details & Fast Variant Selector */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium">
                {product.category} · {product.certification}
              </div>
              <h3 className="font-serif text-xl text-white mt-1 font-normal leading-snug">
                {product.name}
              </h3>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#a3a19b]">
                <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
                <span className="font-mono text-white tabular-nums">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 text-xl font-bold font-mono text-white tabular-nums">
                {formatPrice(calculatedPrice)}
              </div>

              {/* Metal Selection */}
              <div className="mt-4">
                <span className="text-[11px] uppercase tracking-wider text-[#888] block mb-1.5">
                  Metal: {selectedMaterial.name}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`px-2.5 py-1 text-xs border transition-colors flex items-center gap-1.5 ${
                        selectedMaterial.id === mat.id
                          ? 'border-[#c5a059] bg-[#1d1d28] text-white'
                          : 'border-[#292936] text-[#a3a19b] hover:border-[#444]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <span>{mat.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#888] block mb-1.5">
                    Size: {selectedSize}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 4).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-2 py-1 text-[11px] border ${
                          selectedSize === sz
                            ? 'border-[#c5a059] bg-[#1d1d28] text-[#d4af37]'
                            : 'border-[#292936] text-[#a3a19b]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2">
              <button
                onClick={() => {
                  addToCart(product, selectedMaterial, selectedSize, undefined, quantity);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setActivePDPProduct(product);
                }}
                className="w-full py-2 text-xs text-[#a3a19b] hover:text-white transition-colors underline underline-offset-4"
              >
                View Full Atelier Dossier & Zoom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
