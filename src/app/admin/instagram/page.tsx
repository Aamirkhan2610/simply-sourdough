"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { InstagramPost } from "@/lib/types";
import { siteSettings } from "@/data/seed";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export default function AdminInstagramPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  async function toggleFeatured(id: string) {
    const next = posts.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setPosts(next);
    await fetch("/api/instagram", {
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
            Instagram highlights
          </h1>
          <p className="text-sm text-muted">
            Curated posts for the homepage gallery · @simplysourdough2023
          </p>
        </div>
        <a
          href={siteSettings.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          <InstagramIcon className="h-4 w-4" />
          Open Instagram
        </a>
      </div>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="card-surface overflow-hidden">
              <div className="relative aspect-square bg-parchment-deep">
                <Image
                  src={post.imageUrl}
                  alt={post.caption}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <div className="space-y-3 p-4">
                <p className="text-sm font-medium text-espresso">{post.caption}</p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-clay hover:underline"
                  >
                    View post <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleFeatured(post.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      post.featured
                        ? "bg-clay text-white"
                        : "bg-parchment text-muted"
                    }`}
                  >
                    {post.featured ? "On homepage" : "Hidden"}
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
