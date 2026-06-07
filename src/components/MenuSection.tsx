import Image from "next/image";
import { menu, dietTagLabels, type MenuItem } from "@/data/menu";
import { menuImages } from "@/data/images";
import { formatPrice } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { MenuNav } from "@/components/MenuNav";

export function MenuSection() {
  return (
    <section id="menu" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow eyebrow--center justify-center">Nasza karta</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl">
            Menu
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Klasyka włoskiej kuchni w naszym wydaniu. Karta zmienia się sezonowo
            — zapytaj kelnera o dania dnia.
          </p>
        </Reveal>

        <div className="mt-14">
          <MenuNav categories={menu.map((c) => ({ id: c.id, name: c.name }))} />

          <div className="space-y-20">
            {menu.map((category) => (
              <div
                key={category.id}
                id={`menu-${category.id}`}
                className="scroll-mt-40"
              >
                <Reveal>
                  <div className="flex items-baseline justify-between gap-4 border-b border-espresso/15 pb-4">
                    <h3 className="font-display text-3xl text-espresso sm:text-4xl">
                      {category.name}
                    </h3>
                    <span className="text-sm font-semibold uppercase tracking-widest text-terracotta">
                      {category.subtitle}
                    </span>
                  </div>
                  {category.blurb && (
                    <p className="mt-3 max-w-2xl text-sm italic text-muted">
                      {category.blurb}
                    </p>
                  )}
                </Reveal>

                <Reveal delay={0.05}>
                  <ul className="mt-7 grid gap-x-12 gap-y-1 sm:grid-cols-2">
                    {category.items.map((item) => (
                      <MenuRow key={item.id} item={item} />
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const img = menuImages[item.id];
  return (
    <li className="flex gap-4 border-b border-dashed border-espresso/10 py-4 last:border-0">
      {img && (
        <div className="group/img relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/40">
          <Image
            src={img}
            alt={item.name}
            fill
            placeholder="blur"
            sizes="80px"
            className="object-cover transition-transform duration-500 ease-out-soft group-hover/img:scale-110"
          />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-baseline">
          <h4 className="font-display text-lg text-espresso">{item.name}</h4>
          <span className="leader" aria-hidden />
          <span className="font-display text-lg font-medium text-terracotta tabular-nums">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className={
                  t === "polecane"
                    ? "rounded-full bg-gold/20 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-olive"
                    : "rounded-full bg-espresso/5 px-2.5 py-0.5 text-[0.7rem] font-medium text-muted"
                }
              >
                {dietTagLabels[t]}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
