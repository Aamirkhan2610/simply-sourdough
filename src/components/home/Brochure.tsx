"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import { siteSettings } from "@/data/seed";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Review } from "@/lib/types";

const GOOGLE = siteSettings.googleReviewsUrl;

const loaves = [
  {
    num: "No. 01",
    name: "Signature Country",
    href: "/shop/the-simply-sourdough",
    copy: "Our daily loaf. A light open crumb, mahogany crust, gentle tang. Made with stoneground flour, water, sea salt and a living starter. Nothing else, no shortcuts.",
    label: "Whole loaf",
    price: "from $10",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour2.png",
      "/brand/country-extra.jpg",
    ],
  },
  {
    num: "No. 02",
    name: "Tinned Simply Sourdough",
    href: "/shop/tinned-simply-sourdough",
    copy: "A softer, family sized sourdough built for the table. Toasts beautifully, holds up to a sandwich, keeps for days. The one most of our regulars take home each bake day.",
    label: "Family size",
    price: "from $10",
    images: ["/brand/tinted-rack.jpg", "/brand/tinted-pair.jpg"],
  },
  {
    num: "No. 03",
    name: "Danish Rye",
    href: "/shop/danish-rye-sourdough",
    copy: "Dense, dark, properly Scandinavian. Whole rye, cracked grains, a touch of malt and a long cold ferment. Slice it thin, pile it high, the way Farid grew up eating it in Copenhagen.",
    label: "Traditional rye",
    price: "from $12",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/unnamed-1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sourn1.png",
    ],
  },
];

function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <span className="stars-icons" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < count ? "currentColor" : "none"} strokeWidth={i < count ? 0 : 1.4} />
      ))}
    </span>
  );
}

function formatReviewDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(year, month - 1, day).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

function ReviewSlider({ reviews }: { reviews: Review[] }) {
  const [per, setPer] = useState(2);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const max = Math.max(0, reviews.length - per);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const apply = () => setPer(query.matches ? 1 : 2);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(0, reviews.length - per)));
  }, [per, reviews.length]);

  useEffect(() => {
    if (paused || max < 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= max ? 0 : current + 1));
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, max]);

  if (reviews.length === 0) return null;

  const go = (direction: -1 | 1) => {
    setIndex((current) => {
      const next = current + direction;
      if (next < 0) return max;
      if (next > max) return 0;
      return next;
    });
  };

  return (
    <div
      className={per === 1 ? "review-slider is-single" : "review-slider"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="review-viewport"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          const dy = event.clientY - drag.current.y;
          drag.current = null;
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="review-track" style={{ ["--i" as string]: index }}>
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-top">
                <Stars count={review.rating} size={14} />
                <time dateTime={review.date}>{formatReviewDate(review.date)}</time>
              </div>
              <p>{review.text}</p>
              <p className="review-author">{review.author}</p>
            </article>
          ))}
        </div>
      </div>
      {max > 0 && (
        <div className="review-controls">
          <button type="button" className="review-arrow" onClick={() => go(-1)} aria-label="Previous reviews">
            <ChevronLeft size={18} />
          </button>
          <div className="review-dots" role="tablist" aria-label="Review slides">
            {Array.from({ length: max + 1 }).map((_, dot) => (
              <button
                key={dot}
                type="button"
                role="tab"
                aria-selected={dot === index}
                aria-label={`Reviews starting at ${dot + 1}`}
                className={dot === index ? "is-on" : undefined}
                onClick={() => setIndex(dot)}
              />
            ))}
          </div>
          <button type="button" className="review-arrow" onClick={() => go(1)} aria-label="Next reviews">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export function Brochure({ reviews = [] }: { reviews?: Review[] }) {
  return (
    <div className="ss">
      <SiteHeader home />

      <a id="top" />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-emblem">
              <img src="/brand/mark.svg" alt="Simply Sourdough mark" />
            </div>
            <h1>
              Artisan Sourdough & <span className="ital">Swedish Buns,</span> Baked Fresh in Lismore
            </h1>
            <p className="hero-sub">
              Hand shaped by baker Farid, fourteen years trained in Denmark and Sweden, now baking
              inside Embassy Arcade in Lismore.
            </p>
            <div className="hero-meta">
              <a className="stars" href={GOOGLE} target="_blank" rel="noreferrer" aria-label="5.0 stars from 92 Google reviews">
                <Stars />
                <span className="stars-text">
                  <b>5.0</b> from 92 reviews
                </span>
              </a>
              <span className="meta-dot" />
              <span className="meta-line">Find us in Embassy Arcade</span>
            </div>
            <div className="hero-ctas">
              <a href="#bread" className="btn btn-primary">
                See the bread <ArrowRight size={16} />
              </a>
              <a href="tel:+61478481989" className="btn btn-ghost">
                Call to reserve
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/brand/hero.jpg"
              alt="A rack of dark-crusted artisan sourdough loaves, hand scored and dusted with flour"
            />
            <span className="hero-tag">Stone baked. Open crumb. Slow fermented over thirty hours.</span>
          </div>
        </div>
      </section>

      <section className="section bread" id="bread">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we bake</span>
            <h2 className="display-2">
              A small range, baked properly,
              <br />
              <em className="script">every loaf by hand.</em>
            </h2>
            <p className="lede">
              Three signature sourdoughs and our famous Swedish cinnamon buns. Only what we can do
              well, only on the days we bake. When it sells out, that&apos;s it until next bake day.
            </p>
          </div>

          <div className="bread-grid">
            {loaves.map((loaf) => (
              <article className="bread-card" key={loaf.num}>
                <Link href={loaf.href} aria-label={loaf.name}>
                  <div className={loaf.images.length > 1 ? "bread-photos" : "bread-photos single"}>
                    {loaf.images.map((src) => (
                      <img key={src} src={src} alt="" />
                    ))}
                  </div>
                </Link>
                <div className="bread-num">{loaf.num}</div>
                <h3>
                  <Link href={loaf.href}>{loaf.name}</Link>
                </h3>
                <p>{loaf.copy}</p>
                <div className="bread-foot">
                  <span>{loaf.label}</span>
                  <span className="bread-price">{loaf.price}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="bread-feature">
            <div>
              <span className="eyebrow">House favourite</span>
              <h3>Swedish cinnamon buns, the real ones.</h3>
              <p>
                Hand rolled, cardamom warmed, lightly glazed. Pulled from the oven Tuesday to
                Saturday morning. They go quickly, and that is on purpose.
              </p>
            </div>
            <div className="img-wrap">
              <img src="/brand/buns.jpg" alt="Tray of golden Swedish cinnamon buns, fresh from the oven" />
            </div>
          </div>

          <div className="coming-soon">
            <span className="eyebrow">Coming soon</span>
            <h3>Pastries, cakes and more, the Nordic way.</h3>
            <p>
              Farid is building the menu out slowly. Wienerbrød, kanelbullar variations, sandwiches,
              Christmas fruit tarts, and semla in season. Worth the wait.
            </p>
          </div>
        </div>
      </section>

      <section className="section story" id="story">
        <div className="container story-grid">
          <div className="story-visual">
            <img
              src="/brand/stall.jpg"
              alt="The Simply Sourdough stall in Embassy Arcade, with racks of fresh loaves"
            />
            <span className="story-cap">Bake mornings. Lismore.</span>
          </div>
          <div className="story-body">
            <span className="eyebrow">The baker</span>
            <h2 className="display-2">
              Farid trained fourteen years across <em className="script">Denmark and Sweden,</em> then
              came home to Lismore.
            </h2>
            <p>
              He spent those years inside master bakeries in Copenhagen and Malmö, learning the slow
              methods that make Scandinavian bread what it is: long ferments, real flour, patient
              hands, no shortcuts.
            </p>
            <p>
              When he settled in the Northern Rivers he saw a gap. Beautiful coffee was easy to find.
              Genuine Danish and Swedish bread was not. So he opened Simply Sourdough to bake the
              loaves of his homeland, properly, for the town he now calls home.
            </p>
            <div className="story-stats">
              <div>
                <div className="stat-num">14</div>
                <div className="stat-lab">
                  Years trained
                  <br />
                  in Scandinavia
                </div>
              </div>
              <div>
                <div className="stat-num">5</div>
                <div className="stat-lab">
                  Days open
                  <br />
                  each week
                </div>
              </div>
              <div>
                <a href={GOOGLE} target="_blank" rel="noreferrer">
                  <div className="stat-num">5.0</div>
                  <div className="stat-lab">
                    Average review
                    <br />
                    from 92 locals
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section why" id="why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why simply sourdough</span>
            <h2 className="display-2">
              Three rules, kept honestly,
              <br />
              <em className="script">since the day we opened.</em>
            </h2>
          </div>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-num">I.</div>
              <h3>Fresh, natural ingredients.</h3>
              <p>
                Stoneground flour, filtered water, sea salt, a living starter. The shortest possible
                list, sourced as locally as we can.
              </p>
            </div>
            <div className="why-item">
              <div className="why-num">II.</div>
              <h3>Traditional methods.</h3>
              <p>
                Long, slow ferments. Hand shaping. A hot oven and a careful eye. The way Farid learnt
                it in Scandinavia, kept exactly that way here.
              </p>
            </div>
            <div className="why-item">
              <div className="why-num">III.</div>
              <h3>No artificial preservatives.</h3>
              <p>
                Nothing on the ingredient list you would not recognise. Bread is meant to be eaten
                fresh, that is the whole point of baking three times a week.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reviews" aria-label="Google reviews">
        <div className="container">
        <div className="review-row">
          <div>
            <div className="review-score">
              5.0
              <span>from 92 Google reviews</span>
            </div>
            <a className="review-link" href={GOOGLE} target="_blank" rel="noreferrer">
              Read them on Google
            </a>
          </div>
          <p className="lede">
            Locals rate Simply Sourdough 5.0 from 92 Google reviews. A few of the notes they left
            are below.
          </p>
        </div>
        <ReviewSlider reviews={reviews} />
        </div>
      </section>

      <section className="section visit" id="visit">
        <div className="container visit-grid">
          <div className="visit-body">
            <span className="eyebrow">Find us</span>
            <h2 className="display-2">
              Embassy Arcade,
              <br />
              <em className="script">Tuesday to Saturday mornings.</em>
            </h2>
            <p>
              We are tucked inside the arcade on Keen Street, alongside Embassy Barbershop. Come by
              early on a bake day. When the racks are empty, that is us done until next time.
            </p>
          </div>
          <div className="visit-details">
            <div className="detail">
              <span className="detail-ico">
                <MapPin size={18} />
              </span>
              <div>
                <h4>Address</h4>
                <p>
                  Embassy Arcade
                  <br />
                  3/97 Keen St, Lismore NSW 2480
                </p>
              </div>
            </div>
            <div className="detail">
              <span className="detail-ico">
                <Clock size={18} />
              </span>
              <div>
                <h4>Bake days</h4>
                <p>
                  Tuesday to Friday, 8:00 AM to 5:00 PM
                  <br />
                  Saturday, 7:00 AM to 2:00 PM
                </p>
                <p className="small">Or until sold out.</p>
              </div>
            </div>
            <div className="detail">
              <span className="detail-ico">
                <Phone size={18} />
              </span>
              <div>
                <h4>Phone</h4>
                <p>
                  <a href="tel:+61478481989">+61 478 481 989</a>
                </p>
                <p className="small">Reserve a loaf the day before, if you&apos;d like.</p>
              </div>
            </div>
            <div className="detail">
              <span className="detail-ico">
                <Mail size={18} />
              </span>
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:farid@simplysourdough.shop">farid@simplysourdough.shop</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-mark">
            <img src="/brand/mark.svg" alt="Simply Sourdough mark" />
          </div>
          <h3>Simply Sourdough</h3>
          <p className="footer-tag">Artisan sourdough and Swedish buns, baked fresh in Lismore.</p>
          <div className="footer-meta">
            <span>© {new Date().getFullYear()} Simply Sourdough</span>
            <span>Lismore, NSW</span>
            <a href="tel:+61478481989">+61 478 481 989</a>
            <a href="mailto:farid@simplysourdough.shop">farid@simplysourdough.shop</a>
          </div>
        </div>
      </footer>

      <a href="tel:+61478481989" className="sticky-call">
        <b>Call Farid</b> &nbsp;·&nbsp; reserve a loaf
      </a>
    </div>
  );
}
