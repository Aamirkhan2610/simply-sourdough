import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { getInstagram, getProducts, getReviews } from "@/lib/store";
import Link from "next/link";

export default async function HomePage() {
  const [products, reviews, instagram] = await Promise.all([
    getProducts(),
    getReviews(),
    getInstagram(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <StoryTeaser />
      <ReviewsSection reviews={reviews} />
      <InstagramSection posts={instagram} />

      <section className="container-page pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-clay via-clay to-clay-deep px-8 py-14 text-center text-white shadow-[var(--shadow-lg)] md:px-16">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-espresso/20 blur-3xl" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            Bake days · Mon · Wed · Fri
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
            Ready for fresh bread day?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Pre-order online or drop by Embassy Arcade from 8am — until we sell
            out. WhatsApp us for special requests.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="btn bg-white text-espresso hover:bg-parchment"
            >
              Browse the shop
            </Link>
            <a
              href="https://wa.me/61478481989"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
