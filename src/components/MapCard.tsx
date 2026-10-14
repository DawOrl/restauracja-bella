"use client";

import { useState } from "react";
import { restaurant } from "@/data/restaurant";

/*
  Mapa w dwóch krokach. Najpierw własny, schematyczny plan Starego Miasta
  (Planty, Rynek, Floriańska, Brama) w kolorach strony: ładuje się od razu
  i od razu pokazuje, gdzie jesteśmy. Mapa Google wczytuje się dopiero po
  kliknięciu, więc bez zgody gościa nie ma ciasteczek i skryptów Google.
  Plan jest poglądowy, nie w skali.
*/
/*
  Siatka kwartałów: ulice co 80 jednostek, kwartał 64 (odstęp 16 = ulica).
  Pomijamy cztery pola Rynku (kwadrat 228-372 na 258-402).
*/
const BLOCKS: [number, number][] = [];
for (let x = 68; x < 560; x += 80) {
  for (let y = 18; y < 640; y += 80) {
    const inRynek = x >= 228 && x < 372 && y >= 258 && y < 402;
    if (!inRynek) BLOCKS.push([x, y]);
  }
}

export function MapCard() {
  const [live, setLive] = useState(false);
  const { map, address, name } = restaurant;

  if (live) {
    return (
      <iframe
        src={map.embedUrl}
        title={`Mapa Google: ${name}, ${address.street}, ${address.city}`}
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <figure className="absolute inset-0 flex flex-col">
      <svg
        viewBox="0 0 600 660"
        role="img"
        aria-labelledby="plan-tytul"
        className="h-full w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="plan-tytul">{`Plan Starego Miasta: ${name} przy ulicy Floriańskiej, między Rynkiem Głównym a Bramą Floriańską`}</title>
        <defs>
          <clipPath id="stare-miasto">
            <ellipse cx="300" cy="330" rx="200" ry="264" />
          </clipPath>
        </defs>

        {/* kwartały średniowiecznej siatki ulic, przycięte do owalu Plant */}
        <g clipPath="url(#stare-miasto)" fill="#211712" fillOpacity="0.1">
          {BLOCKS.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="64" height="64" rx="3" />
          ))}
        </g>

        {/* Planty: zielony pierścień wokół Starego Miasta */}
        <ellipse
          cx="300"
          cy="330"
          rx="214"
          ry="278"
          fill="none"
          stroke="#3a4a2f"
          strokeOpacity="0.28"
          strokeWidth="22"
        />

        {/* Rynek Główny z Sukiennicami */}
        <rect
          x="228"
          y="258"
          width="144"
          height="144"
          rx="2"
          fill="#fbf7f0"
          stroke="#211712"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <rect
          x="262"
          y="318"
          width="76"
          height="24"
          rx="2"
          fill="#211712"
          fillOpacity="0.22"
        />

        {/* ulica Floriańska: od narożnika Rynku do Bramy */}
        <path
          d="M380 252 L380 64"
          stroke="#b23a1e"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Brama Floriańska w pierścieniu Plant */}
        <rect x="366" y="58" width="28" height="26" rx="3" fill="#211712" />

        {/* pinezka: Floriańska 24 */}
        <g transform="translate(380 172)">
          <circle r="24" fill="#b23a1e" fillOpacity="0.14" />
          <path
            d="M0 4 C -9 -7 -12 -13 -12 -19 A12 12 0 1 1 12 -19 C 12 -13 9 -7 0 4 Z"
            fill="#b23a1e"
          />
          <circle cx="0" cy="-19" r="4.5" fill="#fbf7f0" />
        </g>

        <g className="font-sans" fill="#4a3a2e">
          <text x="300" y="290" textAnchor="middle" fontSize="15">
            Rynek Główny
          </text>
          <text x="300" y="370" textAnchor="middle" fontSize="12">
            Sukiennice
          </text>
          <text x="404" y="76" fontSize="13">
            Brama Floriańska
          </text>
          <text x="44" y="560" fontSize="13" fill="#3a4a2f">
            Planty
          </text>
          <text x="300" y="652" textAnchor="middle" fontSize="13">
            ↓ Wawel
          </text>
        </g>
        <g className="font-display italic">
          <rect
            x="398"
            y="130"
            width="150"
            height="54"
            rx="4"
            fill="#fbf7f0"
            fillOpacity="0.92"
          />
          <text x="408" y="154" fontSize="21" fill="#b23a1e">
            {name}
          </text>
          <text x="408" y="175" fontSize="14" fill="#4a3a2e">
            {address.street.replace("ul. ", "")}
          </text>
        </g>
      </svg>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-espresso/10 bg-cream/80 px-5 py-3 text-sm text-muted">
        <span>Plan poglądowy, nie w skali.</span>
        <button
          type="button"
          onClick={() => setLive(true)}
          className="inline-flex min-h-11 items-center font-semibold text-espresso underline decoration-terracotta/50 decoration-2 underline-offset-4 hover:decoration-terracotta"
        >
          Pokaż mapę Google
        </button>
      </figcaption>
    </figure>
  );
}
