export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'PKR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to 1 USD
  name: string;
}

export type ProductCategory =
  | 'all'
  | 'solitaires'
  | 'necklaces'
  | 'bridal'
  | 'bracelets'
  | 'earrings'
  | 'rings';

export interface ProductMaterial {
  id: string;
  name: string;
  priceDelta: number;
  colorHex: string;
}

export interface ProductGemstone {
  id: string;
  name: string;
  priceDelta: number;
  colorHex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  selectedMetal?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'solitaires' | 'necklaces' | 'bridal' | 'bracelets' | 'earrings' | 'rings';
  price: number; // Base USD price
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  details: string[];
  craftsmanship: string;
  caratWeight: string;
  diamondClarity: string;
  certification: 'GIA Certified' | 'IGI Certified' | 'Bespoke Atelier Seal';
  images: string[];
  materials: ProductMaterial[];
  sizes?: string[];
  gemstones?: ProductGemstone[];
  stock: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  selectedMaterial: ProductMaterial;
  selectedSize?: string;
  selectedGemstone?: ProductGemstone;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  insurance: number;
  tax: number;
  total: number;
  couponCode?: string;
  status: 'Processing' | 'Atelier Crafting' | 'Armored Courier Dispatched' | 'Delivered';
  trackingNumber: string;
  paymentMethod: string;
}

export interface FakeBuyNotification {
  id: string;
  customerName: string;
  cityCountry: string;
  productTitle: string;
  productImage: string;
  timeAgo: string;
  verifiedPurchase: boolean;
}
