import React from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const FakeBuyToast: React.FC = () => {
  const { currentFakeNotif, dismissCurrentNotification, setActivePDPProduct, products } = useStore();

  if (!currentFakeNotif) return null;

  const matchingProduct = products.find(
    (p) => p.name.toLowerCase() === currentFakeNotif.productTitle.toLowerCase()
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-[#121217]/95 backdrop-blur-md border border-[#2a2a36] shadow-2xl p-3.5 flex items-center gap-3.5 relative group hover:border-[#c5a059]/60 transition-colors">
        {/* Product Image Thumbnail */}
        <div className="w-13 h-13 shrink-0 bg-[#08080a] border border-[#262632] overflow-hidden">
          <img
            src={currentFakeNotif.productImage}
            alt={currentFakeNotif.productTitle}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Info */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => {
            if (matchingProduct) setActivePDPProduct(matchingProduct);
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-[#c5a059] uppercase tracking-wider font-medium">
            <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
            <span>Verified Commission</span>
          </div>
          <p className="text-xs text-white font-medium truncate mt-0.5">
            {currentFakeNotif.customerName}{' '}
            <span className="text-[#888] font-light">from {currentFakeNotif.cityCountry}</span>
          </p>
          <p className="text-[11px] text-[#b8b6af] truncate hover:text-[#d4af37] transition-colors">
            {currentFakeNotif.productTitle}
          </p>
          <span className="text-[10px] text-[#666] font-mono tabular-nums block mt-0.5">
            {currentFakeNotif.timeAgo}
          </span>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={dismissCurrentNotification}
          className="text-[#666] hover:text-white p-1 self-start"
          aria-label="Dismiss purchase notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
