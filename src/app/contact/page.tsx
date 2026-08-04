import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { siteSettings } from "@/data/seed";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Simply Sourdough Lismore.",
};

export default function ContactPage() {
  return (
    <div className="grain-bg min-h-screen py-14 md:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="section-label">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso md:text-6xl">
            Say hello
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Questions about orders, wholesale, or bake days? We typically reply
            within minutes on WhatsApp.
          </p>

          <div className="mt-10 space-y-3">
            {[
              {
                icon: MapPin,
                label: "Bakery",
                value: `${siteSettings.address}, ${siteSettings.city}`,
                href: "https://maps.google.com/?q=Embassy+Arcade+3/97+Keen+St+Lismore",
              },
              {
                icon: Phone,
                label: "Phone",
                value: siteSettings.phone,
                href: `tel:${siteSettings.phone}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: siteSettings.email,
                href: `mailto:${siteSettings.email}`,
              },
              {
                icon: InstagramIcon,
                label: "Instagram",
                value: "@simplysourdough2023",
                href: siteSettings.instagramUrl,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card-surface flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-clay/10 text-clay">
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-semibold text-espresso">
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <a
            href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-8"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>

        <div className="card-elevated p-8 md:p-10">
          <h2 className="font-display text-3xl font-semibold text-espresso">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-muted">
            Demo form — wire to email or CRM when you go live.
          </p>
          <form className="mt-8 space-y-4" action="#">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-espresso">
                Name
              </label>
              <input className="admin-input" name="name" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-espresso">
                Email
              </label>
              <input
                className="admin-input"
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-espresso">
                Message
              </label>
              <textarea
                className="admin-input min-h-[140px] resize-y"
                name="message"
                placeholder="I'd love to pre-order for Friday..."
              />
            </div>
            <button type="button" className="btn btn-secondary w-full">
              Send message
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted">
            Hours: {siteSettings.hours}
          </p>
        </div>
      </div>
    </div>
  );
}
