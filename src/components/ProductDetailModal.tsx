import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Check,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Award,
  Send,
  MessageSquare,
} from 'lucide-react';
import { Product, ProductMaterial, ProductGemstone } from '../types.ts';
import { useStore } from '../context/StoreContext.tsx';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    addReview,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial>(
    product.materials[0] || { id: 'std', name: '18K Yellow Gold', priceDelta: 0, colorHex: '#eab308' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : 'Standard Atelier Fit'
  );
  const [selectedGemstone, setSelectedGemstone] = useState<ProductGemstone | undefined>(
    product.gemstones ? product.gemstones[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  // Zoom Loupe State
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Delivery Calculator State
  const [postalInput, setPostalInput] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null);

  // Review Submission State
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Dynamic calculated price
  const dynamicPrice = useMemo(() => {
    return product.price + selectedMaterial.priceDelta + (selectedGemstone?.priceDelta || 0);
  }, [product.price, selectedMaterial, selectedGemstone]);

  const isFavorited = isInWishlist(product.id);

  // Handle Zoom Loupe
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Calculate estimated delivery
  const handleCalculateDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalInput.trim()) return;
    const today = new Date();
    // Delivery in 3 to 5 business days
    const minDays = 3;
    const maxDays = 5;
    const minDate = new Date(today.getTime() + minDays * 24 * 60 * 60 * 1000);
    const maxDate = new Date(today.getTime() + maxDays * 24 * 60 * 60 * 1000);

    const minFormatted = minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const maxFormatted = maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setEstimatedDelivery(`Armored White-Glove Courier arrives ${minFormatted} – ${maxFormatted}`);
  };

  // Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment || !reviewTitle) return;
    addReview(product.id, {
      author: reviewName,
      location: reviewLocation || 'Verified Collector',
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      selectedMetal: selectedMaterial.name,
    });
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewFormOpen(false);
      setReviewSubmitted(false);
      setReviewComment('');
      setReviewTitle('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#0f0f13] border border-[#262632] shadow-2xl z-10 my-auto flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0f0f13]/95 backdrop-blur-md border-b border-[#22222d]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9d9b94]">
            <span>ZEWARZ Haute Joaillerie</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#c5a059]">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a3a19b] hover:text-white rounded-none hover:bg-[#1a1a24] transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout: Gallery on Left, Contiguous Purchase Module on Right */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery Column (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Interactive Zoomable Canvas */}
            <div
              className="relative aspect-[4/3] w-full overflow-hidden bg-[#0c0c0e] border border-[#22222c] cursor-crosshair group"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center select-none"
                referrerPolicy="no-referrer"
              />

              {/* Magnifier Inspection Loupe */}
              {isZooming && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    backgroundImage: `url(${product.images[activeImageIndex] || product.images[0]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '250%',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}

              {/* Zoom hint badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0c0c0e]/80 backdrop-blur-sm px-2.5 py-1 text-[11px] text-[#a3a19b] border border-[#22222c] pointer-events-none group-hover:opacity-0 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Hover to magnify 2.5×</span>
              </div>
            </div>

            {/* Thumbnail Multi-Angle Navigation */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 bg-[#0c0c0e] border overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                        : 'border-[#22222c] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Craftsmanship & Details Accordion */}
            <div className="mt-4 pt-6 border-t border-[#1f1f28] space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-2">
                  Atelier Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#121217] p-3.5 border border-[#22222c]">
                  <div>
                    <span className="text-[#888]">Carat Weight:</span>
                    <p className="text-white font-medium mt-0.5">{product.caratWeight}</p>
                  </div>
                  <div>
                    <span className="text-[#888]">Clarity & Cut:</span>
                    <p className="text-white font-medium mt-0.5">{product.diamondClarity}</p>
                  </div>
                  <div>
                    <span className="text-[#888]">Gemological Report:</span>
                    <p className="text-white font-medium mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{product.certification}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[#888]">Vault Availability:</span>
                    <p className="text-emerald-400 font-medium mt-0.5">
                      {product.stock > 0 ? `${product.stock} Handcrafted Left` : 'Custom Order Only'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-1.5">
                  Artisanal Heritage
                </h4>
                <p className="text-xs text-[#b8b6af] leading-relaxed font-light">
                  {product.craftsmanship}
                </p>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Product Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                {product.name}
              </h2>
              <p className="mt-1 text-xs text-[#9d9b94] font-light leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating summary */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <div className="flex text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#d4af37]'
                          : 'text-[#444]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-white tabular-nums">{product.rating}</span>
                <span className="text-[#666]">({product.reviewCount} verified reviews)</span>
              </div>

              {/* Dynamic Price Calculation */}
              <div className="mt-6 p-4 bg-[#14141a] border border-[#22222d] flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#888] block uppercase tracking-wider">
                    Calculated Investment
                  </span>
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    {formatPrice(dynamicPrice)}
                  </span>
                </div>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#666] line-through font-mono tabular-nums">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Variant Selector 1: Precious Metal */}
              <div className="mt-6">
                <label className="block text-xs uppercase tracking-wider text-[#c4c2bc] mb-2 font-medium">
                  Precious Metal Selection: <span className="text-white">{selectedMaterial.name}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`py-2 px-3 text-left border text-xs transition-all flex items-center justify-between ${
                        selectedMaterial.id === mat.id
                          ? 'border-[#c5a059] bg-[#1a1a24] text-white shadow-sm'
                          : 'border-[#22222d] bg-[#111116] text-[#a3a19b] hover:border-[#383848]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-black/40"
                          style={{ backgroundColor: mat.colorHex }}
                        />
                        <span className="truncate">{mat.name}</span>
                      </div>
                      {selectedMaterial.id === mat.id && (
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant Selector 2: Size / Profile */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-[#c4c2bc] font-medium">
                      Select Size: <span className="text-white">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-[#c5a059] cursor-pointer hover:underline">
                      Sizing Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-1.5 px-3 border text-xs transition-colors ${
                          selectedSize === sz
                            ? 'border-[#c5a059] bg-[#1c1c26] text-[#d4af37] font-medium'
                            : 'border-[#22222d] bg-[#111116] text-[#a3a19b] hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selector 3: Gemstone Grade Option (if applicable) */}
              {product.gemstones && product.gemstones.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-wider text-[#c4c2bc] mb-2 font-medium">
                    Center Gemstone: <span className="text-white">{selectedGemstone?.name}</span>
                  </label>
                  <div className="space-y-1.5">
                    {product.gemstones.map((gem) => (
                      <button
                        key={gem.id}
                        onClick={() => setSelectedGemstone(gem)}
                        className={`w-full py-2 px-3 border text-xs text-left flex items-center justify-between transition-colors ${
                          selectedGemstone?.id === gem.id
                            ? 'border-[#c5a059] bg-[#1a1a24] text-white'
                            : 'border-[#22222d] bg-[#111116] text-[#a3a19b] hover:border-[#333342]'
                        }`}
                      >
                        <span>{gem.name}</span>
                        <span className="font-mono text-white/80">
                          {gem.priceDelta === 0 ? 'Included' : `+${formatPrice(gem.priceDelta)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock Health */}
              <div className="mt-5 flex items-center justify-between pt-4 border-t border-[#1f1f28]">
                <div className="flex items-center border border-[#262632] bg-[#121217]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-xs text-[#a3a19b] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 text-xs text-[#a3a19b] hover:text-white"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Vault Ready: {product.stock} units left</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => {
                    addToCart(product, selectedMaterial, selectedSize, selectedGemstone, quantity);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/10"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Shopping Bag</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, selectedMaterial, selectedSize, selectedGemstone, quantity);
                      onClose();
                      setIsCheckoutOpen(true);
                    }}
                    className="flex-1 py-3 bg-[#181822] hover:bg-[#222230] text-white border border-[#303040] text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Direct Checkout
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 border transition-colors ${
                      isFavorited
                        ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#d4af37]'
                        : 'border-[#303040] text-[#a3a19b] hover:text-white'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Armored Delivery Calculator */}
              <div className="mt-6 p-3.5 bg-[#121217] border border-[#22222d] text-xs">
                <div className="flex items-center gap-1.5 text-[#c4c2bc] font-medium mb-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Estimate Armored Delivery Date</span>
                </div>
                <form onSubmit={handleCalculateDelivery} className="flex gap-2">
                  <input
                    type="text"
                    value={postalInput}
                    onChange={(e) => setPostalInput(e.target.value)}
                    placeholder="Enter City or Postal Code"
                    className="flex-1 bg-[#0b0b0e] border border-[#2a2a36] px-2.5 py-1.5 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#252532] hover:bg-[#333344] text-white text-xs font-medium uppercase"
                  >
                    Check
                  </button>
                </form>
                {estimatedDelivery && (
                  <p className="mt-2 text-emerald-400 text-[11px]">{estimatedDelivery}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Ratings Section */}
        <div className="p-6 md:p-8 bg-[#0c0c0f] border-t border-[#1f1f28]">
          <div className="flex items-center justify-between pb-4 border-b border-[#1f1f28]">
            <div>
              <h3 className="font-serif text-xl text-white">Client Testimonials & Appraisals</h3>
              <p className="text-xs text-[#888] mt-0.5">
                Verified collectors and bridal client experiences
              </p>
            </div>
            <button
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="py-2 px-3.5 border border-[#c5a059] text-xs text-[#d4af37] hover:bg-[#c5a059]/10 transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Write Appraisal</span>
            </button>
          </div>

          {/* Interactive Review Form */}
          {isReviewFormOpen && (
            <form onSubmit={handleSubmitReview} className="mt-4 p-4 bg-[#14141a] border border-[#262634] space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-white font-medium">Submit Client Review</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="bg-[#0c0c0f] border border-[#2a2a36] p-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
                />
                <input
                  type="text"
                  placeholder="City, Country (e.g. Zurich, Switzerland)"
                  value={reviewLocation}
                  onChange={(e) => setReviewLocation(e.target.value)}
                  className="bg-[#0c0c0f] border border-[#2a2a36] p-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#a3a19b]">Rating:</span>
                <div className="flex gap-1 text-[#d4af37]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= reviewRating ? 'fill-[#d4af37]' : 'text-[#444]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                required
                placeholder="Review Title (e.g. Exquisite craftsmanship and fire)"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full bg-[#0c0c0f] border border-[#2a2a36] p-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
              />

              <textarea
                required
                rows={3}
                placeholder="Share your experience regarding the stone quality, luster, delivery, and setting..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-[#0c0c0f] border border-[#2a2a36] p-2 text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#c5a059]"
              />

              {reviewSubmitted ? (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Your appraisal has been authenticated and added!</span>
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen(false)}
                    className="py-1.5 px-3 text-xs text-[#a3a19b] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-1.5 px-4 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase"
                  >
                    Post Appraisal
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Review List */}
          <div className="mt-6 space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#111116] border border-[#1f1f28]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{rev.author}</span>
                      <span aria-hidden="true" className="text-[#444]">·</span>
                      <span className="text-[11px] text-[#888]">{rev.location}</span>
                    </div>
                    <div className="flex text-[#d4af37]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating ? 'fill-[#d4af37]' : 'text-[#444]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#c5a059] mb-1.5">
                    {rev.verified && 'Verified Acquisition'} {rev.selectedMetal && `· Setting: ${rev.selectedMetal}`}
                  </div>
                  <h5 className="text-xs font-semibold text-white/90">{rev.title}</h5>
                  <p className="mt-1 text-xs text-[#b8b6af] font-light leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#777]">No client appraisals recorded yet for this atelier reference.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
