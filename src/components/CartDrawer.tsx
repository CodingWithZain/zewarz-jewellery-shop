import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    setIsCheckoutOpen,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent?: number; flatDiscount?: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1000;
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? (subtotal * appliedCoupon.discountPercent) / 100
      : appliedCoupon.flatDiscount || 0
    : 0;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'ZEWARZ10') {
      setAppliedCoupon({ code, discountPercent: 10 });
    } else if (code === 'ROYAL50') {
      setAppliedCoupon({ code, flatDiscount: 50 });
    } else {
      setCouponError('Invalid VIP atelier coupon code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f14] border-l border-[#242430] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#1f1f28] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-xl text-white">Your Shopping Bag</h2>
              <span className="text-xs text-[#888] font-mono tabular-nums">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#a3a19b] hover:text-white hover:bg-[#1a1a24]"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real-time Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#14141c] border-b border-[#22222d] text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[#c4c2bc]">
                  Add <span className="text-[#d4af37] font-semibold">{formatPrice(remainingForFreeShipping)}</span> for{' '}
                  <span className="text-white font-medium">Complimentary Armored Courier</span>
                </p>
                <div className="w-full h-1.5 bg-[#252533] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#aa823a] to-[#d4af37] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Unlocked: Complimentary White-Glove Armored Delivery</span>
              </div>
            )}
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-[#333342] mb-3" />
                <h3 className="font-serif text-lg text-white">Your bag is empty</h3>
                <p className="text-xs text-[#888] mt-1 max-w-xs">
                  Explore our handcrafted diamond solitaires, royal emeralds, and polki bridal heirlooms.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-[#c5a059] text-black text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3.5 bg-[#121218] border border-[#20202a]"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-black shrink-0 border border-[#2a2a36]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-serif text-white font-medium line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#666] hover:text-red-400 p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 text-[11px] text-[#999] flex flex-wrap gap-x-2">
                        <span>{item.selectedMaterial.name}</span>
                        {item.selectedSize && <span>· {item.selectedSize}</span>}
                        {item.selectedGemstone && <span>· {item.selectedGemstone.name}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1a1a24]">
                      <div className="flex items-center border border-[#2a2a38]">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#888] hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#888] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-mono font-medium text-white tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#121217] border-t border-[#22222d] space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="VIP Code (e.g. ZEWARZ10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#09090c] border border-[#2a2a36] px-3 py-1.5 text-xs text-white uppercase placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#252533] hover:bg-[#323244] text-xs text-white uppercase tracking-wider font-medium"
                >
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                  <span>VIP Code '{appliedCoupon.code}' Applied!</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs text-[#a3a19b]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#c5a059]">
                    <span>Atelier VIP Privilege</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Armored Shipping</span>
                  <span className="text-white">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? 'Complimentary' : formatPrice(120)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#20202a]">
                  <span>Estimated Total</span>
                  <span className="font-mono text-[#d4af37] text-base tabular-nums">
                    {formatPrice(
                      subtotal -
                        discountAmount +
                        (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 120)
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/10"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-[#666] tracking-wider uppercase">
                <span>Encrypted 256-Bit</span>
                <span aria-hidden="true">·</span>
                <span>Insured Escrow</span>
                <span aria-hidden="true">·</span>
                <span>Discreet Packaging</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
