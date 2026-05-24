"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

const CATEGORIES = ["Electronics", "Accessories", "Furniture", "Clothing", "Food", "Other"];

export default function AddProductModal({ open, onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    name: "", category: "", quantity: "", price: "", image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);

  if (!open) return null;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.category) e.category = "Category is required";
    if (!form.quantity || Number(form.quantity) < 0) e.quantity = "Valid quantity required";
    if (!form.price || Number(form.price) <= 0) e.price = "Valid price required";
    return e;
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setForm({ ...form, image: file.name });
    }
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onAdd({
      id: Date.now(),
      name: form.name,
      category: form.category,
      quantity: Number(form.quantity),
      price: Number(form.price),
      image: preview || `https://ui-avatars.com/api/?name=${form.name}&background=6366f1&color=fff`,
      status: Number(form.quantity) > 10 ? "In Stock" : Number(form.quantity) > 0 ? "Low Stock" : "Out of Stock",
    });
    setForm({ name: "", category: "", quantity: "", price: "", image: "" });
    setPreview(null);
    setErrors({});
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Product</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Image Upload */}
          <div className="flex justify-center">
            <label className="cursor-pointer group">
              <div className="h-20 w-20 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden group-hover:border-indigo-500 transition-colors">
                {preview ? (
                  <img src={preview} className="h-full w-full object-cover" alt="preview" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-400">Upload</span>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
            <input
              type="text"
              placeholder="e.g. Wireless Mouse"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
              <input
                type="number" min="0"
                placeholder="0"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
              <input
                type="number" min="0" step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}