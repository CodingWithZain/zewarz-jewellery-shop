/**
 * Mongoose Schema for ZEWARZ Luxury Products
 * Deployment Target: MongoDB Atlas / Render / Vercel Serverless
 */

export interface IProductMaterial {
  id: string;
  name: string;
  priceDelta: number;
  colorHex: string;
}

export interface IProductReview {
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  selectedMetal?: string;
}

export interface IProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'solitaires' | 'necklaces' | 'bridal' | 'bracelets' | 'earrings' | 'rings';
  price: number;
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
  materials: IProductMaterial[];
  sizes?: string[];
  stock: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  reviews?: IProductReview[];
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchemaDefinition = {
  name: { type: String, required: true, trim: true },
  subtitle: { type: String, required: true },
  category: {
    type: String,
    enum: ['solitaires', 'necklaces', 'bridal', 'bracelets', 'earrings', 'rings'],
    required: true,
  },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  badge: { type: String },
  description: { type: String, required: true },
  details: [{ type: String }],
  craftsmanship: { type: String },
  caratWeight: { type: String, required: true },
  diamondClarity: { type: String, required: true },
  certification: {
    type: String,
    enum: ['GIA Certified', 'IGI Certified', 'Bespoke Atelier Seal'],
    default: 'GIA Certified',
  },
  images: [{ type: String, required: true }],
  materials: [
    {
      id: String,
      name: String,
      priceDelta: Number,
      colorHex: String,
    },
  ],
  sizes: [{ type: String }],
  stock: { type: Number, required: true, default: 1, min: 0 },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  reviews: [
    {
      author: String,
      location: String,
      rating: Number,
      date: String,
      title: String,
      comment: String,
      verified: Boolean,
      selectedMetal: String,
    },
  ],
};
