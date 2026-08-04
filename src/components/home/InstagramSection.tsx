import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { InstagramPost } from "@/lib/types";
import { siteSettings } from "@/data/seed";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function InstagramSection({ posts }: { posts: InstagramPost[] }) {
  const featured = posts.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="container-page py-20 md:py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="section-label">
            <InstagramIcon className="h-3.5 w-3.5" />
            @simplysourdough2023
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl">
            From the bakery feed
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Daily bakes, Nordic pastries, and life behind the counter in Lismore.
          </p>
        </div>
        <a
          href={siteSettings.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          Follow on Instagram
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {featured.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-[1.25rem] bg-parchment-deep shadow-md"
          >
            <div className="relative aspect-square">
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="line-clamp-2 text-sm font-medium text-white">
                  {post.caption}
                </p>
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-white/95 p-2 opacity-0 shadow transition group-hover:opacity-100">
                <InstagramIcon className="h-4 w-4 text-espresso" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
