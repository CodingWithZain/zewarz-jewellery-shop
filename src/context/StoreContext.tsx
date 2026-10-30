import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  CurrencyCode,
  Product,
  CartItem,
  Order,
  ProductCategory,
  FakeBuyNotification,
  ProductMaterial,
  ProductGemstone,
} from '../types.ts';
import { CURRENCY_MAP, INITIAL_PRODUCTS, INITIAL_NOTIFICATIONS } from '../data/products.ts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  currency: CurrencyCode;
  selectedCategory: ProductCategory;
  searchQuery: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isCheckoutOpen: boolean;
  quickViewProduct: Product | null;
  activePDPProduct: Product | null;
  isAdminMode: boolean;
  isAdminAuthenticated: boolean;
  fakeNotificationEnabled: boolean;
  currentFakeNotif: FakeBuyNotification | null;
  
  // Setters & Actions
  setSelectedCategory: (cat: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setActivePDPProduct: (product: Product | null) => void;
  setIsAdminMode: (admin: boolean) => void;
  setIsAdminAuthenticated: (auth: boolean) => void;
  setFakeNotificationEnabled: (enabled: boolean) => void;
  dismissCurrentNotification: () => void;
  triggerTestNotification: () => void;

  // Cart operations
  addToCart: (
    product: Product,
    selectedMaterial?: ProductMaterial,
    selectedSize?: string,
    selectedGemstone?: ProductGemstone,
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;

  // Wishlist operations
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;

  // Checkout & Orders
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Admin Catalog Management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, review: { author: string; location: string; rating: number; title: string; comment: string; selectedMetal?: string }) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ZW-92841',
    date: '2026-10-28',
    customerName: 'Countess Victoria Spencer',
    customerEmail: 'victoria.spencer@kensington.co.uk',
    shippingAddress: {
      fullName: 'Countess Victoria Spencer',
      street: '14 Belgrave Square',
      apartment: 'Penthouse B',
      city: 'London',
      state: 'Greater London',
      postalCode: 'SW1X 8PP',
      country: 'United Kingdom',
      phone: '+44 20 7946 0912',
    },
    items: [
      {
        cartItemId: 'item-1',
        productId: 'zw-03',
        product: INITIAL_PRODUCTS[2],
        selectedMaterial: INITIAL_PRODUCTS[2].materials[0],
        selectedSize: '16 Inch Princess Collar',
        quantity: 1,
        unitPrice: 22800,
      },
    ],
    subtotal: 22800,
    discount: 0,
    shipping: 0,
    insurance: 150,
    tax: 1824,
    total: 24774,
    status: 'Armored Courier Dispatched',
    trackingNumber: 'BRINKS-SEC-994821',
    paymentMethod: 'Amex Centurion Black Card (Stripe)',
  },
  {
    id: 'ord-1002',
    orderNumber: 'ZW-92842',
    date: '2026-10-29',
    customerName: 'Sheikh Tariq Al-Mansoor',
    customerEmail: 'tariq.almansoor@royalholding.ae',
    shippingAddress: {
      fullName: 'Sheikh Tariq Al-Mansoor',
      street: 'Al Wasl Road, Villa 42',
      city: 'Dubai',
      state: 'Dubai',
      postalCode: '00000',
      country: 'United Arab Emirates',
      phone: '+971 4 391 2200',
    },
    items: [
      {
        cartItemId: 'item-2',
        productId: 'zw-02',
        product: INITIAL_PRODUCTS[1],
        selectedMaterial: INITIAL_PRODUCTS[1].materials[0],
        selectedSize: 'Adjustable Zari Choker',
        quantity: 1,
        unitPrice: 14200,
      },
    ],
    subtotal: 14200,
    discount: 1420,
    couponCode: 'ZEWARZ10',
    shipping: 0,
    insurance: 100,
    tax: 639,
    total: 13519,
    status: 'Atelier Crafting',
    trackingNumber: 'MALCA-AMIT-88319',
    paymentMethod: 'Wire Transfer / Certified Escrow',
  },
  {
    id: 'ord-1003',
    orderNumber: 'ZW-92843',
    date: '2026-10-30',
    customerName: 'Harrison Sterling',
    customerEmail: 'harrison.s@sterlingcapital.com',
    shippingAddress: {
      fullName: 'Harrison Sterling',
      street: '740 Park Avenue',
      apartment: 'Floor 16',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States',
      phone: '+1 212 555 0199',
    },
    items: [
      {
        cartItemId: 'item-3',
        productId: 'zw-01',
        product: INITIAL_PRODUCTS[0],
        selectedMaterial: INITIAL_PRODUCTS[0].materials[0],
        selectedSize: 'US 6.5',
        quantity: 1,
        unitPrice: 7300,
      },
      {
        cartItemId: 'item-4',
        productId: 'zw-04',
        product: INITIAL_PRODUCTS[3],
        selectedMaterial: INITIAL_PRODUCTS[3].materials[0],
        selectedSize: 'Small (15 - 16.5cm)',
        quantity: 1,
        unitPrice: 9400,
      },
    ],
    subtotal: 16700,
    discount: 0,
    shipping: 0,
    insurance: 120,
    tax: 1461,
    total: 18281,
    status: 'Processing',
    trackingNumber: 'FEDEX-SECURE-29381',
    paymentMethod: 'Visa Signature (Stripe)',
  },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zewarz_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zewarz_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zewarz_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return ['zw-01', 'zw-02'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zewarz_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return SEED_ORDERS;
  });

  // Currency
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('zewarz_currency') as CurrencyCode;
      if (saved && CURRENCY_MAP[saved]) return saved;
    } catch {
      // Ignore
    }
    return 'USD';
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePDPProduct, setActivePDPProduct] = useState<Product | null>(null);

  // Admin Mode & Auth
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Fake purchase notifications
  const [fakeNotificationEnabled, setFakeNotificationEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('zewarz_notifs_enabled');
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return true;
  });
  const [currentFakeNotif, setCurrentFakeNotif] = useState<FakeBuyNotification | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zewarz_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('zewarz_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('zewarz_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('zewarz_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('zewarz_currency', currency);
    } catch {}
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('zewarz_notifs_enabled', JSON.stringify(fakeNotificationEnabled));
    } catch {}
  }, [fakeNotificationEnabled]);

  // Fake notifications rotation
  useEffect(() => {
    if (!fakeNotificationEnabled) {
      setCurrentFakeNotif(null);
      return;
    }

    let notifIndex = 0;
    // Initial delay so user isn't immediately spammed
    const initialTimer = setTimeout(() => {
      setCurrentFakeNotif(INITIAL_NOTIFICATIONS[0]);
    }, 4000);

    const interval = setInterval(() => {
      notifIndex = (notifIndex + 1) % INITIAL_NOTIFICATIONS.length;
      setCurrentFakeNotif(INITIAL_NOTIFICATIONS[notifIndex]);

      // Auto dismiss after 7 seconds
      setTimeout(() => {
        setCurrentFakeNotif(null);
      }, 7000);
    }, 28000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [fakeNotificationEnabled]);

  const dismissCurrentNotification = () => {
    setCurrentFakeNotif(null);
  };

  const triggerTestNotification = () => {
    const random = INITIAL_NOTIFICATIONS[Math.floor(Math.random() * INITIAL_NOTIFICATIONS.length)];
    setCurrentFakeNotif({
      ...random,
      timeAgo: 'Just now',
    });
  };

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
  };

  const formatPrice = (amountInUSD: number) => {
    const config = CURRENCY_MAP[currency] || CURRENCY_MAP.USD;
    const converted = amountInUSD * config.rate;
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  };

  // Cart operations
  const addToCart = (
    product: Product,
    selectedMaterial?: ProductMaterial,
    selectedSize?: string,
    selectedGemstone?: ProductGemstone,
    quantity = 1
  ) => {
    const material = selectedMaterial || product.materials[0];
    const unitPrice = product.price + (material?.priceDelta || 0) + (selectedGemstone?.priceDelta || 0);
    const cartItemId = `${product.id}-${material?.id || 'base'}-${selectedSize || 'std'}-${selectedGemstone?.id || 'base'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          product,
          selectedMaterial: material,
          selectedSize: selectedSize || (product.sizes ? product.sizes[0] : undefined),
          selectedGemstone,
          quantity,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>) => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `ZW-${randomDigits}`,
      date: new Date().toISOString().split('T')[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const matchingItem = orderData.items.find((item) => item.productId === p.id);
        if (matchingItem) {
          return { ...p, stock: Math.max(0, p.stock - matchingItem.quantity) };
        }
        return p;
      })
    );
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Product mutations for Admin
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `zw-${Date.now().toString().slice(-4)}`;
    const product: Product = {
      ...newProd,
      id,
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    if (activePDPProduct?.id === id) {
      setActivePDPProduct((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (activePDPProduct?.id === id) {
      setActivePDPProduct(null);
    }
  };

  const addReview = (
    productId: string,
    review: { author: string; location: string; rating: number; title: string; comment: string; selectedMetal?: string }
  ) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: review.author,
      location: review.location,
      rating: review.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: review.title,
      comment: review.comment,
      verified: true,
      selectedMetal: review.selectedMetal,
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        const currentReviews = prod.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        const newRating = Number(
          (
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) /
            updatedReviews.length
          ).toFixed(2)
        );
        return {
          ...prod,
          reviews: updatedReviews,
          rating: newRating,
          reviewCount: updatedReviews.length,
        };
      })
    );

    if (activePDPProduct?.id === productId) {
      setActivePDPProduct((prev) => {
        if (!prev) return null;
        const currentReviews = prev.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
        };
      });
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        currency,
        selectedCategory,
        searchQuery,
        priceRange,
        sortBy,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isCheckoutOpen,
        quickViewProduct,
        activePDPProduct,
        isAdminMode,
        isAdminAuthenticated,
        fakeNotificationEnabled,
        currentFakeNotif,
        setSelectedCategory,
        setSearchQuery,
        setPriceRange,
        setSortBy,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsCheckoutOpen,
        setQuickViewProduct,
        setActivePDPProduct,
        setIsAdminMode,
        setIsAdminAuthenticated,
        setFakeNotificationEnabled,
        dismissCurrentNotification,
        triggerTestNotification,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setCurrency,
        formatPrice,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
