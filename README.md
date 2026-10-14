# Bella Cucina: trattoria włoska (demo portfolio)

Strona one-page dla rodzinnej włoskiej restauracji. Demo do portfolio
(`dorlowski.dev`, slug: `restauracja-bella`) pokazujące kompetencje w tworzeniu
stron dla gastronomii: apetyczne hero, menu online, galeria z lightboxem,
rezerwacja stolika, mapa i dane strukturalne pod SEO.

**Kierunek UI/UX:** „karta dań z trattorii”: kremowy papier, espresso,
terakota jako jedyny kolor akcji. Fraunces (osie SOFT i WONK, kursywa jako
włoski „kicker” nad nagłówkami) + Inter. Motywy: łukowe kadry zdjęć (jak
ceglane sklepienie na fotografiach) i kropkowane linie z drukowanej karty
(nazwa ...... cena, dzień ...... godziny). Animacje wejścia z poszanowaniem
`prefers-reduced-motion`.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens w `@theme`)
- **Framer Motion** (animacje)
- Hosting docelowy: **Vercel**

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000 (redesign testowany na porcie 3301)
npm run build      # produkcyjny build
```

## Struktura

```
src/
  app/
    layout.tsx            # metadata, fonty, <html lang="pl">
    page.tsx              # złożenie sekcji + JSON-LD
    globals.css           # design system (Tailwind v4 @theme)
    api/rezerwacja/route.ts  # obsługa formularza (demo)
    opengraph-image.tsx   # dynamiczny OG image
    sitemap.ts / robots.ts
    icon.svg
  components/             # Header, Hero, About, MenuSection, MenuNav,
                          # Gallery, Contact (+MapCard, HoursList),
                          # Reservation(+Form), Footer, MobileBar
  data/
    restaurant.ts         # jedno źródło prawdy o lokalu (kontakt, godziny…)
    menu.ts               # karta dań (łatwa edycja)
    images.ts             # statyczne importy zdjęć (auto blur/rozmiar)
  images/                 # zdjęcia WebP (seria fal.ai) + render 3D makaronu
  lib/                    # cn, formatPrice, godziny/sloty rezerwacji, schema.org
scripts/blender/          # proceduralny render makaronu + eksport do WebP
```

## Jak aktualizować treść

- **Menu:** edytuj `src/data/menu.ts`: sekcje, ceny i tagi diet aktualizują
  się w UI oraz w danych strukturalnych `schema.org/Menu`.
- **Dane lokalu** (adres, telefon, godziny, social, mapa): `src/data/restaurant.ts`.
- **Zdjęcia:** podmień pliki w `src/images/` (statyczny import: automatyczny
  `width`/`height` i `blurDataURL`). Karta ma jedno zdjęcie na kategorię
  (`menuCategoryImages`), nie na pozycję.

## Rezerwacja

Formularz waliduje dane po stronie klienta i serwera (`/api/rezerwacja`),
ma honeypot anty-spam i stan sukcesu. Godziny do wyboru zależą od dnia
(ostatni stolik godzinę przed zamknięciem, z `restaurant.hours`). W demo zgłoszenie jest logowane na
serwerze, produkcyjnie wystarczy podpiąć Web3Forms/Resend w handlerze
(miejsce oznaczone komentarzem).

## SEO

- Pełne `metadata` + OpenGraph/Twitter, `lang="pl"`, statyczny OG image
  (`src/app/opengraph-image.jpg`, kadr ze zdjęcia z hero).
- Dane strukturalne `schema.org/Restaurant` (+ `Menu`, godziny, geo) w `page.tsx`.
- `sitemap.xml`, `robots.txt`.

## Zdjęcia i grafika

- Fotografie: jedna seria wygenerowana w fal.ai (nano-banana-pro dla hero,
  nano-banana-2 dla reszty), wspólna art direction: światło żarówek i świec,
  ciemny orzech, len, kremowa kamionka, lekkie ziarno filmu. Bez ludzi na
  pierwszym planie, bez napisów i logotypów.
- Martwa natura z makaronu: `scripts/blender/pasta_still_life.py`
  (Blender 5.2, Cycles), eksport: `node scripts/blender/export_pasta.mjs`.

```bash
blender --background --factory-startup --python-exit-code 1 \
  --python scripts/blender/pasta_still_life.py -- --out .claude/render/pasta.png
node scripts/blender/export_pasta.mjs .claude/render/pasta.png src/images/makaron-3d.webp
```
