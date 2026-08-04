import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/data/seed";

export const metadata = {
  title: "About",
  description: "The story of Simply Sourdough — Nordic baking in Lismore NSW.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="hero-mesh py-16 md:py-24">
        <div className="container-page max-w-3xl">
          <span className="section-label">Our story</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso md:text-6xl">
            From Danish kitchens
            <span className="block italic text-clay">to Lismore</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {siteSettings.aboutStory}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[var(--shadow)]">
          <Image
            src="https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png"
            alt="Simply Sourdough loaf"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl font-semibold text-espresso md:text-4xl">
            Our concept is simple
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Far from ordinary: only fresh, natural ingredients and traditional
            methods are used to make our artisanal sourdough. We are proud to be
            part of the vibrant community in and around Lismore.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Inspired by mentor Daniel Sundgren and years baking across Denmark
            and Sweden, Farid founded Simply Sourdough to share authentic Nordic
            flavours — without artificial preservatives, with plenty of love.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Slow 2-day fermentation",
              "Stone-milled grains",
              "Pink lake salt",
              "No artificial preservatives",
              "Swedish & Danish classics",
              "Community-first micro bakery",
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-sm font-semibold text-espresso shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-parchment-deep py-16 md:py-20">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold text-espresso md:text-4xl">
            Visit the bakery
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Address",
                body: `${siteSettings.address}, ${siteSettings.city}`,
              },
              { title: "Hours", body: siteSettings.hours },
              {
                title: "Contact",
                body: `${siteSettings.phone}\n${siteSettings.email}`,
              },
            ].map((card) => (
              <div key={card.title} className="card-surface p-6">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-clay">
                  {card.title}
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-espresso">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">
              Order online
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
          <p className="mt-12 text-sm text-muted">
            Simply Sourdough acknowledges the Traditional Custodians of the land
            throughout Australia and their deep connections to country, sea, and
            community.
          </p>
        </div>
      </section>
    </div>
  );
}
