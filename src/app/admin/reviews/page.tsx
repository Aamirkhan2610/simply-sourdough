"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, Star, Trash2 } from "lucide-react";
import type { Review } from "@/lib/types";
import { siteSettings } from "@/data/seed";

const emptyForm = {
  author: "",
  rating: "5",
  date: new Date().toISOString().slice(0, 10),
  text: "",
  featured: true,
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);

  async function persist(next: Review[]) {
    setReviews(next);
    const res = await fetch("/api/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!res.ok) setError("Could not save the reviews.");
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  }

  function startEdit(review: Review) {
    setEditingId(review.id);
    setForm({
      author: review.author,
      rating: String(review.rating),
      date: review.date.slice(0, 10),
      text: review.text,
      featured: review.featured,
    });
    setError("");
    setOpen(true);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const author = form.author.trim();
    const text = form.text.trim();
    if (author.length < 2 || text.length < 8) {
      setError("Add the reviewer’s name and the review.");
      return;
    }
    const nextReview: Review = {
      id: editingId ?? `r-${Date.now()}`,
      author,
      rating: Number(form.rating),
      text,
      date: form.date,
      source: "google",
      featured: form.featured,
      avatarInitials: initials(author),
    };
    const next = editingId
      ? reviews.map((review) => (review.id === editingId ? nextReview : review))
      : [nextReview, ...reviews];
    await persist(next);
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-espresso">Google reviews</h1>
          <p className="text-sm text-muted">
            Featured reviews appear under the 5.0 average on the homepage. Add, edit, or hide any of them.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={startCreate}>
            <Plus className="h-4 w-4" /> Add review
          </button>
          <a href={siteSettings.googleReviewsUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Open Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {open && (
        <form onSubmit={save} className="card-surface grid gap-4 p-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-espresso">
            Name
            <input
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 font-normal"
              value={form.author}
              onChange={(event) => setForm({ ...form, author: event.target.value })}
              required
            />
          </label>
          <label className="text-sm font-semibold text-espresso">
            Stars
            <select
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 font-normal"
              value={form.rating}
              onChange={(event) => setForm({ ...form, rating: event.target.value })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-espresso">
            Date
            <input
              type="date"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 font-normal"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
              required
            />
          </label>
          <label className="flex items-end gap-2 pb-3 text-sm font-semibold text-espresso">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm({ ...form, featured: event.target.checked })}
            />
            Show on the homepage
          </label>
          <label className="text-sm font-semibold text-espresso md:col-span-2">
            Review
            <textarea
              className="mt-1 min-h-32 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 font-normal"
              value={form.text}
              onChange={(event) => setForm({ ...form, text: event.target.value })}
              required
            />
          </label>
          {error ? <p className="text-sm text-red-700 md:col-span-2">{error}</p> : null}
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" className="btn btn-primary">
              Save review
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <article key={review.id} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-sm font-bold text-espresso">
                      {review.avatarInitials || initials(review.author)}
                    </div>
                    <div>
                      <p className="font-semibold text-espresso">{review.author}</p>
                      <p className="text-xs text-muted">
                        {review.source} · {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-copper text-copper" : "text-linen"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">“{review.text}”</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => persist(reviews.map((item) => (item.id === review.id ? { ...item, featured: !item.featured } : item)))}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                      review.featured ? "bg-clay text-white" : "bg-parchment text-muted"
                    }`}
                  >
                    {review.featured ? "Featured" : "Hidden"}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => startEdit(review)}>
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => persist(reviews.filter((item) => item.id !== review.id))}
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
