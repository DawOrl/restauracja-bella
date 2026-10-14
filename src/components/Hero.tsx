import Image from "next/image";
import { heroImage } from "@/data/images";
import { restaurant } from "@/data/restaurant";
import { earliestOpening } from "@/lib/hours";

/*
  Edytorski hero: typografia na kremowym papierze po lewej, zdjęcie w łuku po
  prawej. Łuk powtarza ceglane sklepienie widoczne na fotografii, a całość
  przypomina okładkę karty dań, nie szablon "tekst na ciemnym zdjęciu".
*/
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[90rem] lg:min-h-dvh lg:grid-cols-12">
        <div className="flex flex-col px-5 pb-14 pt-8 sm:px-8 lg:col-span-6 lg:pb-5 lg:pl-12 lg:pr-6 lg:pt-[calc(var(--header-h)+2rem)] xl:pl-20">
          <div className="lg:my-auto lg:pb-10">
            <p className="kicker animate-rise [animation-delay:100ms]">
              Trattoria familijna w Krakowie, od {restaurant.foundedYear} roku
            </p>

            <h1 className="mt-4 max-w-full font-display text-[3.1rem] leading-[0.95] text-espresso sm:text-7xl lg:mt-5 lg:text-[4.9rem] xl:text-[5.6rem]">
              <span className="block animate-rise [animation-delay:200ms]">
                Prawdziwa Italia
              </span>
              <span className="accent block animate-rise text-terracotta [animation-delay:320ms]">
                na Twoim talerzu
              </span>
            </h1>

            <p className="mt-7 max-w-[34rem] animate-rise text-lg leading-relaxed text-espresso-soft [animation-delay:440ms] sm:text-xl">
              Makaron wyrabiany każdego ranka, pizza z pieca opalanego drewnem i
              wina prosto z Włoch. Przy Floriańskiej, kilka kroków od Rynku.
            </p>

            <div className="mt-9 flex animate-rise flex-wrap items-center gap-x-7 gap-y-4 [animation-delay:560ms]">
              <a
                id="hero-cta"
                href="#rezerwacja"
                className="rounded-full bg-terracotta px-7 py-4 text-base font-semibold text-cream shadow-[0_10px_24px_-12px_rgba(140,44,19,0.7)] transition-colors duration-200 hover:bg-terracotta-dark active:translate-y-px"
              >
                Zarezerwuj stolik
              </a>
              <a
                href="#menu"
                className="group inline-flex min-h-11 items-center text-base font-semibold text-espresso underline decoration-terracotta/50 decoration-2 underline-offset-[6px] transition-colors hover:decoration-terracotta"
              >
                Zobacz kartę dań
              </a>
            </div>
          </div>

          <dl className="mt-10 grid lg:mt-12 max-w-[34rem] animate-rise grid-cols-2 gap-x-6 gap-y-1 border-t border-espresso/15 pt-5 text-sm [animation-delay:680ms]">
            <div>
              <dt className="text-muted">Adres</dt>
              <dd className="mt-1 font-medium text-espresso">
                {restaurant.address.street.replace("ul. ", "")},{" "}
                {restaurant.address.city}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Otwarte</dt>
              <dd className="mt-1 font-medium text-espresso">
                codziennie od {earliestOpening()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="order-first px-5 pt-[calc(var(--header-h)+0.25rem)] sm:px-8 lg:order-none lg:col-span-6 lg:pb-5 lg:pl-0 lg:pr-5">
          <div className="arch relative mx-auto h-[46svh] min-h-[19rem] w-full animate-unveil overflow-hidden bg-espresso [animation-delay:150ms] sm:h-[58svh] lg:h-full">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              preload
              quality={85}
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
