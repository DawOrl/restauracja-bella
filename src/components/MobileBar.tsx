"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { restaurant } from "@/data/restaurant";

/**
 * Dolny pasek na telefonie: telefon i rezerwacja zawsze pod kciukiem.
 * Widoczny po pierwszym przewinięciu, gdy przycisk rezerwacji z hero jest
 * poza ekranem; znika, gdy formularz rezerwacji jest już na ekranie
 * (i niżej, w stopce).
 */
export function MobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const cta = document.getElementById("hero-cta");
      const form = document.getElementById("rezerwacja");
      if (!cta || !form) return;
      const ctaRect = cta.getBoundingClientRect();
      const ctaOffscreen =
        ctaRect.bottom < 0 || ctaRect.top > window.innerHeight;
      const atForm =
        form.getBoundingClientRect().top < window.innerHeight * 0.85;
      setVisible(window.scrollY > 240 && ctaOffscreen && !atForm);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 ease-out-soft lg:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={`tel:${restaurant.contact.phoneHref}`}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-espresso/25 text-sm font-semibold text-espresso"
        >
          Zadzwoń
        </a>
        <a
          href="#rezerwacja"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-12 flex-[1.6] items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-cream"
        >
          Zarezerwuj stolik
        </a>
      </div>
    </div>
  );
}
