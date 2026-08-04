import Link from "next/link";
import {
  Package,
  Star,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { formatMoney } from "@/lib/format";
import { getInstagram, getOrders, getProducts, getReviews } from "@/lib/store";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export default async function AdminDashboard() {
  const [products, reviews, instagram, orders] = await Promise.all([
    getProducts(),
    getReviews(),
    getInstagram(),
    getOrders(),
  ]);

  const featuredProducts = products.filter((p) => p.featured).length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);

  const stats = [
    {
      label: "Products",
      value: String(products.length),
      hint: `${featuredProducts} featured`,
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Orders",
      value: String(orders.length),
      hint: `${pendingOrders} pending`,
      icon: ShoppingBag,
      href: "/admin/orders",
    },
    {
      label: "Reviews",
      value: String(reviews.length),
      hint: `${reviews.filter((r) => r.featured).length} highlighted`,
      icon: Star,
      href: "/admin/reviews",
    },
    {
      label: "Instagram",
      value: String(instagram.length),
      hint: "feed highlights",
      icon: InstagramIcon,
      href: "/admin/instagram",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-espresso md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-1 text-muted">
          Catalogue, orders, reviews & Instagram — all prefilled and ready to
          manage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card-surface group p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/12 text-clay">
                <s.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted">{s.label}</p>
            <p className="font-display text-3xl font-bold text-espresso">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted">{s.hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-clay" />
            <h2 className="font-display text-xl font-semibold text-espresso">
              Demo order value
            </h2>
          </div>
          <p className="font-display text-4xl font-bold text-espresso">
            {formatMoney(revenue)}
          </p>
          <p className="mt-2 text-sm text-muted">
            Sample orders for CRM demo — replace with live payments later.
          </p>
        </div>

        <div className="card-surface p-6">
          <h2 className="font-display text-xl font-semibold text-espresso">
            Product catalogue
          </h2>
          <p className="mt-2 text-sm text-muted">
            Preloaded from simplysourdough.shop — breads, buns, pastries, and
            subscription.
          </p>
          <ul className="mt-4 max-h-56 space-y-2 overflow-y-auto">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-xl bg-parchment px-3 py-2.5 text-sm"
              >
                <span className="font-semibold text-espresso">{p.name}</span>
                <span className="text-muted">{formatMoney(p.price)}</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/products" className="btn btn-primary mt-5">
            Manage products
          </Link>
        </div>
      </div>
    </div>
  );
}
