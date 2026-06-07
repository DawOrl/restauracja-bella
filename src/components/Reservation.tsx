import { ReservationForm } from "@/components/ReservationForm";
import { Reveal } from "@/components/ui/Reveal";
import { restaurant } from "@/data/restaurant";

export function Reservation() {
  return (
    <section id="rezerwacja" className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-32">
      {/* delikatna tekstura/akcent */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Lewa: zachęta */}
        <Reveal>
          <p className="eyebrow !text-gold-soft">Rezerwacja</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
            Zarezerwuj <span className="italic text-gold">stolik</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
            Najlepsze stoliki znikają najszybciej — szczególnie w weekendy.
            Zostaw zgłoszenie, a my oddzwonimy, by potwierdzić Twoją rezerwację.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-gold">
                ☎
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/50">
                  Wolisz zadzwonić?
                </p>
                <a
                  href={`tel:${restaurant.contact.phoneHref}`}
                  className="font-display text-xl text-cream transition-colors hover:text-gold"
                >
                  {restaurant.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-gold">
                ⏱
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-cream/50">
                  Otwarte codziennie
                </p>
                <p className="font-display text-xl text-cream">
                  12:00 – 22:00 (pt–sb do 23:00)
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Prawa: formularz */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-espresso-soft/60 p-6 ring-1 ring-cream/10 backdrop-blur-sm sm:p-8">
            <ReservationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
