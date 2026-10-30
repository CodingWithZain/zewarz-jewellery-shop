/**
 * Mongoose Schema for ZEWARZ User & Admin Authentication
 * Deployment Target: MongoDB Atlas / Render / Vercel Serverless
 */

export interface IUser {
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'user' | 'admin' | 'atelier_manager';
  wishlist: string[];
  orders: string[];
  createdAt: Date;
}

export const UserSchemaDefinition = {
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'atelier_manager'],
    default: 'user',
  },
  wishlist: [{ type: String }],
  orders: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
};
