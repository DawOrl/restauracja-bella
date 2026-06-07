import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { aboutImage } from "@/data/images";
import { restaurant } from "@/data/restaurant";

const features = [
  {
    title: "Świeży makaron codziennie",
    text: "Wyrabiamy go ręcznie każdego ranka — nigdy z paczki.",
  },
  {
    title: "Piec opalany drewnem",
    text: "Pizza wypiekana w 450°C, gotowa w 90 sekund.",
  },
  {
    title: "Składniki z Włoch",
    text: "Pomidory San Marzano, oliwa i sery prosto od dostawców.",
  },
];

export function About() {
  return (
    <section id="o-nas" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Zdjęcie z plakietką "od 1987" */}
        <Reveal className="relative" y={32}>
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={aboutImage}
              alt="Szef kuchni Bella Cucina przygotowuje świeży makaron"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          {/* dekoracyjna ramka */}
          <div className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl border border-gold/40" />
          {/* plakietka */}
          <div className="absolute -bottom-6 -right-4 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-terracotta text-cream shadow-lg sm:-right-6">
            <span className="font-display text-3xl leading-none">
              {restaurant.foundedYear}
            </span>
            <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-widest">
              od roku
            </span>
          </div>
        </Reveal>

        {/* Treść */}
        <div>
          <Reveal>
            <p className="eyebrow">O nas</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              Gotujemy tak, jak we{" "}
              <span className="italic text-terracotta">włoskim domu</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-espresso-soft sm:text-lg">
              <p>
                Bella Cucina to rodzinna trattoria, w której od{" "}
                {restaurant.foundedYear} roku gotujemy z miłością i według
                przepisów przekazywanych z pokolenia na pokolenie.
              </p>
              <p>
                Makaron wyrabiamy ręcznie, pizzę wypiekamy w piecu opalanym
                drewnem, a składniki sprowadzamy wprost od włoskich dostawców.
                Usiądź, nalej wina i poczuj się jak u nas w rodzinie.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {features.map((f, i) => (
                <div key={f.title} className="border-t border-espresso/15 pt-4">
                  <span className="font-display text-2xl text-gold">
                    0{i + 1}
                  </span>
                  <dt className="mt-2 font-semibold text-espresso">
                    {f.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {f.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
