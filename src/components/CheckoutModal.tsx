import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { Order } from '../types.ts';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    createOrder,
  } = useStore();

  const [checkoutMode, setCheckoutMode] = useState<'guest' | 'authenticated'>('guest');
  const [formData, setFormData] = useState({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@sovereign.org',
    street: '742 Park Avenue',
    apartment: 'Apt 12B',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
    phone: '+1 212 555 0184',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '884',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shipping = subtotal >= 1000 ? 0 : 120;
  const insurance = Math.round(subtotal * 0.008); // 0.8% high-jewelry transit insurance
  const tax = Math.round(subtotal * 0.08); // 8% sales tax
  const total = subtotal + shipping + insurance + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: formData.fullName,
        customerEmail: formData.email,
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        items: [...cart],
        subtotal,
        discount: 0,
        shipping,
        insurance,
        tax,
        total,
        status: 'Atelier Crafting',
        trackingNumber: `BRINKS-SEC-${Math.floor(100000 + Math.random() * 900000)}`,
        paymentMethod: 'Stripe Luxury Vault (Visa Infinite)',
      });

      setIsProcessing(false);
      setConfirmedOrder(order);
    }, 1800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="relative inline-block w-full max-w-3xl bg-[#0f0f14] border border-[#262634] text-left align-middle shadow-2xl z-10 my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#20202a] bg-[#121218]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-xl text-white">
                {confirmedOrder ? 'Order Confirmed & Insured' : 'Secure Atelier Checkout'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-[#a3a19b] hover:text-white hover:bg-[#1f1f28]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedOrder ? (
            /* Order Success Receipt Screen */
            <div className="p-8 space-y-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#c5a059]/10 border border-[#c5a059] rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white">Your Commission is Confirmed</h3>
                <p className="text-xs text-[#a3a19b] max-w-md mx-auto">
                  A certified dossier receipt has been dispatched to{' '}
                  <span className="text-white font-medium">{confirmedOrder.customerEmail}</span>. Your pieces
                  are now being prepared in the master atelier.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="p-5 bg-[#14141c] border border-[#22222e] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pb-4 border-b border-[#20202a]">
                  <div>
                    <span className="text-[#888] block">Commission Ref:</span>
                    <span className="font-mono text-white font-semibold">{confirmedOrder.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-[#888] block">Status:</span>
                    <span className="text-[#c5a059] font-medium">{confirmedOrder.status}</span>
                  </div>
                  <div>
                    <span className="text-[#888] block">Armored Tracking:</span>
                    <span className="font-mono text-emerald-400 font-medium">
                      {confirmedOrder.trackingNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#888] block">Total Settled:</span>
                    <span className="font-mono text-white font-bold">
                      {formatPrice(confirmedOrder.total)}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#c5a059] font-medium mb-2">
                    Acquisition Manifest
                  </h4>
                  <div className="space-y-2">
                    {confirmedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-[#b8b6af]">
                        <span>
                          {item.quantity}× {item.product.name} ({item.selectedMaterial.name})
                        </span>
                        <span className="font-mono text-white tabular-nums">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#20202a] text-xs text-[#888] flex items-center justify-between">
                  <span>Shipping Address: {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}</span>
                  <span>Discreet Wax-Sealed Courier</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#d4af37]"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCompletePayment} className="p-6 md:p-8 space-y-6">
              {/* Checkout Type Selector: Guest vs Authenticated */}
              <div className="flex items-center gap-2 p-1 bg-[#14141c] border border-[#22222d] w-fit">
                <button
                  type="button"
                  onClick={() => setCheckoutMode('guest')}
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                    checkoutMode === 'guest'
                      ? 'bg-[#22222e] text-white font-medium'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  Guest Checkout
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutMode('authenticated')}
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                    checkoutMode === 'authenticated'
                      ? 'bg-[#22222e] text-white font-medium'
                      : 'text-[#888] hover:text-white'
                  }`}
                >
                  VIP Collector Account
                </button>
              </div>

              {/* Delivery Details */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                  1. Armored Courier Delivery Coordinates
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[#999] uppercase mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-[#121218] border border-[#2a2a36] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#999] uppercase mb-1">Email Dossier Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#121218] border border-[#2a2a36] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#999] uppercase mb-1">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full bg-[#121218] border border-[#2a2a36] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#999] uppercase mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#121218] border border-[#2a2a36] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#999] uppercase mb-1">State / Postal Code</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="bg-[#121218] border border-[#2a2a36] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="bg-[#121218] border border-[#2a2a36] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details (Stripe Mockup) */}
              <div className="space-y-4 pt-4 border-t border-[#1f1f28]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>2. Encrypted Payment Vault</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#888]">
                    <Lock className="w-3 h-3 text-[#c5a059]" />
                    <span>Stripe 256-Bit TLS</span>
                  </div>
                </div>

                <div className="p-4 bg-[#121218] border border-[#2a2a36] space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#999] uppercase mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0d] border border-[#262632] px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#999] uppercase mb-1">Expires (MM/YY)</label>
                      <input
                        type="text"
                        name="cardExp"
                        required
                        value={formData.cardExp}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0d] border border-[#262632] px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#999] uppercase mb-1">Security CVC</label>
                      <input
                        type="password"
                        name="cardCvc"
                        required
                        maxLength={4}
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0d] border border-[#262632] px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="p-4 bg-[#14141c] border border-[#22222d] space-y-2 text-xs">
                <div className="flex justify-between text-[#888]">
                  <span>Atelier Subtotal</span>
                  <span className="font-mono text-white tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Armored Transport Courier</span>
                  <span className="text-white">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Lloyd's Transit Insurance (0.8%)</span>
                  <span className="font-mono text-white tabular-nums">{formatPrice(insurance)}</span>
                </div>
                <div className="flex justify-between text-[#888]">
                  <span>Estimated Tax</span>
                  <span className="font-mono text-white tabular-nums">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#22222d]">
                  <span>Total Due</span>
                  <span className="font-mono text-[#d4af37] text-base tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#c5a059] hover:bg-[#d4af37] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/10"
              >
                {isProcessing ? (
                  <span>Authorizing Encrypted Escrow...</span>
                ) : (
                  <>
                    <span>Authorize Payment & Secure Commission</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
