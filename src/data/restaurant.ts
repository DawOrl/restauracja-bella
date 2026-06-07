/**
 * Bella Cucina — jedno źródło prawdy o lokalu.
 * Używane przez UI, metadane SEO oraz dane strukturalne schema.org.
 * Aktualizujesz tutaj, zmienia się wszędzie.
 */

export type OpeningHours = {
  /** Dni wg schema.org: Monday, Tuesday, ... */
  days: string[];
  /** Skrót po polsku do wyświetlenia, np. "Pon – Czw" */
  label: string;
  /** "12:00" / null gdy zamknięte */
  opens: string;
  closes: string;
};

export const restaurant = {
  name: "Bella Cucina",
  legalName: "Bella Cucina Trattoria",
  /** krótkie hasło / claim */
  tagline: "Smak Włoch od 1987 roku",
  /** zdanie do hero */
  heroLead: "Domowa kuchnia włoska w sercu Krakowa",
  /** opisy używane w meta i schema */
  shortDescription:
    "Rodzinna trattoria w Krakowie — świeży makaron robiony codziennie, pizza z pieca opalanego drewnem i karta win prosto z Italii.",
  longDescription:
    "Bella Cucina to rodzinna trattoria, w której od 1987 roku gotujemy tak, jak we włoskim domu. Makaron wyrabiamy ręcznie każdego ranka, pizzę wypiekamy w piecu opalanym drewnem, a składniki sprowadzamy wprost od włoskich dostawców. Usiądź, nalej wina i poczuj się jak u nas w rodzinie.",

  foundedYear: 1987,
  cuisine: ["Włoska", "Śródziemnomorska", "Pizza"],
  /** schema.org servesCuisine */
  servesCuisine: ["Italian", "Mediterranean", "Pizza"],
  priceRange: "$$",
  currency: "PLN",

  contact: {
    phone: "+48 12 345 67 89",
    phoneHref: "+48123456789",
    email: "rezerwacje@bellacucina.pl",
  },

  address: {
    street: "ul. Floriańska 24",
    postalCode: "31-021",
    city: "Kraków",
    region: "Małopolska",
    country: "Polska",
    countryCode: "PL",
  },

  geo: {
    latitude: 50.0633,
    longitude: 19.9402,
  },

  /** Embed Google Maps bez klucza API */
  map: {
    embedUrl:
      "https://maps.google.com/maps?q=Floria%C5%84ska%2024%20Krak%C3%B3w&t=&z=15&ie=UTF8&iwloc=&output=embed",
    linkUrl: "https://www.google.com/maps/search/?api=1&query=Floria%C5%84ska+24+Krak%C3%B3w",
  },

  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], label: "Poniedziałek – Czwartek", opens: "12:00", closes: "22:00" },
    { days: ["Friday", "Saturday"], label: "Piątek – Sobota", opens: "12:00", closes: "23:00" },
    { days: ["Sunday"], label: "Niedziela", opens: "12:00", closes: "21:00" },
  ] satisfies OpeningHours[],

  social: {
    instagram: "https://instagram.com/bellacucina",
    instagramHandle: "@bellacucina",
    facebook: "https://facebook.com/bellacucina",
  },

  /** publiczny URL wdrożenia (Vercel) — do metadata/OG/sitemap */
  siteUrl: "https://restauracja-bella.vercel.app",
} as const;

export type Restaurant = typeof restaurant;
