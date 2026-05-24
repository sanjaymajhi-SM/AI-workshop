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
  "In Stock": "bg-success/15 text-success",
  "Low Stock": "bg-warning/15 text-warning",
  "Out of Stock": "bg-destructive/15 text-destructive",
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
    <div className="py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} total products</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Table - Desktop */}
      <div className="hidden sm:block rounded-xl border border-border overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              {["Product", "Category", "Quantity", "Price", "Status", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map(p => (
              <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                    <span className="font-medium text-foreground">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-foreground">{p.quantity}</td>
                <td className="px-4 py-3 text-foreground">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
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
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg" />
                <div>
                  <p className="font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Qty: <span className="text-foreground font-medium">{p.quantity}</span></span>
              <span className="text-muted-foreground">Price: <span className="text-foreground font-medium">${p.price.toFixed(2)}</span></span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
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
          <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
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