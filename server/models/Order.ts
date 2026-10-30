/**
 * Mongoose Schema for ZEWARZ Luxury Client Orders
 * Deployment Target: MongoDB Atlas / Render / Vercel Serverless
 */

export interface IOrderItem {
  productId: string;
  name: string;
  material: string;
  size?: string;
  quantity: number;
  unitPrice: number;
}

export interface IOrder {
  orderNumber: string;
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
  items: IOrderItem[];
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
  stripePaymentIntentId?: string;
  createdAt: Date;
}

export const OrderSchemaDefinition = {
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      material: { type: String, required: true },
      size: { type: String },
      quantity: { type: Number, required: true, min: 1 },
      unitPrice: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  insurance: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  couponCode: { type: String },
  status: {
    type: String,
    enum: ['Processing', 'Atelier Crafting', 'Armored Courier Dispatched', 'Delivered'],
    default: 'Atelier Crafting',
  },
  trackingNumber: { type: String, required: true },
  paymentMethod: { type: String, default: 'Stripe Luxury Vault (Visa Infinite)' },
  stripePaymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now },
};
