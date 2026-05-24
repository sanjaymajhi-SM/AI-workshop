"use client";

import { useState } from "react";
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import AddProductModal from "./AddProductModal";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", quantity: 45, price: 29.99, status: "In Stock", image: "https://ui-avatars.com/api/?name=WM&background=6366f1&color=fff" },
  { id: 2, name: "USB-C Hub", category: "Accessories", quantity: 8, price: 49.99, status: "Low Stock", image: "https://ui-avatars.com/api/?name=UH&background=8b5cf6&color=fff" },
  { id: 3, name: "Mechanical Keyboard", category: "Electronics", quantity: 0, price: 89.99, status: "Out of Stock", image: "https://ui-avatars.com/api/?name=MK&background=ec4899&color=fff" },
  { id: 4, name: "Monitor Stand", category: "Furniture", quantity: 22, price: 35.00, status: "In Stock", image: "https://ui-avatars.com/api/?name=MS&background=14b8a6&color=fff" },
  { id: 5, name: "Webcam HD", category: "Electronics", quantity: 3, price: 65.00, status: "Low Stock", image: "https://ui-avatars.com/api/?name=WC&background=f59e0b&color=fff" },
  { id: 6, name: "Desk Lamp", category: "Furniture", quantity: 30, price: 24.99, status: "In Stock", image: "https://ui-avatars.com/api/?name=DL&background=10b981&color=fff" },
];

const PAGE_SIZE = 5;

const statusStyles: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Low Stock": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function ProductTable() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleDelete(id: number) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  function handleAdd(product: any) {
    setProducts(prev => [product, ...prev]);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} total products</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table - Desktop */}
      <div className="hidden sm:block rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {["Product", "Category", "Quantity", "Price", "Status", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {paginated.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                    <span className="font-medium text-gray-900 dark:text-white">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.category}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{p.quantity}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="sm:hidden space-y-3">
        {paginated.map(p => (
          <div key={p.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Qty: <span className="text-gray-800 dark:text-gray-200 font-medium">{p.quantity}</span></span>
              <span className="text-gray-500">Price: <span className="text-gray-800 dark:text-gray-200 font-medium">${p.price.toFixed(2)}</span></span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}