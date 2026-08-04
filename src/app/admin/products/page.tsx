"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, Star } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    category: "Sourdough Bread",
    shortDescription: "",
    description: "",
    ingredients: "",
    allergens: "",
    image: "",
    featured: false,
    inStock: true,
  });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm({
      name: "",
      slug: "",
      price: "",
      category: "Sourdough Bread",
      shortDescription: "",
      description: "",
      ingredients: "",
      allergens: "",
      image: "",
      featured: false,
      inStock: true,
    });
  }

  function openEdit(p: Product) {
    setEditing(p);
    setCreating(false);
    setForm({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      category: p.category,
      shortDescription: p.shortDescription,
      description: p.description,
      ingredients: p.ingredients || "",
      allergens: p.allergens || "",
      image: p.images[0] || "",
      featured: p.featured,
      inStock: p.inStock,
    });
  }

  async function save() {
    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      price: Number(form.price),
      category: form.category,
      shortDescription: form.shortDescription,
      description: form.description,
      ingredients: form.ingredients || undefined,
      allergens: form.allergens || undefined,
      images: form.image ? [form.image] : [],
      featured: form.featured,
      inStock: form.inStock,
    };

    if (editing) {
      await fetch(`/api/products/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setEditing(null);
    setCreating(false);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await load();
  }

  const showForm = creating || editing;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-espresso">Products</h1>
          <p className="text-sm text-muted">
            Prefilled catalogue from Simply Sourdough shop — edit anytime.
          </p>
        </div>
        <button type="button" onClick={openCreate} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          Add product
        </button>
      </div>

      {showForm && (
        <div className="card-surface space-y-4 p-6">
          <h2 className="font-display text-xl font-bold text-espresso">
            {editing ? `Edit: ${editing.name}` : "New product"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name">
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Slug">
              <input
                className="admin-input"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto from name if empty"
              />
            </Field>
            <Field label="Price (AUD)">
              <input
                className="admin-input"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Field>
            <Field label="Category">
              <select
                className="admin-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Sourdough Bread</option>
                <option>buns</option>
                <option>pastry</option>
                <option>subscription</option>
                <option>other</option>
              </select>
            </Field>
            <Field label="Image URL" full>
              <input
                className="admin-input"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Field>
            <Field label="Short description" full>
              <textarea
                className="admin-input min-h-[80px]"
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({ ...form, shortDescription: e.target.value })
                }
              />
            </Field>
            <Field label="Description" full>
              <textarea
                className="admin-input min-h-[80px]"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Field>
            <Field label="Ingredients" full>
              <textarea
                className="admin-input min-h-[60px]"
                value={form.ingredients}
                onChange={(e) =>
                  setForm({ ...form, ingredients: e.target.value })
                }
              />
            </Field>
            <Field label="Allergens" full>
              <input
                className="admin-input"
                value={form.allergens}
                onChange={(e) => setForm({ ...form, allergens: e.target.value })}
              />
            </Field>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              />
              In stock
            </label>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={save} className="btn btn-primary">
              Save product
            </button>
            <button
              type="button"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card-surface overflow-hidden">
        {loading ? (
          <p className="p-8 text-muted">Loading products…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-parchment text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-parchment-deep">
                          {p.images[0] && (
                            <Image
                              src={p.images[0]}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-espresso">
                            {p.name}
                            {p.featured && (
                              <Star className="ml-1 inline h-3.5 w-3.5 fill-copper text-copper" />
                            )}
                          </p>
                          <Link
                            href={`/shop/${p.slug}`}
                            className="text-xs text-clay hover:underline"
                          >
                            /shop/{p.slug}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatMoney(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          p.inStock
                            ? "bg-moss/15 text-moss"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.inStock ? "In stock" : "Sold out"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          className="rounded-lg p-2 hover:bg-parchment"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4 text-espresso" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          className="rounded-lg p-2 hover:bg-red-50"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-espresso">{label}</span>
      {children}
    </label>
  );
}
