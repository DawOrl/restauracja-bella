import { restaurant } from "@/data/restaurant";

const links = [
  { href: "#o-nas", label: "O nas" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galeria" },
  { href: "#kontakt", label: "Dojazd" },
  { href: "#rezerwacja", label: "Rezerwacja" },
];

export function Footer() {
  const { address, contact, social } = restaurant;
  return (
    <footer className="bg-espresso pb-12 text-cream/75">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="border-t border-cream/15 pt-14">
          <p className="font-display text-[3.4rem] leading-[0.9] tracking-tight text-cream sm:text-[6rem] lg:text-[8.5rem]">
            Bella <span className="accent text-gold-soft">Cucina</span>
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed">
            {restaurant.shortDescription}
          </p>
        </div>

        <div className="mt-14 grid gap-10 text-sm sm:grid-cols-3">
          <div>
            <h2 className="font-display text-lg text-cream">Adres</h2>
            <p className="mt-3 leading-relaxed">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-cream">Kontakt</h2>
            <ul className="mt-1">
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex min-h-11 items-center tabular-nums hover:text-gold-soft"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-11 items-center hover:text-gold-soft"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-5">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-gold-soft"
                >
                  Instagram
                </a>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-gold-soft"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Stopka">
            <h2 className="font-display text-lg text-cream">Na stronie</h2>
            <ul className="mt-1 grid grid-cols-2 gap-x-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center hover:text-gold-soft"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row">
          <p>© 2026 {restaurant.legalName}. Wszystkie prawa zastrzeżone.</p>
          <p>Projekt demonstracyjny, lokal i dane kontaktowe są fikcyjne.</p>
        </div>
      </div>
    </footer>
  );
}
