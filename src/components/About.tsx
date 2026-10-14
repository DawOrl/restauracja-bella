import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { aboutImage } from "@/data/images";
import { restaurant } from "@/data/restaurant";

const features = [
  {
    title: "Makaron",
    text: "Wyrabiany ręcznie każdego ranka, nigdy z paczki.",
  },
  {
    title: "Piec",
    text: "Opalany drewnem. Pizza piecze się w 450°C przez 90 sekund.",
  },
  {
    title: "Składniki",
    text: "Pomidory San Marzano, oliwa i sery prosto od włoskich dostawców.",
  },
];

export function About() {
  return (
    <section id="o-nas" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 xl:px-20">
        <Reveal className="lg:col-span-5 lg:col-start-1">
          <figure className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[0.75rem]">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-5 rounded-md bg-espresso px-4 py-3 text-cream sm:left-8">
              <span className="block font-display text-2xl leading-none tabular-nums">
                {restaurant.foundedYear}
              </span>
              <span className="mt-1 block text-xs text-cream/75">
                gotujemy rodzinnie od tego roku
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal>
            <p className="kicker">Chi siamo</p>
            <h2 className="mt-4 font-display text-[2.6rem] leading-[1.02] text-espresso sm:text-6xl">
              Gotujemy tak, jak&nbsp;we{" "}
              <span className="accent text-terracotta">włoskim domu</span>
            </h2>
            <div className="mt-8 max-w-[36rem] space-y-4 text-lg leading-relaxed text-espresso-soft">
              <p>
                Bella Cucina to rodzinna trattoria, w której od{" "}
                {restaurant.foundedYear} roku gotujemy według przepisów
                przekazywanych z pokolenia na pokolenie.
              </p>
              <p>
                Usiądź, nalej wina i poczuj się jak u nas w rodzinie. Resztą
                zajmie się kuchnia.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 max-w-[36rem] border-t border-espresso/15">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="grid gap-1 border-b border-espresso/15 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="accent font-display text-2xl leading-tight text-olive">
                    {f.title}
                  </dt>
                  <dd className="text-base leading-relaxed text-espresso-soft sm:pt-1">
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
