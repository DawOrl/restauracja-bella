"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Cat = { id: string; name: string };

/**
 * Pasek kategorii przyklejony pod nagłówkiem strony (także na telefonie).
 * Aktywna kategoria = ta, której sekcja przecina linię tuż pod paskiem;
 * na wąskim ekranie aktywna zakładka sama przewija się do widoku.
 */
export function MenuNav({ categories }: { categories: Cat[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("menu-", ""));
          }
        }
      },
      // pas 1 px na ok. 35% wysokości ekranu: dokładnie jedna sekcja naraz
      { rootMargin: "-35% 0px -64% 0px", threshold: 0 },
    );
    for (const c of categories) {
      const el = document.getElementById(`menu-${c.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!nav || !link) return;
    const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    nav.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  return (
    <div className="sticky top-(--header-h) z-30 -mx-5 mb-12 mt-14 border-b border-espresso/15 bg-cream-deep/95 px-5 backdrop-blur-md sm:-mx-8 sm:mb-16 sm:px-8 lg:mx-0 lg:px-0">
      <nav
        ref={navRef}
        className="flex gap-1 overflow-x-auto [mask-image:linear-gradient(to_right,black_82%,transparent)] [scrollbar-width:none] sm:gap-4 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Kategorie menu"
      >
        {categories.map((c, i) => {
          const isActive = active === c.id;
          return (
            <a
              key={c.id}
              href={`#menu-${c.id}`}
              data-cat={c.id}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative flex min-h-12 shrink-0 items-baseline gap-1.5 px-3 pb-3 pt-3.5 font-display text-lg transition-colors sm:text-xl",
                isActive
                  ? "text-terracotta"
                  : "text-espresso-soft hover:text-espresso",
              )}
            >
              <span className="font-sans text-[0.7rem] tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              {c.name}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 -bottom-px h-[2px] origin-left bg-terracotta transition-transform duration-300 ease-out-soft",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          );
        })}
      </nav>
    </div>
  );
}
