# Bella Cucina — plan rozbudowy

> Projekt demo do portfolio (`dorlowski.dev`, slug: `restauracja-bella`).
> Cel: pokazać kompetencje w tworzeniu **stron dla gastronomii** — segmentu,
> który w Polsce najczęściej działa wyłącznie na Instagramie i Facebooku.

## Kontekst (z case study)

- **Problem:** lokale gastronomiczne nie mają własnych stron — menu krąży jako
  nieaktualne zdjęcie, nie da się zarezerwować stolika online, Google nie ma
  czego zaindeksować.
- **Rozwiązanie:** strona sprzedająca atmosferę lokalu — apetyczne hero, menu
  online, galeria dań, godziny otwarcia, mapa dojazdu, rezerwacja stolika.
- **Efekt:** gość w kilka sekund widzi menu, lokalizację i rezerwuje stolik.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion.
Hosting: Vercel.

## Struktura sekcji (one-page + ewentualne podstrony)

1. **Hero** — pełnoekranowe zdjęcie/wnętrze, nazwa lokalu, hasło, CTA „Zarezerwuj stolik”.
2. **O nas** — krótka historia, klimat, wyróżniki.
3. **Menu online** — kategorie (przystawki / dania główne / desery / napoje),
   pozycje z ceną i opisem; dane w `src/data/menu.ts` (łatwa aktualizacja).
4. **Galeria** — siatka zdjęć dań i wnętrza, lightbox.
5. **Rezerwacja** — formularz (imię, telefon, data, godzina, liczba osób).
6. **Kontakt / dojazd** — godziny otwarcia, mapa (osadzona), telefon, social.
7. **Stopka.**

## Etapy realizacji

- [x] **Etap 1 — fundament:** paleta + typografia pod gastronomię (ciepłe,
      apetyczne kolory), layout, komponenty UI, dane menu w osobnym pliku.
- [x] **Etap 2 — treść:** hero, o nas, menu online (z danych), galeria z lightboxem.
- [x] **Etap 3 — rezerwacja:** formularz z walidacją; API route z honeypotem
      (miejsce na Web3Forms/Resend oznaczone w handlerze).
- [x] **Etap 4 — kontakt/SEO:** mapa, godziny, dane strukturalne `Restaurant`
      (schema.org), `Menu`, metadane, sitemap, robots, OG image.
- [x] **Etap 5 — polish:** animacje wejścia, `prefers-reduced-motion`, RWD.
      Pozostaje: Lighthouse + wdrożenie na Vercel.

> Kierunek UI/UX wybrany przez klienta: **„ciepła trattoria" (rustykalna
> elegancja)** — krem/terakota/oliwka/złoto, Fraunces + Inter.

## Pomysły rozszerzeń

- Zamówienia z dostawą / na wynos (koszyk light).
- Wielojęzyczność (PL/EN) dla lokali turystycznych.
- Integracja z systemem rezerwacji (np. kalendarz dostępności stolików).
- Sekcja „wydarzenia” (wieczory tematyczne, menu sezonowe).

## Po wdrożeniu (powrót do portfolio)

1. Wrzuć na Vercel → zapisz URL.
2. W `dorlowski.dev`: dodaj wpis do `scripts/shots.config.json`
   (`slug: "restauracja-bella"`, `url`), uruchom `npm run shots restauracja-bella`.
3. Uzupełnij `liveUrl`/`githubUrl` w `cv-data.ts` i usuń `draft: true`.
