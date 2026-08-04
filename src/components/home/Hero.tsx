import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-mesh relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-clay/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-copper/20 blur-3xl" />
      </div>

      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="animate-fade-up lg:col-span-6">
          <span className="section-label mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Lismore micro-bakery · NSW
          </span>

          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-espresso sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Beautiful breads
            <span className="mt-1 block italic text-clay">
              & delightful buns
            </span>
            <span className="mt-1 block text-espresso-soft">
              inspired by Sweden
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Only fresh, natural ingredients and traditional Nordic methods.
            Slow-fermented sourdough, cardamom buns, and pastries baked with care
            — until we sell out.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">
              Order for pickup
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="btn btn-ghost">
              Meet the baker
            </Link>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--border)] pt-8">
            {[
              { value: "14+", label: "Years of craft" },
              { value: "0", label: "Preservatives" },
              { value: "MWF", label: "Bake days · 8am" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-espresso">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up delay-2 lg:col-span-6">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-clay/15 via-transparent to-moss/10 blur-2xl" />

          <div className="relative grid grid-cols-12 gap-3 sm:gap-4">
            <div className="col-span-7 space-y-3 sm:space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lg)]">
                <Image
                  src="https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png"
                  alt="Signature sourdough loaf"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 55vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-copper-light">
                    Signature
                  </p>
                  <p className="font-display text-xl font-semibold text-white">
                    Country sourdough
                  </p>
                </div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-xl">
                <Image
                  src="https://simplysourdough.shop/wp-content/uploads/2023/08/c1.png"
                  alt="Cardamom buns"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 55vw, 30vw"
                />
              </div>
            </div>

            <div className="col-span-5 space-y-3 pt-8 sm:space-y-4 sm:pt-14">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-xl">
                <Image
                  src="https://simplysourdough.shop/wp-content/uploads/2023/08/pain-au-choc-1.jpg"
                  alt="Pain au chocolat"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 40vw, 22vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-xl">
                <Image
                  src="https://simplysourdough.shop/wp-content/uploads/2023/08/stor_cheesecake-1.jpg"
                  alt="Basque cheesecake"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 40vw, 22vw"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 z-10 flex max-w-[min(300px,calc(100%-2rem))] items-start gap-3 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[var(--shadow)] backdrop-blur sm:left-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-moss/15 text-moss">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-clay">
                Pickup in Lismore
              </p>
              <p className="mt-0.5 text-sm font-semibold text-espresso">
                Embassy Arcade · 3/97 Keen St
              </p>
              <p className="text-xs text-muted">Mon, Wed & Fri · 8am until sold out</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-8 border-y border-[var(--border)] bg-espresso py-3.5 text-parchment">
        <div className="marquee">
          <div className="marquee-track text-sm font-medium tracking-wide">
            {[
              "Slow 2-day fermentation",
              "Stone-milled regional grains",
              "Pink lake salt",
              "Swedish cardamom buns",
              "Danish rye",
              "No artificial preservatives",
              "Pickup Mon · Wed · Fri",
              "Nordic recipes · Lismore heart",
            ]
              .concat([
                "Slow 2-day fermentation",
                "Stone-milled regional grains",
                "Pink lake salt",
                "Swedish cardamom buns",
                "Danish rye",
                "No artificial preservatives",
                "Pickup Mon · Wed · Fri",
                "Nordic recipes · Lismore heart",
              ])
              .map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
