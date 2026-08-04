"use client";

import { useEffect, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import type { Review } from "@/lib/types";
import { siteSettings } from "@/data/seed";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);

  async function toggleFeatured(id: string) {
    const next = reviews.map((r) =>
      r.id === id ? { ...r, featured: !r.featured } : r
    );
    setReviews(next);
    await fetch("/api/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-espresso">
            Google reviews
          </h1>
          <p className="text-sm text-muted">
            Highlighted reviews shown on the storefront. Toggle which ones appear.
          </p>
        </div>
        <a
          href={siteSettings.googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
        >
          Open Google
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((r) => (
            <article key={r.id} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-sm font-bold text-espresso">
                      {r.avatarInitials || r.author.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-espresso">{r.author}</p>
                      <p className="text-xs text-muted">
                        {r.source} · {r.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < r.rating
                            ? "fill-copper text-copper"
                            : "text-linen"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                    “{r.text}”
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFeatured(r.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                    r.featured
                      ? "bg-clay text-white"
                      : "bg-parchment text-muted"
                  }`}
                >
                  {r.featured ? "Featured" : "Hidden"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
