import { restaurant } from "@/data/restaurant";
import { menu } from "@/data/menu";

/**
 * Buduje dane strukturalne schema.org/Restaurant (+ zagnieżdżone Menu)
 * dla Rich Results Google. Renderowane jako <script type="application/ld+json">.
 */
export function buildRestaurantJsonLd(imageUrls: string[]) {
  const { siteUrl, address, geo } = restaurant;

  const openingHoursSpecification = restaurant.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

  const hasMenu = {
    "@type": "Menu",
    name: `Menu — ${restaurant.name}`,
    hasMenuSection: menu.map((section) => ({
      "@type": "MenuSection",
      name: `${section.name} (${section.subtitle})`,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: restaurant.currency,
        },
      })),
    })),
  };

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: restaurant.name,
    description: restaurant.shortDescription,
    url: siteUrl,
    telephone: restaurant.contact.phone,
    email: restaurant.contact.email,
    priceRange: restaurant.priceRange,
    servesCuisine: restaurant.servesCuisine,
    image: imageUrls,
    acceptsReservations: "True",
    currenciesAccepted: restaurant.currency,
    foundingDate: String(restaurant.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification,
    sameAs: [restaurant.social.instagram, restaurant.social.facebook],
    hasMenu,
  };
}

/** Serializacja bezpieczna pod XSS (escape `<`). */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
