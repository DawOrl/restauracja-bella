"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { isolate, lockScroll } from "@/lib/modal";
import { restaurant } from "@/data/restaurant";

const links = [
  { href: "#o-nas", label: "O nas" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galeria" },
  { href: "#kontakt", label: "Dojazd" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobilne: blokada przewijania tła, reszta strony `inert` (fokus nie
  // ucieka pod panel), Escape zamyka, a przejście na desktop też zamyka
  useEffect(() => {
    const header = headerRef.current;
    if (!open || !header) return;
    const unlock = lockScroll();
    const restore = isolate(header);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      restore();
      unlock();
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled || open
          ? "bg-cream/95 shadow-[0_1px_0_rgba(33,23,18,0.1)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-(--header-h) max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="relative z-50 font-display text-[1.6rem] leading-none tracking-tight text-espresso"
          aria-label={`${restaurant.name}: na górę strony`}
        >
          Bella <span className="accent text-terracotta">Cucina</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Główna">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-2 text-[0.95rem] text-espresso-soft transition-colors hover:text-espresso"
            >
              {l.label}
              <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 ease-out-soft group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#rezerwacja"
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-terracotta-dark active:translate-y-px"
          >
            Zarezerwuj stolik
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] text-espresso lg:hidden"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          aria-controls="menu-mobilne"
        >
          <span
            className={cn(
              "block h-[1.5px] w-6 bg-current transition-transform duration-300",
              open && "translate-y-[3.75px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-[1.5px] w-6 bg-current transition-transform duration-300",
              open && "-translate-y-[3.75px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Panel mobilny */}
      <div
        id="menu-mobilne"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-cream bg-grain px-5 pb-10 pt-[calc(var(--header-h)+2rem)] transition-opacity duration-300 sm:px-8 lg:hidden",
          open ? "opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav className="flex flex-col" aria-label="Menu mobilne">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline border-b border-espresso/10 py-4 font-display text-[2rem] leading-tight text-espresso"
            >
              <span className="mr-4 w-6 font-sans text-sm tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <a
            href="#rezerwacja"
            onClick={() => setOpen(false)}
            className="rounded-full bg-terracotta px-8 py-4 text-center text-base font-semibold text-cream"
          >
            Zarezerwuj stolik
          </a>
          <a
            href={`tel:${restaurant.contact.phoneHref}`}
            className="py-3 text-center text-base font-medium text-espresso-soft"
          >
            albo zadzwoń:{" "}
            <span className="tabular-nums">{restaurant.contact.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
