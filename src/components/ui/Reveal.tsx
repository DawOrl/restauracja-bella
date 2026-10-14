"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** opóźnienie startu animacji (s) */
  delay?: number;
  /** przesunięcie w pionie na starcie (px) */
  y?: number;
};

/*
  Elementy czekające na wejście. Jeden wspólny nasłuch przewijania zamiast
  IntersectionObservera: obserwator nie zgłasza elementu, który przy szybkim
  przewinięciu (skok kotwicą, Page Down) przeskoczył z dołu nad ekran bez
  klatki "widoczny", przez co sekcja zostawała pusta. Tu wszystko, co jest
  już powyżej dolnej krawędzi ekranu, zostaje pokazane.
*/
const pending = new Set<HTMLElement>();
let frame = 0;

function check() {
  frame = 0;
  const limit = window.innerHeight * 0.92;
  for (const el of pending) {
    if (el.getBoundingClientRect().top < limit) {
      el.dataset.reveal = "shown";
      pending.delete(el);
    }
  }
  if (pending.size === 0) {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(check);
}

function watch(el: HTMLElement) {
  if (pending.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  pending.add(el);
}

/**
 * Delikatne wejście "fade + slide up". HTML z serwera (i strona bez JS)
 * jest od razu widoczny: ukrywamy tylko to, co po hydracji leży jeszcze pod
 * ekranem. Przy prefers-reduced-motion nic nie jest ukrywane.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "hidden";
    watch(el);
    return () => {
      pending.delete(el);
    };
  }, []);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
