"use client";

import { useSyncExternalStore } from "react";
import { restaurant } from "@/data/restaurant";
import { hoursForWeekday, warsawWeekday } from "@/lib/hours";
import { cn } from "@/lib/cn";

const noop = () => () => {};

/**
 * Godziny otwarcia w stylu karty (dzień ...... godziny). Po stronie
 * przeglądarki wyróżnia dzisiejszy wiersz; HTML z serwera jest neutralny,
 * więc nie ma rozjazdu hydracji.
 */
export function HoursList({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const todayLabel = useSyncExternalStore(
    noop,
    () => hoursForWeekday(warsawWeekday())?.label ?? null,
    () => null,
  );

  return (
    <ul className="space-y-3 text-[0.94rem] sm:text-base">
      {restaurant.hours.map((h) => {
        const isToday = h.label === todayLabel;
        return (
          <li key={h.label} className="flex items-baseline">
            <span
              className={cn(
                "min-[360px]:whitespace-nowrap",
                tone === "dark" ? "text-espresso-soft" : "text-cream/75",
                isToday &&
                  (tone === "dark"
                    ? "font-semibold text-espresso"
                    : "font-semibold text-cream"),
              )}
            >
              {h.label}
            </span>
            <span
              className={cn("leader", tone === "light" && "leader--light")}
              aria-hidden
            />
            <span
              className={cn(
                "whitespace-nowrap tabular-nums",
                tone === "dark" ? "text-espresso" : "text-cream",
                isToday && "font-semibold",
              )}
            >
              {isToday && (
                <span
                  className={cn(
                    "accent mr-2 font-display font-normal",
                    tone === "dark" ? "text-terracotta" : "text-gold-soft",
                  )}
                >
                  dziś
                </span>
              )}
              {h.opens}–{h.closes}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
