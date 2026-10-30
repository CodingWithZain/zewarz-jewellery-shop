import { Router, Request, Response } from 'express';
import { INITIAL_PRODUCTS } from '../../src/data/products.ts';

const router = Router();

// In-Memory Database store with seed data for instant reliability
let productsDb = [...INITIAL_PRODUCTS];
let ordersDb: any[] = [];

/**
 * GET /api/products
 * Query Params: category, minPrice, maxPrice, sortBy, search
 */
router.get('/products', (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, sortBy, search } = req.query;

  let results = [...productsDb];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (minPrice) {
    results = results.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'price-asc') {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    results.sort((a, b) => b.id.localeCompare(a.id));
  }

  res.json({
    success: true,
    count: results.length,
    data: results,
  });
});

/**
 * GET /api/products/:id
 */
router.get('/products/:id', (req: Request, res: Response) => {
  const product = productsDb.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Vault reference not found' });
  }
  res.json({ success: true, data: product });
});

/**
 * POST /api/products (Admin Only)
 */
router.post('/products', (req: Request, res: Response) => {
  const newProduct = {
    ...req.body,
    id: `zw-${Date.now().toString().slice(-4)}`,
  };
  productsDb.unshift(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

/**
 * PUT /api/products/:id (Admin Only)
 */
router.put('/products/:id', (req: Request, res: Response) => {
  const index = productsDb.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Vault reference not found' });
  }
  productsDb[index] = { ...productsDb[index], ...req.body };
  res.json({ success: true, data: productsDb[index] });
});

/**
 * DELETE /api/products/:id (Admin Only)
 */
router.delete('/products/:id', (req: Request, res: Response) => {
  productsDb = productsDb.filter((p) => p.id !== req.params.id);
  res.json({ success: true, message: 'Reference archived from active vault' });
});

/**
 * POST /api/orders (Commission Creation)
 */
router.post('/orders', (req: Request, res: Response) => {
  const orderNumber = `ZW-${Math.floor(10000 + Math.random() * 90000)}`;
  const trackingNumber = `BRINKS-SEC-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    ...req.body,
    id: `ord-${Date.now()}`,
    orderNumber,
    trackingNumber,
    date: new Date().toISOString().split('T')[0],
    status: 'Atelier Crafting',
  };

  ordersDb.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

/**
 * GET /api/orders (Admin Only)
 */
router.get('/orders', (_req: Request, res: Response) => {
  res.json({ success: true, count: ordersDb.length, data: ordersDb });
});

/**
 * PUT /api/orders/:id/status
 */
router.put('/orders/:id/status', (req: Request, res: Response) => {
  const order = ordersDb.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Commission dossier not found' });
  }
  order.status = req.body.status;
  res.json({ success: true, data: order });
});

/**
 * POST /api/checkout/stripe-intent (Stripe Vault Mock)
 */
router.post('/checkout/stripe-intent', (req: Request, res: Response) => {
  const { amount, currency = 'usd' } = req.body;
  res.json({
    success: true,
    clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`,
    amount,
    currency,
    status: 'requires_payment_method',
  });
});

/**
 * POST /api/auth/login
 */
router.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === 'admin@zewarz.org' || password === 'admin123' || password === 'sovereign') {
    return res.json({
      success: true,
      token: 'jwt_mock_token_admin_atelier_sovereign',
      user: {
        email: 'admin@zewarz.org',
        fullName: 'Principal Curator',
        role: 'admin',
      },
    });
  }

  res.json({
    success: true,
    token: 'jwt_mock_token_vip_client',
    user: {
      email,
      fullName: 'VIP Collector',
      role: 'user',
    },
  });
});

export default router;
