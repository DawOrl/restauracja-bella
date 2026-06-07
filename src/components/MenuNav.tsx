"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Cat = { id: string; name: string };

export function MenuNav({ categories }: { categories: Cat[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace("menu-", ""));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    for (const c of categories) {
      const el = document.getElementById(`menu-${c.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="sticky top-20 z-30 -mx-5 mb-14 bg-cream/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
      <nav
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Kategorie menu"
      >
        {categories.map((c) => (
          <a
            key={c.id}
            href={`#menu-${c.id}`}
            className={cn(
              "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors",
              active === c.id
                ? "bg-terracotta text-cream"
                : "bg-espresso/5 text-espresso-soft hover:bg-espresso/10"
            )}
          >
            {c.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
