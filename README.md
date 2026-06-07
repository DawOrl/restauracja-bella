# Bella Cucina — trattoria włoska (demo portfolio)

Strona one-page dla rodzinnej włoskiej restauracji. Demo do portfolio
(`dorlowski.dev`, slug: `restauracja-bella`) pokazujące kompetencje w tworzeniu
stron dla gastronomii: apetyczne hero, menu online, galeria z lightboxem,
rezerwacja stolika, mapa i dane strukturalne pod SEO.

**Kierunek UI/UX:** „ciepła trattoria" — rustykalna elegancja. Paleta krem /
terakota / oliwka / złoto, typografia Fraunces (display) + Inter (tekst),
delikatne animacje wejścia z poszanowaniem `prefers-reduced-motion`.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (design tokens w `@theme`)
- **Framer Motion** (animacje)
- Hosting docelowy: **Vercel**

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
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
                          # Gallery, Reservation(+Form), Contact, Footer
  data/
    restaurant.ts         # jedno źródło prawdy o lokalu (kontakt, godziny…)
    menu.ts               # karta dań (łatwa edycja)
    images.ts             # statyczne importy zdjęć (auto blur/rozmiar)
  images/                 # zdjęcia (źródło: Pexels, licencja darmowa)
  lib/                    # cn, formatPrice, motion EASE, schema.org builder
```

## Jak aktualizować treść

- **Menu:** edytuj `src/data/menu.ts` — sekcje, ceny i tagi diet aktualizują
  się w UI oraz w danych strukturalnych `schema.org/Menu`.
- **Dane lokalu** (adres, telefon, godziny, social, mapa): `src/data/restaurant.ts`.
- **Zdjęcia:** podmień pliki w `src/images/` (statyczny import → automatyczny
  `width`/`height` i `blurDataURL`).

## Rezerwacja

Formularz waliduje dane po stronie klienta i serwera (`/api/rezerwacja`),
ma honeypot anty-spam i stan sukcesu. W demo zgłoszenie jest logowane na
serwerze — produkcyjnie wystarczy podpiąć Web3Forms/Resend w handlerze
(miejsce oznaczone komentarzem).

## SEO

- Pełne `metadata` + OpenGraph/Twitter, `lang="pl"`, dynamiczny OG image.
- Dane strukturalne `schema.org/Restaurant` (+ `Menu`, godziny, geo) w `page.tsx`.
- `sitemap.xml`, `robots.txt`.

## Zdjęcia

Wszystkie zdjęcia pochodzą z [Pexels](https://pexels.com) (licencja darmowa,
do użytku komercyjnego, bez wymaganej atrybucji).
