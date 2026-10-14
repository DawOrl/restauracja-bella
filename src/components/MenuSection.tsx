import Image from "next/image";
import { menu, dietTagLabels, type MenuItem } from "@/data/menu";
import { menuCategoryImages, pastaRender } from "@/data/images";
import { formatPrice } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { MenuNav } from "@/components/MenuNav";

/*
  Karta jak drukowane menu: jedna fotografia na kategorię (zamiast 29
  miniaturek z różnych sesji), pozycje z kropkowaną linią do ceny.
  Na desktopie zdjęcie kategorii stoi przyklejone obok listy.
*/
export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative bg-cream-deep bg-grain pb-24 pt-20 sm:pb-32 sm:pt-28"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="relative grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="kicker">La carta</p>
            <h2 className="mt-4 font-display text-[3.5rem] leading-[0.95] text-espresso sm:text-8xl">
              Menu
            </h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-espresso-soft">
              Klasyka włoskiej kuchni w naszym wydaniu. Karta zmienia się
              sezonowo, o dania dnia zapytaj kelnera.
            </p>
          </Reveal>
          <Reveal
            className="pointer-events-none absolute -top-2 right-0 w-[46%] sm:pointer-events-auto sm:relative sm:top-auto sm:-mb-6 sm:w-auto lg:col-span-5"
            delay={0.1}
            y={40}
          >
            <Image
              src={pastaRender}
              alt=""
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 46vw"
              className="ml-auto h-auto w-full max-w-[30rem] sm:w-[78%]"
            />
          </Reveal>
        </div>

        <MenuNav categories={menu.map((c) => ({ id: c.id, name: c.name }))} />

        <div className="space-y-20 sm:space-y-28">
          {menu.map((category) => {
            const photo = menuCategoryImages[category.id];
            return (
              <article
                key={category.id}
                id={`menu-${category.id}`}
                aria-labelledby={`menu-${category.id}-tytul`}
                className="scroll-mt-[calc(var(--header-h)+4.5rem)] lg:grid lg:grid-cols-12 lg:gap-10"
              >
                {photo && (
                  <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
                      <div className="arch relative hidden aspect-4/5 overflow-hidden bg-espresso lg:block">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1440px) 520px, 36vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="lg:col-span-7 lg:pt-2">
                  <Reveal>
                    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-espresso/20 pb-4">
                      <h3
                        id={`menu-${category.id}-tytul`}
                        className="font-display text-[2.6rem] leading-none text-espresso sm:text-6xl"
                      >
                        {category.name}
                      </h3>
                      <span className="text-base text-muted">
                        {category.subtitle}
                      </span>
                    </header>
                    {category.blurb && (
                      <p className="accent mt-4 max-w-xl font-display text-lg text-espresso-soft">
                        {category.blurb}
                      </p>
                    )}
                  </Reveal>

                  {photo && (
                    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[0.75rem] bg-espresso sm:aspect-[16/9] lg:hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 640px) 90vw, 100vw"
                        className="object-cover object-[50%_62%]"
                      />
                    </div>
                  )}

                  <ul className="mt-4">
                    {category.items.map((item) => (
                      <MenuRow key={item.id} item={item} />
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const recommended = item.tags?.includes("polecane");
  const diet = item.tags?.filter((t) => t !== "polecane") ?? [];
  return (
    <li className="border-b border-dashed border-espresso/15 py-5 last:border-0">
      <div className="flex items-baseline">
        <h4 className="font-display text-xl leading-snug text-espresso sm:text-[1.4rem]">
          {item.name}
        </h4>
        <span className="leader" aria-hidden />
        <span className="whitespace-nowrap font-display text-xl tabular-nums text-terracotta sm:text-[1.4rem]">
          {formatPrice(item.price)}
        </span>
      </div>
      <p className="mt-1.5 max-w-[38rem] text-[0.97rem] leading-relaxed text-espresso-soft">
        {item.description}
      </p>
      {(recommended || diet.length > 0) && (
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 text-sm">
          {recommended && (
            <span className="accent font-display text-base text-terracotta">
              polecamy
            </span>
          )}
          {diet.length > 0 && (
            <span className="text-muted">
              {diet.map((t) => dietTagLabels[t].toLowerCase()).join(" · ")}
            </span>
          )}
        </p>
      )}
    </li>
  );
}
