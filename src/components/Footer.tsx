import { restaurant } from "@/data/restaurant";

const quickLinks = [
  { href: "#o-nas", label: "O nas" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galeria" },
  { href: "#rezerwacja", label: "Rezerwacja" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-espresso text-cream/80">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marka */}
          <div className="lg:col-span-1">
            <p className="font-display text-3xl text-cream">
              Bella <span className="italic text-gold">Cucina</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {restaurant.shortDescription}
            </p>
          </div>

          {/* Nawigacja */}
          <div>
            <h3 className="font-display text-lg text-cream">Nawigacja</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-cream/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Godziny */}
          <div>
            <h3 className="font-display text-lg text-cream">Godziny otwarcia</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {restaurant.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span>{h.label}</span>
                  <span className="tabular-nums text-cream/90">
                    {h.opens}–{h.closes}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-display text-lg text-cream">Kontakt</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>
                {restaurant.address.street}
                <br />
                {restaurant.address.postalCode} {restaurant.address.city}
              </li>
              <li>
                <a
                  href={`tel:${restaurant.contact.phoneHref}`}
                  className="transition-colors hover:text-gold"
                >
                  {restaurant.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurant.contact.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {restaurant.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-4">
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-gold"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href={restaurant.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 transition-colors hover:text-gold"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-7 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {restaurant.legalName}. Wszystkie prawa zastrzeżone.
          </p>
          <p>
            Projekt demo · Made with <span className="text-gold">♥</span> in
            Kraków
          </p>
        </div>
      </div>
    </footer>
  );
}
