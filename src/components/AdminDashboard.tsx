import React, { useState } from 'react';
import {
  Shield,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Bell,
  Eye,
  CheckCircle,
  Truck,
  Sparkles,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { Product, Order } from '../types.ts';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    formatPrice,
    setIsAdminMode,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    fakeNotificationEnabled,
    setFakeNotificationEnabled,
    triggerTestNotification,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'catalog' | 'orders' | 'marketing'>('analytics');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('solitaires');
  const [newPrice, setNewPrice] = useState(5400);
  const [newStock, setNewStock] = useState(3);
  const [newCarat, setNewCarat] = useState('2.50 Carats');
  const [newClarity, setNewClarity] = useState('VVS1 / D-Color');
  const [newCertification, setNewCertification] = useState<Product['certification']>('GIA Certified');

  // Computed metrics
  const totalRevenue = orders.reduce((acc, ord) => acc + ord.total, 0) + 428000; // Seeded enterprise historical revenue
  const totalOrdersCount = orders.length + 320;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);
  const totalVaultPieces = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock <= 2);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: editingProduct.name,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock),
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: newTitle || 'The Celestial Emerald Solitaire',
        subtitle: newSubtitle || 'Rare 2.50ct Vivid Emerald in 18k Yellow Gold',
        category: newCategory,
        price: Number(newPrice),
        rating: 5.0,
        reviewCount: 1,
        badge: 'New Commission',
        description: 'Bespoke creation handcrafted in our high jewelry atelier.',
        details: [
          `Center Stone: ${newCarat}`,
          `Clarity & Color: ${newClarity}`,
          `Certification: ${newCertification}`,
        ],
        craftsmanship: 'Hand-forged over 50 artisan hours in solid 18k gold.',
        caratWeight: newCarat,
        diamondClarity: newClarity,
        certification: newCertification,
        images: ['/src/assets/images/product_solitaire_diamond_ring_1793376452208.jpg'],
        materials: [
          { id: 'yg18', name: '18K Royal Yellow Gold', priceDelta: 0, colorHex: '#eab308' },
          { id: 'plat', name: '950 Solid Platinum', priceDelta: 400, colorHex: '#e5e7eb' },
        ],
        sizes: ['US 6.0', 'US 6.5', 'US 7.0'],
        stock: Number(newStock),
        isFeatured: true,
      });
      setIsAddModalOpen(false);
      setNewTitle('');
      setNewSubtitle('');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090c] text-[#e8e6e1] pb-16">
      {/* Admin Top Navigation */}
      <div className="bg-[#101015] border-b border-[#20202a] px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminMode(false)}
              className="flex items-center gap-1.5 text-xs text-[#a3a19b] hover:text-white px-2.5 py-1.5 border border-[#2a2a36] bg-[#14141c]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return To Boutique</span>
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#c5a059]" />
              <span className="font-serif tracking-widest text-lg text-white font-medium">
                ZEWARZ EXECUTIVE ATELIER CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Vault Escrow Synchronized
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#20202a] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'analytics'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#888] hover:text-white bg-[#14141c]'
            }`}
          >
            Executive Analytics
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'catalog'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#888] hover:text-white bg-[#14141c]'
            }`}
          >
            Vault Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#888] hover:text-white bg-[#14141c]'
            }`}
          >
            Client Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'marketing'
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#888] hover:text-white bg-[#14141c]'
            }`}
          >
            Social Proof & Notifications
          </button>
        </div>

        {/* Tab 1: Executive Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#121218] border border-[#20202a]">
                <div className="flex items-center justify-between text-xs text-[#888] uppercase tracking-wider">
                  <span>Gross Atelier Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div className="mt-3 text-2xl font-bold font-mono text-white tabular-nums">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="mt-1 text-[11px] text-emerald-400 font-mono">
                  +18.4% compared to previous quarter
                </div>
              </div>

              <div className="p-5 bg-[#121218] border border-[#20202a]">
                <div className="flex items-center justify-between text-xs text-[#888] uppercase tracking-wider">
                  <span>Total Commissions</span>
                  <Package className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div className="mt-3 text-2xl font-bold font-mono text-white tabular-nums">
                  {totalOrdersCount}
                </div>
                <div className="mt-1 text-[11px] text-[#888]">
                  All insured & GIA authenticated
                </div>
              </div>

              <div className="p-5 bg-[#121218] border border-[#20202a]">
                <div className="flex items-center justify-between text-xs text-[#888] uppercase tracking-wider">
                  <span>Average Commission Value</span>
                  <TrendingUp className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div className="mt-3 text-2xl font-bold font-mono text-white tabular-nums">
                  {formatPrice(avgOrderValue)}
                </div>
                <div className="mt-1 text-[11px] text-[#888]">
                  Haute joaillerie tier baseline
                </div>
              </div>

              <div className="p-5 bg-[#121218] border border-[#20202a]">
                <div className="flex items-center justify-between text-xs text-[#888] uppercase tracking-wider">
                  <span>Active Vault Pieces</span>
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                </div>
                <div className="mt-3 text-2xl font-bold font-mono text-white tabular-nums">
                  {totalVaultPieces} Units
                </div>
                <div className="mt-1 text-[11px] text-amber-400">
                  {lowStockProducts.length} pieces near exhaustion
                </div>
              </div>
            </div>

            {/* Low-Stock Alert Banner */}
            {lowStockProducts.length > 0 && (
              <div className="p-4 bg-amber-950/20 border border-amber-800/60 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    Atelier Vault Low Inventory Warning
                  </h4>
                  <p className="text-xs text-[#c4c2bc] mt-0.5">
                    The following high-jewelry references have 2 or fewer units in stock. Consider dispatching new artisan casting directives:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lowStockProducts.map((p) => (
                      <span
                        key={p.id}
                        className="text-[11px] bg-[#14141c] text-white px-2.5 py-1 border border-[#333]"
                      >
                        {p.name} ({p.stock} left)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Vault Catalog Management */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-white">High Jewelry Master Catalog</h3>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            <div className="overflow-x-auto bg-[#121218] border border-[#20202a]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181822] text-[#888] uppercase tracking-wider border-b border-[#20202a]">
                  <tr>
                    <th className="p-3.5">Piece</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Carat & Clarity</th>
                    <th className="p-3.5">Base Investment</th>
                    <th className="p-3.5">Vault Stock</th>
                    <th className="p-3.5">Certification</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e28]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#161620] transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 object-cover bg-black border border-[#2a2a36]"
                        />
                        <div>
                          <div className="font-medium text-white line-clamp-1">{p.name}</div>
                          <div className="text-[11px] text-[#777]">{p.id}</div>
                        </div>
                      </td>
                      <td className="p-3.5 uppercase text-[#a3a19b]">{p.category}</td>
                      <td className="p-3.5 text-white/90">{p.caratWeight}</td>
                      <td className="p-3.5 font-mono text-white tabular-nums font-medium">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`font-mono tabular-nums ${
                            p.stock <= 2 ? 'text-amber-400 font-bold' : 'text-emerald-400'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3.5 text-[#c5a059]">{p.certification}</td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 text-[#888] hover:text-white hover:bg-[#20202c]"
                            title="Edit Piece"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-[#888] hover:text-red-400 hover:bg-[#20202c]"
                            title="Delete Piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Client Orders & Armored Courier Dispatch */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-white">Client Commission Pipeline</h3>
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-5 bg-[#121218] border border-[#20202a] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1c1c24]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">{ord.orderNumber}</span>
                        <span aria-hidden="true" className="text-[#444]">·</span>
                        <span className="text-xs text-[#888]">{ord.date}</span>
                      </div>
                      <div className="text-xs text-[#c4c2bc] mt-0.5">
                        Client: <span className="text-white font-medium">{ord.customerName}</span> ({ord.customerEmail})
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#888]">Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                        className="bg-[#181824] border border-[#2e2e3e] px-2.5 py-1.5 text-xs text-[#d4af37] focus:outline-none focus:border-[#c5a059]"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Atelier Crafting">Atelier Crafting</option>
                        <option value="Armored Courier Dispatched">Armored Courier Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-[#888] block mb-1">Armored Delivery Destination:</span>
                      <p className="text-white">
                        {ord.shippingAddress.street}, {ord.shippingAddress.city},{' '}
                        {ord.shippingAddress.country} ({ord.shippingAddress.postalCode})
                      </p>
                      <p className="text-[#777] mt-0.5">Phone: {ord.shippingAddress.phone}</p>
                    </div>

                    <div>
                      <span className="text-[#888] block mb-1">Commission Items:</span>
                      <div className="space-y-1">
                        {ord.items.map((it, i) => (
                          <div key={i} className="text-[#bbb]">
                            {it.quantity}× {it.product.name} ({it.selectedMaterial.name})
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#888] block mb-1">Tracking & Settlement:</span>
                      <div className="font-mono text-emerald-400 font-medium">
                        {ord.trackingNumber}
                      </div>
                      <div className="text-[#888] mt-1">Total: <span className="text-white font-mono font-bold">{formatPrice(ord.total)}</span></div>
                      <div className="text-[11px] text-[#666]">{ord.paymentMethod}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Social Proof & Fake Buy Notification Controls */}
        {activeTab === 'marketing' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="font-serif text-xl text-white">Live Client Purchase Notifications</h3>
            <p className="text-xs text-[#a3a19b] leading-relaxed">
              Configure real-time luxury social proof toasts that discreetly notify visitors of authenticated purchases worldwide (e.g. "Sophia from New York just acquired The Noor Solitaire").
            </p>

            <div className="p-5 bg-[#121218] border border-[#20202a] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white font-medium">
                    Purchase Notification Ticker
                  </h4>
                  <p className="text-xs text-[#888] mt-0.5">
                    Automatically cycles recent boutique acquisitions every 28 seconds
                  </p>
                </div>
                <button
                  onClick={() => setFakeNotificationEnabled(!fakeNotificationEnabled)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                    fakeNotificationEnabled
                      ? 'bg-emerald-500 text-black'
                      : 'bg-[#22222d] text-[#888]'
                  }`}
                >
                  {fakeNotificationEnabled ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div className="pt-4 border-t border-[#1e1e28] flex items-center justify-between">
                <div>
                  <span className="text-xs text-white">Manual Trigger Test</span>
                  <p className="text-[11px] text-[#777]">
                    Instantly display a sample luxury acquisition toast in the bottom corner
                  </p>
                </div>
                <button
                  onClick={triggerTestNotification}
                  className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider"
                >
                  Trigger Sample Toast
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80" onClick={() => setEditingProduct(null)} />
          <form
            onSubmit={handleSaveProduct}
            className="relative z-10 w-full max-w-md bg-[#121218] border border-[#292938] p-6 space-y-4"
          >
            <h4 className="font-serif text-lg text-white">Edit Vault Reference: {editingProduct.id}</h4>
            <div>
              <label className="block text-xs text-[#888] uppercase mb-1">Name</label>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Base Price ($ USD)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Stock Level</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-3 py-1.5 text-xs text-[#888] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#c5a059] text-black font-semibold text-xs uppercase"
              >
                Save Updates
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80" onClick={() => setIsAddModalOpen(false)} />
          <form
            onSubmit={handleSaveProduct}
            className="relative z-10 w-full max-w-lg bg-[#121218] border border-[#292938] p-6 space-y-4"
          >
            <h4 className="font-serif text-lg text-white">Commission New Vault Reference</h4>
            <div>
              <label className="block text-xs text-[#888] uppercase mb-1">Piece Title</label>
              <input
                type="text"
                required
                placeholder="e.g. The Elysian Sapphire & Diamond Chandelier"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-[#888] uppercase mb-1">Subtitle</label>
              <input
                type="text"
                required
                placeholder="e.g. 4.80ct Ceylon Sapphire in 18K White Gold"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as Product['category'])}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                >
                  <option value="solitaires">Solitaires & Rings</option>
                  <option value="necklaces">High Jewelry Necklaces</option>
                  <option value="bridal">Bridal Polki</option>
                  <option value="bracelets">Royal Bracelets</option>
                  <option value="earrings">Chandelier Earrings</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Base USD Price</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Carats</label>
                <input
                  type="text"
                  value={newCarat}
                  onChange={(e) => setNewCarat(e.target.value)}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Stock</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-[#888] uppercase mb-1">Report</label>
                <select
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value as Product['certification'])}
                  className="w-full bg-[#0a0a0d] border border-[#262634] p-2 text-xs text-white"
                >
                  <option value="GIA Certified">GIA Certified</option>
                  <option value="IGI Certified">IGI Certified</option>
                  <option value="Bespoke Atelier Seal">Bespoke Atelier Seal</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 text-xs text-[#888] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#c5a059] text-black font-semibold text-xs uppercase"
              >
                Publish To Vault
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
