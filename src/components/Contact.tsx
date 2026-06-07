import { Reveal } from "@/components/ui/Reveal";
import { restaurant } from "@/data/restaurant";

export function Contact() {
  return (
    <section id="kontakt" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow eyebrow--center justify-center">Kontakt</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl">
            Jak do nas trafić
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Informacje */}
          <Reveal className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl text-espresso">Adres</h3>
                <p className="mt-2 text-base leading-relaxed text-espresso-soft">
                  {restaurant.address.street}
                  <br />
                  {restaurant.address.postalCode} {restaurant.address.city}
                </p>
                <a
                  href={restaurant.map.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-terracotta underline-offset-4 hover:underline"
                >
                  Otwórz w Mapach Google →
                </a>
              </div>

              <div>
                <h3 className="font-display text-2xl text-espresso">
                  Godziny otwarcia
                </h3>
                <ul className="mt-3 space-y-2 text-base text-espresso-soft">
                  {restaurant.hours.map((h) => (
                    <li
                      key={h.label}
                      className="flex justify-between gap-6 border-b border-espresso/10 pb-2"
                    >
                      <span>{h.label}</span>
                      <span className="font-medium tabular-nums text-espresso">
                        {h.opens} – {h.closes}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-2xl text-espresso">Kontakt</h3>
                <div className="mt-3 space-y-2 text-base text-espresso-soft">
                  <p>
                    <a
                      href={`tel:${restaurant.contact.phoneHref}`}
                      className="transition-colors hover:text-terracotta"
                    >
                      {restaurant.contact.phone}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${restaurant.contact.email}`}
                      className="transition-colors hover:text-terracotta"
                    >
                      {restaurant.contact.email}
                    </a>
                  </p>
                  <div className="flex gap-4 pt-1">
                    <a
                      href={restaurant.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-terracotta hover:underline"
                    >
                      Instagram
                    </a>
                    <a
                      href={restaurant.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-terracotta hover:underline"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg ring-1 ring-espresso/10 sm:h-full sm:min-h-[28rem]">
              <iframe
                src={restaurant.map.embedUrl}
                title={`Mapa — ${restaurant.name}, ${restaurant.address.street}`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
