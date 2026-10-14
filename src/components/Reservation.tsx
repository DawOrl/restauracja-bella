import { ReservationForm } from "@/components/ReservationForm";
import { HoursList } from "@/components/HoursList";
import { Reveal } from "@/components/ui/Reveal";
import { restaurant } from "@/data/restaurant";

/*
  Finał strony: wieczorne espresso przechodzi płynnie w stopkę. Formularz
  stoi na kremowej "karcie rezerwacji", więc jest jedynym jasnym punktem
  w sekcji i od razu wiadomo, gdzie patrzeć.
*/
export function Reservation() {
  return (
    <section
      id="rezerwacja"
      className="relative bg-espresso pb-20 pt-24 text-cream sm:pb-24 sm:pt-32"
    >
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 xl:px-20">
        <Reveal className="lg:col-span-5">
          <p className="kicker text-gold!">Prenota</p>
          <h2 className="mt-4 font-display text-[2.6rem] leading-[1.02] sm:text-6xl">
            Zarezerwuj <span className="accent text-gold-soft">stolik</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/80">
            W weekendy stoliki znikają najszybciej. Zostaw zgłoszenie, a
            oddzwonimy, żeby potwierdzić rezerwację.
          </p>

          <div className="mt-10 max-w-md space-y-8">
            <div>
              <p className="text-sm text-cream/60">Wolisz zadzwonić?</p>
              <a
                href={`tel:${restaurant.contact.phoneHref}`}
                className="mt-1 inline-flex min-h-11 items-center font-display text-3xl tabular-nums text-cream underline decoration-gold/40 decoration-1 underline-offset-[6px] transition-colors hover:decoration-gold"
              >
                {restaurant.contact.phone}
              </a>
            </div>
            <div>
              <p className="mb-3 text-sm text-cream/60">Godziny otwarcia</p>
              <HoursList tone="light" />
            </div>
          </div>
        </Reveal>

        <Reveal
          className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7"
          delay={0.1}
        >
          <div className="rounded-[1rem] bg-surface p-6 text-espresso sm:p-10">
            <ReservationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
