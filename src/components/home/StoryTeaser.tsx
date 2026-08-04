import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteSettings } from "@/data/seed";

export function StoryTeaser() {
  return (
    <section className="dark-panel relative overflow-hidden py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <Image
              src="https://simplysourdough.shop/wp-content/uploads/2023/08/sour2.png"
              alt="Artisan sourdough"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="absolute -bottom-5 -right-2 max-w-[240px] rounded-2xl border border-white/10 bg-espresso-soft/95 p-5 shadow-xl backdrop-blur sm:-right-4">
            <p className="font-display text-xl font-semibold text-parchment">
              Baked without shortcuts
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-parchment/65">
              Two-day ferment · stone milled grains · pink lake salt
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-copper-light">
            Who we are
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-parchment sm:text-5xl">
            Nordic soul,
            <span className="block italic text-clay-soft">Lismore heart</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-parchment/75">
            {siteSettings.aboutStory}
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/65">
            We cherish our relationships with local friends, suppliers, and
            stockists across Lismore and the Northern Rivers — bringing genuine
            Danish and Swedish delicacies to the community.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "2-day ferment",
              "Stone-milled grains",
              "No preservatives",
              "Nordic classics",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-parchment/85"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link href="/about" className="btn btn-primary mt-10">
            Read our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
