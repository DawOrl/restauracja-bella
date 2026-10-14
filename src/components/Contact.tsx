import { Reveal } from "@/components/ui/Reveal";
import { HoursList } from "@/components/HoursList";
import { MapCard } from "@/components/MapCard";
import { restaurant } from "@/data/restaurant";

export function Contact() {
  const { address, contact, social, map } = restaurant;
  return (
    <section id="kontakt" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 xl:px-20">
        <Reveal className="lg:col-span-5">
          <p className="kicker">Dove siamo</p>
          <h2 className="mt-4 font-display text-[2.6rem] leading-[1.02] text-espresso sm:text-6xl">
            Jak do nas <span className="accent text-terracotta">trafić</span>
          </h2>

          <address className="mt-10 not-italic">
            <p className="font-display text-3xl leading-tight text-espresso sm:text-4xl">
              {address.street.replace("ul. ", "")}
            </p>
            <p className="mt-1 text-lg text-espresso-soft">
              {address.postalCode} {address.city}, Stare Miasto
            </p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-espresso-soft">
              Ulica Floriańska prowadzi od Rynku Głównego do Bramy Floriańskiej.
              Z Rynku dojdziesz w kilka minut.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-espresso px-5 text-sm font-semibold text-cream transition-colors hover:bg-espresso-soft"
              >
                Wyznacz trasę
              </a>
              <a
                href={map.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-espresso/25 px-5 text-sm font-semibold text-espresso transition-colors hover:border-espresso"
              >
                Otwórz w Mapach Google
              </a>
            </div>
          </address>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="font-display text-xl text-espresso">
                Godziny otwarcia
              </h3>
              <div className="mt-4 text-base">
                <HoursList />
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl text-espresso">Kontakt</h3>
              <ul className="mt-2 text-base">
                <li>
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="inline-flex min-h-11 items-center tabular-nums text-espresso underline decoration-espresso/25 underline-offset-4 hover:decoration-terracotta"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-11 items-center break-all text-espresso underline decoration-espresso/25 underline-offset-4 hover:decoration-terracotta"
                  >
                    {contact.email}
                  </a>
                </li>
                <li className="flex gap-6">
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-espresso-soft hover:text-terracotta"
                  >
                    Instagram
                  </a>
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-espresso-soft hover:text-terracotta"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="relative h-[30rem] overflow-hidden rounded-[0.75rem] border border-espresso/10 bg-cream-deep sm:h-[36rem] lg:h-full lg:min-h-[40rem]">
            <MapCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
