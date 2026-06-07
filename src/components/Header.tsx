"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { restaurant } from "@/data/restaurant";

const links = [
  { href: "#o-nas", label: "O nas" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galeria" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blokuj scroll tła, gdy otwarte menu mobilne
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-cream/95 shadow-[0_1px_0_rgba(33,23,18,0.08)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className={cn(
            "font-display text-2xl tracking-tight transition-colors sm:text-[1.7rem]",
            scrolled || open ? "text-espresso" : "text-cream"
          )}
          aria-label={`${restaurant.name} — strona główna`}
        >
          Bella <span className="italic text-terracotta">Cucina</span>
        </a>

        {/* Nawigacja desktop */}
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "group relative text-sm font-medium tracking-wide transition-colors",
                scrolled
                  ? "text-espresso-soft hover:text-terracotta"
                  : "text-cream/90 hover:text-cream"
              )}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#rezerwacja"
            className="rounded-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all duration-300 hover:bg-terracotta-dark hover:shadow-md"
          >
            Zarezerwuj stolik
          </a>
        </nav>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden",
            scrolled || open ? "text-espresso" : "text-cream"
          )}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-0.5 w-6 bg-current transition-all duration-300",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-current transition-all duration-300",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-current transition-all duration-300",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Panel mobilny */}
      <div
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-cream transition-all duration-400 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl text-espresso transition-colors hover:text-terracotta"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#rezerwacja"
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full bg-terracotta px-8 py-3.5 text-base font-semibold text-cream"
        >
          Zarezerwuj stolik
        </a>
        <a
          href={`tel:${restaurant.contact.phoneHref}`}
          className="text-sm font-medium tracking-wide text-muted"
        >
          {restaurant.contact.phone}
        </a>
      </div>
    </header>
  );
}
