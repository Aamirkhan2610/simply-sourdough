import { Star, ExternalLink, Quote } from "lucide-react";
import type { Review } from "@/lib/types";
import { siteSettings } from "@/data/seed";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-copper text-copper" : "text-linen"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const featured = reviews.filter((r) => r.featured).slice(0, 5);
  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

  return (
    <section className="grain-bg py-20 md:py-28">
      <div className="container-page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-label">Google reviews</span>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl">
              Loved by Lismore
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Stars rating={5} />
              <span className="font-display text-2xl font-bold text-espresso">
                {avg.toFixed(1)}
              </span>
              <span className="text-sm text-muted">
                from highlighted Google reviews
              </span>
            </div>
          </div>
          <a
            href={siteSettings.googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Read on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((review) => (
            <article
              key={review.id}
              className="card-surface group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-clay/15 transition group-hover:text-clay/25" />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-clay text-sm font-bold text-white">
                  {review.avatarInitials || review.author.slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-espresso">{review.author}</p>
                  <p className="text-xs text-muted">
                    Google ·{" "}
                    {new Date(review.date).toLocaleDateString("en-AU", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Stars rating={review.rating} />
              <p className="mt-3 text-sm leading-relaxed text-muted">
                “{review.text}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
